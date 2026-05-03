import { Router } from 'express';
import { supabase } from '../lib/supabase.js';

const router = Router();

// GET /api/gallery - Get all gallery items
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/gallery/:category - Get gallery items by category
router.get('/:category', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .eq('category', req.params.category)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/gallery - Add gallery item
router.post('/', async (req, res) => {
  try {
    const { title, category, image_url } = req.body;
    const { data, error } = await supabase
      .from('gallery_items')
      .insert([{ title, category, image_url }])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
