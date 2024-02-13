import { createContext, useContext, useState } from 'react';

const GroupContext = createContext();

function GroupContextProvider({ children }) {
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [groupAdmins, setGroupAdmins] = useState([]);
  const [selectedGroupName, setSelectedGroupName] = useState('');

  return (
    <GroupContext.Provider
      value={{
        selectedGroupId,
        setSelectedGroupId,
        selectedMemberId,
        setSelectedMemberId,
        groupAdmins,
        setGroupAdmins,
        selectedGroupName,
        setSelectedGroupName,
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
