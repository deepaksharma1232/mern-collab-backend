const router = require('express').Router();
const firebaseAuth = require('../middleware/firebaseAuth');
const roleCheck = require('../middleware/roleCheck');
const ctrl = require('../controllers/projectController');

router.use(firebaseAuth);

router.get('/', ctrl.getProjects);
router.post('/', roleCheck(['ADMIN','MANAGER']), ctrl.createProject);
router.put('/:id', roleCheck(['ADMIN','MANAGER']), ctrl.updateProject);
router.delete('/:id', roleCheck(['ADMIN']), ctrl.deleteProject);

module.exports = router;
