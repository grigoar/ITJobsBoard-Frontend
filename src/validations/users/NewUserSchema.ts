import * as yup from 'yup';

const NewUserSchema = yup.object().shape({
  email: yup.string().email().min(12).required(),
  password: yup.string().min(12).max(32).required(),
});

export default NewUserSchema;
