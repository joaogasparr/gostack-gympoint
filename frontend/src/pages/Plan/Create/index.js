import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { Form } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';
import schema from '~/validators/Plan';

import Header from '~/components/Title';
import Button from '~/components/Button';
import TextInput from '~/components/TextInput';
import NumberInput from '~/components/NumberFormat';

import { Container, Content } from './styles';

export default function Create() {
  const [plans, setPlans] = useState();
  const [duration, setDuration] = useState();
  const [price, setPrice] = useState();
  const [total, setTotal] = useState();
  const { id } = useParams();

  useMemo(() => {
    const data = price * duration;
    setTotal(data);
  }, [price, duration]);

  useEffect(() => {
    async function loadPlan() {
      try {
        const response = await api.get(`/plans/${id}`);

        const data = {
          ...response.data,
          total: response.data.price * response.data.duration,
        };

        setPlans(data);
        setDuration(data.duration);
        setPrice(data.price);
      } catch (err) {
        toast.error(err.response.data.error);
        history.push('/plan');
      }
    }

    if (id) {
      loadPlan();
    }
  }, [id]);

  function handleChangeDuration(e) {
    setDuration(e.target.value);
  }

  async function newPlan(data) {
    try {
      await api.post('/plans', data);

      toast.success(`O Plano foi cadastrado com sucesso!`);

      history.push('/plan');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  async function updatePlan(data) {
    try {
      await api.put(`/plans/${id}`, data);

      toast.success(`O Plano foi alterado com sucesso!`);

      history.push('/plan');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  async function handleSubmit({ title, duration, price: priceFormatted }) {
    const price = priceFormatted.replace('R$', '');

    if (id) {
      await updatePlan({ title, duration, price });
    } else {
      await newPlan({ title, duration, price });
    }
  }

  return (
    <Container>
      <Form initialData={plans} schema={schema} onSubmit={handleSubmit}>
        <Header text={id ? 'Edição de plano' : 'Cadastro de plano'}>
          <Link to="/plan">
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
          <TextInput name="title" type="text" label="TÍTULO DO PLANO" />

          <TextInput
            name="duration"
            type="number"
            label="DURAÇÃO (em meses)"
            value={duration}
            onChange={handleChangeDuration}
          />

          <NumberInput
            name="price"
            label="PREÇO MENSAL"
            value={price}
            onChange={setPrice}
          />

          <NumberInput
            calculated
            name="total"
            label="PREÇO TOTAL"
            value={total}
            onChange={setTotal}
          />
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
