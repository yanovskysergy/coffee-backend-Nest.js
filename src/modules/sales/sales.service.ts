import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sale } from './schemas/sale.schema';

@Injectable()
export class SalesService {
  constructor(@InjectModel(Sale.name) private saleModel: Model<Sale>) {}

  create(createSaleDto: CreateSaleDto) {
    const sale = new this.saleModel(createSaleDto);
    return sale.save();
  }

  async findAll() {
    return this.saleModel.find();
  }

  findOne(id: string) {
    return this.saleModel.findById(id);
  }

  update(id: string, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: string) {
    return `This action removes a #${id} sale`;
  }
}
