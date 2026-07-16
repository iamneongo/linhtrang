import * as migration_20260701_082616 from './20260701_082616';
import * as migration_20260716_101500 from './20260716_101500';

export const migrations = [
  {
    up: migration_20260701_082616.up,
    down: migration_20260701_082616.down,
    name: '20260701_082616'
  },
  {
    up: migration_20260716_101500.up,
    down: migration_20260716_101500.down,
    name: '20260716_101500'
  },
];
