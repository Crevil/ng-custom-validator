import { IValidator } from './validator.interface';

export class CustomValidator<TDependencies> {
    public validator: IValidator<TDependencies>;

    /**
     * AngularJS validation wrapper.
     * Set AngularJS specific setup to use custom validation directive.
     * @param validator The validator class implementing IValidator.
     * @param directiveName The directive name in pascal casing.
     */
    constructor(validator: { new (): IValidator<TDependencies>; }, private directiveName: string) {
        if (!validator) {
            throw Error('CustomValidator: A validator must be supplied');
        }
        if (!directiveName) {
            throw Error('CustomValidator: A directive name must be supplied');
        }

        this.validator = new validator();
    }

    public link = (
        scope: ng.IScope,
        element: ng.IAugmentedJQuery,
        attrs: ng.IAttributes,
        ngModel: ng.INgModelController,
    ) => {
        ngModel.$validators[this.directiveName] = (modelValue, viewValue) =>
            this.validateInput(modelValue, viewValue, ngModel, attrs);

        attrs.$observe(this.directiveName, () => ngModel.$validate());
    }

    /**
     * Validate value against validator.
     * @param value The value to validate.
     */
    public validateInput = (
        modelValue: any, viewValue: any, ngModel: ng.INgModelController, attrs: ng.IAttributes): boolean => {
        if (ngModel.$isEmpty(modelValue)) {
            return true;
        }

        return this.validator.isValid(viewValue, attrs);
    }

    /**
     * Factory method to register directive with AngularJS.
     * @param dependencies Optional dependency object to set on validator.
     */
    public factory(dependencies?: TDependencies): ng.IDirective {
        if (dependencies && this.validator.setDependencies) {
            this.validator.setDependencies(dependencies);
        }
        return {
            link: this.link,
            require: 'ngModel',
            scope: false,
        };
    }
}
