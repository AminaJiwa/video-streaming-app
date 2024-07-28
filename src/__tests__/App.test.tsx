import { render, screen } from '@testing-library/react';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';

describe('App component', () => {
  it('renders the main heading', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const headingElement = screen.getByText(/Video streaming services for you/i);
    expect(headingElement).toBeInTheDocument();
  });

  it('renders the User page route', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const userRoute = screen.getByText(/User/i);
    expect(userRoute).toBeInTheDocument();
  });

  it('renders the Admin page route', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const adminRoute = screen.getByText(/Admin/i);
    expect(adminRoute).toBeInTheDocument();
  });

  it('renders the Payments page route', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const paymentsRoute = screen.getByText(/Payments/i);
    expect(paymentsRoute).toBeInTheDocument();
  });


});