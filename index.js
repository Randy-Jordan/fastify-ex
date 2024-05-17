import Fastify from 'fastify'
import App from './app.js'

async function start () {
    const fastify = Fastify();
    await fastify.register(App);
    const port = process.env.PORT || 3000
    const address =  process.env.ADDRESS || "localhost"
    fastify.listen({ port, address })
    // List routes 
    fastify.ready(() => {
    const routes = fastify.printRoutes()
    console.log(`Available Routes:\n${routes}`)
})}
  
  start().catch(err => {
    console.error(err)
    process.exit(1)
  })