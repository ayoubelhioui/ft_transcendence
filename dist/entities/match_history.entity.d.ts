import { User } from './index';
declare class MatchHistory {
    id: number;
    player1: User;
    player2: User;
    player1_score: number;
    player2_score: number;
    match_time_end: Date;
    type: boolean;
}
export default MatchHistory;
