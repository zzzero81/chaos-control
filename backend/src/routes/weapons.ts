import { Router } from 'express';
import { supabase } from '../lib/supabase.js';

const router = Router();

// GET /api/weapons - Get all weapons
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('weapons')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/weapons - Add weapon
router.post('/', async (req, res) => {
  try {
    const { name, description, image_url, color } = req.body;
    const { data, error } = await supabase
      .from('weapons')
      .insert([{ name, description, image_url, color }])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
