import Image from 'next/image';
import plusIcon from '../../assets/plus.png';
import closeIcon from '../../assets/close.png';

import React, { useContext, useEffect, useState } from 'react';
import Header from './components/Header';
import Register from './components/Register';
import { useAvailableSchedulesContext } from '../../context/availableSchedulesContext';

import { FaTrashAlt, FaTrashRestoreAlt } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';

import { TailSpin } from 'react-loader-spinner';

import {
  Container,
  DEVLOGS,
  EmptyFieldError,
  AddRegisters,
  Registers,
  ButtonsContainer,
  PenIconContainer,
  EmptyRegistersMessage,
  ObservationSection,
  LoadingContainer,
} from './styles';

import FormContext from '../../context/formContext';
import { BiError } from 'react-icons/bi';
import { api } from '../../services/api';
import { Buttons } from '../../../styles/pages/dashboard';
import { Slide, ToastContainer } from 'react-toastify';
import { useAuthContext } from '../../context/AuthContext';
import { useRouter } from 'next/router';

import HaveScheduleHoursChanges from '../Modal/HaveScheduleHoursChanges';

type RegistersLoaded = {
  data: string;
  escala_participante: string;
  funcionario: string;
  horario: string;
  id: string;
  n_pes_funcionario: string;
  n_pes_responsavel: string;
  responsavel: string;
  total_horas: string;
  endereco: string;
  telefone_1: string;
  telefone_2: string;
};

const ScheduleTable = () => {
  const {
    localChosen,
    plantaoChosen,
    setLocalChosen,
    setPlantaoChosen,
    year,
    monthNumber,
    observationForm,
    setObervationForm,
  } = useAvailableSchedulesContext();

  const {
    haveEmptyField,
    registers,
    isEmpty,
    setIsEmpty,
    sendForm,
    isSendingForm,
    setRegisters,
    formularioDelete,
    setFormularioDelete,
    setLoadedForms,
    isLoadingRegisters,
    setIsLoadingRegisters,
    haveSchedulesHourChanged,
    setHaveSchedulesHourChanged,
    verifyEmptyFields,
    setIsSendingForm,
    setHaveEmptyField,
  } = useContext(FormContext);

  const { isLogged } = useAuthContext();

  const [registersLoaded, setRegistersLoaded] = useState<RegistersLoaded[]>([]);

  const [observation, setObservation] = useState<string>('');

  let [registersIndex, setRegistersIndex] = useState<number>(0);

  const router = useRouter();

  const addRegister = () => {
    registers.set(registersIndex.toString(), {
      day: 1,
      id: '',
      employees: [],
      scheduleHour: [],
      action: 'create',
    });

    setRegistersIndex(registersIndex + 1);

    setRegisters(registers);
  };

  const removeRegisterSaved = (key: string, id: string) => {
    formularioDelete.set(key, id);

    setFormularioDelete(new Map(formularioDelete));
  };

  const removeRegisterOfRemoveList = (key: string, id: string) => {
    formularioDelete.delete(key);

    setFormularioDelete(new Map(formularioDelete));
  };

  const removeRegister = (key: string) => {
    registers.delete(key);

    setRegistersIndex(registersIndex - 1);

    setRegisters(new Map(registers));
  };

  let plantao = router.query.Plantao;
  let local = router.query.Local;
  let mes = router.query.Mes;

  const getRegistersCreated = async () => {
    setIsLoadingRegisters(true);
    if (router.query.Plantao != undefined && router.query.Local != undefined) {
      plantao = router.query.Plantao;
      local = router.query.Local;
      mes = router.query.Mes;
    } else {
      plantao = plantaoChosen;
      local = localChosen;
      mes = monthNumber.toString();
    }

    function getScheduleType() {
      if (plantao === 'Transporte' || plantao === 'Controle De Perdas') {
        return plantao;
      } else {
        return `${plantao} - ${local}`;
      }
    }

    let setor = getScheduleType();

    if ((plantao === '' && local != '') || (plantao != '' && local === '' && plantao != 'Transporte' && plantao != 'Controle De Perdas')) {
      router.query.Plantao = undefined;
      router.query.Local = undefined;
      router.query.Mes = undefined;
      setIsLoadingRegisters(false);
      return;
    } else {
      if (setor === ' - ') {
        router.query.Plantao = undefined;
        router.query.Local = undefined;
        router.query.Mes = undefined;
        setIsLoadingRegisters(false);
        return;
      } else {
        api.get(`/schedulesRegistered/?year=${year}&month=${mes ?? monthNumber}&setor=${setor}`).then((resp) => {
          setLoadedForms(resp.data);
          setRegistersLoaded(resp.data);
          setIsLoadingRegisters(false);
          router.query.Plantao = undefined;
          router.query.Local = undefined;
          router.query.Mes = undefined;
        });
      }
    }
  };

  useEffect(() => {
    if (registersLoaded.length > 0) {
      for (let i = 0; i < registersLoaded.length; i++) {
        registers.set(i.toString(), {
          day: new Date(registersLoaded[i].data).getUTCDate(),
          id: registersLoaded[i].id,
          employees: [
            {
              label: registersLoaded[i].funcionario,
              value: {
                n_pes: registersLoaded[i].n_pes_funcionario,
                nome: registersLoaded[i].funcionario,
                endereco: registersLoaded[i].endereco,
                telefone_1: registersLoaded[i].telefone_1,
                telefone_2: registersLoaded[i].telefone_2,
              },
            },
          ],
          scheduleHour: registersLoaded[i].horario
            .trim()
            .replace(/ /g, '')
            .split(/[\-\/]/), // os horarios vem em formato de string, então é preciso remover os espaçoes e transformar em um array de horarios
          action: 'edit',
        });

        setRegistersIndex(i + 1);
        setRegisters(new Map(registers));
      }
    }
  }, [registersLoaded]);

  if (registers.size === 0) {
    setIsEmpty(true);
  } else {
    setIsEmpty(false);
  }

  const handleChangeObservation = (observation: string) => {
    setObervationForm(observation);
  };

  // function handleKeyDownObservation(e: any) {
  //   e.target.style.height = "inherit";
  //   e.target.style.height = `${e.target.scrollHeight}px`;
  // }

  useEffect(() => {
    setRegisters(new Map());
    setRegistersLoaded([]);
    setRegistersIndex(0);
    getRegistersCreated();
    setScheduleHoursChanges({
      userInfo: {},
    });
    setHaveSchedulesHourChanged(false);
  }, [plantaoChosen, localChosen, monthNumber, year]);

  useEffect(() => {
    setObservation(observationForm);
  }, [observationForm]);

  useEffect(() => {
    setIsEmpty(false);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setRegisters(new Map());
    }, 80);
    setRegistersLoaded([]);
  }, []);

  const sendFormWithChanges = () => {
    if (verifyEmptyFields() === true) {
      setIsSendingForm(false);
      setHaveEmptyField(true);
      return;
    } else {
      setScheduleHoursChanges({
        userInfo: {
          n_pes: '123',
        },
      });
    }
  };

  const [scheduleHoursChanges, setScheduleHoursChanges] = useState<any>({
    userInfo: {},
  });

  if (isLoadingRegisters) {
    return (
      <Container>
        <ToastContainer autoClose={2500} transition={Slide} />
        <Header />
        <LoadingContainer>
          <TailSpin height='100' width='100' color='#2faee0a2' ariaLabel='loading' />;
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <>
      {Object.keys(scheduleHoursChanges.userInfo).length != 0 ? (
        <HaveScheduleHoursChanges
          userInfo2={scheduleHoursChanges.userInfo}
          plantao={`${plantaoChosen} - ${localChosen}`}
          closeModal={() =>
            setScheduleHoursChanges({
              userInfo: {},
            })
          }
          data_escala={{ year, monthNumber }}
        />
      ) : null}
      {haveEmptyField ? (
        <EmptyFieldError>
          <BiError size={24} />
          <span>Existem campos vazios a serem preenchidos</span>
        </EmptyFieldError>
      ) : null}
      <Container>
        <ToastContainer autoClose={2500} transition={Slide} />
        <Header />
        <Registers>
          {/* verificação se os setores foram escolhidos corretamente e se possuem algum registro */}
          {plantaoChosen === 'Transporte' || plantaoChosen === 'Controle De Perdas' || (plantaoChosen != '' && localChosen != '' && isEmpty) ? (
            registers.size === 0 ? (
              <>
                {setHaveSchedulesHourChanged(false)}
                <EmptyRegistersMessage>
                  <div>
                    <AiOutlineInfoCircle size={36} color={'white'} />
                  </div>
                  <h3>Não Há escalas registradas</h3>
                </EmptyRegistersMessage>
              </>
            ) : null
          ) : null}

          {Array.from(registers).map((data, index) => (
            <div key={index} className='register__line'>
              {data[1].action === 'edit' ? (
                <>
                  <Register
                    day={data[1].day}
                    index={index}
                    action={data[1].action}
                    defaultValues={{
                      idLoaded: '',
                      dayLoaded: data[1].day,
                      employeesLoaded: [],
                      scheduleHourLoaded: data[1].scheduleHour,
                    }}
                  />
                  <ButtonsContainer>
                    <>
                      {formularioDelete.get(index.toString()) ? (
                        <button
                          className='register__button--restore'
                          onClick={() => removeRegisterOfRemoveList(index.toString(), data[1].id)}
                        >
                          <FaTrashRestoreAlt size={20} color={'white'} />
                        </button>
                      ) : (
                        <button
                          className='register__button--delete'
                          onClick={() => removeRegisterSaved(index.toString(), data[1].id)}
                        >
                          <FaTrashAlt size={20} color={'white'} />
                        </button>
                      )}
                    </>
                  </ButtonsContainer>
                </>
              ) : (
                <>
                  <Register day={data[1].day} index={index} action={data[1].action} />
                  {registers.size === index + 1 ? (
                    <ButtonsContainer>
                      <button className='register__button--cancel' onClick={() => removeRegister(index.toString())}>
                        <CloseIcon />
                      </button>
                    </ButtonsContainer>
                  ) : (
                    <ButtonsContainer>
                      <button className='button--hide'></button>
                    </ButtonsContainer>
                  )}
                </>
              )}
            </div>
          ))}
        </Registers>
        {plantaoChosen === 'Transporte' || plantaoChosen === 'Controle De Perdas' || (plantaoChosen != '' && localChosen != '') ? (
          <AddRegisters
            onClick={() => {
              addRegister();
            }}
          />
        ) : null}
        {registers.size >= 1 ? (
          <ObservationSection>
            <label htmlFor='observations'>Observações:</label>
            <textarea
              name='observations'
              id='observations'
              value={observationForm}
              cols={130}
              wrap='hard'
              onChange={(e) => handleChangeObservation(e.target.value)}
            ></textarea>
          </ObservationSection>
        ) : null}
        <Buttons>
          {isSendingForm ? (
            <button style={{ margin: '0 auto' }}>Carregando..</button>
          ) : registers.size != 0 || formularioDelete.size != 0 ? (
            haveSchedulesHourChanged ? (
              <button style={{ margin: '0 auto' }} onClick={() => sendFormWithChanges()}>
                Salvar
              </button>
            ) : (
              <button style={{ margin: '0 auto' }} onClick={() => sendForm()}>
                Salvar
              </button>
            )
          ) : (
            <button style={{ margin: '0 auto' }} className='disable' disabled>
              Salvar
            </button>
          )}
        </Buttons>

        {/* <DEVLOGS>
          <button onClick={() => console.log(responsavel)}>
            CONSOLE LOG Responsavel
          </button>
          <button onClick={() => console.log(registers)}>registers list</button>
          <button onClick={() => consoleLogForm()}>
            CONSOLE LOG Formulário
          </button>
          <button onClick={() => console.log(formularioDelete)}>
            CONSOLE LOG Formulário Delete
          </button>
          <button onClick={() => gerarEscalas()}>gerar escalas</button>
        </DEVLOGS> */}
      </Container>
    </>
  );
};

export default ScheduleTable;

export const PenIcon = () => (
  <PenIconContainer width='29' height='29' viewBox='0 0 29 29' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <svg>
      <path
        d='M27.8303 0.995058L27.7956 0.962646C27.1312 0.341898 26.27 0 25.3705 0C24.3622 0 23.394 0.436597 22.7143 1.19774L9.86069 15.5911C9.74354 15.7223 9.65467 15.8771 9.59974 16.0456L8.08834 20.68C7.9136 21.2158 8.0013 21.8083 8.32291 22.265C8.64708 22.7252 9.16933 23 9.72004 23H9.72012C9.95832 23 10.1912 22.9499 10.412 22.8511L14.788 20.8929C14.9471 20.8218 15.0899 20.7172 15.2069 20.5861L28.0606 6.19275C29.3981 4.69509 29.295 2.36358 27.8303 0.995058ZM10.9841 19.8239L11.871 17.1045L11.9458 17.0207L13.6267 18.591L13.5519 18.6748L10.9841 19.8239ZM26.2279 4.48047L15.3008 16.7166L13.6198 15.1462L24.547 2.91003C24.7607 2.6707 25.0532 2.53885 25.3706 2.53885C25.649 2.53885 25.9157 2.6448 26.122 2.83758L26.1567 2.87C26.6104 3.2939 26.6424 4.01637 26.2279 4.48047Z'
        fill='black'
      />
      <path
        d='M25.7269 11.0498C25.0237 11.0498 24.4537 11.6225 24.4537 12.3289V23.1887C24.4537 24.9824 23.0011 26.4418 21.2157 26.4418H5.78439C3.99892 26.4418 2.54643 24.9824 2.54643 23.1887V7.81138C2.54643 6.01766 3.999 4.55831 5.78439 4.55831H16.9536C17.6568 4.55831 18.2269 3.98559 18.2269 3.27916C18.2269 2.57272 17.6568 2 16.9536 2H5.78439C2.59481 2 0 4.60701 0 7.81138V23.1886C0 26.393 2.5949 29 5.78439 29H21.2156C24.4051 29 27 26.393 27 23.1886V12.3289C27.0001 11.6225 26.43 11.0498 25.7269 11.0498Z'
        fill='black'
      />
    </svg>
  </PenIconContainer>
);

export const PlusIcon = () => <Image height={22} width={22} src={plusIcon} alt='Icone de adicionar' />;

export const CloseIcon = () => <Image height={22} width={22} src={closeIcon} alt='Icone de excluir' />;
