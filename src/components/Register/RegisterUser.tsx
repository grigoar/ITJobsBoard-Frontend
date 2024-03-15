'use client';

import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import NewUserSchema from '@/validations/users/NewUserSchema';
import FormInput from '../common/Form/FormInput';
import Button from '../common/Button/Button';
import Card from '../common/Card/Card';
import FormWrapper from '../common/Form/FormWrapper';

type NewUser = {
  email: string;
  password: string;
};

const RegisterUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(NewUserSchema, { abortEarly: false, recursive: true }),
    // mode: 'onTouched',
    mode: 'all',
  });

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const onSubmitHandler = (data: NewUser) => {
    console.log(errors);
    console.log(data.email, data.password);
    reset();
  };
  return (
    <Card>
      <FormWrapper onSubmitHandler={handleSubmit(onSubmitHandler)}>
        <h2>Lets register you!</h2>

        {/* <input className="text-black" {...register('email')} placeholder="email" type="email" required /> */}
        <FormInput
          register={register}
          placeholder="john.doe@gmail.com"
          type="email"
          name="email"
          id="email"
          label="Email"
          required
          errors={errors.email?.message}
          touchedField={touchedFields.email}
          dirtyField={dirtyFields.email}
          watchField={watch('email')}
        />
        {/* <p>{errors.email ? errors.email : ''}</p> */}

        <FormInput
          register={register}
          placeholder="password"
          type="password"
          name="password"
          id="password"
          label="Password"
          required
          errors={errors.password?.message}
          touchedField={touchedFields.password}
          dirtyField={dirtyFields.password}
          watchField={watch('password')}
        />

        {/* {errors.password && <ul>{errors.password?.types?.map((error, index) => <li key={index}>{error}</li>)}</ul>} */}
        {/* <button type="submit">Sign in</button> */}
        <Button style={`btn btn-ghost `} type="submit" action={handleSubmit(onSubmitHandler)}>
          Sign in
        </Button>
      </FormWrapper>
    </Card>
  );
};

export default RegisterUser;
