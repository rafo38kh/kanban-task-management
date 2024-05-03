type User = {
  name: string;
  email: string;
  userID: string;
  isAuth: boolean;
  profilePhoto: string;
};

export const useGetUsersInfo = () => {
  const user =
    typeof window !== "undefined"
      ? window?.localStorage?.getItem("user")
      : null;

  const parsedUser = user ? (JSON.parse(user) as User) : null;

  return parsedUser;
};
