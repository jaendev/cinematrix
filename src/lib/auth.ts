import bcrypt from "bcryptjs";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { CreateUserDTO } from "@/types/user";

/**
 * Hash a password before storing it in the database.
 * @param password 
 * @returns password hashed with bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

/**
 * Verify a password against a hashed password.
 * @param password  
 * @param hashedPassword 
 * @returns boolean indicating if the password matches the hashed password
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

/**
 * Get a user by their email address.
 * @param email 
 * @returns a user object if found, otherwise null
 */
export async function getUserByEmail(email: string) {
  try {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    return user || null; // Return user if found, otherwise null

  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
}

/**
 * Authenticate a user by checking their email and password.
 * @param email 
 * @param password 
 * @returns a user object without the password if authentication is successful, otherwise null
 */
export async function authenticateUser(email: string, password: string) {
  try {
    const user = await getUserByEmail(email);

    if (!user) {
      console.error("User not found");
      return null; // User not found
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      console.error("Invalid password");
      return null; // Invalid password
    }

    // Remove the password from the user object before returning
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  } catch (error) {
    console.error("Error authenticating user:", error);
    return null;
  }
}

/**
 * Create a new user in the database.
 * @param userData 
 * @returns a newly created user object without the password
 */
export async function createUser(userData: CreateUserDTO) {
  try {
    const existingUser = await getUserByEmail(userData.email);

    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    const hashedPassword = await hashPassword(userData.password);

    const [newUser] = await db
      .insert(usersTable)
      .values({
        ...userData,
        password: hashedPassword,
      })
      .$returningId();

    const [createUser] = await db
      .select({
        id: usersTable.id,
        email: usersTable.email,
        firstName: usersTable.firstName,
        lastName: usersTable.lastName,
        phone: usersTable.phone,
        dateOfBirth: usersTable.dateOfBirth,
        isActive: usersTable.isActive,
        createdAt: usersTable.createdAt,
        updatedAt: usersTable.updatedAt,
      })
      .from(usersTable)
      .where(eq(usersTable.id, newUser.id));

    return createUser; // Return the newly created user without the password
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Re-throw the error for further handling
  }
}