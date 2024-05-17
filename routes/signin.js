import fp from "fastify-plugin";
import bcrypt from 'bcrypt'

async function signin (fastify, opts) {
fastify.post('/signin', async (request, reply) => { 
    try { 
      const pool = fastify.db.pool
      const sql = "SELECT * from users where uname = $1"
      const result = await pool.query(sql,[request.body.user]);
      
      if (result.rowCount === 0)
      reply.code(401).send({401: "Unauthorized"})
      else {
          const saltedPassword = result.rows[0].upassword  ;
          const successResult = await bcrypt.compare(request.body.password, saltedPassword)
          if (successResult === true){
              const token = await reply.jwtSign({
              name: result.rows[0].uname,
              session: result.rows[0].session_uuid
            })
            reply.setCookie('accessToken', token, {
              domain: 'localhost',
              secure: true, // send cookie over HTTPS only
              httpOnly: true,
              sameSite: true, // alternative CSRF protection
              expires: new Date(Date.now() + 10 * 60 * 1000),})
              .code(302).redirect('/@/me')
                

          } else{
              reply.code(401).send({401: "Unauthorized"})

          }

      }
  }
    catch (err){
      reply.code(500).send({ 500: "Server Error"})
      console.error(err)
    }  
  })

}


export default fp(signin, {
    // Protip: if you name your plugins, the stack trace in case of errors
    //         will be easier to read and other plugins can declare their dependency
    //         on this one. `fastify-autoload` will take care of loading the plugins
    //         in the correct order.
    name: 'signin'
})