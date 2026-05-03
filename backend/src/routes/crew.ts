import { Router } from 'express';
import { supabase } from '../lib/supabase.js';

const router = Router();

// GET /api/crew - Get all crew members
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('crew_members')
      .select('*')
      .order('threat_level', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/crew - Add crew member
router.post('/', async (req, res) => {
  try {
    const { name, threat_level, status, color, badge, image_url } = req.body;
    const { data, error } = await supabase
      .from('crew_members')
      .insert([{ name, threat_level, status, color, badge, image_url }])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
