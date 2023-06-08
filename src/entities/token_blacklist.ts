import { Entity, PrimaryColumn } from 'typeorm';


@Entity()
class TokenBlacklist {
    @PrimaryColumn()
    public token: string;
}

export default TokenBlacklist