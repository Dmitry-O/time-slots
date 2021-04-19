const fastify = require('fastify')()

var config = require('./config');

fastify.register(require('fastify-cors'), {
  origin: '*'
});

fastify.register(require('fastify-postgres'), {
  connectionString: config.connectionString
})

fastify.register(require('fastify-jwt'), {
    secret: config.secret
})

fastify.register(require('./middleware/auth_middleware'));
fastify.register(require('./routers/authRouter'));
fastify.register(require('./routers/slotsRouter'));

fastify.listen(process.env.PORT || 3001, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})