const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const Authorization = req.header('Authorization');
    const token = Authorization && Authorization.replace('Bearer ', '')

    if (!Authorization) {
        return res.sendStatus(401)
    }

    try {
        const result = jwt.verify(token, process.env.APP_SECRET)

        req.Username = result.Username
        req.Role = result.Role
        req.Password = result.Password
        next()
    } catch (e) {
        return res.sendStatus(403)
    }
}