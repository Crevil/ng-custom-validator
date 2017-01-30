import { DateFormatService } from './dateFormat.service';

class DateFormatSetterComponentController {
  public format: string;

  constructor(private dateFormat: DateFormatService) {
    this.format = this.dateFormat.dateFormat;
  }

  public setFormat(): void {
    this.dateFormat.dateFormat = this.format;
  }
}

export const DateFormatSetterComponent: ng.IComponentOptions = {
  controller: DateFormatSetterComponentController,
  controllerAs: 'ctrl',
  template: `<input class="form-control" ng-change="ctrl.setFormat()" ng-model="ctrl.format" />`,
};
