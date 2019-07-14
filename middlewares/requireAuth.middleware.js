const logger = require('../services/logger.service')

async function requireAuth(req, res, next) {
    console.log('requireAut req.params:', req.params)
  if (!req.session || !req.session.user) {
    res.status(401).end('Unauthorized');
    return;
  }
  next();
}

module.exports = requireAuth
