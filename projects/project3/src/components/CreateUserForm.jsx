// Imports ---------------------------------------------------------------

// Load component dependencies.
import { useState } from 'react';
import styled from 'styled-components';
import { createUser } from '../services/api';

// Styles ----------------------------------------------------------------

// Center form content.
const FormContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

// Style form heading.
const Title = styled.h2`
  margin: 0 0 1.5rem;
  color: #333;
  text-align: center;
`;

// Arrange form controls.
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

// Group labels with inputs.
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

// Style field labels.
const Label = styled.label`
  font-weight: 600;
  color: #555;
`;

// Style text inputs.
const Input = styled.input`
  width: 100%;
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

// Style role selection.
const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
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

// Display request errors.
const ErrorMessage = styled.div`
  color: #e74c3c;
  background: #fde2e2;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

// Display creation confirmation.
const SuccessMessage = styled.div`
  color: #27ae60;
  background: #e3f9eb;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

// Component -------------------------------------------------------------

// Render user creation form.
const CreateUserForm = ({ onUserCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    salary: '',
    department: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Helpers -------------------------------------------------------------

  // Update field values.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate required fields and salary.
  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) return 'Email is invalid';
    const salary = Number(formData.salary);
    if (!formData.salary.trim() || !Number.isSafeInteger(salary) || salary < 0) {
      return 'Salary must be a nonnegative whole number';
    }
    return null;
  };

  // Submit valid records and reset form fields.
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form values.
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      const newUser = await createUser({ ...formData, salary: Number(formData.salary) });
      setSuccess('User created successfully!');
      setFormData({
        name: '',
        email: '',
        role: 'user',
        salary: '',
        department: '',
      });
      if (onUserCreated) {
        onUserCreated(newUser);
      }
    } catch (err) {
      setError(err.message || 'Failed to create user. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <Title>Create New User</Title>

      {error && <ErrorMessage role='alert'>{error}</ErrorMessage>}
      {success && <SuccessMessage role='status'>{success}</SuccessMessage>}

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor='name'>Full Name</Label>
          <Input
            type='text'
            id='name'
            name='name'
            required
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder='John Doe'
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor='email'>Email Address</Label>
          <Input
            type='email'
            id='email'
            name='email'
            required
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder='john.doe@example.com'
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor='role'>Role</Label>
          <Select
            id='role'
            name='role'
            value={formData.role}
            onChange={handleChange}
            disabled={isSubmitting}
          >
            <option value='user'>User</option>
            <option value='admin'>Admin</option>
            <option value='manager'>Manager</option>
            <option value='developer'>Developer</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor='salary'>Salary</Label>
          <Input
            type='number'
            id='salary'
            name='salary'
            min='0'
            max={Number.MAX_SAFE_INTEGER}
            step='1'
            required
            value={formData.salary}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder='Enter salary in K'
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor='department'>Department</Label>
          <Input
            type='text'
            id='department'
            name='department'
            value={formData.department}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder='Engineering, Marketing, etc.'
          />
        </FormGroup>

        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create User'}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default CreateUserForm;
