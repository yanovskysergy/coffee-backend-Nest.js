import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from 'class-validator';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';

@ValidatorConstraint({ name: 'IsProductExists', async: true })
@Injectable()
export class ProductExistValidator implements ValidatorConstraintInterface {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {};

  async validate(value: string) {
    try {
      return !!await this.productModel.findById(value);
    } catch (e) {
      return false;
    }
  }

  defaultMessage({ value }: ValidationArguments) {
    return `Product with id "${value}" is not exist`;
  }
}

export function IsProductExist(options?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsProductExists',
      target: object.constructor,
      propertyName: propertyName,
      options,
      validator: ProductExistValidator,
    });
  };
}
