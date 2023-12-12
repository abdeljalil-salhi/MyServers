import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  /**
   * Creates an instance of the PrismaService class.
   */
  constructor() {
    super({
      log: ['query', 'info', 'warn'],
    });
  }

  /**
   * Establishes a database connection when the module initializes.
   * @returns {Promise<void>}
   */
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }
}
