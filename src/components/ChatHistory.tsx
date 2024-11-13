import { IaChatComponent } from './IaChatComponent';
import UserChatComponent from './UserChatComponent';

type MessageType = { ia: string; user?: never } | { user: string; ia?: never };

interface ChatHistoryProps {
  messages: MessageType[] | null;
}

export function ChatHistory({ messages }: ChatHistoryProps) {
  return (
    <div className="chat-history">
      {messages?.map((message, index) => {
        if (message.ia) {
          return <IaChatComponent key={index}>{message.ia}</IaChatComponent>;
        } else if (message.user) {
          return (
            <UserChatComponent key={index}>{message.user}</UserChatComponent>
          );
        }
        return null;
      })}
    </div>
  );
}
