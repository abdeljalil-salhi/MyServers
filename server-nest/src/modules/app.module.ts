import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from '../controllers/app.controller';
import { PrismaService } from 'src/services/prisma.service';
import { PrismaModule } from './prisma.module';
import { ServerModule } from './server.module';

@Module({
  imports: [
    // Configure ConfigModule with environment variables
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Import PrismaModule to make PrismaClient available to the entire application
    PrismaModule,

    ServerModule,
  ],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
