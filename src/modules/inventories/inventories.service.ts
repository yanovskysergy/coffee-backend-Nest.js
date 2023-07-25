import { Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Inventory } from './schemas/inventory.schema';
import { Model } from 'mongoose';

@Injectable()
export class InventoriesService {
  constructor(@InjectModel(Inventory.name) private inventoryModel: Model<Inventory>) {}

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

  update(id: string, updateInventoryDto: UpdateInventoryDto) {
    return this.inventoryModel.findByIdAndUpdate(id, updateInventoryDto, { new: true });
  }

  remove(id: string) {
    return this.inventoryModel.findByIdAndRemove(id);
  }
}
