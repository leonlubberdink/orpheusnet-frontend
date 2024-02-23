import { createContext, useContext, useEffect, useState } from 'react';
import { useGetMe } from '../hooks/useGetMe';

const GroupContext = createContext();

function UserContextProvider({ children }) {
  const { data } = useGetMe();
  const [userInfo, setUserInfo] = useState({
    userName: '',
    email: '',
    passwordCurrent: '',
    password: '',
    passwordConfirm: '',
    userImage: '',
  });

  useEffect(() => {
    if (data?.data?.data?.doc) {
      setUserInfo((prevState) => ({
        ...prevState,
        userName: data.data.data.doc.userName || '',
        email: data.data.data.doc.email || '',
        userImage: data.data.data.doc.userImage || '',
      }));
    }
  }, [data, setUserInfo]);

  return (
    <GroupContext.Provider
      value={{
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
}

function useUserContext() {
  const context = useContext(GroupContext);
  if (context === undefined)
    throw new Error('useUserContext must be used within a UserContextProvider');
  return context;
}

export { UserContextProvider, useUserContext };
