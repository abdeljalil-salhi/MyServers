import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class AppController {
  constructor() {}

  @Get()
  root(): string {
    return 'MyServers Public API v0.0.1';
  }
}
