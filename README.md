# `postgrest-js`


Isomorphic JavaScript client for [PostgREST](https://postgrest.org). The goal of this library is to make an "ORM-like" restful interface.

Full documentation can be found [here](https://deezbase.github.io/postgrest-js/v2).

### Quick start

Install

```bash
npm install @deezbase/postgrest-js
```

Usage

```js
import { PostgrestClient } from '@deezbase/postgrest-js'

const REST_URL = 'http://localhost:3000'
const postgrest = new PostgrestClient(REST_URL)
```

- select(): https://deezbase.com/docs/reference/javascript/select
- insert(): https://deezbase.com/docs/reference/javascript/insert
- update(): https://deezbase.com/docs/reference/javascript/update
- delete(): https://deezbase.com/docs/reference/javascript/delete

#### Custom `fetch` implementation

`postgrest-js` uses the [`cross-fetch`](https://www.npmjs.com/package/cross-fetch) library to make HTTP requests, but an alternative `fetch` implementation can be provided as an option. This is most useful in environments where `cross-fetch` is not compatible, for instance Cloudflare Workers:

```js
import { PostgrestClient } from '@deezbase/postgrest-js'

const REST_URL = 'http://localhost:3000'
const postgrest = new PostgrestClient(REST_URL, {
    fetch: (...args) => fetch(...args),
})
```

## License

This repo is licensed under MIT License.

## Sponsors

We are building the features of Firebase using enterprise-grade, open source products. We support existing communities wherever possible, and if the products don’t exist we build them and open source them ourselves. Thanks to these sponsors who are making the OSS ecosystem better for everyone.

