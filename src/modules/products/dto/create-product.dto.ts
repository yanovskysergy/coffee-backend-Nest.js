import { IsBoolean, IsDefined, IsNumber, IsString, Validate, ValidateNested } from "class-validator";
import { IsIngredientExist } from "../../ingredients/ingredients.validators";
import { Type } from "class-transformer";
import { Injectable } from "@nestjs/common";
import { IsInventoryExist } from "../../inventories/inventories.validators";
import { ApiProperty } from "@nestjs/swagger";

class ProductIngredientItem {
  @ApiProperty({ type: String })
  @IsDefined()
  @IsString()
  @IsIngredientExist({ message: ({ value }) => `Can't create product cause ingredient with id ${value} is not exist` })
  _id: string;

  @ApiProperty({ type: Number })
  @IsDefined()
  @IsNumber()
  value: number;

  @ApiProperty({ type: Boolean })
  @IsDefined()
  @IsBoolean()
  optional: boolean;
}

class ProductInventoryItem {
  @ApiProperty({ type: String })
  @IsDefined()
  @IsString()
  @IsInventoryExist({ message: ({ value }) => `Can't create product cause inventory with id ${value} is not exist` })
  _id: string;

  @ApiProperty({ type: Number })
  @IsDefined()
  @IsNumber()
  value: number;

  @ApiProperty({ type: Boolean })
  @IsDefined()
  @IsBoolean()
  optional: boolean;
}

@Injectable()
export class CreateProductDto {
  @ApiProperty({ type: String })
  @IsString()
  name: string;

  @ApiProperty({ type: [ProductIngredientItem] })
  @ValidateNested({ each: true })
  @Type(() => ProductIngredientItem)
  ingredients: ProductIngredientItem[]

  @ApiProperty({ type: [ProductInventoryItem] })
  @ValidateNested({ each: true })
  @Type(() => ProductInventoryItem)
  inventories: ProductInventoryItem[]
}
