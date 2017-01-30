import { IValidator } from '../../src';

export interface IMinValueAttrs extends ng.IAttributes {
  minValue: string;
}

export class MinValueValidator implements IValidator<void> {
  public isValid(value: number, attrs?: IMinValueAttrs): boolean {
    if (!attrs.minValue) {
      return false;
    }

    return value >= parseInt(attrs.minValue, 10);
  }
}
