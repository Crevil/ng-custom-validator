import * as angular from 'angular';

import { DateFormatSetterComponent } from './date-format-setter.component';
import { DateFormatService } from './dateFormat.service';

import { CustomValidator } from '../src';
import { DateFormatValidator, IDateFormatDependencies } from './validators/dateFormat.validator';
import { MinValueValidator } from './validators/minValue.validator';

const app = angular.module('app', []);
app
  .service('dateFormat', DateFormatService)
  .component('appDateFormatSetter', DateFormatSetterComponent);

const minValueValidator = new CustomValidator(MinValueValidator, 'minValue');
app.directive('minValue', () => minValueValidator.factory());

const dateValidValidator = new CustomValidator(DateFormatValidator, 'dateFormat');
app.directive('dateFormat', (dateFormat: DateFormatService) => dateValidValidator.factory({ dateFormat }));

angular.bootstrap(document, ['app']);
