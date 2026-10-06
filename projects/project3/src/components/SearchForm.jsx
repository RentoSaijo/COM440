// Imports ---------------------------------------------------------------

// Load component dependencies.
import { useState } from 'react';
import styled from 'styled-components';

// Styles ----------------------------------------------------------------

// Center form content.
const FormContainer = styled.div`
  margin-bottom: 2rem;
`;

// Arrange form controls.
const Form = styled.form`
  display: flex;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// Style text inputs.
const Input = styled.input`
  flex: 1;
  min-width: 0;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

// Style form actions.
const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s ease;
  &:hover {
    background: #3a7bc8;
  }
  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
`;

// Component -------------------------------------------------------------

// Render user search form.
const SearchForm = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  // Helpers -------------------------------------------------------------

  // Submit nonempty search terms.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Input
          type='text'
          aria-label='Search users'
          placeholder='Search users by name, or email...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isLoading}
        />
        <Button type='submit' disabled={!query.trim() || isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default SearchForm;
