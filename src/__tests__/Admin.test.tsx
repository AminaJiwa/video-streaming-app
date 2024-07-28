import { act, render, screen } from '@testing-library/react'
import Admin from '../pages/Admin';
import { MemoryRouter } from 'react-router-dom';


const mockData = [
    {
        id: "0001",
        username: "JohnDoe",
        email: "johndoe@example.com",
        password: "Password123",
        dateOfBirth: "01/01/2000",
        cardNumber: "1234567890123456",
      }, {
        id: "0002",
        username: "JaneDoe",
        email: "janedoe@example.com",
        password: "Password123",
        dateOfBirth: "02/01/2000",
        cardNumber: "1234567890123000",
      }, {
        id: "0003",
        username: "JohnSmith",
        email: "johnsmith@example.com",
        password: "Password456",
        dateOfBirth: "03/01/2000",
        cardNumber: "",
      }, {
        id: "0004",
        username: "JaneSmith",
        email: "janesmith@example.com",
        password: "Password678",
        dateOfBirth: "04/01/2000",
        cardNumber: "",
      }, 
]

describe('Admin component', () => {
    it('renders a user', () => {
      render(<MemoryRouter><Admin users={mockData}/></MemoryRouter>);
      expect(screen.getByText(/JohnDoe/i)).toBeInTheDocument();
    });

}); 