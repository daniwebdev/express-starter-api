import { knex as knexInstance } from 'knex';

export const db = knexInstance({
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING || 'postgres://postgres:123456@127.0.0.1:5432/_cerpen',
    searchPath: ['public'],
})