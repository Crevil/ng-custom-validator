export interface IValidator<TDependencies> {
  /**
   * Validate value. Return true if the value is valid otherwise return false.
   * @param value The value to validate.
   * @param attrs The attributes on the input being validated.
   */
  isValid<TValue>(value: TValue, attrs?: ng.IAttributes): boolean;

  /**
   * Set validator dependencies.
   * @param dependencies The dependencies.
   */
  setDependencies?(dependencies: TDependencies): void;
}
