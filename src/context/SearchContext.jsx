import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

function SearchContextProvider({ children }) {
  const [searchValue, setSearchValue] = useState('');
  const [shareUrl, setShareUrl] = useState('');
  const [shareType, setShareType] = useState('');

  return (
    <SearchContext.Provider
      value={{
        searchValue,
        setSearchValue,
        shareUrl,
        setShareUrl,
        shareType,
        setShareType,
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
