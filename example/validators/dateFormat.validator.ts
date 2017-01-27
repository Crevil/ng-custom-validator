import * as moment from 'moment';

import { IValidator } from '../../src';
import { DateFormatService } from '../dateFormat.service';

export interface IDateFormatDependencies {
  dateFormat: DateFormatService;
}

export class DateFormatValidator implements IValidator<IDateFormatDependencies> {
  private dateFormatService: DateFormatService;

  public isValid(value: string): boolean {
    return moment(value, this.dateFormatService.dateFormat, true).isValid();
  }

  public setDependencies(deps: IDateFormatDependencies): void {
    this.dateFormatService = deps.dateFormat;
  }
}
