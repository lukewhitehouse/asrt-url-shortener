import type { NextApiRequest, NextApiResponse } from 'next';
import { isWebUri } from 'valid-url';
import type { URLShortenerResponse } from '../../../types/link';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<URLShortenerResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not permitted' });
  }

  const { url = '', slug = '' } = req.body;

  if (!url) {
    return res.status(400).json({ message: 'URL not found' });
  } else if (!isWebUri(url)) {
    return res.status(400).json({ message: 'URL was not valid' });
  }

  if (!slug) {
    return res.status(400).json({ message: 'Slug not found' });
  } else if (typeof slug !== 'string') {
    return res.status(400).json({ message: 'Slug was not valid' });
  }

  return res.status(200).json({
    message: 'Link saved',
    link: { url, slug },
  });
}
