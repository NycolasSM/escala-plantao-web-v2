import { ReactNode, useState } from 'react';

import { Container } from './styles';

import { IoMdArrowDropdown } from 'react-icons/io';

type Props = {
  generateReport?: any;
  zIndex: number;
  handleGeneratePdfSchedule: any;
  sector: any;
};

export function SelectVisualizeReport({
  generateReport,
  zIndex,
  handleGeneratePdfSchedule,
  sector,
}: Props) {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  return (
    <Container
      style={{
        height: `${isOpen ? '90px' : '35px'}`,
        zIndex: `${100 - zIndex}`,
      }}
    >
      <button onClick={() => setIsOpen(!isOpen)}>
        <span>Visualizar Escala</span>
        <IoMdArrowDropdown
          size={18}
          style={{
            rotate: `${isOpen ? '180deg' : '0deg'}`,
            transitionDuration: '0.2s',
            transitionProperty: 'all',
            transitionTimingFunction: 'ease',
          }}
        />
      </button>
      <button onClick={() => handleGeneratePdfSchedule('Operacional', sector)}>
        Visualizar Oper
      </button>
      <button onClick={() => handleGeneratePdfSchedule('ETA', sector)}>
        Visualizar ETA
      </button>
    </Container>
  );
}
