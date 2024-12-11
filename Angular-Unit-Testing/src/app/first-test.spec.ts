// example of a test file
describe('My first test', () => {
  // generic 'system under test' variable
  let sut;

  // setup to run before each test and reset test states to be clean
  // runs and executes before each test
  beforeEach(() => {
    sut = {};
  });

  // name of test should be descriptive
  // Note the name parameter of the describe and 'it' are combined in the results
  it('should be true if true', () => {
    // tests have 3 steps: arrange, act, assert

    // arrange
    // arrange properties for test
    sut.a = false;

    // act
    // act on the properties
    sut.a = true;

    // assert
    // assert the properties are as expected
    expect(sut.a).toBe(true);
  });
});
