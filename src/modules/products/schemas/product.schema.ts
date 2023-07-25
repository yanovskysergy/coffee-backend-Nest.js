import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose'

export type ProductDocument = HydratedDocument<Product>;

interface RefItem {
  _id: string,
  value: number,
  optional: boolean,
}

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop({ type: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ingredient",
        required: true,
      },
      value: { type: Number, required: true },
      optional: { type: Boolean, default: false },
    },
  ]})
  ingredients: RefItem[];

  @Prop({ type: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Inventory",
        required: true,
      },
      value: { type: Number, required: true },
      optional: { type: Boolean, default: false },
    },
  ]})
  inventories: RefItem[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);