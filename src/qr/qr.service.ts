import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateQrDto } from './dtos/create-qr.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Qr } from './schemas/qr.schema';

@Injectable()
export class QrService {
  constructor(@InjectModel('Qr') private readonly qrModel: Model<Qr>) {}

  async create(body: CreateQrDto): Promise<{ qrId: string }> {
    try {
      const qr = await this.qrModel.create(body);
      return {
        qrId: qr._id,
      };
    } catch (err) {
      throw new InternalServerErrorException('QR code not found');
    }
  }

  async getAll(
    page: number,
    limit: number,
  ): Promise<{ data: Qr[]; total: number }> {
    const total = await this.qrModel.countDocuments().exec();
    const data = await this.qrModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return {
      data,
      total,
    };
  }

  async getById(id: string) {
    const qr = await this.qrModel.findById(id).exec();

    if (!qr) {
      throw new NotFoundException('QR code not found');
    }

    return qr;
  }

  update(id: string, body: CreateQrDto) {
    try {
      this.qrModel.updateOne({ _id: id }, body).exec();
    } catch (err) {
      throw new InternalServerErrorException('QR code not found');
    }
  }

  async delete(id: string): Promise<any> {
    try {
      return await this.qrModel.deleteOne({ _id: id }).exec();
    } catch (err) {
      throw new InternalServerErrorException('QR code not found');
    }
  }
}
