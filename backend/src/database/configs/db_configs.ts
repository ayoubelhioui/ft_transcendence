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
            host:     configService.get('DB_HOST'),
            port:     +configService.get('DB_PORT'),
            username: configService.get('DB_USERNMAE'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_DATABASE'),
            entities:       [User, Achievement, Channel, Friends, ChannelMessages, ChannelBlacklist, BlockedUsers, ChannelUsers,  Game, Notification, UsersMuted, ChannelInvites, TokenBlacklist],
            synchronize:    true,
            autoSchemaSync: true
          })

          customLog(a)
          return (a)
        }
    }
}