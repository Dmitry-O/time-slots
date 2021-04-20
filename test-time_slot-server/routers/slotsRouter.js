function onResult (err, result, release, reply) {
    release();
    reply.send(err || result);
}

async function SlotsRouter (fastify) {
    fastify.get('/timeslot/:id', {
            preValidation: [fastify.jwtauthentication]
        }, async (req, reply) => {
        await fastify.pg.connect(onConnect);
    
        async function onConnect(err, client, release) {
            if (err) return reply.send(err);

            let result = await client.query("SELECT value FROM slots WHERE user_id = " + req.params.id); 
            onResult(err, result.rows[0], release, reply);
        }
    });
    
    fastify.post('/timeslot/:id',  {
            preValidation: [fastify.jwtauthentication]
        }, async (req, reply) => {
            await fastify.pg.connect(onConnect);
        
            async function onConnect(err, client, release) {
                if (err) return reply.send(err);

                let result = await client.query("SELECT value FROM slots WHERE user_id = " + req.params.id);
                if (result.rows.length !== 0) {
                    client.query("UPDATE slots SET value = '" + req.body.value + "' WHERE user_id = " + req.params.id + ";", 
                        onResult(err, result.rows[0], release, reply)
                    );
                }
                else {
                    client.query("INSERT INTO slots (value, user_id) VALUES ('" + req.body.value + "', " + req.params.id + ");",
                        onResult(err, result, release, reply)
                    );
                }
            }
        }
    )
}

module.exports = SlotsRouter;