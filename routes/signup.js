
import fp from "fastify-plugin";
import bcrypt from 'bcrypt'

async function signup (fastify, opts) {
  
fastify.post('/signup', async (request, reply) => { 
  const pool = fastify.db.pool
  const sql = "SELECT uname from users where uname = $1"
  const result = await pool.query(sql, [request.body.user])
  try {
    if (result.rowCount === 0){
          
      const hash =  await bcrypt.hash(request.body.password, 10)
     
      await pool.query("INSERT into users (uname, upassword) values ($1,$2)",
      [request.body.user,hash]);
      reply.code(200).send({ 200 : "User created successfully"})

  }
  else
      reply.code(409).send({409:"Conflict"})

  } catch (error) {
    reply.code(500).send({ 500: "Server Error"})
    console.error(err)
  }
  
  })

}

export default fp(signup, {
    // Protip: if you name your plugins, the stack trace in case of errors
    //         will be easier to read and other plugins can declare their dependency
    //         on this one. `fastify-autoload` will take care of loading the plugins
    //         in the correct order.
    name: 'signup'
})