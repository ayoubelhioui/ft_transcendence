import { Body, Injectable, NestMiddleware } from '@nestjs/common';
import { ValidationPasswordPipe } from '../pipe/validation-password.pipe';
import { CreateChannelDto } from '../dto/create-channel.dto';


@Injectable()
export class ValidationPasswordMiddleware implements NestMiddleware {
  constructor(private readonly validationPasswordPipe: ValidationPasswordPipe) {}

  use(req: any, res: any, next: () => void) {
    this.validationPasswordPipe.transform(req.body);
    next();
  }
}