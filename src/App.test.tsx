import { render, screen } from '@testing-library/react';
import { text } from 'stream/consumers';
import App from './App';

describe("When everything is OK", () => {
  test("Should render the app component without crashing", () => {
    render(<App />);
    screen.debug();
  }); 

  test("Should select the children that is being passed to the CustomInput component", () => {
    render(<App />);
    screen.getByText('Input:');
    screen.getByText(/Input/);

    let error;
    try {
      screen.getByText('Input');
    } catch(err) {
      error = err;
    }
    expect(error).toBeDefined();
  });

  test("Should select the input element by its role", () => {
    render(<App />);
    screen.getByRole('textbox');
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test("Should select a label element by its text", () => {
    render(<App />);
    screen.getByLabelText('Input:');
  });

  test("Should select input element by placeholder text", () => {
    render(<App />);
    screen.getByPlaceholderText('Example');
  })
});
