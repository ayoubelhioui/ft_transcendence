import {SetMetadata} from '@nestjs/common';

export const IsSocket = (isSocket: boolean) => SetMetadata('isSocket', isSocket);