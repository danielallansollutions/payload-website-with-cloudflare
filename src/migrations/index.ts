import * as migration_20251125_191031 from './20251125_191031';

export const migrations = [
  {
    up: migration_20251125_191031.up,
    down: migration_20251125_191031.down,
    name: '20251125_191031'
  },
];
