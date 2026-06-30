import 'dotenv/config';

import { mongooseAdapter } from '@payloadcms/db-mongodb';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';

import { Categories } from './collections/Categories.ts';
import { News } from './collections/News.ts';
import { Products } from './collections/Products.ts';
import { Projects } from './collections/Projects.ts';
import { Users } from './collections/Users.ts';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '- Linh Trang Admin',
    },
  },
  routes: {
    admin: '/admin',
    api: '/cms-api',
    graphQL: '/cms-api/graphql',
    graphQLPlayground: '/cms-api/graphql-playground',
  },
  collections: [Users, Categories, Products, Projects, News],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
});
