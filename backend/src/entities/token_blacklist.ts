import { Entity, PrimaryColumn } from 'typeorm';


@Entity()
class TokenBlacklist {
    
    @PrimaryColumn()
    public Token: string;
}

export default TokenBlacklist