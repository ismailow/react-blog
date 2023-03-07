export const emailSchema = {
  pattern: {
    value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
    message: 'Email must be valid',
  },
};

export const passwordSchema = {
  minLength: {
    value: 6,
    message: 'Password must be 6 characters or more',
  },
  maxLength: {
    value: 40,
    message: 'Password must be 40 characters or less',
  },
};

export const urlSchema = {
  pattern: {
    value:
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
    message: 'URL must be valid',
  },
};

export const signInEmailSchema = {
  required: {
    value: true,
    message: 'The field is required',
  },
  pattern: {
    value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
    message: 'Email must be valid',
  },
};

export const signInPasswordSchema = {
  required: {
    value: true,
    message: 'The field is required',
  },
};

export const userNameSchema = {
  required: {
    value: true,
    message: 'The field is required',
  },
  minLength: {
    value: 3,
    message: 'Username must be 3 characters or more',
  },
  maxLength: {
    value: 20,
    message: 'Username must be 20 characters or less',
  },
};

export const signUpPasswordSchema = {
  required: {
    value: true,
    message: 'The field is required',
  },
  minLength: {
    value: 6,
    message: 'Password must be 6 characters or more',
  },
  maxLength: {
    value: 40,
    message: 'Password must be 40 characters or less',
  },
};

export const confirmPasswordSchema = {
  required: {
    value: true,
    message: 'The field is required',
  },
  validate: (value, formValues) => value === formValues.password || 'Passwords must match',
};
