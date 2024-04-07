export const registrationOption = {
  name: {
    required: 'Name is required',
    minLength: {
      value: 3,
      message: 'Name must have at least 3 characters',
    },
    maxLength: {
      value: 20,
      message: 'Name cannot be greater than 20 characters',
    },
    pattern: {
      value: /^[A-Z][a-z]+\s[A-Z][a-z]+$/i,
      message: 'Full name is required',
    },
  },
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Valid email address is required',
    },
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 6,
      message: 'Password must have at least 6 characters',
    },
    maxLength: {
      value: 20,
      message: 'Password cannot be greater than 20 characters',
    },
  },
  phoneNumber: {
    required: 'Phone number is required',
    pattern: {
      value: /(?:\+?(\d{1,3}))?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/,
      message: 'Valid phone number is required',
    },
  },
  address: {
    required: 'Address is required',
    minLength: {
      value: 2,
      message: 'Address name must have at least 2 characters',
    },
    maxLength: {
      value: 150,
      message: 'Address name cannot be greater than 150 characters',
    },
  },
};
