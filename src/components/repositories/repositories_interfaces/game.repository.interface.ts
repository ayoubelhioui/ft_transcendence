import { MatchHistory } from 'src/database/entities';
import IBaseRepository from "./base/base.repository.interface";


//TO ADD extra custom methods
interface IGamesRepository extends IBaseRepository<MatchHistory>
{
    
}

export default IGamesRepository;