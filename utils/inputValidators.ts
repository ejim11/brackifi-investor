export const registrationOption = {
  name: (required: boolean) => ({
    required: required ? 'Name is required' : false,
    minLength: {
      value: 3,
      message: 'Name must have at least 3 characters',
    },
    maxLength: {
      value: 100,
      message: 'Name cannot be greater than 100 characters',
    },
    // pattern: {
    //   value: /^[A-Z][a-z]+\s[A-Z][a-z]+$/i,
    //   message: 'Full name is required',
    // },
  }),
  email: (required: boolean) => ({
    required: required ? 'Email is required' : false,
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Valid email address is required',
    },
  }),
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
  phoneNumber: (required: boolean) => ({
    required: required ? 'Phone number is required' : false,
    pattern: {
      value: /(?:\+?(\d{1,3}))?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/,
      message: 'Valid phone number is required',
    },
  }),
  address: (required: boolean) => ({
    required: required ? 'Address is required' : false,
    minLength: {
      value: 2,
      message: 'Address name must have at least 2 characters',
    },
    maxLength: {
      value: 150,
      message: 'Address name cannot be greater than 150 characters',
    },
  }),
  ubitexId: {
    required: false,
    minLength: {
      value: 2,
      message: 'UbitexID name must have at least 2 characters',
    },
    maxLength: {
      value: 15,
      message: 'UbitexID name cannot be greater than 150 characters',
    },
  },
  amountPaid: {
    required: 'Amount paid is required',
    min: {
      value: 100,
      message: 'You cannot invest with less than $100',
    },
  },
  maxDrawDown: {
    required: 'Amount paid is required',
    min: {
      value: 10,
      message: 'You cannot invesst with less than 10%',
    },
    max: {
      value: 100,
      message: '100% is the maximum',
    },
  },
  amountToSell: {
    required: 'Amount to withdraw is required',
    min: {
      value: 100,
      message: 'You cannot withdraw less than $100',
    },
  },
  walletAddress: {
    required: 'Wallet Address is required',
    minLength: {
      value: 42,
      message: 'Address name cannot be less than 42 characters',
    },
    maxLength: {
      value: 42,
      message: 'Address name cannot be greater than 42 characters',
    },
  },
  hash: {
    required: 'Wallet Address is required',
    minLength: {
      value: 42,
      message: 'Address name cannot be less than 42 characters',
    },
    maxLength: {
      value: 82,
      message: 'Address name cannot be greater than 42 characters',
    },
  },
};
