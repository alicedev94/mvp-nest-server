import { IsNotEmpty, IsString, IsIn } from 'class-validator';

export class UpdateStatusDto {
  @IsNotEmpty({ message: 'El status debe ser enviado' })
  @IsString({ message: 'El status debe ser una cadena' })
  @IsIn(['0', '1'], { message: 'El status debe ser 0 o 1' })
  status: string;
}
