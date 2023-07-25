import { Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Ingredient } from './schemas/ingredient.schema';
import { Model } from 'mongoose';

@Injectable()
export class IngredientsService {
  constructor(@InjectModel(Ingredient.name) private ingredientModel: Model<Ingredient>) {}

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

  update(id: string, updateIngredientDto: UpdateIngredientDto) {
    return this.ingredientModel.findByIdAndUpdate(id, updateIngredientDto, { new: true });
  }

  remove(id: string) {
    return this.ingredientModel.findByIdAndDelete(id);
  }
}
