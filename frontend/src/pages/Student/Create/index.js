import React, { useState, useEffect } from 'react';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Form } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import api from '~/services/api';
import history from '~/services/history';

import Button from '~/components/Button';
import TextInput from '~/components/TextInput';
import Header from '~/components/Title';

import schema from '~/validators/Student';

import { Container, Content } from './styles';

export default function Create() {
  const [student, setStudent] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function loadStudent() {
      try {
        const { data } = await api.get(`/students/${id}`);

        setStudent(data);
      } catch (err) {
        toast.error('Não foi possível carregar os dados do aluno.');
        history.push('/student');
      }
    }

    if (id) {
      loadStudent();
    }
  }, [id]);

  async function newStudent(data) {
    try {
      await api.post('/students', data);

      toast.success(`O Aluno foi cadastrado com sucesso!`);

      history.push('/student');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  async function updateStudent(data) {
    try {
      await api.put(`/students/${id}`, data);

      toast.success(`O Aluno foi alterado com sucesso!`);

      history.push('/student');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  async function handleSubmit({ name, email, age, weight, height }) {
    if (id) {
      await updateStudent({ name, email, age, weight, height });
    } else {
      await newStudent({ name, email, age, weight, height });
    }
  }

  return (
    <Container>
      <Form initialData={student} schema={schema} onSubmit={handleSubmit}>
        <Header text={id ? 'Edição de aluno' : 'Cadastro de aluno'}>
          <Link to="/student">
            <Button
              type="button"
              text="VOLTAR"
              color="#CCCCCC"
              icon={<MdKeyboardArrowLeft size={20} color="#FFF" />}
            />
          </Link>

          <Button
            type="submit"
            text="SALVAR"
            color="#EE4D64"
            icon={<MdDone size={20} color="#FFF" />}
          />
        </Header>
        <Content>
          <TextInput
            name="name"
            type="text"
            label="NOME COMPLETO"
            placeholder="John Doe"
          />
          <TextInput
            name="email"
            type="text"
            label="ENDEREÇO DE E-MAIL"
            placeholder="exemplo@email.com"
          />
          <TextInput name="age" type="number" label="IDADE" />
          <TextInput
            name="weight"
            type="number"
            step="0.01"
            label="PESO (em kg)"
          />
          <TextInput name="height" type="number" step="0.01" label="ALTURA" />
        </Content>
      </Form>
    </Container>
  );
}

Create.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

Create.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: null,
    }),
  }),
};
