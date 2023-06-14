import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetTargetedChannelUsers = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.channelTargetedUser;
  },
);
