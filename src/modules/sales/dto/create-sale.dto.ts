import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDefined, IsNotEmptyObject, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";
import { IsIngredientExist } from "src/modules/ingredients/ingredients.validators";
import { IsInventoryExist } from "src/modules/inventories/inventories.validators";
import { IsProductExist } from "src/modules/products/products.validators";

class SaleIngredientItem {
  @ApiProperty({ type: String })
  @IsDefined()
  @IsString()
  @IsIngredientExist()
  _id: string;

  @ApiProperty({ type: Number })
  @IsDefined()
  @IsNumber()
  value: number;
}

class SaleInventoryItem {
  @ApiProperty({ type: String })
  @IsDefined()
  @IsString()
  @IsInventoryExist()
  _id: string;

  @ApiProperty({ type: Number })
  @IsDefined()
  @IsNumber()
  value: number;
}

class SaleProductItem {
  @ApiProperty({ type: String })
  @IsDefined()
  @IsString()
  @IsProductExist()
  _id: string;
  
  @ApiProperty({ type: [SaleIngredientItem] })
  @ValidateNested({ each: true })
  @Type(() => SaleIngredientItem)
  ingredients: [SaleIngredientItem];

  @ApiProperty({ type: [SaleInventoryItem] })
  @ValidateNested({ each: true })
  @Type(() => SaleInventoryItem)
  inventories: [SaleInventoryItem];
}

@Injectable()
export class CreateSaleDto {
  @ApiProperty({ type: SaleProductItem })
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => SaleProductItem)
  product: SaleProductItem
}
