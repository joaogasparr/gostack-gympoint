import React, { useState, useEffect, useMemo } from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import socketio from 'socket.io-client';

import api from '~/services/api';

import Button from '~/components/Button';
import Content from '~/components/Content';
import { Footer, FooterButton } from '~/components/Table';
import Header from '~/components/Title';

import schema from '~/validators/Answer';

import {
  Container,
  HelpOrderTable,
  AnswerModal,
  FormAnswer,
  TextAnswer,
} from './styles';

export default function HelpOrder() {
  const [helporders, setHelpOrders] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [modal, setModal] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const user = useSelector(state => state.user.profile);

  const socket = useMemo(
    () =>
      socketio('http://localhost:3333', {
        query: {
          user_id: user.id,
        },
      }),
    [user.id]
  );

  useEffect(() => {
    socket.on('helporder', helporder => {
      setHelpOrders([helporder, ...helporders]);
    });
  }, [socket, helporders]);

  useEffect(() => {
    async function loadHelpOrders() {
      const { data } = await api.get('/help-orders/questions', {
        params: {
          page,
        },
      });

      setHelpOrders(data.answers);
      setLastPage(data.count || 1);
    }

    loadHelpOrders();
  }, [page]);

  function handleAnswerClick(data) {
    setAnswer(data);
    setModal(!modal);
  }

  function handlePage(action) {
    const data = action === 'back' ? page - 1 : page + 1;
    setPage(data);
  }

  async function handleSubmit(data) {
    try {
      await api.post(`help-orders/${answer.id}/answer`, data);

      const response = helporders.filter(
        helporder => helporder.id !== answer.id
      );

      setHelpOrders(response);
      setModal(!modal);

      toast.success('A Resposta foi gravado com sucesso!');
    } catch (err) {
      toast.error(err.response.data.error);
      console.tron.log(6);
    }
  }

  return (
    <Container>
      <AnswerModal isOpen={modal} onRequestClose={() => setModal(!modal)}>
        <strong>PERGUNTA DO ALUNO</strong>
        <small>{answer && answer.question}</small>
        <FormAnswer schema={schema} onSubmit={handleSubmit}>
          <TextAnswer
            name="answer"
            type="text"
            label="SUA RESPOSTA"
            placeholder="exemplo@email.com"
          />

          <Button type="submit" text="Responder aluno" color="#EE4D64" />
        </FormAnswer>
      </AnswerModal>

      <Header text="Pedidos de auxílio" />
      <Content>
        <HelpOrderTable>
          <thead>
            <tr>
              <th>ALUNO</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {helporders.map(helporder => (
              <tr key={helporder.id}>
                <td>{helporder.student.name}</td>
                <td>
                  <div>
                    <button
                      type="button"
                      onClick={() => handleAnswerClick(helporder)}
                    >
                      responder
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </HelpOrderTable>
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
