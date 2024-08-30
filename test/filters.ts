import { PostgrestClient } from '../src/index'
import { Database } from './types'

const postgrest = new PostgrestClient<Database>('http://localhost:3000')

test('not', async () => {
    const res = await postgrest.from('users').select('status').not('status', 'eq', 'OFFLINE')
    expect(res).toMatchInlineSnapshot(`
Object {
"count": null,
"data": Array [
Object {
"status": "ONLINE",
},
Object {
"status": "ONLINE",
},
Object {
"status": "ONLINE",
},
],
"error": null,
"status": 200,
"statusText": "OK",
}
`)
})

test('or', async () => {
    const res = await postgrest
        .from('users')
        .select('status, username')
        .or('status.eq.OFFLINE,username.eq.deezbot')
    expect(res).toMatchInlineSnapshot(`
Object {
"count": null,
"data": Array [
Object {
"status": "ONLINE",
"username": "deezbot",
},
Object {
"status": "OFFLINE",
"username": "kiwicopple",
},
],
"error": null,
"status": 200,
"statusText": "OK",
}
`)
})

test('eq', async () => {
    const res = await postgrest.from('users').select('username').eq('username', 'deezbot')
    expect(res).toMatchInlineSnapshot(`
Object {
"count": null,
"data": Array [
Object {
"username": "deezbot",
},
],
"error": null,
"status": 200,
"statusText": "OK",
}
`)
})

test('neq', async () => {
    const res = await postgrest.from('users').select('username').neq('username', 'deezbot')
    expect(res).toMatchInlineSnapshot(`
Object {
"count": null,
"data": Array [
Object {
"username": "kiwicopple",
},
Object {
"username": "awailas",
},
Object {
"username": "dragarcia",
},
],
"error": null,
"status": 200,
"statusText": "OK",
}
`)
})

test('gt', async () => {
    const res = await postgrest.from('messages').select('id').gt('id', 1)
    expect(res).toMatchInlineSnapshot(`
Object {
"count": null,
"data": Array [
Object {
"id": 2,
},
],
"error": null,
"status": 200,
"statusText": "OK",
}
`)
})

test('gte', async () => {
    const res = await postgrest.from('messages').select('id').gte('id', 1)
    expect(res).toMatchInlineSnapshot(`
Object {
"count": null,
"data": Array [
Object {
"id": 1,
},
Object {
"id": 2,
},
],
"error": null,
"status": 200,
"statusText": "OK",
}
`)
})

test('lt', async () => {
    const res = await postgrest.from('messages').select('id').lt('id', 2)
    expect(res).toMatchInlineSnapshot(`
Object {
"count": null,
"data": Array [
Object {
"id": 1,
},
],
"error": null,
"status": 200,
"statusText": "OK",
}
`)
})

test('lte', async () => {
    const res = await postgrest.from('messages').select('id').lte('id', 2)
    expect(res).toMatchInlineSnapshot(`
Object {
"count": null,
"data": Array [
Object {
"id": 1,
},
Object {
"id": 2,
},
],
"error": null,
"status": 200,
"statusText": "OK",
}
`)
})

test('like', async () => {
    const res = await postgrest.from('users').select('username').like('username', '%deez%')
    expect(res).toMatchInlineSnapshot(`
Object {
"count": null,
"data": Array [
Object {
"username": "deezbot",
},
],
"error": null,
"status": 200,
"statusText": "OK",
}
`)
})

test('likeAllOf', async () => {
    const res = await postgrest
        .from('users')
        .select('username')
        .likeAllOf('username', ['%deez%', '%bot%'])
    expect(res).toMatchInlineSnapshot(`
Object {
"count": null,
"data": Array [
Object {
"username": "deezbot",
},
],
"error": null,
"status": 200,
"statusText": "OK",
}
`)
})

test('likeAnyOf', async () => {
    const res = await postgrest
        .from('users')
        .select('username')
        .likeAnyOf('username', ['%deez%', '%kiwi%'])
    expect(res).toMatchInlineSnapshot(`
Object {
"count": null,
"data": Array [
Object {
"username": "deezbot",
},
Object {
"username": "kiwicopple",
},
],
"error": null,
"status": 200,
"statusText": "OK",
}
`)
})

test('ilike', async () => {
    const res = await postgrest.from('users').select('username').ilike('username', '%SUPA%')
    expect(res).toMatchInlineSnapshot(`
Object {
"count": null,
"data": Array [
Object {
"username": "deezbot",
},
],
"error": null,
"status": 200,
"statusText": "OK",
}
`)
})

test('ilikeAllOf', async () => {
    const res = await postgrest
        .from('users')
        .select('username')
        .ilikeAllOf('username', ['%SUPA%', '%bot%'])
    expect(res).toMatchInlineSnapshot(`
Object {
"count": null,
"data": Array [
Object {
"username": "deezbot",
},
],
"error": null,
"status": 200,
"statusText": "OK",
}
`)
})

test('ilikeAnyOf', async () => {
    const res = await postgrest
        .from('users')
        .select('username')
        .ilikeAnyOf('username', ['%deez%', '%KIWI%'])
    expect(res).toMatchInlineSnapshot(`
Object {
"count": null,
"data": Array [
Object {
"username": "deezbot",
},
Object {
"username": "kiwicopple",
},
],
"error": null,
"status": 200,
"statusText": "OK",
}
`)
})

test('is', async () => {
    const res = await postgrest.from('users').select('data').is('data', null)
    expect(res).toMatchInlineSnapshot(`
Object {
"count": null,
"data": Array [
Object {
"data": null,
},
Object {
"data": null,
},
Object {
"data": null,
},
Object {
"data": null,
},
],
"error": null,
"status": 200,
"statusText": "OK",
}
`)
})

test('in', async () => {
    const statuses = ['ONLINE', 'OFFLINE'] as const
    const res = await postgrest.from('users').select('status').in('status', statuses)
    expect(res).toMatchInlineSnapshot(`
Object {
"count": null,
"data": Array [
Object {
"status": "ONLINE",
},
Object {
"status": "OFFLINE",
},
Object {
"status": "ONLINE",
},
Object {
"status": "ONLINE",
},
],
"error": null,
"status": 200,
"statusText": "OK",
}
`)
})

test('contains', async () => {
    const res = await postgrest.from('users').select('age_range').contains('age_range', '[1,2)')
    expect(res).toMatchInlineSnapshot(`
Object {
"count": null,
"data": Array [
Object {
"age_range": "[1,2)",
},
],
"error": null,
"status": 200,
"statusText": "OK",
}
`)
})

test('containedBy', async () => {
    const res = await postgrest.from('users').select('age_range').containedBy('age_range', '[1,2)')
    expect(res).toMatchInlineSnapshot(`
Object {
"count": null,
"data": Array [
Object {
"age_range": "[1,2)",
},
],
"error": null,
"status": 200,
"statusText": "OK",
}
`)
})

test('rangeLt', async () => {
    const res = await postgrest.from('users').select('age_range').rangeLt('age_range', '[2,25)')
    expect(res).toMatchInlineSnapshot(`
Object {
"count": null,
"data": Array [
Object {
"age_range": "[1,2)",
},
],
"error": null,
"status": 200,
"statusText": "OK",
}
`)
})

test('rangeGt', async () => {
    const res = await postgrest.from('users').select('age_range').rangeGt('age_range', '[2,25)')
    expect(res).toMatchInlineSnapshot(`
Object {
"count": null,
"data": Array [
Object {
"age_range": "[25,35)",
},
Object {
"age_range": "[25,35)",
},
],
"error": null,
"status": 200,
"statusText": "OK",
}
`)
})

test('rangeGte', async () => {
    const res = await postgrest.from('users').select('age_range').rangeGte('age_range', '[2,25)')
    expect(res).toMatchInlineSnapshot(`
Object {
"count": null,
"data": Array [
Object {
"age_range": "[25,35)",
},
Object {
"age_range": "[25,35)",
},
Object {
"age_range": "[20,30)",
},
],
"error": null,
"status": 200,
"statusText": "OK",
}
`)
})

test('rangeLte', async () => {
    const res = await postgrest.from('users').select('age_range').rangeLte('age_range', '[2,25)')
    expect(res).toMatchInlineSnapshot(`
Object {
"count": null,
"data": Array [
Object {
"age_range": "[1,2)",
},
],
"error": null,
"status": 200,
"statusText": "OK",
}
`)
})

test('rangeAdjacent', async () => {
    const res = await postgrest.from('users').select('age_range').rangeAdjacent('age_range', '[2,25)')
    expect(res).toMatchInlineSnapshot(`
Object {
"count": null,
"data": Array [
Object {
"age_range": "[1,2)",
},
Object {
"age_range": "[25,35)",
},
Object {
"age_range": "[25,35)",
},
],
"error": null,
"status": 200,
"statusText": "OK",
}
`)
})

test('overlaps', async () => {
    const res = await postgrest.from('users').select('age_range').overlaps('age_range', '[2,25)')
    expect(res).toMatchInlineSnapshot(`
Object {
"count": null,
"data": Array [
Object {
"age_range": "[20,30)",
},
],
"error": null,
"status": 200,
"statusText": "OK",
}
`)
})

test('textSearch', async () => {
    const res = await postgrest
        .from('users')
        .select('catchphrase')
        .textSearch('catchphrase', `'fat' & 'cat'`, { config: 'english' })
    expect(res).toMatchInlineSnapshot(`
Object {
"count": null,
"data": Array [
Object {
"catchphrase": "'cat' 'fat'",
},
],
"error": null,
"status": 200,
"statusText": "OK",
}
`)
})

test('textSearch with plainto_tsquery', async () => {
    const res = await postgrest
        .from('users')
        .select('catchphrase')
        .textSearch('catchphrase', `'fat' & 'cat'`, { config: 'english', type: 'plain' })
    expect(res).toMatchInlineSnapshot(`
Object {
"count": null,
"data": Array [
Object {
"catchphrase": "'cat' 'fat'",
},
],
"error": null,
"status": 200,
"statusText": "OK",
}
`)
})

test('textSearch with phraseto_tsquery', async () => {
    const res = await postgrest
        .from('users')
        .select('catchphrase')
        .textSearch('catchphrase', 'cat', { config: 'english', type: 'phrase' })
    expect(res).toMatchInlineSnapshot(`
Object {
"count": null,
"data": Array [
Object {
"catchphrase": "'cat' 'fat'",
},
Object {
"catchphrase": "'bat' 'cat'",
},
],
"error": null,
"status": 200,
"statusText": "OK",
}
`)
})

test('textSearch with websearch_to_tsquery', async () => {
    const res = await postgrest
        .from('users')
        .select('catchphrase')
        .textSearch('catchphrase', `'fat' & 'cat'`, { config: 'english', type: 'websearch' })
    expect(res).toMatchInlineSnapshot(`
Object {
"count": null,
"data": Array [
Object {
"catchphrase": "'cat' 'fat'",
},
],
"error": null,
"status": 200,
"statusText": "OK",
}
`)
})

test('multiple filters', async () => {
    const res = await postgrest
        .from('users')
        .select()
        .eq('username', 'deezbot')
        .is('data', null)
        .overlaps('age_range', '[1,2)')
        .eq('status', 'ONLINE')
        .textSearch('catchphrase', 'cat')
    expect(res).toMatchInlineSnapshot(`
Object {
"count": null,
"data": Array [
Object {
"age_range": "[1,2)",
"catchphrase": "'cat' 'fat'",
"data": null,
"status": "ONLINE",
"username": "deezbot",
},
],
"error": null,
"status": 200,
"statusText": "OK",
}
`)
})

test('filter', async () => {
    const res = await postgrest.from('users').select('username').filter('username', 'eq', 'deezbot')
    expect(res).toMatchInlineSnapshot(`
Object {
"count": null,
"data": Array [
Object {
"username": "deezbot",
},
],
"error": null,
"status": 200,
"statusText": "OK",
}
`)
})

test('match', async () => {
    const res = await postgrest
        .from('users')
        .select('username, status')
        .match({ username: 'deezbot', status: 'ONLINE' })
    expect(res).toMatchInlineSnapshot(`
Object {
"count": null,
"data": Array [
Object {
"status": "ONLINE",
"username": "deezbot",
},
],
"error": null,
"status": 200,
"statusText": "OK",
}
`)
})

test('filter on rpc', async () => {
    const res = await postgrest
        .rpc('get_username_and_status', { name_param: 'deezbot' })
        .neq('status', 'ONLINE')
    expect(res).toMatchInlineSnapshot(`
Object {
"count": null,
"data": Array [],
"error": null,
"status": 200,
"statusText": "OK",
}
`)
})
