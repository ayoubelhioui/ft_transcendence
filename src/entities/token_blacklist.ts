import { Entity, PrimaryColumn } from 'typeorm';


@Entity()
class TokenBlacklist {
    
    @PrimaryColumn()
    public access_token: string;

    @PrimaryColumn()
    public refresh_token: string;
    
}

export default TokenBlacklist