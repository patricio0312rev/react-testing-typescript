import sumPositiveNumbers from "./example";

describe("When the arguments passed are positive numbers", () => {
    test("Should return the right answer:", () => {
        expect(sumPositiveNumbers(4,5)).toBe(9);
    });
});

describe("When one of the arguments is a negative argument", () => {
    test("Should throw an error:", () => {
        let error;

        try {
            sumPositiveNumbers(-1,5);
        } catch(err) {
            error = err;
        }

        expect(error).toBeDefined();
    });
})