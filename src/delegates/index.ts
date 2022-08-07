import { DelegatesToResource } from './DelegatesToResource';

export class Resource extends DelegatesToResource {
    private data: any;

    constructor(object: Object) {
        super(object);

        this.data = this.toArray();

        return this.data;
    }

    static collection(array: any) {
        array = array || [];

        const collection: object[] = array.data ? array.data : array;

        const data: Resource[] = collection.map(item => new this(item));

        if (array.data) {
            return Object.assign({}, array, {
                data,
            });
        }

        return data
    }

    public toArray() {
        return Object.assign({}, this.resource);
    }
}
