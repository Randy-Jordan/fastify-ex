import Fastify from 'fastify'
import App from './app.js' // Our app instance settings. 

async function start () {
    // Register our instance 
    const fastify = Fastify();
    await fastify.register(App);

    // Set up server settings.
    const port = process.env.PORT || 3000
    const address =  process.env.ADDRESS || "localhost"

    // Set up listener and on ready list all routes 
    fastify.listen({ port, address })
    fastify.ready(() => {
    const routes = fastify.printRoutes()
    console.log(`Available Routes:\n${routes}`)
})}
 
// Start the server and crash on error. 
  start().catch(err => {
    console.error(err)
    process.exit(1)
})