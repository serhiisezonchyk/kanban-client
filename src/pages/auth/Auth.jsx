import React from 'react';
import { useForm } from 'react-hook-form';
import {useDispatch} from 'react-redux';
import './Auth.scss';
import { login } from '../../store/services/user.service';
function Auth() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onChange',
  });
  const onSubmit = async (values) => {
    reset();
    const data = await dispatch(
      login(values)
    );
    console.log(data)
    // if (!data.payload) {
    //   console.log(data)
    // }
    // if ('token' in data.payload) {
    //   window.localStorage.setItem('token', data.payload.token);
    // }
  };
  return (
    <div className='body'>
      <div className='logo-name'>
        <span>Air</span>Plan
      </div>

      <div className='wrapper'>
        <div className='form-content'>
          <h2>Log In</h2>
          <form onSubmit={handleSubmit(onSubmit)} className='form-auth'>
            <div className='input-box'>
              <input
                placeholder='Email...'
                {...register('email', { required: 'name' })}
                className={errors.email && 'invalid-data'}
              />
              {errors.email && <span style={{ color: 'red' }}>*</span>}
            </div>
            <div className='input-box'>
              <input
                placeholder='Password...'
                type='password'
                {...register('password', { required: true })}
                className={errors.password && 'invalid-data'}
              />
              {errors.password && <span style={{ color: 'red' }}>*</span>}
            </div>
            <div className='input-box'>
              <button>Confirm</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Auth;
