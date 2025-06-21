const express = require('express');
const router = express.Router();
const db = require('../models/db');

/**
 * Return all open walk requests, including the dog name, requested time, location, and owner's username
 */
router.get("/open", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        wr.request_id,
        d.name AS dog_name,
        wr.requested_time,
        wr.duration_minutes,
        wr.location,
        u.username AS owner_username
      FROM WalkRequests wr
      JOIN Dogs d ON wr.dog_id = d.dog_id
      JOIN Users u ON d.owner_id = u.user_id
      WHERE wr.status = 'open';
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch open walk requests" });
  }
})

module.exports = router;
