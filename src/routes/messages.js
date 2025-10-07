const router = require('express').Router();
const firebaseAuth = require('../middleware/firebaseAuth');
const roleCheck = require('../middleware/roleCheck');
const ctrl = require('../controllers/messageController');

router.use(firebaseAuth);

router.post('/', roleCheck(['ADMIN','MANAGER','MEMBER']), ctrl.sendMessage);
router.get('/', roleCheck(['ADMIN','MANAGER','MEMBER']), ctrl.getMessages);

module.exports = router;
