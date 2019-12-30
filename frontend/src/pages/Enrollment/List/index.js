import React, { useState, useEffect } from 'react';
import { MdAdd, MdArrowBack, MdArrowForward } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Shimmer from 'react-shimmer-effect';
import { toast } from 'react-toastify';

import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import checkGreen from '~/assets/check-green.svg';
import checkGrey from '~/assets/check-grey.svg';
import Button from '~/components/Button';
import Content from '~/components/Content';
import { Footer, FooterButton } from '~/components/Table';
import Header from '~/components/Title';
import api from '~/services/api';

import { Container, EnrollmentTable, ShimmerLine } from './styles';

export default function List() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    async function loadEnrollments() {
      try {
        setLoading(true);

        const response = await api.get('/enrollments', {
          params: {
            page,
          },
        });

        const data = response.data.enrollments.map(enrollment => ({
          ...enrollment,
          startDateFormatted: format(
            parseISO(enrollment.start_date),
            "d 'de' MMMM 'de' yyyy",
            { locale: pt }
          ),
          endDateFormatted: format(
            parseISO(enrollment.end_date),
            "d 'de' MMMM 'de' yyyy",
            {
              locale: pt,
            }
          ),
        }));

        setEnrollments(data);
        setLastPage(response.data.count || 1);
      } catch (err) {
        toast.error(err.response.data.error);
      }

      setLoading(false);
    }

    loadEnrollments();
  }, [page]);

  function handlePage(action) {
    const data = action === 'back' ? page - 1 : page + 1;
    setPage(data);
  }

  async function handleConfirmDeleteEnrollment(id) {
    if (window.confirm('Deseja realmente excluir ?')) {
      try {
        await api.delete(`/enrollments/${id}`);

        const response = enrollments.filter(enrollment => enrollment.id !== id);
        setEnrollments(response);

        toast.success('A Matrícula foi excluído com sucesso!');
      } catch (err) {
        toast.error(err.response.data.error);
      }
    }
  }

  return (
    <Container>
      <Header text="Gerenciando matrículas">
        <Link to="/enrollment/create">
          <Button
            type="submit"
            text="CADASTRAR"
            color="#EE4D64"
            icon={<MdAdd size={20} color="#FFF" />}
          />
        </Link>
      </Header>
      <Content>
        <EnrollmentTable>
          <thead>
            <tr>
              <th>ALUNO</th>
              <th>PLANO</th>
              <th>INÍCIO</th>
              <th>TÉRMINO</th>
              <th>ATIVA</th>
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
              enrollments.map(enrollment => (
                <tr key={enrollment.id}>
                  <td>{enrollment.student.name}</td>
                  <td>{enrollment.plan.title}</td>
                  <td>{enrollment.startDateFormatted}</td>
                  <td>{enrollment.endDateFormatted}</td>
                  <td>
                    <img
                      src={enrollment.active ? checkGreen : checkGrey}
                      alt={enrollment.active}
                    />
                  </td>
                  <td>
                    <div>
                      <Link to={`/enrollment/${enrollment.id}`}>
                        <button type="button">editar</button>
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          handleConfirmDeleteEnrollment(enrollment.id)
                        }
                      >
                        apagar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </EnrollmentTable>
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
