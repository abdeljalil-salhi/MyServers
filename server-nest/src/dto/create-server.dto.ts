import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('server')
export class CreateServerDto {
  @ApiProperty()
  ipAddress: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  memory: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  status: string;
}
