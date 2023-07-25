import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CreateInventoryDto {
  @ApiProperty({ type: String })
  @IsString()
  name: string;
}
