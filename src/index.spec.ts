
interface Posts {
    topic: string;
}

interface User {
    id: number;
    fname: string;
    lname: string;
    created_at: string;
    updated_at: string;
    posts?: Posts[];
}

const data: User[] = [{
    id: 1,
    fname: 'lalalan',
    lname: 'nana',
    created_at: '1990-02-01',
    updated_at: '2000-02-01',
    posts: [{
        topic: 'im cool'
    },
    {
        topic: 'so cool cool'
    }
    ]
}, {
    id: 2,
    fname: 'bababan',
    lname: 'nana',
    created_at: '1990-02-01',
    updated_at: '2000-02-01'
}]

const dataNotobject: undefined = undefined;

import { Resource } from "./index";

class UserCollection {

    constructor(data: object) {
        return {
            api: "v1",
            meta: {
                next: "---",
                prev: "---"
            },
            data: data
        }
    }
}

class PostResource extends Resource {
    topic: string;

    toArray() {
        return {
            topic: this.topic
        }
    }
}

class UserResource extends Resource {
    id: number;
    fname: string;
    created_at: string;
    updated_at: string;
    posts: Posts[];
    lname: string;

    toArray() {
        return {
            id: this.id,
            fname: this.fname,
            lname: this.lname,
            posts: PostResource.collection(this.posts,),
            created_at: this.created_at,
            updated_at: this.updated_at,
        }
    }
}

class BlankResource extends Resource {
}

describe('testing index file', () => {
    test('should transform a collection.', () => {
        const collection = UserResource.collection(data);

        expect(collection).toEqual(
            [
                {
                    "id": 1,
                    "fname": "lalalan",
                    "lname": "nana",
                    "posts": [
                        {
                            "topic": "im cool"
                        },
                        {
                            "topic": "so cool cool"
                        }
                    ],
                    "created_at": "1990-02-01",
                    "updated_at": "2000-02-01"
                },
                {
                    "id": 2,
                    "fname": "bababan",
                    "lname": "nana",
                    "posts": [

                    ],
                    "created_at": "1990-02-01",
                    "updated_at": "2000-02-01"
                }
            ]
        );
    });

    test('should transform a single item.', () => {
        const resource = new UserResource(data[0]);

        expect(resource).toEqual(
            {
                "id": 1,
                "fname": "lalalan",
                "lname": "nana",
                "posts": [
                    {
                        "topic": "im cool"
                    },
                    {
                        "topic": "so cool cool"
                    }
                ],
                "created_at": "1990-02-01",
                "updated_at": "2000-02-01"
            }
        );
    });

    test('should transform a collection with the data key.', () => {
        const collection = UserResource.collection({ data: data });

        expect(collection).toEqual(
            {
                "data": [
                    {
                        "id": 1,
                        "fname": "lalalan",
                        "lname": "nana",
                        "posts": [
                            {
                                "topic": "im cool"
                            },
                            {
                                "topic": "so cool cool"
                            }
                        ],
                        "created_at": "1990-02-01",
                        "updated_at": "2000-02-01"
                    },
                    {
                        "id": 2,
                        "fname": "bababan",
                        "lname": "nana",
                        "posts": [

                        ],
                        "created_at": "1990-02-01",
                        "updated_at": "2000-02-01"
                    }
                ]
            }
        );
    });

    test('should transform a collection wrapper.', () => {
        const collection = UserResource.collection(new UserCollection(data));

        expect(collection).toEqual(
            {
                "api": "v1",
                "meta": {
                    "next": "---",
                    "prev": "---"
                },
                "data": [
                    {
                        "id": 1,
                        "fname": "lalalan",
                        "lname": "nana",
                        "posts": [
                            {
                                "topic": "im cool"
                            },
                            {
                                "topic": "so cool cool"
                            }
                        ],
                        "created_at": "1990-02-01",
                        "updated_at": "2000-02-01"
                    },
                    {
                        "id": 2,
                        "fname": "bababan",
                        "lname": "nana",
                        "posts": [

                        ],
                        "created_at": "1990-02-01",
                        "updated_at": "2000-02-01"
                    }
                ]
            }
        );
    });

    test('should transform a single item data kay with collection wrapper.', () => {
        const collection = UserResource.collection(new UserCollection([data[1]]));

        expect(collection).toEqual(
            {
                "api": "v1",
                "meta": {
                    "next": "---",
                    "prev": "---"
                },
                "data": [
                    {
                        "id": 2,
                        "fname": "bababan",
                        "lname": "nana",
                        "posts": [

                        ],
                        "created_at": "1990-02-01",
                        "updated_at": "2000-02-01"
                    }
                ]
            }
        );
    });

    test('should transform a single item without toArray.', () => {
        const resource = new BlankResource(data[0]);

        expect(resource).toEqual(
            {
                "id": 1,
                "fname": "lalalan",
                "lname": "nana",
                "created_at": "1990-02-01",
                "updated_at": "2000-02-01",
                "posts": [
                    {
                        "topic": "im cool"
                    },
                    {
                        "topic": "so cool cool"
                    }
                ]
            }
        );
    });

    test('should transform a data not object.', () => {
        const resource = new BlankResource(dataNotobject);

        expect(resource).toEqual(
            {}
        );
    });


});

