import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import './Auth.scss';
import { login } from '../../store/services/user.service';
import { Link, Navigate } from 'react-router-dom';
import { selectIsAuth } from '../../store/slices/auth.slice';
import { GROUPS_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts';
function Auth() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    mode: 'onChange',
  });
  const onSubmit = async (values) => {
    const data = await dispatch(login(values));
    if (data?.error?.message) {
      alert(data?.error?.message);
      setValue('password', '');
    } else {
      reset();
    }
  };

  if (isAuth) return <Navigate to={GROUPS_ROUTE} />;

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
            </div>
            <div className='input-box'>
              <input
                placeholder='Password...'
                type='password'
                {...register('password', { required: true })}
                className={errors.password && 'invalid-data'}
              />
            </div>
            <div className='input-box'>
              <button>Confirm</button>
              <Link to={REGISTRATION_ROUTE}>Or register just now...</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Auth;
