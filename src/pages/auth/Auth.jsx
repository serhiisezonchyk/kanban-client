import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';

import { Button, Form, Input } from 'antd';

import styles from './Auth.module.css';
function Auth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onChange',
  });
  const onSubmit = async (values) => {
    console.log(values);
    reset();
    //   const data = await dispatch(
    //     fetchLogin({ email: values.login, password: values.password })
    //   );
    //   if (!data.payload) {
    //     Modal.error({
    //       title: "Помилка авторизації",
    //       content: <>Неправильний логін або пароль</>,
    //     });
    //   }
    //   if ("token" in data.payload) {
    //     window.localStorage.setItem("token", data.payload.token);
    //   }
  };
  return (
    <div className={styles.body}>
      <h1>Name</h1>

      <div className={styles.wrapper}>
        <div className={styles.formContent}>
          <h2 style={{ marginTop: 0 }}>Авторизуватися</h2>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.formAuth}>
            <div className={styles.inputBox}>
              <input
                placeholder='Логін...'
                {...register('login', { required: 'name' })} 
                style={errors.login&&{borderBottom: '1px solid red'}}
                aria-invalid={errors.login?true:false}

              />
              {errors.login && <span style={{color:"red"}}>*</span>}
            </div>
            <div className={styles.inputBox}>
              <input
                placeholder='Пароль...'
                type='password'
                {...register('password', { required: true })}
                style={errors.password&&{borderBottom: '1px solid red'}}
                aria-invalid={errors.password?true:false}
              />
              {errors.password && <span style={{color:"red"}}>*</span>}
            </div>
            <div className={styles.inputBox}>
              <button>Авторизуватися</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Auth;
