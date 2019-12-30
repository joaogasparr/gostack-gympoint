import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

import { Form } from '@rocketseat/unform';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';
import SubmitButton from '~/components/Button';
import TextInput from '~/components/TextInput';

import schema from '~/validators/SignIn';

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="GymPoint" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <TextInput
          name="email"
          label="SEU E-MAIL"
          type="email"
          placeholder="exemplo@email.com"
        />
        <TextInput
          name="password"
          label="SUA SENHA"
          type="password"
          placeholder="*************"
        />

        <SubmitButton
          type="submit"
          color="#EE4D64"
          text={loading ? '' : 'Entrar no sistema'}
          icon={loading && <AiOutlineLoading3Quarters size={20} color="#FFF" />}
          loading={loading}
        />
      </Form>
    </>
  );
}
