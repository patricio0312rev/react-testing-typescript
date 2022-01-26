import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    // Fails if it finds more than 1 element
    //screen.getByText('Input:');
    //screen.getByText(/Input/);
    screen.getAllByText('Input:');
    screen.getAllByText(/Input/);

    let error;
    try {
      // screen.getByText('Input');
      screen.getAllByText('Input');
    } catch(err) {
      error = err;
    }
    expect(error).toBeDefined();
  });

  test("Should select the input element by its role", () => {
    //screen.getByRole('textbox');
    //expect(screen.getByRole('textbox')).toBeInTheDocument();

    screen.getAllByRole('textbox');
    expect(screen.getAllByRole('textbox')[0]).toBeInTheDocument();
    //expect(screen.getAllByRole('textbox')[1]).toBeInTheDocument();
    //expect(screen.getAllByRole('textbox').length).toEqual(2);
    expect(screen.getAllByRole('textbox').length).toEqual(1);
  });

  test("Should select a label element by its text", () => {
    screen.getByLabelText('Input:');
  });

  test("Should select input element by placeholder text", () => {
    screen.getByPlaceholderText('Example');
    //screen.getAllByPlaceholderText('Example');
  });

  test("Should select the input element by its role with queryByRole", () => {
    screen.queryByRole('textbox');
    //screen.queryAllByRole('textbox');
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

  test('Should render the username passed', async () => {
    const name = 'Juan';

    /* mockGetUser.mockImplementationOnce(() => 
      Promise.resolve({ id: '1', name: 'Juan' })
    );*/

    mockGetUser.mockResolvedValueOnce({  id: '1', name: 'Juan' });

    render(<App />);
    expect(screen.queryByText(/Username/)).toBeNull();
    expect(await screen.findByText(/Username/)).toBeInTheDocument();
    expect(await screen.findByText(/name/)).toBeInTheDocument();
  });
});


describe('When the user enters some text in the input element', () => {
  test('Should display the text in the screen', async () => {
    render(<App />);
    await waitFor(() => expect(mockGetUser).toHaveBeenCalled());

    expect(screen.getByText(/You typed: .../));

    // fireEvent.change(screen.getByRole('textbox'), {
    //   target: { value: 'Patricio' }
    // });
    await userEvent.type(screen.getByRole('textbox'), 'Patricio');

    expect(screen.getByText(/You typed: Patricio/));
  });
});