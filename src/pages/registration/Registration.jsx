import React from 'react';
import { useForm } from 'react-hook-form';

import '../auth/Auth.scss';
import { useDispatch } from 'react-redux';
import { create } from '../../store/services/user.service';
import { registerValidation } from '../../utils/validators';
import { zodResolver } from '@hookform/resolvers/zod';

const Registration = () => {
  const dispatch = useDispatch();

  const formSchemaObject = zodResolver(registerValidation);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: formSchemaObject,
  });
  const onSubmit = async (values) => {
    const data = await dispatch(create(values));
    reset();
  };
  return (
    <div className='body'>
      <div className='logo-name'>
        <span>Air</span>Plan
      </div>

      <div className='wrapper'>
        <div className='form-content'>
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)} className='form-auth'>
            <div className='input-box'>
              <input
                placeholder='Email...'
                {...register('email')}
                className={errors.email && 'invalid-data'}
              />
              {errors.email && (
                <span role='alert' className='error'>
                  {errors.email?.message}
                </span>
              )}
            </div>
            <div className='input-box'>
              <input
                placeholder='Password...'
                type='password'
                {...register('password')}
                className={errors.password && 'invalid-data'}
              />
              {errors.password && (
                <span role='alert' className='error'>
                  {errors.password?.message}
                </span>
              )}
            </div>
            <div className='input-box'>
              <input
                placeholder='Repeat password...'
                type='password'
                {...register('second_password')}
                className={errors.second_password && 'invalid-data'}
              />
              {errors.second_password && (
                <span role='alert' className='error'>
                  {errors.second_password?.message}
                </span>
              )}
            </div>
            <div className='names-box'>
              <div className='input-box'>
                <input
                  placeholder='First name...'
                  {...register('first_name')}
                  className={errors.first_name && 'invalid-data'}
                />
                {errors.first_name && (
                  <span role='alert' className='error'>
                    {errors.first_name?.message}
                  </span>
                )}{' '}
              </div>
              <div className='input-box'>
                <input
                  placeholder='Last name...'
                  {...register('last_name')}
                  className={errors.last_name && 'invalid-data'}
                />
                {errors.last_name && (
                  <span role='alert' className='error'>
                    {errors.last_name?.message}
                  </span>
                )}
              </div>
            </div>
            <div className='input-box'>
              <input
                placeholder='Phone...'
                {...register('phone')}
                className={errors.phone && 'invalid-data'}
              />
                {errors.phone && (
                  <span role='alert' className='error'>
                    {errors.phone?.message}
                  </span>
                )}            </div>
            <div className='input-box'>
              <input type='file' {...register('avatar_url')} />
              {errors.avatar_url && (
                <span role='alert' className='error'>
                  {errors.avatar_url?.message}
                </span>
              )}
            </div>
            <div className='input-box'>
              <input
                placeholder='Country...'
                {...register('country')}
                className={errors.country && 'invalid-data'}
              />
              {errors.country && (
                <span role='alert' className='error'>
                  {errors.country?.message}
                </span>
              )}{' '}
            </div>
            <div className='input-box'>
              <button>Confirm</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
