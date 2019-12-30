import React, { useState, useEffect } from 'react';
import { MdAdd, MdArrowBack, MdArrowForward } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Shimmer from 'react-shimmer-effect';
import { toast } from 'react-toastify';

import api from '~/services/api';

import Button from '~/components/Button';
import Content from '~/components/Content';
import { Footer, FooterButton } from '~/components/Table';
import Header from '~/components/Title';

import { Container, StudentTable, ShimmerLine } from './styles';

export default function List() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState();

  useEffect(() => {
    async function loadStudents() {
      try {
        setLoading(true);

        const { data } = await api.get('students', {
          params: {
            page,
            name: search,
          },
        });

        setStudents(data.students);
        setLastPage(data.count);
      } catch (err) {
        toast.error(err.response.data.error);
      }

      setLoading(false);
    }

    loadStudents();
  }, [search, page]);

  function handlePage(action) {
    const data = action === 'back' ? page - 1 : page + 1;
    setPage(data);
  }

  function handleSearchStudent(e) {
    setPage(1);
    setSearch(e.target.value);
  }

  async function handleConfirmDeleteStudent(id) {
    if (window.confirm('Deseja realmente excluir ?')) {
      try {
        await api.delete(`/students/${id}`);

        const response = students.filter(student => student.id !== id);

        setStudents(response);

        toast.success('O Aluno foi excluído com sucesso!');
      } catch (err) {
        toast.error(err.response.data.error);
      }
    }
  }

  return (
    <Container>
      <Header text="Gerenciando alunos" search onChange={handleSearchStudent}>
        <Link to="/student/create">
          <Button
            type="submit"
            text="CADASTRAR"
            color="#EE4D64"
            icon={<MdAdd size={20} color="#FFF" />}
          />
        </Link>
      </Header>
      <Content>
        <StudentTable>
          <thead>
            <tr>
              <th>NOME</th>
              <th>E-MAIL</th>
              <th>IDADE</th>
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
              students.map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td>
                    <div>
                      <Link to={`/student/${student.id}`}>
                        <button type="button">editar</button>
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleConfirmDeleteStudent(student.id)}
                      >
                        apagar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </StudentTable>
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
