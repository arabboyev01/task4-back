import knex from 'knex';

const dataBase = knex({
    client: 'pg',
    connection: {
      host: 'dpg-cjg9gor37aks73ba6ktg-a',
      port: 5432,
      database: 'itransition_production_db',
      user: 'mac',
      password: 'K9ZZPFLZTomcrtTECV2LD14IEVVOjXuB',
    }
});

export default dataBase;