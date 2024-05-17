import fp from "fastify-plugin";
import healthcheck from 'fastify-healthcheck';

async function routes (fastify, opts) {
  
  // Register healthcheck plugin 
fastify.register(healthcheck, {
  healthcheckUrl: '/health',
  // healthcheckUrlDisable: true,
  // healthcheckUrlAlwaysFail: true,
  // underPressureOptions: { } // no under-pressure specific options set here
  exposeUptime: true // enable, as a sample
})




}

export default fp(routes, {
    // Protip: if you name your plugins, the stack trace in case of errors
    //         will be easier to read and other plugins can declare their dependency
    //         on this one. `fastify-autoload` will take care of loading the plugins
    //         in the correct order.
    name: 'routes'
})
