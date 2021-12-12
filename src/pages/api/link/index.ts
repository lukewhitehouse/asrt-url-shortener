import type { NextApiRequest, NextApiResponse } from 'next';
import { isWebUri } from 'valid-url';

type CreateNewLinkResponse = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateNewLinkResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not permitted' });
  }

  const { url = '' } = req.body;

  if (!url) {
    return res.status(400).json({ message: 'URL not found' });
  } else if (!isWebUri(url)) {
    return res.status(400).json({ message: 'URL was not valid' });
  }

  return res.status(200).json({ message: `URL saved: ${url}` });
}
