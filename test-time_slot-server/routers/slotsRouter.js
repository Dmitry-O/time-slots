async function SlotsRouter (fastify) {
    fastify.get('/timeslot/:id', {
            preValidation: [fastify.jwtauthentication]
        }, async (req, reply) => {
        await fastify.pg.connect(onConnect);
    
        function onConnect(err, client, release) {
        if (err) return reply.send(err);
        
        console.log(req.user);

        client.query("SELECT value FROM slots WHERE user_id = " + req.params.id, 
            function onResult (err, result) {
            release();
            reply.send(err || result.rows[0]);
            }
        );
        }
    });
    
    
    fastify.post('/timeslot/:id',  {
            preValidation: [fastify.jwtauthentication]
        }, async (req, reply) => {
        await fastify.pg.connect(onConnect);
    
        function onConnect(err, client, release) {
        if (err) return reply.send(err);

        client.query("SELECT value FROM slots WHERE user_id = " + req.params.id)
        .then(result => {
            if (result.rows.length !== 0) {
            client.query("UPDATE slots SET value = '" + req.body.value + "' WHERE user_id = " + req.params.id + ";", 
            function onResult (err, result) {
                release();
                reply.send(err || result.rows[0]);
            });
            }
            else {
            client.query("INSERT INTO slots (value, user_id) VALUES ('" + req.body.value + "', " + req.params.id + ");",
                function onResult (err, result) {
                release();
                reply.send(err || result);
                }
            );
            }
        });
        }
    })
}

module.exports = SlotsRouter;