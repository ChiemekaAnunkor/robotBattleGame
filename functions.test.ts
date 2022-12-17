const { shuffleArray } = require("./utils");

describe("shuffleArray should return shuffuled array", () => {
  // CODE HERE
  test("shuffleArray should return true if it is an array", () => {
    const arr = [2, 3, 3, 4, 4];
    expect(shuffleArray(arr) instanceof Array).toBe(true);
  });

  test("shuffleArray should return an array that is not similar to the entered array", () => {
    const arr = ["hello", "lol", "why", "me"];
    let shuffled = shuffleArray(arr);
    let diffCounter = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === shuffled[i]) {
        diffCounter++;
      }
    }
    expect(shuffled.length === diffCounter).toBe(false);
  });

  test("leng of returned array should be the same", () => {
    const arr = ["hello", "lol", "why", "me"];

    expect(shuffleArray(arr).length).toBe(arr.length);
  });
});
