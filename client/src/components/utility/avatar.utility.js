export const avatarFor = (user) => {
  if (user?.avatar) return user.avatar;

  const seed = encodeURIComponent(user?.fullName || user?.username || "User");
  return `https://api.dicebear.com/9.x/initials/svg?seed=${seed}&backgroundColor=0ea5e9`;
};
