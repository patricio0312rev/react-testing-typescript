import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Axios from 'axios';
import Pokemon from './Pokemon';

jest.mock('axios');
const mockedAxios = Axios as jest.Mocked<typeof Axios>;

describe('When user enters a valid pokemon name', () => {
    test('Should throw the pokemon abilites of that pokemon', async() => {
        const abilities = [
            {
                ability: {
                    name: 'Test ability 1',
                    url: 'https://ability.com/ability1'
                },
            },
            {
                ability: {
                    name: 'Test ability 2',
                    url: 'https://ability.com/ability2'
                }
            }
        ];

        mockedAxios.get.mockResolvedValueOnce({ data: { abilities }});
        render(<Pokemon />);
        await userEvent.type(screen.getByRole('textbox'), 'ditto');
        await userEvent.click(screen.getByRole('button'));

        const returnAbilities = await screen.findAllByRole('listitem');
        expect(returnAbilities).toHaveLength(2);
    });
});

describe('When a user enters an invalid pokemon name', () => {
    test('Should show an error message in the screen', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error());
        render(<Pokemon />);

        await userEvent.type(screen.getByRole('textbox'), 'ditto');
        await userEvent.click(screen.getByRole('button'));

        const message = await screen.findByText(/Something went wrong/);
        expect(message).toBeInTheDocument();
    });
});