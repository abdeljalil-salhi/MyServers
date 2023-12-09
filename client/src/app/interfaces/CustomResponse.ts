import { Server } from './Server';

export interface CustomResponse {
  timestamp: Date;
  statusCode: number;
  httpStatus: string;
  reason: string;
  message: string;
  detailedMessage: string;
  data: {
    serversCount: number;
    server?: Server;
    servers?: Server[];
  };
}
