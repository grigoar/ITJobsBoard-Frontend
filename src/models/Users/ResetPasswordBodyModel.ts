type ResetPasswordModel = {
  body: {
    password: string;
    passwordConfirm: string;
  };
  resetPassToken: string;
};

export default ResetPasswordModel;
