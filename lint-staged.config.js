// lint-staged.config.js

const yarn = (cmd) => `yarn ${cmd}`;

module.exports = {
  "**/*.{ts,tsx}": [
    () => yarn("tsc -p tsconfig.json --noEmit"),
    yarn("lint:fix"),
  ],
};
