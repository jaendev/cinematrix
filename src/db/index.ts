import { drizzle } from "drizzle-orm/mysql2";
import { DATABASE_URL } from '../../config/config';
import * as schema from './schema/index';

export const db = drizzle(DATABASE_URL);

// Export the scheme for use in other parts of the application
export { schema };

// Export types for use in other parts of the application
export type {
  User,
  Movie,
  Genre,
  Director,
  Room,
  Seat,
  Showtime,
  Order,
  OrderItem,
  Ticket,
  MoviePurchase,
  Review,
  Wishlist
} from './schema/index';
