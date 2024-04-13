import * as yup from 'yup';

const SignUpUserValidationBody = yup.object().shape({
  email: yup.string().email('Email must be valid.').required(),
  password: yup
    .string()
    .test('password', 'Password must contain at least one number', (value) => {
      const errors = [];
      if (!value) {
        errors.push('Password is required');
      }
      if (!/^(?=.{8,})/.test(value || '')) {
        errors.push('Must Contain 8 Characters');
      }
      if (!/\d/.test(value || '')) {
        errors.push('Password must contain at least one number');
      }
      if (errors.length > 0) {
        throw new yup.ValidationError(errors.join(', '), value, 'password');
      }

      return true;
    })
    .required(),
  passwordConfirm: yup
    .string()
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value;
    })
    .required(),
});

export default SignUpUserValidationBody;
