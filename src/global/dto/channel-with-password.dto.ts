import { ChannelsVisibility } from '../types/channel-visibility.type';

export class ChannelWithPassword {
    id: number;
    name: string;
    password: string;
    visibility: ChannelsVisibility;
    isGroup : boolean;
}