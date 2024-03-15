import * as yup from 'yup';

const NewUserSchema = yup.object().shape({
  email: yup.string().email().min(12).required(),
  password: yup
    .string()
    // .min(12)
    // .max(32)
    // .matches(/(.*[A-Z].*)/, 'The password must contain at least one uppercase letter')
    // .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Special')
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
});

export default NewUserSchema;
