import { IMinValueAttrs, MinValueValidator } from './minValue.validator';

describe('minValue validator', () => {
  let customValidator: MinValueValidator;

  beforeEach(() => {
    customValidator = new MinValueValidator();
  });

  it('should return true if value is above minValue', () => {
    const value = 5;
    const attrs = { minValue: '4' } as IMinValueAttrs;

    const result = customValidator.isValid(value, attrs);

    expect(result).toBe(true);
  });
});
