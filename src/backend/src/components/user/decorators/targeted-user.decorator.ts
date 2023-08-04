import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetTargetedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.targetedUser;
  },
);