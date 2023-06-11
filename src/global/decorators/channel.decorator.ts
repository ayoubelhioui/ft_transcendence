import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetChannel = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.channel;
  },
);