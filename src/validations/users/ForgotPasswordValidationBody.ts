import * as yup from 'yup';

const ForgotPasswordValidationBody = yup.object().shape({
  email: yup.string().email('Email must be valid.').required('Email is required'),
});

export default ForgotPasswordValidationBody;
