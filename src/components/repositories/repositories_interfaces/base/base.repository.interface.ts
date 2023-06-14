import { DeepPartial } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

interface IBaseRepository<T,deleteResult = any>
{
    create(data: T | any): Promise< T | undefined>;

    findOneById(id: any): Promise<T | undefined>;

    findOneByCondition(condition: any): Promise<T | undefined>;

    findOneByIdWithRelations(id: any, relations : any): Promise<T | undefined>;
    

    findByCondition(filterCondition: any): Promise<T[] | undefined>;

    findByConditionWithRelations(filterCondition: any, relations : any): Promise<T[] | undefined>;


    findAll(): Promise<T[] | undefined>;

    findAllWithRelations(relations : any): Promise<T[] | undefined>;


    remove(entity : T): Promise<T>;


    delete(criteria : Object): Promise<deleteResult>;


    update(criteria: any, updatedData: QueryDeepPartialEntity<T>): Promise<any>

    
    save(entity: T | any) : Promise< T | undefined>;



    preload(object : DeepPartial<T>) :  Promise<T | undefined>;
}


export default IBaseRepository;
