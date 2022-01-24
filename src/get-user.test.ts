import { getUser } from "./get-user";

describe('When everything is OK', () => {
    test('Should return a response', async () => {
        // in a real project we would use axios and mock to get method
        const result = await getUser();
        expect(result).toEqual({ id: '1', name: 'Patricio'});
    });
});