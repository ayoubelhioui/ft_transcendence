import { DeepPartial } from "typeorm";

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

    findByOptions(options : any) : Promise<T[] | undefined> ;
    findOneByOptions(options : any) : Promise<T | undefined>;

    remove(entity: T): Promise<T>; 

    delete(criteria: Object): Promise<deleteResult>;
    
    save(entity: T | any) : Promise< T | undefined>;



    preload(object : DeepPartial<T>) :  Promise<T | undefined>;

    update(criteria : any,  partialEntity: any);
}


export default IBaseRepository;
