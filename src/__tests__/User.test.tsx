import { act, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import User from '../pages/User';

//To account for the useNavigate() may be used only in the context of a <Router> component error
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(), // Mock the useNavigate function
  }));


  describe('User component', () => {
    it('renders the main heading', () => {
      render(<MemoryRouter><User /></MemoryRouter>);
      const headingElement = screen.getByText(/Sign up now for your free 15-day trial/i);
      expect(headingElement).toBeInTheDocument();
    });
  
    it('renders the username input', () => {
      render(<MemoryRouter><User /></MemoryRouter>);
      const usernameInput = screen.getByLabelText(/Username/i);
      expect(usernameInput).toBeInTheDocument();
    });
    
    it('renders the password input', () => {
        render(<MemoryRouter><User /></MemoryRouter>);
        const passwordInput = screen.getByLabelText(/Password/i);
        expect(passwordInput).toBeInTheDocument();
    });

    it('renders the email input', () => {
        render(<MemoryRouter><User /></MemoryRouter>);
        const emailInput = screen.getByLabelText(/Email/i);
        expect(emailInput).toBeInTheDocument();
    });
    
    it('renders the date of birth input', () => {
        render(<MemoryRouter><User /></MemoryRouter>);
        const dateInput = screen.getByLabelText(/Birth Date/i);
        expect(dateInput).toBeInTheDocument();
    });
    
    it('renders the credit card input', () => {
        render(<MemoryRouter><User /></MemoryRouter>);
        const creditCardInput = screen.getByLabelText(/Credit Card Number/i);
        expect(creditCardInput).toBeInTheDocument();
    });

    // it('calls the submit handler when the form is submitted', async () => {
    //   const mockSubmit = jest.fn();
    //   render(<MemoryRouter><User handleSubmit={mockSubmit} /></MemoryRouter>);

    // const usernameInput = screen.getByLabelText(/Username/i);
    // const emailInput = screen.getByLabelText(/Email/i);
    // const passwordInput = screen.getByLabelText(/Password/i);
    // const birthDateInput = screen.getByLabelText(/Birth Date/i);
    // const creditCardInput = screen.getByLabelText(/Credit card number/i);

    // fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    // fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    // fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    // fireEvent.change(birthDateInput, { target: { value: '2000-01-01' } });
    // fireEvent.change(creditCardInput, { target: { value: '1234567890123456' } });
  
    // const formElement = screen.getByRole('form'); // Get the form element
    // await act(async () => {
    //   fireEvent.submit(formElement);
    // });

    // expect(mockSubmit).toHaveBeenCalled();
    // });
  });  