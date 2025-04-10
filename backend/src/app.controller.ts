import { Controller, Get } from '@nestjs/common';

// @Controller('hello') nghĩa là API này có đường dẫn /hello
// @Get() nghĩa là đây là phương thức GET

@Controller('hello')
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello from NestJS!';
  }
}
