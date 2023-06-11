import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { CreateChannelDto } from '../dto/create-channel.dto';
import { ChannelsVisibility } from '../types/channel-visibility.type';


@Injectable()
export class ValidationPasswordPipe implements PipeTransform {
  transform(createChannelDto: CreateChannelDto) {
    if (createChannelDto.password && createChannelDto.password.length) {
      if (createChannelDto.visibility != ChannelsVisibility.protected)
        throw  new BadRequestException('password must be set only for a Protected Channel');
    }
    else
    {
      if (createChannelDto.visibility == ChannelsVisibility.protected)
        throw  new BadRequestException('Empty Password');
    }
    return (createChannelDto);
  }
}