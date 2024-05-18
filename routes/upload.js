import fp from "fastify-plugin";
import multipart from '@fastify/multipart'
import formbody from '@fastify/formbody'
import Static from '@fastify/static'
import fs from 'fs'
import util from 'util'
import { pipeline } from 'stream'
import path from 'path';
import { dirname} from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


const pump = util.promisify(pipeline)


async function upload (fastify, opts) {
fastify.register(multipart)
fastify.register(formbody)

fastify.post('/upload', async (request, reply) => { 
    const data = await request.file()
    await pump(data.file, fs.createWriteStream(`./uploads/${data.filename}`))
    return {success : `${data.filename} uploaded sucessfully` }
  })

  await fastify.register(Static, {
    root: path.join(__dirname, '..', 'uploads'),
    prefix: '/uploads' ,
    wildcard: false,
    decorateReply: false
  }) 

}

export default fp(upload, {
    // Protip: if you name your plugins, the stack trace in case of errors
    //         will be easier to read and other plugins can declare their dependency
    //         on this one. `fastify-autoload` will take care of loading the plugins
    //         in the correct order.
    name: 'upload'
})