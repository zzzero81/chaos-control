import { supabase } from '../lib/supabase.js';

// Seed data from the original frontend
const galleryItems = [
  { title: 'Rebel Art 01', category: 'MAYHEM' as const, image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvBllASmuH_RZ2XS3kvaED9sBvHPYsF8Hhg-p5OBgZPkRYwYwiQY_2ZJ5mXJTr0KrYawZhjREmHlFspPXJVCehyaq8xasaJDH1Ojf9uQX_IAmvXFulUlNogXXhfZzqpjDLHrkGp9-BPFfQJPm2q5MMdsWYbdlCJojLl2f1BjqgaCcHBWANs4l3Vje6bpxPkVl4ToBzr2EbH59iw11shKWWInOzjvvhIyWVgj212xL2MW5bTw3xE60uDQefw1p_LA-cRdHk0Dg0pe-L' },
  { title: 'Rebel Art 02', category: 'ARSENAL' as const, image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBl8clp_2_iFjBemktrPX8QxzQozYLWNr7MjCQAvUsxDcIxvWt8hBVobksoVkT0yrQuZ7EYAn06wRMNlBjDZ5AT2wbNaVZ0GALaS9-Q5RlylXimhfx4cl-zTPj1JNQnMPFaO1YLFrZ7vqdxxDqXM287IGIz3yjhAvn3cuZu8ndTKF89F3WsoGDdfMIQiL0bCS2xbm0lrx3FWzKyJLsdNgGZERGlAec-ztSA2fno4v3yvwSqxVXSb162KnNeh0c1PTnBbAf0jsglefQH' },
  { title: 'Rebel Art 03', category: 'GRAFFITI' as const, image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsSgG9ZwghVfOKtSbBPWdiN-sQ5REOEjvqAER7CYiM7HhfQRk070MUqaMd68f8l1gUQXdKuR6Ma5I3s142-w0cAmb63Z9uE4NVmRhFFARyh3qqF84gp4o3Ozlno5GwsoSRcdLrarwtEmg-aK1L6WwftYqwiTgcNHzmaVCrBDVqExmqDo38gLdg0SIE7ABDFKQnP2WdV4fWzy7AgEmnOkpEY_emzgjkHyq854CyH3fhrJMI-zvn7srGVqnrppZkD9pkOmynjtMeQ1nu' },
  { title: 'Rebel Art 04', category: 'MAYHEM' as const, image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC10jK744orodIx8dBeTBe0EtHGgdOzk9pEQXq0l-5OFvHcfRClXtzgQpIbPTcUJNZfGh2INMd3GayCbUPE0zW6NhDwD6KFotheirHecaQpLtIq7QrijfC-iNq6w50IIokJFyAx3O9fdyU1NrLAfEOK1P-MEJb5r1leo_4dLSLi7iQ-ZgtyIf-gfUkAFQ4N5cKvOkDyTS-TGjE235UA5qcJIzodlPU-ILHUNoJtuk8Eu9wdmMPgN8wQgmTKBEffEXvYf9O464MSqNeF' },
  { title: 'Rebel Art 05', category: 'ARSENAL' as const, image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDA4QsCr0gfD0aW2T-0DbBpzYWeJcQnJY8nEN-TwZQ3A4BOWN7kM9DZY8Ka3B6v6ELUC_Tssq8waQFS5FMuq8Vd6mlHIyuxboKAZ7lNsgk3Ng31EhBBzS9TnSHPIQ1Ww32a1Vyq1ltCfmpxBE2ChHaXjHfu-Ou2nVNqlrtMFxxqQ0yIE0H5VqtTsCIaUcGCpWvufztAitRUEqXM4Tau3dkOBBxY4vtWu1kNiijGiDqYWQJkATwvTbiTAEeqrX7DFpP6JIDhRRCFZZBB' },
  { title: 'Rebel Art 06', category: 'GRAFFITI' as const, image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDk-A-ObZry1kk0D7me6bXpuL4T0w-r4slY5gDXc7-dNYAtWHmT92llYcG9p0WE2uFOeowS7rO_dpx9hNsQmGKe7pLO6DrY1oJwNJ3dXwu1S9nhZ01r_16hK0NGWXCFwZRCH1rr1OX3I5izjofwWVe-vaoP31SopPjwcYv2z7kgU6RZZf0JDRo5_g9ZxIuVWnGn9IJbEzaKbo8RFiCgePwXst6coX2Y7Sn4JF1ZBkipghKWGILCwu-fkjuui8kX57iVhpQHcitzbEZH' },
];

const crewMembers = [
  { name: 'VI', threat_level: 4, status: 'ON_THE_LOOSE', color: 'pink' as const, badge: 'PRIORITY_RED', image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtUgqyuQzoXkDhpBo7x6NFoDotGA2dacLn_aUBXkP9aZav0YJJYYlp5JkUl5v8wsiNNRu5dbcSZmxp-PcjKqJo-z9vY5uIK7uh3fMiQlrA13jTZ2_3vpof8nbStKCSpewTiuIstyHwnqSctfBtuelID5OEXjfnttLRvPvwOmTDkp2v4s_GET7QRpVEvHfqKJrCNFZ6PaN9gg_MrXuUx2EEoLzw1QsM6G5USJhBex_cnDgSje4fATSB_lrJUn5LSTK8nPaE_8LBAJGz' },
  { name: 'EKKO', threat_level: 2, status: 'IN_SECTOR_4', color: 'cyan' as const, badge: 'ALLY_PROBABLE', image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnbF4q73lvRHFfXmLvhmTqu6D5LoBp0Lw1EeqcNdFW6HsZZpYB-9l0A7P2mwyKBYvLJRnnsXY_RO55R0NoWPeXVofh_LZtwqPAK3U37AZ2zwvJPMzNgq59UEYSVs41cuos-_5jv1DrDI4tm6U_aA10KCBwf0m_zvfviV1BMHZKExPVHDCQ2u5l63ajBN2971N3ftJKVvcmjRb5YsPB2Mc3sW_SCQ_Bec4A79vwch4PmmS8D2qncN9PpM6FbEv9Z9p5FOBsRT0WEpoX' },
  { name: 'SILCO', threat_level: 5, status: 'UNKNOWN_LOC', color: 'red' as const, badge: 'HIGH_DANGER', image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfd9ZO6tA_olZKt6Dp3MnV0GyjbNQ6wf3LppKn6ihXSzcf2ZsyBZboL_KgZ6Dl0I27esaxKMOyKOtdnXshQZ_dGsd97bPuD8adDsoQ9UbZfMJA551ZYU27AN6HIlxKmG2nkO1v4MqMhCTP2dWt6yrRMMBAaxZqHDoRzbImwd8GH6VFzzDAvIt3VJB1YqhQPywfhdurUvJzv1WDOs8nWBeVvRdQyxCjoK_yocH56bc-C1W9yOog5QDZLFEILvl1KzvJnb0ZT2rrqnoI' },
];

const weapons = [
  { name: '鱼骨头', description: 'Long-range destructive capability. Personality: Moody.', image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnabpYPnbTK5eEWICRMpbI9p_3hMl0C49YdrYVigEO0p_GJrCeC2E-O-2Idmb3XzlJob4YzfKM_LK4w9i3C30_ka8CsdCbhdmIgdmNYTNLnjQEmn1wUMEw4yBYzBAlqyqn8nr7Q-H3tn1MJY03G9fAkr7PoCP-jRGVnboHmqlfEtoshB1j7byXmzZseg_wBafLPAr1pKXPmLcVjbdvfOUpNRMNEvSilQ3Pec5ia85vDMI1YVb-hnMx-CdXUFAfLyT0ghZl_x6wNYZJ', color: 'cyan' as const },
  { name: '砰砰', description: 'Rapid-fire chaos delivery system. No brakes included.', image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDR_rP3LIcOkDppiwXh_UH3_CU6tDS3Nf0RV3anw7Nby4n55W76-diZDE0PD-EJnBHXg9ec3XZSPWZlNC0IwJek360WeZj3sUD7sxmPyc4YCXmMwVXag_AitV50aWPTcIILEr3zwty4QBG66uGRcMIOKTuqB71bmooeyE3jgzjnF9MKxwx_llndBp96mRtMa3Te_82ZM2nMi-ybZzSlirqV5Jf2ZWUFTNJJLq3UpzqCJYx-XVtOKjTOS5lISJ199M3R4spbjmWUGnFY', color: 'pink' as const },
];

const stats = [
  { label: '鲁莽指数', value: '100%', progress: 100, color: 'cyan' as const },
  { label: '爆炸潜力', value: '是', progress: 95, color: 'pink' as const },
];

async function seed() {
  console.log('🌱 Seeding database...');

  // Insert gallery items
  const { error: galleryError } = await supabase.from('gallery_items').insert(galleryItems);
  if (galleryError) console.error('Gallery error:', galleryError.message);
  else console.log('✅ Gallery items seeded');

  // Insert crew members
  const { error: crewError } = await supabase.from('crew_members').insert(crewMembers);
  if (crewError) console.error('Crew error:', crewError.message);
  else console.log('✅ Crew members seeded');

  // Insert weapons
  const { error: weaponsError } = await supabase.from('weapons').insert(weapons);
  if (weaponsError) console.error('Weapons error:', weaponsError.message);
  else console.log('✅ Weapons seeded');

  // Insert stats
  const { error: statsError } = await supabase.from('stats').insert(stats);
  if (statsError) console.error('Stats error:', statsError.message);
  else console.log('✅ Stats seeded');

  console.log('🎉 Database seeding complete!');
}

seed();
