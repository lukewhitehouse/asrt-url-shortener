type DB = {
  url: string;
  slug: string;
}[];

// @TODO: Move to Mongo
export const db: DB = [
  {
    url: 'https://google.com',
    slug: 'goo'
  },
  {
    url: 'https:///assortment.io',
    slug: 'asrt'
  },
  {
    url: 'https://lukewhitehouse.co.uk',
    slug: 'lw'
  }
];
