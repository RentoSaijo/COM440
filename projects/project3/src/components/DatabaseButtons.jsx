// Imports ---------------------------------------------------------------

// Load navigation and styling tools.
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styles ----------------------------------------------------------------

// Arrange salary controls.
const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
`;

// Style sorting buttons.
const Button = styled.button`
  padding: 0.75rem 1.25rem;
  border: 0;
  border-radius: 4px;
  background: #4a90e2;
  color: white;
  cursor: pointer;
  &:hover,
  &[aria-pressed='true'] {
    background: #2868b3;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Component -------------------------------------------------------------

// Open database pages in requested salary order.
const DatabaseButtons = ({ order, disabled = false }) => {
  const navigate = useNavigate();
  return (
    <Controls>
      {['asc', 'desc'].map(value => (
        <Button
          key={value}
          type='button'
          aria-pressed={order === value}
          disabled={disabled}
          onClick={() => navigate(`/users?order=${value}`)}
        >
          List Database {value === 'asc' ? 'Ascending' : 'Descending'}
        </Button>
      ))}
    </Controls>
  );
};

export default DatabaseButtons;
