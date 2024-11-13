import { OceanProtocol } from 'iconsax-react';
import { IaChatContainer, IaIconDisplay } from './IaChatComponent.tsx';
import styled, { keyframes } from 'styled-components';

export function IaChatLoading() {
  return (
    <IaChatContainer>
      <IaIconDisplay>
        <OceanProtocol size="20" color="#FFFFFF" />
      </IaIconDisplay>
      <Loading></Loading>
    </IaChatContainer>
  );
}

const loadingAnimation = keyframes`
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: 100% 0;
    }
`;

const Loading = styled.div`
  width: 260px;
  height: 30px;
  border-radius: 50px;
  background: linear-gradient(90deg, #322b5f, #6b8ed0, #322b5f);
  background-size: 200% 100%;
  animation: ${loadingAnimation} 1.5s infinite linear;
`;
