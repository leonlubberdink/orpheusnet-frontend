import { createContext, useContext, useState } from 'react';

const GroupContext = createContext();

function GroupContextProvider({ children }) {
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [selectedGroupName, setSelectedGroupName] = useState('');
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [groupAdmins, setGroupAdmins] = useState([]);

  return (
    <GroupContext.Provider
      value={{
        selectedGroupId,
        setSelectedGroupId,
        selectedMemberId,
        setSelectedMemberId,
        groupAdmins,
        setGroupAdmins,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
}

function useGroupContext() {
  const context = useContext(GroupContext);
  if (context === undefined)
    throw new Error(
      'useGroupContext must be used within a GroupContextProvider'
    );
  return context;
}

export { GroupContextProvider, useGroupContext };
