import { Router } from 'express';
import { supabase } from '../lib/supabase.js';

const router = Router();

// GET /api/stats - Get all stats
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('stats')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/stats - Add stat
router.post('/', async (req, res) => {
  try {
    const { label, value, progress, color } = req.body;
    const { data, error } = await supabase
      .from('stats')
      .insert([{ label, value, progress, color }])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
