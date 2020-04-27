var jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('x-access-token');
    if(!token){
        return res.status(401).json({
            msg: 'Unauthorized!'
        })
    } else {
        try {
            const verified = jwt.verify(token, process.env.TOP_SECRET);
            req.user = verified;
            next()
        } catch (error) {
            res.status(401).json({
                msg: 'Invalid token!'
            })
        }
    }
}