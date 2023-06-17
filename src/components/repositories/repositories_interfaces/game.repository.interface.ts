import { Game } from 'src/database/entities';
import IBaseRepository from "./base/base.repository.interface";


//TO ADD extra custom methods
interface IGamesRepository extends IBaseRepository<Game>
{
    
}

export default IGamesRepository;