const db = require('../config/database');

class TaskService {
  async list(userId, { page = 1, limit = 10, status, priority, search }) {
    const offset = (page - 1) * limit;
    let query = 'SELECT t.*, c.name as category_name, c.color as category_color FROM tasks t LEFT JOIN categories c ON t.category_id = c.id WHERE t.user_id = $1';
    const params = [userId];
    let paramIndex = 2;

    if (status) {
      query += ` AND t.status = $${paramIndex++}`;
      params.push(status);
    }
    if (priority) {
      query += ` AND t.priority = $${paramIndex++}`;
      params.push(priority);
    }
    if (search) {
      query += ` AND (t.title ILIKE $${paramIndex} OR t.description ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    const countQuery = query.replace(
      'SELECT t.*, c.name as category_name, c.color as category_color FROM tasks t LEFT JOIN categories c ON t.category_id = c.id',
      'SELECT COUNT(*) FROM tasks t'
    );
    const countResult = await db.query(countQuery, params);

    query += ` ORDER BY t.created_at DESC LIMIT $${paramIndex++} OFFSET $${paramIndex}`;
    params.push(limit, offset);

    const result = await db.query(query, params);
    const total = parseInt(countResult.rows[0].count);

    return {
      tasks: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getById(taskId, userId) {
    const result = await db.query(
      'SELECT t.*, c.name as category_name, c.color as category_color FROM tasks t LEFT JOIN categories c ON t.category_id = c.id WHERE t.id = $1 AND t.user_id = $2',
      [taskId, userId]
    );

    if (result.rows.length === 0) {
      const error = new Error('Task not found');
      error.statusCode = 404;
      throw error;
    }

    return result.rows[0];
  }

  async create(userId, data) {
    const { title, description, status, priority, due_date, category_id } = data;
    const result = await db.query(
      'INSERT INTO tasks (title, description, status, priority, due_date, category_id, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [title, description, status || 'pending', priority || 'medium', due_date, category_id, userId]
    );
    return result.rows[0];
  }

  async update(taskId, userId, data) {
    const task = await this.getById(taskId, userId);
    const { title, description, status, priority, due_date, category_id } = { ...task, ...data };

    const result = await db.query(
      'UPDATE tasks SET title=$1, description=$2, status=$3, priority=$4, due_date=$5, category_id=$6, updated_at=CURRENT_TIMESTAMP WHERE id=$7 AND user_id=$8 RETURNING *',
      [title, description, status, priority, due_date, category_id, taskId, userId]
    );
    return result.rows[0];
  }

  async updateStatus(taskId, userId, status) {
    await this.getById(taskId, userId);
    const result = await db.query(
      'UPDATE tasks SET status=$1, updated_at=CURRENT_TIMESTAMP WHERE id=$2 AND user_id=$3 RETURNING *',
      [status, taskId, userId]
    );
    return result.rows[0];
  }

  async delete(taskId, userId) {
    await this.getById(taskId, userId);
    await db.query('DELETE FROM tasks WHERE id=$1 AND user_id=$2', [taskId, userId]);
    return { message: 'Task deleted successfully' };
  }
}

module.exports = new TaskService();