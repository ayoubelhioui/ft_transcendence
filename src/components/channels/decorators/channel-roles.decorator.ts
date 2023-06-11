import {SetMetadata} from '@nestjs/common';
import { ChannelUserRole } from '../types/channel-user-roles';

export const ChannelRoles = (...roles: ChannelUserRole[]) => SetMetadata('channelRoles', roles);