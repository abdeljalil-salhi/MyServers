import { Server } from '@prisma/client';

export class ResponseDto {
  timestamp: Date;
  statusCode: number;
  httpStatus: string;
  reason: string;
  message: string;
  detailedMessage: string;
  data:
    | {
        server: Server;
      }
    | {
        servers: Server[];
      }
    | null;
}
