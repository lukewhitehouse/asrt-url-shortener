import type { NextApiRequest, NextApiResponse } from 'next';
import { isWebUri } from 'valid-url';

// @TODO: Move to Mongo
const db = [
  {
    url: 'https://google.com',
    slug: 'goo',
  },
  {
    url: 'https:///assortment.io',
    slug: 'asrt',
  },
  {
    url: 'https://lukewhitehouse.co.uk',
    slug: 'lw',
  },
];

type Link = {
  url: string;
  slug: string;
};

type URLShortenerResponse = {
  message: string;
  link?: Link;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<URLShortenerResponse>
) {
  const { slug = '' } = req.query;

  if (!slug) {
    return res.status(400).json({ message: 'Slug not found' });
  } else if (typeof slug !== 'string') {
    return res.status(400).json({ message: 'Slug was not valid' });
  }

  if (req.method === 'GET') {
    const result = db.find((row) => row.slug === slug);

    if (result) {
      return res.status(200).json({ ...result, message: 'Link found' });
    }

    return res.status(404).json({ message: 'Link not found' });
  }

  if (req.method === 'PUT') {
    const result = db.find((row) => row.slug === slug);

    if (result) {
      const { url = '' } = req.body;

      if (!url) {
        return res.status(400).json({ message: 'URL not found' });
      } else if (!isWebUri(url)) {
        return res.status(400).json({ message: 'URL was not valid' });
      }

      return res.status(200).json({
        message: `Link updated successfully from: ${result.url}`,
        link: { url, slug },
      });
    }
  }

  return res.status(405).json({ message: 'Method not permitted' });
}
