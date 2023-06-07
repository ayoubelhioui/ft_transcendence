import { Module } from '@nestjs/common';
import { GroupInvitesService } from './group_invites.service';
import { GroupInvitesController } from './group_invites.controller';

@Module({
  providers: [GroupInvitesService],
  controllers: [GroupInvitesController]
})
export class GroupInvitesModule {}
