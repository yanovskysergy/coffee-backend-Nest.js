import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { Ingredient, IngredientSchema } from '../ingredients/schemas/ingredient.schema';
import { IngredientExistValidator } from '../ingredients/ingredients.validators';
import { InventoryExistValidator } from '../inventories/inventories.validators';
import { Inventory, InventorySchema } from '../inventories/schemas/inventory.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Product.name, schema: ProductSchema },
    { name: Ingredient.name, schema: IngredientSchema },
    { name: Inventory.name, schema: InventorySchema },
  ])],
  controllers: [ProductsController],
  providers: [ProductsService, IngredientExistValidator, InventoryExistValidator]
})
export class ProductsModule {}
