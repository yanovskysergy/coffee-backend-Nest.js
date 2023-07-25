import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum } from 'class-validator';
import { Unit } from 'src/shared/types';

export class CreateIngredientDto {
  @ApiProperty({ type: String })
  @IsString()
  name: string;
  
  @ApiProperty({ enum: Object.values(Unit) })
  @IsEnum(Unit)
  unit: Unit;
}
