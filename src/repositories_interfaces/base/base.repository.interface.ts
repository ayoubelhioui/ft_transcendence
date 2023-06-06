
interface IBaseRepository<T,deleteResult = any>
{
    create(data: T | any): Promise< T | undefined>;

    findOneById(id: any): Promise<T | undefined>;

    findByCondition(filterCondition: any): Promise<T[] | undefined>;

    findAll(): Promise<T[] | undefined>;

    remove(criteria : any): Promise<deleteResult>;

    findWithRelations(relations: any): Promise<T[] | undefined>;
}


export default IBaseRepository;
