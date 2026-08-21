import { avatarFor } from "../../components/utility/avatar.utility";

const Message1 = ({ message, currentUser, otherUser }) => {
  const isMine = String(message.senderId) === String(currentUser._id);
  const author = isMine ? currentUser : otherUser;
  const time = new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className={`chat ${isMine ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full"><img alt={`${author.fullName}'s avatar`} src={avatarFor(author)} /></div>
      </div>
      <div className="chat-header">{isMine ? "You" : author.fullName}<time className="ml-2 text-xs opacity-50">{time}</time></div>
      <div className={`chat-bubble whitespace-pre-wrap break-words ${isMine ? "chat-bubble-primary" : "chat-bubble-neutral"}`}>{message.message}</div>
    </div>
  );
};

export default Message1;
