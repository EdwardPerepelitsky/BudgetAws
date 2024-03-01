const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'budgetec2.c94ge8ueg3gf.us-west-2.rds.amazonaws.com',
    database: 'postgres',
    password: 'mysecretpassword',
    port: '5432'
});


async function query(text, params){
    return await pool.query(text, params);
}

async function getClient(){
    const client = await pool.connect();
    return client;
};



module.exports = {query, getClient, pool};