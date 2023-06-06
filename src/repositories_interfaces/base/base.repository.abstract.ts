import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/database/entities";
import { IUserRepository } from "src/repositories_interfaces";
import { DeleteResult, FindOneOptions, FindOptionsWhere, Repository } from "typeorm";
import IBaseRepository from "./base.repository.interface";

//TypeOrm abstract base class
abstract class ABaseRepository<T> implements IBaseRepository<T,DeleteResult>
{
    protected abstract entity: Repository<T>;

    async create(entity: T): Promise< T | undefined> {
        const newEntity: T | undefined = await this.entity.create(entity);
        return await this.entity.save(newEntity);
    }
    
    
    async findOneById(id: any): Promise< T | undefined > 
    {
        const findOptions: FindOneOptions<T> = {
            where: {
              id: id,
            } as FindOptionsWhere<T>,
        };
        return (await this.entity.findOne(findOptions));
    }
    
    async findByCondition(filterCondition: any): Promise<T[] | undefined> {
        return await this.entity.find({
          where: filterCondition,
        });
    }
    
    async findAll(): Promise<T[] | undefined> {
        return await this.entity.find();
    }
    
    async remove(criteria: any): Promise<DeleteResult> {
        return await this.entity.delete(criteria);
    }
    
    async findWithRelations(relations: any): Promise<T[] | undefined> {
        return await this.entity.find({
          relations,
        });
    }
}


export default ABaseRepository;