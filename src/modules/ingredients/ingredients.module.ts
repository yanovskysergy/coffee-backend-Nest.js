import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { Ingredient, IngredientSchema } from './schemas/ingredient.schema';
import { Product, ProductSchema } from '../products/schemas/product.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Ingredient.name, schema: IngredientSchema },
    { name: Product.name, schema: ProductSchema },
  ])],
  controllers: [IngredientsController],
  providers: [IngredientsService]
})
export class IngredientsModule { }
