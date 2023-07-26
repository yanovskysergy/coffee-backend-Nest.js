import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose'

export type SaleDocument = HydratedDocument<Sale>;

@Schema({ timestamps: true })
export class Sale {
  @Prop({
    type: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      inventories: [{
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Inventory",
          required: true,
        },
        value: { type: Number, required: true }
      }],
      ingredients: [{
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Ingredient",
          required: true,
        },
        value: { type: Number, required: true }
      }]
    }
  })
  product: {
    _id: mongoose.Types.ObjectId,
    inventories: [{ _id: mongoose.Types.ObjectId, value: number }],
    ingredients: [{ _id: mongoose.Types.ObjectId, value: number }]
  };
}

export const SaleSchema = SchemaFactory.createForClass(Sale);