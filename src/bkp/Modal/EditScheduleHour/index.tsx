import React from 'react';

import { Overlay, Centered, Content, Header, Body } from './styles';

type Props = {
  closeModal: () => void;
  setIsLockedScheduleHours: (value: boolean) => void;
  setHaveSchedulesHourChanged: (value: boolean) => void;
  registerInfo: any;
};

const ChangeDefaultHoursModal = ({ closeModal, registerInfo, setIsLockedScheduleHours, setHaveSchedulesHourChanged }: Props) => {
  const unlockSchedule = () => {
    setHaveSchedulesHourChanged(true)
    setIsLockedScheduleHours(false);
    closeModal();
  };

  return (
    <>
      <Overlay onClick={closeModal}></Overlay>
      <Centered>
        <Content>
          <Header>
            <h4>Alterar Horário</h4>
          </Header>
          <Body>
            <h3 style={{ width: '100%', textAlign: 'center', marginBottom: 40 }}>
              Deseja alterar o Horário Pré Definido?
            </h3>
            <div className='options' style={{ marginBottom: 10 }}>
              <button style={{ width: 140, marginLeft: 60 }} onClick={() => unlockSchedule()}>
                Sim
              </button>
              <button style={{ width: 140, marginRight: 60 }} onClick={() => closeModal()}>
                Não
              </button>
            </div>
          </Body>
        </Content>
      </Centered>
    </>
  );
};

export default ChangeDefaultHoursModal;