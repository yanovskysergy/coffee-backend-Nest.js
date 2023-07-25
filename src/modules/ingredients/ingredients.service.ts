import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Ingredient } from './schemas/ingredient.schema';
import { Model } from 'mongoose';
import { Product } from '../products/schemas/product.schema';
import { INGREDIENT_IS_USED_IN_PRODUCT } from 'src/shared/errorKeys';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectModel(Ingredient.name) private ingredientModel: Model<Ingredient>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) { }

  private async dependentProductsValidate(id: string, type: 'remove' | 'update') {
    const products = await this.productModel.find()

    const dependentProducts = products
      .filter(({ ingredients }) => !!ingredients.find(({ _id }) => _id.equals(id)));

    if (dependentProducts.length) {
      const description = {
        remove: `Can't delete ingredient with id ${id} cause this ingredient uses in one or a few products`,
        update: `Ingredient wasn't edited cause ingredient with id ${id} uses in one or a few products`
      }

      throw new HttpException(
        {
          statusCode: HttpStatus.METHOD_NOT_ALLOWED,
          cause: INGREDIENT_IS_USED_IN_PRODUCT,
          description: description[type],
          dependentProducts
        },
        HttpStatus.METHOD_NOT_ALLOWED,
      )
    }
  }

  create(createIngredientDto: CreateIngredientDto) {
    const newIngredient = new this.ingredientModel(createIngredientDto);
    return newIngredient.save();
  }

  findAll() {
    return this.ingredientModel.find();
  }

  findOne(id: string) {
    return this.ingredientModel.findById(id);
  }

  async update(id: string, updateIngredientDto: UpdateIngredientDto) {
    await this.dependentProductsValidate(id, 'update');
    return this.ingredientModel.findByIdAndUpdate(id, updateIngredientDto, { new: true });
  }

  async remove(id: string) {
    await this.dependentProductsValidate(id, 'remove');
    return this.ingredientModel.findByIdAndDelete(id);
  }
}
