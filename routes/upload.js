import fp from "fastify-plugin";
import multipart from '@fastify/multipart'
import formbody from '@fastify/formbody'
import fs from 'fs'
import util from 'util'
import { pipeline } from 'stream'
import crypto from 'crypto'

const pump = util.promisify(pipeline)


async function upload (fastify, opts) {
fastify.register(multipart)
fastify.register(formbody)

fastify.post('/upload', async (request, reply) => { 
    const data = await request.file()

    await pump(data.file, fs.createWriteStream(`./uploads/${data.filename}`))
    
    return {success : `${data.filename} uploaded sucessfully` }
  })

}

export default fp(upload, {
    // Protip: if you name your plugins, the stack trace in case of errors
    //         will be easier to read and other plugins can declare their dependency
    //         on this one. `fastify-autoload` will take care of loading the plugins
    //         in the correct order.
    name: 'upload'
})