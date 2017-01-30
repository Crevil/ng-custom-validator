import { CustomValidator, IValidator } from './';

class MyCustomValidator implements IValidator<{}> {
  public isValid(value: any): boolean {
    return true;
  }
}

describe('ng-custom-validator', () => {
  let customValidatorDirective: CustomValidator<{}>;
  let directiveName: string;
  let attrs: ng.IAttributes;
  let ngModel: ng.INgModelController;

  beforeEach(() => {
    attrs = {
      $observe: (key: string, fn: Function) => { /* */ },
    } as ng.IAttributes;

    ngModel = {
      $isEmpty: (v) => !v,
      $validate: () => undefined,
      $validators: {},
    } as ng.INgModelController;

    directiveName = 'someName';
    customValidatorDirective = new CustomValidator(MyCustomValidator, directiveName);
  });

  describe('constructor()', () => {
    it('should throw if validator is not supplied to constructor', () => {
      const act = () => new CustomValidator(undefined, directiveName);

      expect(act).toThrowError(/validator must be supplied/);
    });

    it('should throw if directive name is not supplied to constructor', () => {
      const act = () => new CustomValidator(MyCustomValidator, '');

      expect(act).toThrowError(/directive name/);
    });
  });

  describe('link()', () => {
    it('should init ngModel validators', () => {
      customValidatorDirective.link(undefined, undefined, attrs, ngModel);

      expect(ngModel.$validators[directiveName]).toBeDefined();
    });

    it('should init ngModel validators with validateInput method', () => {
      const modelValue = 5;
      const viewValue = 5;
      const validateSpy = spyOn(customValidatorDirective, 'validateInput');
      customValidatorDirective.link(undefined, undefined, attrs, ngModel);

      ngModel.$validators[directiveName](modelValue, viewValue);

      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    it('should observe on the directives attribute', () => {
      const observeSpy = spyOn(attrs, '$observe');

      customValidatorDirective.link(undefined, undefined, attrs, ngModel);

      expect(observeSpy).toHaveBeenCalled();
    });

    it('should call $validate when attribute observer is triggered', () => {
      const validateSpy = spyOn(ngModel, '$validate');
      const observeSpy = spyOn(attrs, '$observe');
      customValidatorDirective.link(undefined, undefined, attrs, ngModel);

      observeSpy.calls.first().args[1]();

      expect(validateSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('validateInput()', () => {
    it('should set validity to true if model value is undefined', () => {
      const result = customValidatorDirective.validateInput(undefined, {}, ngModel, attrs);

      expect(result).toBe(true);
    });

    it('should set validity to true if model value is null', () => {
      const result = customValidatorDirective.validateInput(null, {}, ngModel, attrs);

      expect(result).toBe(true);
    });

    it('should set validity to true if validator returns true', () => {
      spyOn(customValidatorDirective.validator, 'isValid').and.returnValue(true);
      const input = 'value';

      const result = customValidatorDirective.validateInput(input, input, ngModel, attrs);

      expect(result).toBe(true);
    });

    it('should set validity to false if validator returns false', () => {
      spyOn(customValidatorDirective.validator, 'isValid').and.returnValue(false);
      const input = 'value';

      const result = customValidatorDirective.validateInput(input, input, ngModel, attrs);

      expect(result).toBe(false);
    });
  });

  describe('factory()', () => {
    it('should return object with reference to link method', () => {
      const result = customValidatorDirective.factory();

      expect(result.link).toBe(customValidatorDirective.link);
    });

    it('should set dependencies if validator accepts any', () => {
      customValidatorDirective.validator.setDependencies = () => { /* */ };
      const validatorSpy = spyOn(customValidatorDirective.validator, 'setDependencies');
      const dependencies = {};

      customValidatorDirective.factory(dependencies);

      expect(validatorSpy).toHaveBeenCalledTimes(1);
    });

    it('should not set dependencies if validator accepts none', () => {
      customValidatorDirective.validator.setDependencies = undefined;
      const dependencies = {};

      const act = () => customValidatorDirective.factory(dependencies);

      expect(act).not.toThrow();
    });

    it('should not set dependencies if dependencies are falsy', () => {
      customValidatorDirective.validator.setDependencies = () => { /* */ };
      const validatorSpy = spyOn(customValidatorDirective.validator, 'setDependencies');

      customValidatorDirective.factory(undefined);

      expect(validatorSpy).not.toHaveBeenCalled();
    });
  });
});
