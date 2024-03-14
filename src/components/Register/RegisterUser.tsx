'use client';

import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import NewUserSchema from '@/validations/users/NewUserSchema';
import FormInput from '../common/Form/FormInput';

type NewUser = {
  email: string;
  password: string;
};

const RegisterUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(NewUserSchema),
  });
  const onSubmitHandler = (data: NewUser) => {
    console.log(data.email, data.password);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <h2>Lets sign you in.</h2>
      <br />

      {/* <input className="text-black" {...register('email')} placeholder="email" type="email" required /> */}
      <FormInput
        register={register}
        placeholder="email"
        type="email"
        name="email"
        id="email"
        label="Email"
        required
        error={errors.email?.message}
      />
      {/* <p>{errors.email?.message}</p> */}

      <FormInput
        register={register}
        placeholder="password"
        type="password"
        name="password"
        id="password"
        label="Password"
        required
        error={errors.password?.message}
      />

      <button type="submit">Sign in</button>
    </form>
  );
};

export default RegisterUser;
