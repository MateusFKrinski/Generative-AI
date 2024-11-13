import styled from 'styled-components';
import { ReactNode } from 'react';

type UserChatComponentProps = {
  children: ReactNode;
};

export default function UserChatComponent({
  children,
}: UserChatComponentProps) {
  return (
    <UserChatContainer>
      <UserMessageContainer>
        <Message>{children}</Message>
      </UserMessageContainer>
    </UserChatContainer>
  );
}

const UserChatContainer = styled.div`
    display: flex;
    justify-content: end;
    margin-top: 10px;
  `,
  UserMessageContainer = styled.div`
    width: 260px;
    height: fit-content;
    padding: 10px 10px;
    background-color: rgb(107, 142, 208);
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
