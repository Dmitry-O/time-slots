const fastify = require('fastify')();

const config = require('./config');

fastify.register(require('fastify-jwt'), {
    secret: 'supersecret'
});

fastify.register(require('fastify-postgres'), {
    connectionString: config.connectionString
});

async function AuthRouter (fastify) {
    fastify.post('/signup', async (req, res) => {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                res.status(400).send({error: true, message: "Username or password are not entered!"});
                return ;
            }

            fastify.pg.connect(onConnect)
            function onConnect (err, client, release) {
                if (err) return res.send(err)

                client.query("SELECT * FROM users WHERE username = '" + username + "' and password = '" + password + "';")
                .then(result => {
                    if (result.rows.length === 0) {
                        client.query("SELECT * FROM users WHERE username = '" + username + "';")
                        .then(result => {
                            if (result.rows.length !== 0) {
                                res.status(401).send({error: true, message: "Wrong password"});
                                return ;   
                            }
                            else {
                                client.query("INSERT INTO users (username, password) VALUES('" + username +  "', '" + password + "');")
                                .then(() => {
                                    client.query("SELECT * FROM users WHERE username = '" + username + "' and password = '" + password + "';")
                                    .then(result => {
                                        const token = fastify.jwt.sign({username, password});
                                        res.status(200).send({token: token, user: result.rows[0]});  
                                    })
                                })
                            }
                        });
                    }
                    else {
                        const token = fastify.jwt.sign(req.body);
                        res.status(200).send({token: token, user: result.rows[0]});
                    }
                })
            }
        } catch (err) {
            res.send(err);
        }
    })
}

module.exports = AuthRouter;