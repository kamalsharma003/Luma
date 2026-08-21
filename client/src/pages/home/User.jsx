// import React from 'react'

// const User = () => {
//   return (

//       <div className='flex gap-5 items-center'>

  
//         <div className="avatar avatar-online">
//   <div class="avatar">
//     <div class="w-12">
//       <img alt="Tailwind-CSS-Avatar-component" src="https://img.daisyui.com/images/profile/demo/wonderperson@192.webp" />
//     </div>
//   </div>
// </div>

//   <div>


//   <h2>Full name</h2>
  
//   <p className='text-xs'>username</p>
//   </div>
//   </div>
//       </div>
      
  
//   )
// };

// export default User

import { avatarFor } from "../../components/utility/avatar.utility";

const User = ({ user, selected = false, onClick, online = false }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-lg p-3 text-left transition hover:bg-base-200 ${selected ? "bg-base-200" : ""}`}
    >
      <div className={`avatar ${online ? "avatar-online" : ""}`}>
        <div className="w-12 rounded-full">
          <img
            alt={`${user.fullName}'s avatar`}
            src={avatarFor(user)}
          />
        </div>
      </div>

      <div>
        <h2 className="font-semibold">{user.fullName}</h2>
        <p className="text-xs opacity-70">@{user.username}</p>
      </div>
    </button>
  );
};

export default User;
