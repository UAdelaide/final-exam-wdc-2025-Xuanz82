const express = require('express');
const router = express.Router();
const db = require('../models/db');

/**
 * Return a summary of each walk with their average rating and number of completed walks
 */
router.get("/summary", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        u.username AS walker_username,
        COUNT(wr.rating_id) AS total_ratings,
        ROUND(AVG(wr.rating), 2) AS average_rating,
        COUNT(DISTINCT CASE WHEN wrq.status = 'completed' THEN wrq.request_id END) AS completed_walks
      FROM Users u
      LEFT JOIN WalkRatings wr ON u.user_id = wr.walker_id
      LEFT JOIN WalkRequests wrq ON wrq.request_id = wr.request_id
      WHERE u.role = 'walker'
      GROUP BY u.user_id, u.username
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch walk summary" });
  }
})

module.exports = router;
