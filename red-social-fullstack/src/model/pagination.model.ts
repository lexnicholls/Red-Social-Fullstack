import { ApiProperty } from '@nestjs/swagger';

export class Pagination<T> {
  @ApiProperty()
  page: number;
  @ApiProperty()
  limit: number;
  @ApiProperty()
  data: T;
}
