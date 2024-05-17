import fp from "fastify-plugin";
import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
})

async function database (fastify){
  
  try { 
    const client = await pool.connect()
    const res = await client.query('SELECT NOW()')
    console.log("Connection success at:",res.rows[0].now)
    await client.end()

     
} catch(err) { 
    console.error(err) 
}
  fastify.decorate('db', {pool})
}
  

export default fp(database, {
    // Protip: if you name your plugins, the stack trace in case of errors
    //         will be easier to read and other plugins can declare their dependency
    //         on this one. `fastify-autoload` will take care of loading the plugins
    //         in the correct order.
    name: 'database'
  })