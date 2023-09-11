import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { QrService } from './qr.service';
import { CreateQrDto } from './dtos/create-qr.dto';

@Controller('qr')
export class QrController {
  constructor(private qrSvc: QrService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() body: CreateQrDto) {
    console.log(body);
    return this.qrSvc.create(body);
  }

  @Get()
  getAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.qrSvc.getAll(page, limit);
  }

  @Get(':id')
  getById(@Param() params: { id: string }) {
    return this.qrSvc.getById(params.id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Param() params: { id: string }, @Body() body: CreateQrDto) {
    return this.qrSvc.update(params.id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() params: { id: string }) {
    return this.qrSvc.delete(params.id);
  }
}
