import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {
  beforeEach(() => {});

  it('should display weak if strength is 1', () => {
    // Arrange
    let pipe = new StrengthPipe();
    // Act
    let result = pipe.transform(1);
    // Assert
    expect(result).toEqual('1 (weak)');
  });

  it('should display strong if strength is 10', () => {
    // Arrange
    let pipe = new StrengthPipe();
    // Act & Assert
    expect(pipe.transform(10)).toEqual('10 (strong)');
  });
});
