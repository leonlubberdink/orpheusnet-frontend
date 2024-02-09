import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

function SearchContextProvider({ children }) {
  const [searchValue, setSearchValue] = useState('');

  return (
    <SearchContext.Provider
      value={{
        searchValue,
        setSearchValue,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

function useSearchContext() {
  const context = useContext(SearchContext);
  if (context === undefined)
    throw new Error(
      'useSearchContext must be used within a SearchContextProvider'
    );
  return context;
}

export { SearchContextProvider, useSearchContext };
