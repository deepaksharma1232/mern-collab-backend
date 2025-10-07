const router = require('express').Router();
const firebaseAuth = require('../middleware/firebaseAuth');
const roleCheck = require('../middleware/roleCheck');
const ctrl = require('../controllers/taskController');

router.use(firebaseAuth);

router.get('/', ctrl.getTasks);
router.post('/', roleCheck(['ADMIN','MANAGER','MEMBER']), ctrl.createTask);
router.put('/:id', roleCheck(['ADMIN','MANAGER']), ctrl.updateTask);
router.delete('/:id', roleCheck(['ADMIN','MANAGER']), ctrl.deleteTask);

module.exports = router;
