import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Inventory } from './schemas/inventory.schema';
import { Model } from 'mongoose';
import { Product } from '../products/schemas/product.schema';
import { INVENTORY_IS_USED_IN_PRODUCT } from 'src/shared/errorKeys';

@Injectable()
export class InventoriesService {
  constructor(
    @InjectModel(Inventory.name) private inventoryModel: Model<Inventory>,
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {}

  private async dependentProductsValidate(id: string, type: 'remove' | 'update') {
    const products = await this.productModel.find()

    const dependentProducts = products
      .filter(({ inventories }) => !!inventories.find(({ _id }) => _id.equals(id)));

    if (dependentProducts.length) {
      const description = {
        remove: `Can't delete inventory with id ${id} cause this inventory uses in one or a few products`,
        update: `Inventory wasn't edited cause inventory with id ${id} uses in one or a few products`
      }

      throw new HttpException(
        {
          statusCode: HttpStatus.METHOD_NOT_ALLOWED,
          cause: INVENTORY_IS_USED_IN_PRODUCT,
          description: description[type],
          dependentProducts
        },
        HttpStatus.METHOD_NOT_ALLOWED,
      )
    }
  }

  create(createInventoryDto: CreateInventoryDto) {
    const inventory = new this.inventoryModel(createInventoryDto);
    return inventory.save();
  }

  findAll() {
    return this.inventoryModel.find();
  }

  findOne(id: string) {
    return this.inventoryModel.findById(id);
  }

  async update(id: string, updateInventoryDto: UpdateInventoryDto) {
    await this.dependentProductsValidate(id, 'update');
    return this.inventoryModel.findByIdAndUpdate(id, updateInventoryDto, { new: true });
  }

  async remove(id: string) {
    await this.dependentProductsValidate(id, 'remove');
    return this.inventoryModel.findByIdAndRemove(id);
  }
}
