import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { getUser } from './get-user';
import { mocked } from 'ts-jest/utils';

jest.mock('./get-user');
const mockGetUser = mocked(getUser, true);

describe("When everything is OK", () => {
  beforeEach(async () => {
    render(<App />);
    await waitFor(() => expect(mockGetUser).toHaveBeenCalled())
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

describe("When the component fetches the user successfully", () => {
  beforeEach(() => {
    mockGetUser.mockClear();
  });

  test('Should call getUser once', async () => {
    render(<App />);
    await waitFor(() => expect(mockGetUser).toHaveBeenCalledTimes(1));
  });
});
