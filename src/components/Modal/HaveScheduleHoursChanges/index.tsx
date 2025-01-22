import axios from 'axios';
import React, { useContext, useState } from 'react';
import { UserContext } from '@/context/User';
import FormContext from '../../../context/formContext';
import { api } from '../../../services/api';

import { Overlay, Centered, Content, Header, Body } from './styles';

type Props = {
  closeModal: () => void;
  userInfo2: any;
  plantao: string;
  data_escala: { year: number; monthNumber: number };
};

const HaveScheduleHoursChanges = ({ closeModal, userInfo2, plantao, data_escala }: Props) => {
  const { userInfo } = useContext(UserContext);

  const { sendForm } = useContext(FormContext);

  const [observationForm, setObservationForm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getMonthName = (monthNumber: number) => {
    switch (monthNumber) {
      case 1:
        return 'Janeiro';
      case 2:
        return 'Fevereiro';
      case 3:
        return 'Março';
      case 4:
        return 'Abril';
      case 5:
        return 'Maio';
      case 6:
        return 'Junho';
      case 7:
        return 'Julho';
      case 8:
        return 'Agosto';
      case 9:
        return 'Setembro';
      case 10:
        return 'Outubro';
      case 11:
        return 'Novembro';
      case 12:
        return 'Dezembro';
    }
  };

  const sendEmailOfChanges = async () => {
    const currentdate = new Date();
    const date =
      currentdate.getDate().toString().padStart(2, '0') +
      '/' +
      (currentdate.getMonth() + 1).toString().padStart(2, '0') +
      '/' +
      currentdate.getFullYear();
    const time =
      currentdate.getHours().toString().padStart(2, '0') + ':' + currentdate.getMinutes().toString().padStart(2, '0');

    const scheduleDate = `${getMonthName(data_escala.monthNumber)}/${data_escala.year}`;

    api.post('/notifyChangesSchedule', {
      n_pes: userInfo.n_pes,
      plantao: plantao,
      data: date,
      hora: time,
      responsavel: userInfo.nome,
      mes_escala: scheduleDate,
      observation: observationForm,
    });

    setTimeout(() => {
      return;
    }, 1000);
  };

  const sendSchedule = async () => {
    setIsLoading(true);
    await sendEmailOfChanges();
    await sendForm();
    setIsLoading(false);
    closeModal();
  };

  const handleChangeObservation = (observation: string) => {
    setObservationForm(observation);
  };

  return (
    <>
      <Overlay onClick={closeModal}></Overlay>
      <Centered>
        <Content>
          <Header>
            <h4>Observação sobre as Alterações</h4>
          </Header>
          <Body>
            <div className='modal_text'>
              <h4 style={{ width: '100%', textAlign: 'left', marginBottom: 40 }}>{userInfo.nome},</h4>
              <h3 style={{ width: '100%', textAlign: 'center', marginBottom: 40 }}>
                Foram identificados horários diferentes do pré estabelecido, informe o motivo desta alteração
              </h3>
            </div>
            <textarea
              name='observations'
              id='observations'
              value={observationForm}
              cols={130}
              wrap='hard'
              onChange={(e) => handleChangeObservation(e.target.value)}
            />
            <div className='options' style={{ marginBottom: 10 }}>
              <button style={{ width: 140 }} onClick={() => sendSchedule()}>
                {isLoading ? 'Enviando...' : 'Enviar'}
              </button>
            </div>
          </Body>
        </Content>
      </Centered>
    </>
  );
};

export default HaveScheduleHoursChanges;
