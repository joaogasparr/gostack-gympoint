import React, { useState, useEffect } from 'react';
import { MdAdd, MdArrowBack, MdArrowForward } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Shimmer from 'react-shimmer-effect';
import { toast } from 'react-toastify';

import { formatDistanceStrict, addMonths } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import { formatPrice } from '~/util/format';

import Button from '~/components/Button';
import Content from '~/components/Content';
import { Footer, FooterButton } from '~/components/Table';
import Header from '~/components/Title';

import { Container, PlanTable, ShimmerLine } from './styles';

export default function List() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    async function loadPlans() {
      try {
        setLoading(true);

        const response = await api.get('/plans', {
          params: {
            page,
          },
        });

        const data = response.data.plans.map(plan => ({
          ...plan,
          priceFormatted: formatPrice(plan.price),
          durationFormatted: formatDistanceStrict(
            addMonths(new Date(), plan.duration),
            new Date(),
            { locale: pt }
          ),
        }));

        setPlans(data);
        setLastPage(response.data.count || 1);
      } catch (err) {
        toast.error(err.response.data.error);
      }

      setLoading(false);
    }

    loadPlans();
  }, [page]);

  function handlePage(action) {
    const data = action === 'back' ? page - 1 : page + 1;
    setPage(data);
  }

  async function handleConfirmDeletePlan(id) {
    if (window.confirm('Deseja realmente excluir ?')) {
      try {
        await api.delete(`/plans/${id}`);

        const response = plans.filter(plan => plan.id !== id);

        setPlans(response);

        toast.success('O Plano foi excluído com sucesso!');
      } catch (err) {
        toast.error(err.response.data.error);
      }
    }
  }

  return (
    <Container>
      <Header text="Gerenciando planos">
        <Link to="/plan/create">
          <Button
            type="submit"
            text="CADASTRAR"
            color="#EE4D64"
            icon={<MdAdd size={20} color="#FFF" />}
          />
        </Link>
      </Header>
      <Content>
        <PlanTable>
          <thead>
            <tr>
              <th>TÍTULO</th>
              <th>DURAÇÃO</th>
              <th>VALOR p/ MÊS</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td>
                  <Shimmer>
                    <ShimmerLine />
                  </Shimmer>
                </td>
                <td>
                  <Shimmer>
                    <ShimmerLine />
                  </Shimmer>
                </td>
                <td>
                  <Shimmer>
                    <ShimmerLine />
                  </Shimmer>
                </td>
              </tr>
            ) : (
              plans.map(plan => (
                <tr key={plan.id}>
                  <td>{plan.title}</td>
                  <td>{plan.durationFormatted}</td>
                  <td>{plan.priceFormatted}</td>
                  <td>
                    <div>
                      <Link to={`/plan/${plan.id}`}>
                        <button type="button">editar</button>
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleConfirmDeletePlan(plan.id)}
                      >
                        apagar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </PlanTable>
      </Content>
      <Footer>
        <FooterButton
          name="next"
          color="#FFF"
          icon={<MdArrowBack size={20} color="#7159c1" />}
          limitPage={page === 1}
          onClick={() => handlePage('back')}
        />
        <span>Página {page}</span>
        <FooterButton
          name="next"
          color="#FFF"
          icon={<MdArrowForward size={20} color="#7159c1" />}
          limitPage={page === lastPage}
          onClick={() => handlePage('next')}
        />
      </Footer>
    </Container>
  );
}
