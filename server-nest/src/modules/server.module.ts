import { Module } from '@nestjs/common';

import { ServerService } from '../services/server.service';
import { ServerController } from '../controllers/server.controller';
import { PrismaModule } from './prisma.module';

@Module({
  controllers: [ServerController],
  providers: [ServerService],
  imports: [PrismaModule],
})
export class ServerModule {}
