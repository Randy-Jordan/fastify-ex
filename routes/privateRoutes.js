import fp from "fastify-plugin";

async function privateRoutes (fastify, opts) {
 
fastify.get("/@/me",{onRequest: [fastify.isAuthenticated]},
  async function(request, reply) {
    return request.user
})

fastify.get("/@/admin",{onRequest: [ fastify.isAuthenticated, fastify.isAuthorized(['admin']) ] },
  async function(request, reply) {
    return request.user.roles
})

fastify.get("/@/user",{onRequest: [ fastify.isAuthenticated, fastify.isAuthorized(['user']) ] },
  async function(request, reply) {
    return request.user.roles
})


}

export default fp(privateRoutes, {
    // Protip: if you name your plugins, the stack trace in case of errors
    //         will be easier to read and other plugins can declare their dependency
    //         on this one. `fastify-autoload` will take care of loading the plugins
    //         in the correct order.
    name: 'privateRoutes'
})
