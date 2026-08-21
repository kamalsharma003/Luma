import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import UserSidebar from "./UserSidebar";
import MessageContainer from "./MessageContainer";
import { axiosInstance } from "../../components/utility/axiosInctance.utility";

const socketUrl = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

const Home = () => {
  const currentUser = useSelector((state) => state.userReducer.user);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const selectedUserRef = useRef(null);

  useEffect(() => { selectedUserRef.current = selectedUser; }, [selectedUser]);
  useEffect(() => {
    axiosInstance.get("/user/get-other-users").then(({ data }) => setUsers(data.responseData || [])).catch((error) => toast.error(error.response?.data?.message || "Unable to load users"));
  }, []);

  const addMessageIfNew = useCallback((incoming) => setMessages((previous) => previous.some((item) => item._id === incoming._id) ? previous : [...previous, incoming]), []);

  useEffect(() => {
    const socket = io(socketUrl, { withCredentials: true });
    socket.on("connect", () => setIsSocketConnected(true));
    socket.on("disconnect", () => setIsSocketConnected(false));
    socket.on("connect_error", () => setIsSocketConnected(false));
    socket.on("new-message", (incoming) => {
      if (String(incoming.senderId) === String(selectedUserRef.current?._id)) addMessageIfNew(incoming);
    });
    return () => socket.disconnect();
  }, [addMessageIfNew]);

  const selectUser = async (user) => {
    setSelectedUser(user); setMessages([]); setLoadingMessages(true);
    try { const { data } = await axiosInstance.get(`/message/get-messages/${user._id}`); setMessages(data.responseData || []); }
    catch (error) { toast.error(error.response?.data?.message || "Unable to load messages"); }
    finally { setLoadingMessages(false); }
  };
  const sendMessage = async (text) => {
    try { const { data } = await axiosInstance.post(`/message/send/${selectedUser._id}`, { message: text }); addMessageIfNew(data.responseData); }
    catch (error) { toast.error(error.response?.data?.message || "Message could not be sent"); throw error; }
  };

  return <div className="flex min-h-screen bg-base-100"><UserSidebar currentUser={currentUser} users={users} selectedUser={selectedUser} onSelectUser={selectUser} socketConnected={isSocketConnected} /><MessageContainer currentUser={currentUser} selectedUser={selectedUser} messages={messages} loading={loadingMessages} onSend={sendMessage} /></div>;
};

export default Home;
