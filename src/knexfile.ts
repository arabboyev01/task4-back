import knex from 'knex';

const dataBase = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'mac',  
        password: '',
        database: 'task4-db',
    },
    searchPath: ['knex', 'public'],
});

export default dataBase;