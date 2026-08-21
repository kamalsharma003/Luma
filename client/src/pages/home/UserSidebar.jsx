import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import User from './User'
import { logoutUserThunk } from '../../store/slice/user.thunk'
import { useMemo, useState } from "react";
import { avatarFor } from "../../components/utility/avatar.utility";

const UserSidebar = ({ currentUser, users, selectedUser, onSelectUser, socketConnected }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [search, setSearch] = useState("");
  const filteredUsers = useMemo(() => users.filter((user) => `${user.fullName} ${user.username}`.toLowerCase().includes(search.toLowerCase())), [users, search]);

  const handleLogout = async () => {
    await dispatch(logoutUserThunk())
    navigate('/login', { replace: true })
  }

  return <aside className="flex h-screen w-full max-w-80 flex-col border-r border-base-300"><h1 className="m-3 rounded-lg bg-neutral px-3 py-2 text-xl font-semibold text-primary">LUMA</h1><div className="px-3 pb-3"><input value={search} onChange={(event) => setSearch(event.target.value)} type="search" className="input input-bordered w-full" placeholder="Search users" /></div><div className="flex-1 overflow-y-auto px-2">{filteredUsers.map((user) => <User key={user._id} user={user} selected={user._id === selectedUser?._id} onClick={() => onSelectUser(user)} online={socketConnected} />)}{!filteredUsers.length && <p className="p-3 text-sm opacity-60">No other users found.</p>}</div>{currentUser && <div className="flex items-center gap-3 border-t border-base-300 p-3"><img className="w-10 rounded-full" src={avatarFor(currentUser)} alt="Your avatar" /><span className="min-w-0 flex-1 truncate text-sm">{currentUser.fullName}</span><button onClick={handleLogout} className="btn btn-sm btn-primary">Logout</button></div>}</aside>;

  /* Legacy placeholder sidebar retained below for reference.
  return (
    <div className='max-w-[20rem] w-full h-screen  flex flex-col'>
        <div><h1 className='bg-black mx-3 rounded-lg px-2 py-1 text-[#7480ff] text-xl font-semibold'>LUMA</h1></div>
        <div><label class="input">
  <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke-width="2.5"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g>
  </svg>
  <input type="search" class="grow" placeholder="Search" />
  <kbd class="kbd kbd-sm">⌘</kbd>
  <kbd class="kbd kbd-sm">K</kbd>
</label></div>
        <div className='h-full overflow-y-scroll'>
          <User/>
          <User/>
          <User/>
          <User/>
         <User/>
         <User/>
        <User/>
        <User/>
        <User/>
        <User/>

        </div>
        <div className='h-[3rem] bg-black'><div className="flex items-center justify-center gap-3 p-3">
  <img className="w-10 rounded-full" src="https://img.daisyui.com/images/profile/demo/wonderperson@192.webp" />
  <button onClick={handleLogout} className="btn bg-sky-400 text-white">Logout</button>
</div></div>
      
    </div>
  ) */
}

export default UserSidebar
