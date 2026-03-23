const { Router } = require('express');
const authenticate = require('../middlewares/auth');
const db = require('../config/database');

const router = Router();
router.use(authenticate);

router.get('/', async (req, res, next) => {
  try {
    const result = await db.query(
      'SELECT * FROM categories WHERE user_id = $1 ORDER BY name',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, color } = req.body;
    const result = await db.query(
      'INSERT INTO categories (name, color, user_id) VALUES ($1, $2, $3) RETURNING *',
      [name, color || '#6C63FF', req.user.id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;