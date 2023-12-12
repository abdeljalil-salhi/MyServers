import { Injectable } from '@nestjs/common';
import { Server } from '@prisma/client';
import { randomInt } from 'crypto';
import { PingResponse, promise } from 'ping';

import { PrismaService } from './prisma.service';
import { CreateServerDto } from '../dto/create-server.dto';
import { Status } from 'src/enums/status.enum';

@Injectable()
export class ServerService {
  constructor(private readonly prisma: PrismaService) {}

  getServers(): Promise<Server[]> {
    return this.prisma.server.findMany();
  }

  getServer(id: number): Promise<Server> {
    return this.prisma.server.findUnique({
      where: {
        id,
      },
    });
  }

  async pingServer(ipAddress: string): Promise<Server> {
    try {
      // Send ICMP Echo Request to the specified IP address
      const ping: PingResponse = await promise.probe(ipAddress);

      const server: Server = await this.prisma.server.updateMany({
        where: {
          ipAddress,
        },
        data: {
          status: ping.alive ? Status.SERVER_UP : Status.SERVER_DOWN,
        },
      })[0];
      return server;
    } catch (error) {
      return null;
    }
  }

  async saveServer(createServerDto: CreateServerDto): Promise<Server> {
    const images: string[] = [
      'server1.png',
      'server2.png',
      'server3.png',
      'server4.png',
    ];
    const server: Server = await this.prisma.server.create({
      data: {
        ...createServerDto,
        image: images[randomInt(images.length)],
      },
    });
    return server;
  }

  deleteServer(id: number): Promise<Server> {
    return this.prisma.server.delete({
      where: {
        id,
      },
    });
  }
}
