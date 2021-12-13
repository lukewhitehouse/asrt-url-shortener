type Link = {
  url: string;
  slug: string;
};

export type URLShortenerResponse = {
  message: string;
  link?: Link;
};
