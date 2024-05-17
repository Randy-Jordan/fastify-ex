import fp from "fastify-plugin";
import healthcheck from 'fastify-healthcheck';
import Static from '@fastify/static'
import path from 'path';
import { dirname} from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function publicRoutes (fastify, opts) {
// Register healthcheck plugin 
fastify.register(healthcheck, {
  healthcheckUrl: '/health',
  // healthcheckUrlDisable: true,
  // healthcheckUrlAlwaysFail: true,
  // underPressureOptions: { } // no under-pressure specific options set here
  exposeUptime: true // enable, as a sample
})

await fastify.register(Static, {
  root: path.join(__dirname, '..', 'static'),
  prefix: '/' ,
  wildcard: false,
}) 

fastify.get("/*", async function(request, reply) {
    return reply.send({404: "Not Found"})
})

}

export default fp(publicRoutes, {
    // Protip: if you name your plugins, the stack trace in case of errors
    //         will be easier to read and other plugins can declare their dependency
    //         on this one. `fastify-autoload` will take care of loading the plugins
    //         in the correct order.
    name: 'publicRoutes'
})
