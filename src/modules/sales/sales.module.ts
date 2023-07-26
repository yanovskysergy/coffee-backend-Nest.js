import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/modules/products/schemas/product.schema';
import { ProductExistValidator } from 'src/modules/products/products.validators';
import { Ingredient, IngredientSchema } from 'src/modules/ingredients/schemas/ingredient.schema';
import { Inventory, InventorySchema } from 'src/modules/inventories/schemas/inventory.schema';
import { IngredientExistValidator } from 'src/modules/ingredients/ingredients.validators';
import { InventoryExistValidator } from 'src/modules/inventories/inventories.validators';
import { Sale, SaleSchema } from './schemas/sale.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Sale.name, schema: SaleSchema },
    { name: Product.name, schema: ProductSchema },
    { name: Ingredient.name, schema: IngredientSchema },
    { name: Inventory.name, schema: InventorySchema },
  ])],
  controllers: [SalesController],
  providers: [
    SalesService, 
    ProductExistValidator, 
    IngredientExistValidator, 
    InventoryExistValidator
  ]
})
export class SalesModule {}
