import { render, screen } from '@testing-library/react';
import App from './App';

describe("When everything is OK", () => {
  test("Should render the app component without crashing", () => {
    render(<App />);
    screen.debug();
  }); 

  test("Should select the children that is being passed to the CustomInput component", () => {
    render(<App />);
    screen.getByText('Input:');

    let error;
    try {
      screen.getByText('Input');
    } catch(err) {
      error = err;
    }
    expect(error).toBeDefined();
  });
});
