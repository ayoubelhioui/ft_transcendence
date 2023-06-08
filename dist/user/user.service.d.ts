import { Repository } from 'typeorm';
import { User } from 'src/entities';
import { UserDto } from 'src/dto/user.dto';
import TokenBlacklist from 'src/entities/token_blacklist';
import { TokensDto } from 'src/dto/tokens.dto';
export declare class UserService {
    private readonly userRepository;
    private readonly tokenBlacklistRepository;
    constructor(userRepository: Repository<User>, tokenBlacklistRepository: Repository<TokenBlacklist>);
    createUser(createUserDto: UserDto): Promise<void>;
    initializeUserDto(createUserDto: UserDto): void;
    findUserById(IntraId: number): Promise<User>;
    addingTokensToBlacklist(tokensDto: TokensDto): Promise<void>;
    refreshTokenInBlacklist(token: string): Promise<boolean>;
    accessTokenInBlacklist(token: string): Promise<boolean>;
}
