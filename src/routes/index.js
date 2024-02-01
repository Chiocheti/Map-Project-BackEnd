const { Router } = require('express');

const router = Router();

const marketRoutes = require('./market.routes');

router.use('/markets', marketRoutes);

module.exports = router;
