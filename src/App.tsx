import styled from 'styled-components';
import { LanguageCircle, Export } from 'iconsax-react';
import { ChatHistory } from './components/ChatHistory.tsx';
import { useState } from 'react';
import { IaChatLoading } from './components/IaChatLoading.tsx';
import handleChatFlow from './services/ChatMessage.ts';

type MessageType = { ia: string } | { user: string };

function App() {
  const [userMessage, setUserMessage] = useState<string>('');
  const [iaResponse, setIaResponse] = useState<boolean>(false);
  const [messagesHistory, setMessagesHistory] = useState<MessageType[]>([
    { ia: 'Bem vindo ao ChatBot Language!' },
    { ia: 'Vamos aprender inglês?' },
  ]);

  const onClickUser = async () => {
    if (userMessage) {
      setMessagesHistory((prevMessages) => [
        ...prevMessages,
        { user: userMessage },
      ]);
      setUserMessage('');

      setIaResponse(true);

      const task = await handleChatFlow(userMessage);

      setMessagesHistory((prevMessages) => [...prevMessages, { ia: task }]);
      setIaResponse(false);
    }
  };

  return (
    <>
      <Page>
        <ChatBot>
          <Top>
            <UserIcon>
              <LanguageCircle size="30" color="#FFFFFF" />
            </UserIcon>
            <TextTop>ChatBot Language</TextTop>
          </Top>

          <Main>
            <ChatHistory messages={messagesHistory} />
            {iaResponse ? <IaChatLoading /> : null}
          </Main>

          <Bot>
            <InputContainer>
              <Input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
              />
              <Button onClick={() => onClickUser()}>
                <Export size="26" color="#FFFFFF" />
              </Button>
            </InputContainer>
          </Bot>
        </ChatBot>
      </Page>
    </>
  );
}

const Page = styled.div`
    width: 100%;
    height: 100vh;
    background: linear-gradient(#322b5f, #6b8ed0);
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  ChatBot = styled.div`
    width: 380px;
    height: 85vh;
    background-color: #ffffff;
    border-radius: 30px;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
    display: grid;
    grid-template-rows: 60px 1fr 75px;
  `,
  Top = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    padding-left: 10px;
  `,
  UserIcon = styled.div`
    width: 40px;
    height: 40px;
    background: linear-gradient(to right, #322b5f, #6b8ed0);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  TextTop = styled.div`
    font-size: 12pt;
    font-weight: 500;
    color: #322b5f;
  `,
  Main = styled.div`
    width: calc(100% - 20px);
    height: 100%;
    padding: 0 10px;
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
  `,
  Bot = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  InputContainer = styled.div`
    width: calc(95% - 27px);
    height: 50px;
    background: linear-gradient(to right, #322b5f, #6b8ed0);
    border-radius: 50px;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 7px 0 20px;
  `,
  Input = styled.input`
    width: 80%;
    height: 80%;
    outline: none;
    background-color: transparent;
    border: none;
    color: white;
  `,
  Button = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background: #322b5f;
    transition: 0.5s;

    &:hover {
      background: #1c183d;
    }
  `;
export default App;
