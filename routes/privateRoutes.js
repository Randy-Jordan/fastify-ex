import fp from "fastify-plugin";

async function privateRoutes (fastify, opts) {
 
fastify.get("/@/me",{onRequest: [fastify.authenticate]},
  async function(request, reply) {
    return request.user
})


}

export default fp(privateRoutes, {
    // Protip: if you name your plugins, the stack trace in case of errors
    //         will be easier to read and other plugins can declare their dependency
    //         on this one. `fastify-autoload` will take care of loading the plugins
    //         in the correct order.
    name: 'privateRoutes'
})
