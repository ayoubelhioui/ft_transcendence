import { Exclude } from "class-transformer";
import { ChannelsVisibility } from "../types/channel-visibility.type";
import { User } from "src/database/entities";

export class ReturnedChannelDto {

    id : number;
    
    name: string;

    visibility : ChannelsVisibility;

    isGroup?: boolean;

    @Exclude()
    password : string;

    @Exclude()
    owner : User;
}