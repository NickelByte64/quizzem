import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

type IsStringNumberOrBooleanDecorator = (
  object: object,
  propertyName: string,
) => void;

/**
 * Custom decorator to validate that a property is a string, number, or boolean.
 * This decorator can be used in DTOs to ensure that the property meets the specified type requirements.
 *
 * @returns A decorator function that registers the validation rule.
 */
export function IsStringNumberOrBoolean(
  options?: ValidationOptions,
): IsStringNumberOrBooleanDecorator {
  return function (object, propertyName) {
    registerDecorator({
      name: 'isStringNumberOrBoolean',
      target: object.constructor,
      propertyName,
      options,
      validator: {
        validate(value: any) {
          const validTypes = ['string', 'number', 'boolean'];
          return (
            value !== null &&
            value !== undefined &&
            validTypes.includes(typeof value)
          );
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a string, number, or boolean`;
        },
      },
    });
  };
}
