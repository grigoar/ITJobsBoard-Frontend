import * as yup from 'yup';

const ForgotPasswordValidationBody = yup.object().shape({
  email: yup.string().email('Email must be valid.').required(),
});

export default ForgotPasswordValidationBody;
