import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUrl,
  ValidateIf,
} from 'class-validator';
import { EQrType } from '../entities/enums/qr-type';

export class CreateQrDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(EQrType)
  @IsNotEmpty()
  type: EQrType;

  @ValidateIf((o) => o.type !== EQrType.LOCATION)
  @IsUrl()
  @IsString()
  @IsNotEmpty()
  value: string;
}
