export function migrateConfig(config: string): string {
  return config.replace('adversaryNamesAndIds', 'adversaryLevelIds');
}
