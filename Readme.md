[![npm version](https://badge.fury.io/js/rc-transforms.svg)](https://badge.fury.io/js/rc-transforms)
[![Coverage Status](https://coveralls.io/repos/github/Thanatad/ts-rc-transforms/badge.svg?branch=main)](https://coveralls.io/github/Thanatad/ts-rc-transforms?branch=main)
[![Build Status](https://app.travis-ci.com/Thanatad/ts-rc-transforms.svg?branch=main)](https://app.travis-ci.com/Thanatad/ts-rc-transforms)

# rc-transforms
A transformation layer that sits between orm and json responses

Inspired by Laravels [Eloquent API Resources](https://laravel.com/docs/9.x/eloquent-resources).

# Installation
```bash
npm i rc-transforms
```
or
```bash
pnpm add rc-transforms
```

# Programmatic Usage

Create a resource file, `UserResource.ts`.

```ts
import { Resource } from "rc-transforms";

export class UserResource extends Resource {
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
```

Create some data and interface, maybe in `data.ts`
```ts
export interface Posts {
    topic: string;
}

export interface User {
    id: number;
    fname: string;
    lname: string;
    created_at: string;
    updated_at: string;
    posts?: Posts[];
}

export const data: User[] = [{
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
```

you can transform a single item:
```TS
const resource = new UserResource(data[0]);
console.log(resource);
/**
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
 */
```

you can transform a all of them:
```TS
const collection = UserResource.collection(data);
console.log(collection);
/**
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
 */
```