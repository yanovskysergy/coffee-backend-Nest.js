import { IsBoolean, IsDefined, IsNumber, IsString, Validate, ValidateNested } from "class-validator";
import { IsIngredientExist } from "../../ingredients/ingredients.validators";
import { Type } from "class-transformer";
import { Injectable } from "@nestjs/common";
import { IsInventoryExist } from "../../inventories/inventories.validators";

class IngredientItem {
  @IsDefined()
  @IsString()
  @IsIngredientExist({ message: ({ value }) => `Can't create product cause ingredient with id ${value} is not exist` })
  _id: string;

  @IsDefined()
  @IsNumber()
  value: number;

  @IsDefined()
  @IsBoolean()
  optional: boolean;
}

class InventoryItem {
  @IsDefined()
  @IsString()
  @IsInventoryExist({ message: ({ value }) => `Can't create product cause inventory with id ${value} is not exist` })
  _id: string;

  @IsDefined()
  @IsNumber()
  value: number;

  @IsDefined()
  @IsBoolean()
  optional: boolean;
}

@Injectable()
export class CreateProductDto {
  @IsString()
  name: string;

  @ValidateNested({ each: true })
  @Type(() => IngredientItem)
  ingredients: IngredientItem[]

  @ValidateNested({ each: true })
  @Type(() => InventoryItem)
  inventories: InventoryItem[]
}
