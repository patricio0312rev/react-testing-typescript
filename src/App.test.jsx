import { render, screen } from '@testing-library/react';
import App from './App';

describe("When everything is OK", () => {
  test("Should render the app component without crashing", () => {
    render(<App />);
  }); 
});
