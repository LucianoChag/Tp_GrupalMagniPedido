// src/components/SearchBar/SearchBar.tsx
import React from 'react';
import './SearchBar.css'

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
      className="common-input search-bar"
    />
  );
};
export default SearchBar;
