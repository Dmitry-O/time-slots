const fastify = require('fastify')();

const config = require('../config');

fastify.register(require('fastify-jwt'), {
    secret: config.secret
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
            async function onConnect (err, client) {
                if (err) return res.send(err)

                let result = await client.query("SELECT * FROM users WHERE username = '" + username + "' and password = '" + password + "';");
                if (result.rows.length === 0) {
                    let result = await client.query("SELECT * FROM users WHERE username = '" + username + "';");
                    if (result.rows.length !== 0) {
                        res.status(401).send({error: true, message: "Wrong password"});
                        return ;   
                    }
                    else {
                        await client.query("INSERT INTO users (username, password) VALUES('" + username +  "', '" + password + "');");
                        let result = await client.query("SELECT * FROM users WHERE username = '" + username + "' and password = '" + password + "';");
                        const token = fastify.jwt.sign({username, password});
                        res.status(200).send({token: token, user: result.rows[0]});  
                    }
                }
                else {
                    return res.send({error: true, message: "The user with this username is already registered", statusCode: 403});
                }
            }
        } catch (err) {
            res.send(err);
        }
    });

    fastify.post('/signin', async (req, res) => {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                res.status(400).send({error: true, message: "Username or password are not entered!"});
                return ;
            }

            fastify.pg.connect(onConnect)
            async function onConnect (err, client) {
                if (err) return res.send(err)

                let result = await client.query("SELECT * FROM users WHERE username = '" + username + "' and password = '" + password + "';");
                if (result.rows.length !== 0) {
                    const token = fastify.jwt.sign(req.body);
                    res.status(200).send({token: token, user: result.rows[0]});
                }
                else return res.send({error: true, statusText: "Username or password are wrong", status: 403});
            }
        } catch (err) {
            res.send(err);
        }
    })
}

module.exports = AuthRouter;