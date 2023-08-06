import { ChannelInvites ,Achievement, BlockedUsers, Channel, ChannelBlacklist, ChannelMessages, ChannelUsers, Friends, Game, Notification, UsersMuted, User } from 'src/database/entities';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from 'src/components/auth/auth.module';
import TokenBlacklist from '../entities/token_blacklist';
import { customLog } from 'src/Const';

export default function typeOrmConfigs() : any {
    return {
        imports: [AuthModule, ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          let a = ({
            type:     'postgres',
            host:     configService.get('PG_HOST'),
            port:     +configService.get('PG_PORT'),
            username: configService.get('PG_USER'),
            password: configService.get('PG_PASSWORD'),
            database: configService.get('PG_DATABASE'),
            entities:       [User, Achievement, Channel, Friends, ChannelMessages, ChannelBlacklist, BlockedUsers, ChannelUsers,  Game, Notification, UsersMuted, ChannelInvites, TokenBlacklist],
            synchronize:    true,
            autoSchemaSync: true
          })

          return (a)
        }
    }
}