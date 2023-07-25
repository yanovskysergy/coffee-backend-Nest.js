import { IsString, IsNotEmpty } from "class-validator";

export class CreateInventoryDto {
  @IsString()
  name: string;
}
