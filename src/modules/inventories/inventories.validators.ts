import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from 'class-validator';
import { Model } from 'mongoose';
import { Inventory } from 'src/modules/inventories/schemas/inventory.schema';

@ValidatorConstraint({ name: 'IsIngredientExists', async: true })
@Injectable()
export class InventoryExistValidator implements ValidatorConstraintInterface {
  constructor(@InjectModel(Inventory.name) private inventoryModel: Model<Inventory>) {};

  async validate(value: string) {
    try {
      await this.inventoryModel.findById(value);
    } catch (e) {
      return false;
    }

    return true;
  }

  defaultMessage({ value }: ValidationArguments) {
    return `Inventory with id "${value}" is not exist`;
  }
}

export function IsInventoryExist(options?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsInventoryExist',
      target: object.constructor,
      propertyName: propertyName,
      options,
      validator: InventoryExistValidator,
    });
  };
}
