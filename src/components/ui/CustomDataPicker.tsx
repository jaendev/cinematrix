'use client'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import { Calendar } from 'lucide-react';
import dayjs, { Dayjs } from 'dayjs';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#fbbf24',
      contrastText: '#000',
    },
    secondary: {
      main: '#f59e0b',
    },
    background: {
      default: '#1f2937',
      paper: '#374151',
    },
    text: {
      primary: '#ffffff',
      secondary: '#d1d5db',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#1f2937',
            borderRadius: '8px',
            '& fieldset': {
              borderColor: '#374151',
            },
            '&:hover fieldset': {
              borderColor: '#fbbf24',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#fbbf24',
              borderWidth: '2px',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#1f2937',
          border: '1px solid #374151',
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#fbbf24',
            color: '#000',
          },
          '&.Mui-selected': {
            backgroundColor: '#fbbf24 !important',
            color: '#000 !important',
            '&:hover': {
              backgroundColor: '#f59e0b !important',
            },
          },
          '&.MuiPickersDay-today': {
            border: '2px solid #fbbf24 !important',
          },
        },
      },
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          '& .MuiPickersArrowSwitcher-button': {
            color: '#fbbf24',
            '&:hover': {
              backgroundColor: '#374151',
            },
          },
        },
      },
    },
  },
});

interface CustomDatePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  name: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
}

export default function CustomDatePicker({
  label,
  value,
  onChange,
  name,
  required = false,
  error = false,
  helperText
}: CustomDatePickerProps) {
  const handleDateChange = (newValue: Dayjs | null) => {
    if (newValue) {
      onChange(newValue.format('YYYY-MM-DD'));
    } else {
      onChange('');
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            {label} {!required && <span className="text-gray-500">(Optional)</span>}
          </label>

          <div className="relative">
            {/* Icon overlay */}
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10 pointer-events-none" />

            <DatePicker
              value={value ? dayjs(value) : null}
              onChange={handleDateChange}
              maxDate={dayjs()}
              format='DD-MM-YYYY'
              enableAccessibleFieldDOMStructure={false}
              slots={{
                textField: (params) => (
                  <TextField
                    {...params}
                    name={name}
                    required={required}
                    error={error}
                    helperText={helperText}
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        paddingLeft: '3rem',
                        height: '48px',
                        backgroundColor: '#1f2937',
                        '& input': {
                          color: '#ffffff',
                          '&::placeholder': {
                            color: '#9ca3af',
                          },
                        },
                      },
                    }}
                  />
                ),
              }}
              slotProps={{
                textField: {
                  placeholder: 'Select your date of birth',
                },
                popper: {
                  sx: {
                    '& .MuiPaper-root': {
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '12px',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}