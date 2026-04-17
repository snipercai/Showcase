export const DATA_SYNC_CONFIG = {
  github: {
    owner: 'snipercai',
    repo: 'ai-hub-data',
    branch: 'main'
  },
  
  sync: {
    autoSyncOnFirstLaunch: true,
    autoSyncInterval: 24 * 60 * 60 * 1000,
    enableManualSync: true,
    preserveUserData: true
  },
  
  storage: {
    hasSyncedKey: 'ai-hub-has-synced',
    lastSyncTimeKey: 'ai-hub-last-sync-time',
    localVersionKey: 'ai-hub-local-version'
  }
}
