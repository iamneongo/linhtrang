import path from 'path';

import { config } from 'dotenv';

const cwd = process.cwd();

config({ path: path.resolve(cwd, '.env.local'), override: false });
config({ path: path.resolve(cwd, '.env'), override: false });
