import { Router } from 'express';
import { supabase } from '../lib/supabase.js';

const router = Router();

// GET /api/enlist - Get all enlistments
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('enlistments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/enlist - Submit enlistment
router.post('/', async (req, res) => {
  try {
    const { alias, specialty, manifesto } = req.body;
    const { data, error } = await supabase
      .from('enlistments')
      .insert([{ alias, specialty, manifesto }])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
