import { render, screen } from '@testing-library/react';
import App from './App';

describe("When everything is OK", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("Should render the app component without crashing", () => {
    screen.debug();
  }); 

  test("Should select the children that is being passed to the CustomInput component", () => {
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
    screen.getByRole('textbox');
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test("Should select a label element by its text", () => {
    screen.getByLabelText('Input:');
  });

  test("Should select input element by placeholder text", () => {
    screen.getByPlaceholderText('Example');
  });

  test("Should select the input element by its role with queryByRole", () => {
    screen.queryByRole('textbox');
  });

  test("Should not find the role 'whatever' in our component", () => {
    expect(screen.queryByRole('whatever')).toBeNull();
  });
});
