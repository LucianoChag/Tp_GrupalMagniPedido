// src/components/SearchBar/SearchBar.tsx
import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchTermChange }) => {
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => onSearchTermChange(e.target.value)}
      placeholder="Buscar productos..."
    />
  );
};

export default SearchBar;
