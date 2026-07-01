import './lib/loadEnv.ts';

import { postgresAdapter } from '@payloadcms/db-postgres';
import { FixedToolbarFeature, InlineToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
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
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [...defaultFeatures, FixedToolbarFeature(), InlineToolbarFeature()],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    schemaName: 'payload',
  }),
});
