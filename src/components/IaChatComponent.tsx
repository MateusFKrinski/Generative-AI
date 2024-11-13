import { OceanProtocol } from 'iconsax-react';
import styled from 'styled-components';
import { ReactNode } from 'react';

type IaChatComponentProps = {
  children: ReactNode;
};

export function IaChatComponent({ children }: IaChatComponentProps) {
  return (
    <IaChatContainer>
      <IaIconDisplay>
        <OceanProtocol size="20" color="#FFFFFF" />
      </IaIconDisplay>
      <IaMessageContainer>
        <Message>{children}</Message>
      </IaMessageContainer>
    </IaChatContainer>
  );
}

export const IaChatContainer = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 5px;
    margin-top: 10px;
  `,
  IaIconDisplay = styled.div`
    width: 30px;
    height: 30px;
    background-color: #322b5f;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  IaMessageContainer = styled.div`
    width: 260px;
    height: fit-content;
    padding: 10px 10px;
    background-color: rgb(50, 43, 95);
    border-radius: 15px;
  `,
  Message = styled.p`
    color: #ffffff;
    font-size: 10pt;
    font-weight: 300;
    text-align: justify;
    word-spacing: 0.01em;
    hyphens: auto;
    line-height: 1.5;
  `;
