import AutoLoad from '@fastify/autoload'
import path from 'path';
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


export default async function (fastify, opts) {
    
// Require all the plugins that we'll need in our application.    
await fastify.register(AutoLoad, {
    dir: path.join(__dirname,'plugins'),
    options: Object.assign({}, opts)
  })

  // Then, we'll load all of our routes.
  await fastify.register(AutoLoad, {
    dir: path.join(__dirname,'routes'),
    dirNameRoutePrefix: false,
    options: Object.assign({}, opts)
  })
}