import Message1 from './Message1'
import { IoIosSend } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { avatarFor } from "../../components/utility/avatar.utility";

const MessageContainer = ({ currentUser, selectedUser, messages, loading, onSend }) => {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, selectedUser]);
  const submit = async (event) => {
    event.preventDefault();
    const content = text.trim();
    if (!content || !selectedUser || sending) return;
    setSending(true);
    try { await onSend(content); setText(""); } finally { setSending(false); }
  };
  if (!selectedUser) return <main className="flex flex-1 items-center justify-center p-6 text-center opacity-60">Select a user to start a conversation.</main>;
  return <main className="flex h-screen flex-1 flex-col"><header className="flex items-center gap-3 border-b border-base-300 p-3"><img className="w-11 rounded-full" src={avatarFor(selectedUser)} alt={`${selectedUser.fullName}'s avatar`} /><div><h2 className="font-semibold">{selectedUser.fullName}</h2><p className="text-xs opacity-60">@{selectedUser.username}</p></div></header><div className="flex-1 overflow-y-auto p-3">{loading ? <span className="loading loading-spinner" /> : messages.map((message) => <Message1 key={message._id} message={message} currentUser={currentUser} otherUser={selectedUser} />)}{!loading && !messages.length && <p className="mt-8 text-center text-sm opacity-60">No messages yet. Say hello!</p>}<div ref={bottomRef} /></div><form onSubmit={submit} className="flex w-full gap-2 border-t border-base-300 p-3"><input value={text} onChange={(event) => setText(event.target.value)} type="text" placeholder="Type a message" className="input input-bordered w-full" disabled={sending} /><button disabled={!text.trim() || sending} className="btn btn-primary btn-square" aria-label="Send message"><IoIosSend /></button></form></main>;

  /* Legacy placeholder container retained below for reference.
  return (
    <div className='h-screen w-full flex flex-col'>
      <div className='p-3 border-b border-b-white/10'>
      <User/>
      </div>
      <div className='h-full overflow-auto p-3'>

         <Message1/>
            <Message1/>
               <Message1/>
                  <Message1/>
                     <Message1/>
                        <Message1/>
                           <Message1/>
                              <Message1/>
                                 <Message1/>
                                    <Message1/>
                                       <Message1/>
                                          <Message1/>
                                             <Message1/>

                                                <Message1/>
                                                   <Message1/>


                                                      <Message1/>



      </div>
      <div className='w-full p-3 flex gap-2'>
        <input type="text"
        placeholder='Type here'
        className='input input-border input-primary w-full ' />
        <button className='btn btn-square btn-outline btn-primary'><IoIosSend /></button>

      </div>
     
      
    </div>
  ) */
}

export default MessageContainer
