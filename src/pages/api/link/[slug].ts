import type { NextApiRequest, NextApiResponse } from 'next';

const db = [
  {
    link: 'https://google.com',
    slug: 'goo',
  },
  {
    link: 'https:///assortment.io',
    slug: 'asrt',
  },
  {
    link: 'https://lukewhitehouse.co.uk',
    slug: 'lw',
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug = '' } = req.query;

  if (req.method === 'GET') {
    const result = db.find((row) => row.slug === slug);

    if (result) {
      return res.status(200).json({ ...result, message: 'Link found' });
    }

    return res.status(404).json({ message: 'Link not found' });
  }
}
