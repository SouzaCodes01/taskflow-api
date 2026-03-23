const { Router } = require('express');
const taskController = require('../controllers/task.controller');
const authenticate = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { createTaskSchema, updateTaskSchema, updateStatusSchema } = require('../validators/task.validator');

const router = Router();
router.use(authenticate);

router.get('/', (req, res, next) => taskController.list(req, res, next));
router.get('/:id', (req, res, next) => taskController.getById(req, res, next));
router.post('/', validate(createTaskSchema), (req, res, next) => taskController.create(req, res, next));
router.put('/:id', validate(updateTaskSchema), (req, res, next) => taskController.update(req, res, next));
router.patch('/:id/status', validate(updateStatusSchema), (req, res, next) => taskController.updateStatus(req, res, next));
router.delete('/:id', (req, res, next) => taskController.delete(req, res, next));

module.exports = router;