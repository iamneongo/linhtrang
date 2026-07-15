import * as migration_20260701_082616 from './20260701_082616';

export const migrations = [
  {
    up: migration_20260701_082616.up,
    down: migration_20260701_082616.down,
    name: '20260701_082616'
  },
];
