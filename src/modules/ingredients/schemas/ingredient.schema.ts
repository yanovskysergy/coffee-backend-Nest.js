import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Unit } from "src/shared/types";

export type IngredientDocument = HydratedDocument<Ingredient>;

@Schema()
export class Ingredient {
  @Prop()
  name: string;

  @Prop()
  unit: Unit;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);