import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

const cypressJsonConfig = {
  fileServerFolder: '.',
  fixturesFolder: './src/fixtures',
  video: true,
  videosFolder: '../../dist/cypress/apps/menu-matriarch-e2e/videos',
  screenshotsFolder: '../../dist/cypress/apps/menu-matriarch-e2e/screenshots',
  chromeWebSecurity: false,
  baseUrl: 'http://localhost:4500',
  specPattern: 'src/e2e/**/*.cy.{js,jsx,ts,tsx}',
  supportFile: 'src/support/e2e.ts',
};
export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename),
    ...cypressJsonConfig,
    testIsolation: true,
  },
});
