import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Form } from '@rocketseat/unform';
import { parseISO, addMonths } from 'date-fns';
import PropTypes from 'prop-types';

import Button from '~/components/Button';
import DatePicker from '~/components/DatePicker';
import NumberInput from '~/components/NumberFormat';
import SelectInput from '~/components/SelectInput';
import Header from '~/components/Title';
import api from '~/services/api';
import history from '~/services/history';
import schema from '~/validators/Enrollment';

import { Container, Content } from './styles';

export default function Create() {
  const [enrollments, setEnrollments] = useState([]);
  const [students, setStudents] = useState([]);
  const [plans, setPlans] = useState([]);
  const [plan, setPlan] = useState({});
  const [date, setDate] = useState();
  const [price, setPrice] = useState();
  const { id } = useParams();

  const endDate = useMemo(() => {
    return addMonths(date, plan.duration);
  }, [plan, date]);

  useMemo(() => {
    const data = plan.price * plan.duration;
    setPrice(data);
  }, [plan]);

  const loadStudentOptions = useCallback(async inputValue => {
    try {
      const response = await api.get('/students', {
        params: {
          name: inputValue,
        },
      });

      const data = response.data.students.map(student => ({
        id: student.id,
        title: student.name,
      }));

      setStudents(data);
      return data;
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }, []);

  const loadPlanOptions = useCallback(async inputValue => {
    try {
      const { data } = await api.get('/plans');

      setPlans(data.plans);
      return data.plans;
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }, []);

  useEffect(() => {
    async function loadEnrollment() {
      try {
        const { data } = await api.get(`/enrollments/${id}`);

        const student = [
          ...students,
          {
            id: data.student.id,
            title: data.student.name,
          },
        ];

        setStudents(student);

        const dataPlan = [...plans, { ...data.plan }];
        setPlan(dataPlan);

        const start_date = parseISO(data.start_date);

        setDate(start_date);

        setEnrollments({
          start_date: parseISO(data.start_date),
          student_id: data.student.id,
          plan_id: data.plan.id,
        });
      } catch (err) {
        toast.error(err.response.data.error);
        history.push('/enrollment');
      }
    }

    if (id) {
      loadEnrollment();
    }

    loadPlanOptions();
  }, [id, loadPlanOptions, plans, students]);

  async function newEnrollment(data) {
    try {
      await api.post('/enrollments', data);

      toast.success(`A Matrícula foi cadastrada com sucesso!`);

      history.push('/enrollment');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  async function updateEnrollment(data) {
    try {
      await api.put(`/enrollments/${id}`, data);

      toast.success(`A Matrícula foi alterado com sucesso!`);

      history.push('/enrollment');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  async function handleSubmit({ student_id, plan_id, start_date }) {
    if (id) {
      await updateEnrollment({ student_id, plan_id, start_date });
    } else {
      await newEnrollment({ student_id, plan_id, start_date });
    }
  }

  return (
    <Container>
      <Form initialData={enrollments} schema={schema} onSubmit={handleSubmit}>
        <Header text={id ? 'Edição de matrícula' : 'Cadastro de matrícula'}>
          <Link to="/enrollment">
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
          <SelectInput
            name="student_id"
            label="ALUNO"
            placeholder="Buscar aluno"
            options={students}
            onChange={setStudents}
            noOptionsMessage={() => 'Nenhum aluno foi encontrado...'}
            loadOptions={loadStudentOptions}
            isDisabled={!!id}
            cacheOptions
          />

          <SelectInput
            name="plan_id"
            label="PLANO"
            placeholder="Selecione o plano"
            options={plans}
            onChange={setPlan}
            noOptionsMessage={() => 'Nenhum plano foi encontrado...'}
            loadOptions={loadPlanOptions}
            cacheOptions
          />

          <DatePicker
            name="start_date"
            label="DATA DE INÍCIO"
            onChange={setDate}
            placeholderText="Escolha a data"
          />

          <DatePicker
            disabled
            calculated
            name="end_date"
            label="DATA DE TÉRMINO"
            value={endDate}
            placeholder="Escolha a data"
          />

          <NumberInput
            calculated
            name="price"
            label="VALOR FINAL"
            value={price}
            onChange={setPrice}
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
