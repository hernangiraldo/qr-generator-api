import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EQrType } from '../entities/enums/qr-type';

@Schema()
export class Qr extends Document {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    enum: EQrType,
    required: true,
  })
  type: EQrType;

  @Prop({
    type: String,
    required: true,
  })
  value: string;
}

export const QrSchema = SchemaFactory.createForClass(Qr);
