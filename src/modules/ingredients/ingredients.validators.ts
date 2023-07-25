import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from 'class-validator';
import { Model } from 'mongoose';
import { Ingredient } from 'src/modules/ingredients/schemas/ingredient.schema';

@ValidatorConstraint({ name: 'IsIngredientExists', async: true })
@Injectable()
export class IngredientExistValidator implements ValidatorConstraintInterface {
  constructor(@InjectModel(Ingredient.name) private ingredientModel: Model<Ingredient>) {};

  async validate(value: string) {
    try {
      return !!await this.ingredientModel.findById(value);
    } catch (e) {
      return false;
    }

    return true;
  }

  defaultMessage({ value }: ValidationArguments) {
    return `Ingredient with id "${value}" is not exist`;
  }
}

export function IsIngredientExist(options?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsIngredientExist',
      target: object.constructor,
      propertyName: propertyName,
      options,
      validator: IngredientExistValidator,
    });
  };
}
