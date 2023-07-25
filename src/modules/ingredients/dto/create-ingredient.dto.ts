import { IsString, IsEnum } from 'class-validator';
import { Unit } from 'src/shared/types';

export class CreateIngredientDto {
  @IsString()
  name: string;
  
  @IsEnum(Unit)
  unit: Unit;
}
