import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { Server } from '@prisma/client';

import { Status } from 'src/enums/status.enum';
import { ResponseDto } from 'src/dto/response-dto';
import { ServerService } from '../services/server.service';
import { CreateServerDto } from '../dto/create-server.dto';

@ApiTags('server')
@Controller('server')
export class ServerController {
  constructor(private readonly serversService: ServerService) {}

  @ApiOperation({ summary: 'Get all servers' })
  @ApiResponse({
    status: 200,
    description: 'The servers have been successfully retrieved.',
  })
  @ApiBadRequestResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Get('/list')
  async getServers(@Res() res: Response): Promise<Response> {
    try {
      const servers: Server[] = await this.serversService.getServers();

      const response: ResponseDto = {
        timestamp: new Date(),
        statusCode: HttpStatus.OK,
        httpStatus: 'OK',
        reason: 'Success',
        message: 'Servers retrieved',
        detailedMessage: '',
        data: {
          servers,
        },
      };

      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      const response: ResponseDto = {
        timestamp: new Date(),
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        httpStatus: 'INTERNAL_SERVER_ERROR',
        reason: 'Error',
        message: 'Unable to retrieve servers',
        detailedMessage: 'Internal server error',
        data: null,
      };

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
    }
  }

  @ApiOperation({ summary: 'Get a server' })
  @ApiResponse({
    status: 200,
    description: 'The server has been successfully retrieved.',
  })
  @ApiParam({
    name: 'id',
    description: 'The server ID',
    type: 'number',
    example: 1,
  })
  @ApiBadRequestResponse({
    status: 404,
    description: 'Server not found',
  })
  @ApiBadRequestResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Get('/get/:id')
  async getServer(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    try {
      const server: Server = await this.serversService.getServer(+id);

      if (!server) {
        const response: ResponseDto = {
          timestamp: new Date(),
          statusCode: HttpStatus.NOT_FOUND,
          httpStatus: 'NOT_FOUND',
          reason: 'Error',
          message: 'Server not found',
          detailedMessage: '',
          data: null,
        };

        return res.status(HttpStatus.NOT_FOUND).json(response);
      }

      const response: ResponseDto = {
        timestamp: new Date(),
        statusCode: HttpStatus.OK,
        httpStatus: 'OK',
        reason: 'Success',
        message: 'Server retrieved',
        detailedMessage: '',
        data: {
          server,
        },
      };

      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      const response: ResponseDto = {
        timestamp: new Date(),
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        httpStatus: 'INTERNAL_SERVER_ERROR',
        reason: 'Error',
        message: 'Unable to retrieve server',
        detailedMessage: 'Internal server error',
        data: null,
      };

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
    }
  }

  @ApiOperation({ summary: 'Ping a server' })
  @ApiResponse({
    status: 200,
    description: 'The server has been successfully pinged.',
  })
  @ApiParam({
    name: 'ipAddress',
    description: 'The server IP address',
    type: 'string',
    example: '192.168.1.7',
  })
  @ApiBadRequestResponse({
    status: 404,
    description: 'Server not found',
  })
  @ApiBadRequestResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Get('/ping/:ipAddress')
  async pingServer(
    @Res() res: Response,
    @Param('ipAddress') ipAddress: string,
  ): Promise<Response> {
    try {
      const pingedServer: Server =
        await this.serversService.pingServer(ipAddress);

      if (!pingedServer) {
        const response: ResponseDto = {
          timestamp: new Date(),
          statusCode: HttpStatus.NOT_FOUND,
          httpStatus: 'NOT_FOUND',
          reason: 'Error',
          message: 'Server not found',
          detailedMessage: '',
          data: null,
        };

        return res.status(HttpStatus.NOT_FOUND).json(response);
      }

      const response: ResponseDto = {
        timestamp: new Date(),
        statusCode: HttpStatus.OK,
        httpStatus: 'OK',
        reason: 'Success',
        message:
          pingedServer.status == Status.SERVER_UP
            ? 'Ping success'
            : 'Ping failed',
        detailedMessage: '',
        data: {
          server: pingedServer,
        },
      };

      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      const response: ResponseDto = {
        timestamp: new Date(),
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        httpStatus: 'INTERNAL_SERVER_ERROR',
        reason: 'Error',
        message: 'Unable to ping server',
        detailedMessage: 'Internal server error',
        data: null,
      };

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
    }
  }

  @ApiOperation({ summary: 'Save a server' })
  @ApiBody({
    type: CreateServerDto,
    description: 'The server data',
    examples: {
      'Basic server': {
        value: {
          ipAddress: '192.168.1.17',
          name: 'Windows 10',
          memory: '8 GB',
          type: 'Personal laptop',
          status: 'SERVER_UP',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The server has been successfully saved.',
  })
  @ApiBadRequestResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Post('/save')
  async save(
    @Res() res: Response,
    @Body() createServerDto: CreateServerDto,
  ): Promise<Response> {
    try {
      const server: Server =
        await this.serversService.saveServer(createServerDto);

      const response: ResponseDto = {
        timestamp: new Date(),
        statusCode: HttpStatus.CREATED,
        httpStatus: 'CREATED',
        reason: 'Success',
        message: 'Server created',
        detailedMessage: '',
        data: {
          server,
        },
      };

      return res.status(HttpStatus.CREATED).json(response);
    } catch (error) {
      const response: ResponseDto = {
        timestamp: new Date(),
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        httpStatus: 'INTERNAL_SERVER_ERROR',
        reason: 'Error',
        message: 'Unable to save server',
        detailedMessage: 'Internal server error',
        data: null,
      };

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
    }
  }

  @ApiOperation({ summary: 'Delete a server' })
  @ApiParam({
    name: 'id',
    description: 'The server ID',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'The server has been successfully deleted.',
  })
  @ApiBadRequestResponse({
    status: 404,
    description: 'Server not found',
  })
  @ApiBadRequestResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Delete('/delete/:id')
  async deleteServer(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    try {
      const server: Server = await this.serversService.deleteServer(+id);

      if (!server) {
        const response: ResponseDto = {
          timestamp: new Date(),
          statusCode: HttpStatus.NOT_FOUND,
          httpStatus: 'NOT_FOUND',
          reason: 'Error',
          message: 'Server not found',
          detailedMessage: '',
          data: null,
        };

        return res.status(HttpStatus.NOT_FOUND).json(response);
      }

      const response: ResponseDto = {
        timestamp: new Date(),
        statusCode: HttpStatus.OK,
        httpStatus: 'OK',
        reason: 'Success',
        message: 'Server deleted',
        detailedMessage: '',
        data: {
          server,
        },
      };

      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      const response: ResponseDto = {
        timestamp: new Date(),
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        httpStatus: 'INTERNAL_SERVER_ERROR',
        reason: 'Error',
        message: 'Unable to delete server',
        detailedMessage: 'Internal server error',
        data: null,
      };

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
    }
  }
}
