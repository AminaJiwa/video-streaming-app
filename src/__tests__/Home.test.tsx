import { act, render, screen } from '@testing-library/react'
import Home from '../pages/Home';
import { MemoryRouter } from 'react-router-dom';

//To account for the useNavigate() may be used only in the context of a <Router> component error
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(), // Mock the useNavigate function
  }));

describe('Home component', () => {
    it('renders the main heading', () => {
      render(<MemoryRouter><Home /></MemoryRouter>);
      const headingElement = screen.getByText(/Video streaming services for you/i);
      expect(headingElement).toBeInTheDocument();
    });

    it('renders the "Sports" card', () => {
        render(<MemoryRouter><Home /></MemoryRouter>);
        const sportsCard = screen.getByText(/Sports/i);
        expect(sportsCard).toBeInTheDocument();
    });

    it('renders the "Movies" card', () => {
        render(<MemoryRouter><Home /></MemoryRouter>);
        const moviesCard = screen.getByText(/Movies/i);
        expect(moviesCard).toBeInTheDocument();
    });  

    it('renders the "TV Shows" card', () => {
        render(<MemoryRouter><Home /></MemoryRouter>);
        const tvShowsCard = screen.getByText(/TV Shows/i);
        expect(tvShowsCard).toBeInTheDocument();
    });

    it('calls the button handler when "Find out more" button is clicked', () => {
        const mockNavigate = jest.fn();
        jest.mock('react-router-dom', () => ({
          ...jest.requireActual('react-router-dom'),
          useNavigate: () => mockNavigate,
        }));
    
        render(<MemoryRouter><Home /></MemoryRouter>);
        const buttonElement = screen.getByText(/Find out more/i);
    
        // Wrap the button click in act
        act(() => {
          buttonElement.click();
        });
    
        expect(mockNavigate).toHaveBeenCalledWith('pages/User');
      });
}); 