const router = require('express').Router();
const participantRouter = require('./participant');

const meetingsRouter = require('./meeting');


router.use("/meetings", meetingsRouter);
router.use("/participants", participantRouter);

module.exports = router;