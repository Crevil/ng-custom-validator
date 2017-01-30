import { DateFormatValidator } from './dateFormat.validator';

describe('dateFormat validator', () => {
  let customValidator: DateFormatValidator;

  beforeEach(() => {
    customValidator = new DateFormatValidator();
  });

  it('should return true if value is a valid format', () => {
    const format = 'DD/MM/YYYY';
    const value = '15/10/2017';
    customValidator.setDependencies({ dateFormat: { dateFormat: format } });

    const result = customValidator.isValid(value);

    expect(result).toBe(true);
  });

  it('should return false if value is not a valid format', () => {
    const format = 'DD/MM/YYYY';
    const value = '15-10-2017';
    customValidator.setDependencies({ dateFormat: { dateFormat: format } });

    const result = customValidator.isValid(value);

    expect(result).toBe(false);
  });
});
