import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios'; 
import Payments from '../pages/Payments'; 

// Mock axios 
jest.mock('axios', () => ({
  post: jest.fn(),
}));

describe('Payments component', () => {
  it('renders without crashing', () => {
    render(<MemoryRouter><Payments /></MemoryRouter>);
  });

  it('handles form submission', async () => {
    // Mock axios response (you can customize this mock as needed)
    const mockResponse = { status: 201 };
    (axios.post as jest.Mock).mockResolvedValue({ status: 201 });

    render(<MemoryRouter><Payments /></MemoryRouter>);

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText(/Credit card number/i), { target: { value: '1234567890123456' } });
    fireEvent.change(screen.getByLabelText(/Amount/i), { target: { value: '100' } });

    // Submit the form
    fireEvent.click(screen.getByText(/Submit/i));

    // Wait for the axios call to resolve
    await screen.findByText(/Data sent successfully/i);

    // Assert that the form fields are cleared
    expect(screen.getByLabelText(/Credit card number/i)).toHaveValue('');
    expect(screen.getByLabelText(/Amount/i)).toHaveValue('');
  });

});