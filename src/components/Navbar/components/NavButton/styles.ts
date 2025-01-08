import styled from 'styled-components';

interface ItemProps {
  hasHightlight?: boolean;
}

export const Item = styled.li<ItemProps>`
  display: flex;
  justify-content: center;
  color: #ebf1fa;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 48px;
  min-width: 59px;
  background-color: ${props => (props.hasHightlight ? "#2a363c28" : "transparent" )};

  :hover {
    background-color: #2a363c28;
    cursor: pointer;
  }

  :hover {
    span {
      visibility: visible;
      background-color: #4f6a93;
      animation-play-state: running;
      animation-delay: 2s;
      animation: show 1.4s ease forwards;
    }
  }

  h3 {
    font-weight: 500;
    font-size: 14px;
    position: static;
    user-select: none;
    margin: 5px 0px;
  }

  span {
    visibility: hidden;
    font-size: 15px;
    width: 164px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 10000;
    top: 80%;
    left: 50%;
    margin-left: -82px;
    animation-play-state: paused;
    user-select: none;
    pointer-events: none;
    padding: 7px;

    @keyframes show {
      0% {
        visibility: show;
        opacity: 0;
      }
      45% {
        visibility: show;
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    :hover {
      visibility: visible;
      animation-play-state: running;
      opacity: 1;
    }

    ::after {
      content: '';
      position: absolute;
      bottom: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent transparent #4f6a93 transparent;
    }
  }
`;
