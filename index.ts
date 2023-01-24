import {Model, RelationMappingsThunk} from "objection";

const Example = async () => {
    const customer = await Customer.query().findById("123").throwIfNotFound();
    /**
     * The program relation on customer is an optional relation. I would expect this to be returned from $relatedQuery
     * as optional, but the typing is just Program
     */
    const program = await customer.$relatedQuery("program");
    console.log(program.id);
}


class Program extends Model {
    static tableName = "user";

    id!: string;
}

class Customer extends Model {
    static tableName = "test";

    programId?: string;
    program?: Program;


    static relationMappings: RelationMappingsThunk = () => ({
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: Program,
            join: {
                from: `${Customer.tableName}.programId`,
                to: `${Program.tableName}.id`,
            },
        },
    });
}
