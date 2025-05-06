import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Imágenes')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
}
