import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import cookie from '@fastify/cookie'

async function checkAuth (fastify, opts){
    await fastify.register(cookie, {secret: process.env.COOKIE_SECRET})
    await fastify.register(jwt, {secret: process.env.JWT_SECRET, 
    cookie: {
      cookieName: "accessToken",
    },
  
  })
  
  fastify.decorate("isAuthenticated", async function(request, reply) {{
    try {
      await request.jwtVerify(request.cookies.accessToken)
    } catch (err) {
      reply.send(err)
    }
   
  }})

  fastify.decorate('isAuthorized', (requiredRoles) => {
    return async (request, reply) => {
      try {
        await request.jwtVerify();
        const userRoles = request.user.roles || [];

        const hasRequiredRoles = requiredRoles.every(role => userRoles.includes(role));

        if (!hasRequiredRoles) {
          return reply.status(403).send({ error: 'Forbidden' });
        }
      } catch (err) {
        return reply.send(err);
      }
    };
});

}
  
export default fp(checkAuth, {
    // Protip: if you name your plugins, the stack trace in case of errors
    //         will be easier to read and other plugins can declare their dependency
    //         on this one. `fastify-autoload` will take care of loading the plugins
    //         in the correct order.
    name: 'checkAuth'
  })