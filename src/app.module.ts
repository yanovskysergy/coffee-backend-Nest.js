import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IngredientsModule } from './modules/ingredients/ingredients.module';
import { InventoriesModule } from './modules/inventories/inventories.module';
import { ProductsModule } from './modules/products/products.module';
import { SalesModule } from './modules/sales/sales.module';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    MongooseModule.forRoot(process.env.MONGO_URL),
    IngredientsModule,
    InventoriesModule,
    ProductsModule,
    SalesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
