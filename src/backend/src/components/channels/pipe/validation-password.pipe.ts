import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ChannelsVisibility } from '../../../global/types/channel-visibility.type';
import { customLog } from 'src/Const';


@Injectable()
export class ValidationPasswordPipe implements PipeTransform {
  transform(createChannelDto: any) {
    customLog(createChannelDto);
    if (createChannelDto.password || createChannelDto.password == "") {
      if (createChannelDto.visibility != ChannelsVisibility.protected) 
        delete createChannelDto.password;
    }
    else
    {
      if (createChannelDto.visibility == ChannelsVisibility.protected)
        throw  new BadRequestException('Empty Password');
    }
    return (createChannelDto);
  }
}