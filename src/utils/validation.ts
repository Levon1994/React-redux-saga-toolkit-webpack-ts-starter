/* eslint-disable no-console */
export const validateField = (name: string, value: string): string => {
  const { length } = value;
  switch (name) {
    case 'firstName':
      if (length > 30) return 'Maximum Name length is 30 characters';
      if (length > 0 && !value.match(/^[A-Za-z\s]+$/))
        return 'First Name must contain only alphabetical charachters';
      break;
    case 'lastName':
      if (length > 30) return 'Maximum Name length is 30 characters';
      if (length > 0 && !value.match(/^[A-Za-z\s]+$/))
        return 'Last Name must contain only alphabetical charachters';
      break;
    case 'email':
      if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) return 'Invalid email format';
      if (length > 100) return 'Maximum email length is 100 characters';
      break;
    case 'password':
      if (length < 7) return 'Password must be at least 7 characters';
      break;
    default:
      return '';
  }
  return '';
};
