// Define common application modules
const APP_BASE_MODULES = ['app', 'states', 'utils', 'services', 'errors'];

// Define application ports
const APP_PORTS = {
  header: 9001,
  home: 9002,
  login: 9003,
};

// Define the prompt configuration for selecting applications
const promptSelectApp = {
  type: 'multiselect',
  name: 'appSelection',
  message: 'Select your application',
  instructions: false,
  choices: Object.entries(APP_PORTS).map(([appName, portNumber]) => ({
    title: `${appName} (Port: ${portNumber})`,
    value: appName,
  })),
  hint: '- Space to select. Return to submit',
};

/**
 * Validates the selected applications and exits if none are selected.
 * @param {string[]} apps - List of selected applications.
 */
const validateSelectedApps = (apps) => {
  if (!Array.isArray(apps) || apps.length === 0) {
    console.log('No application has been selected');
    process.exit(1);
  }
};

// Define the Lerna command based on the operating system
const lernaCmd = process.platform.startsWith('win') ? 'lerna.cmd' : 'lerna';

/**
 * Generates the Lerna command arguments.
 * @param {string[]} apps - List of selected applications.
 * @param {string} command - Command to execute.
 * @returns {string[]} Array of command arguments.
 */
const commands = (apps, command) => [
  'run',
  command,
  '--scope',
  `*/*{${[...APP_BASE_MODULES, ...apps].join(',')}}*`,
  '--stream',
  '--parallel',
];

/**
 * Generates spawn options for the process, including environment variables.
 * @param {string[]} apps - List of selected applications.
 * @returns {object} Spawn options.
 */
const spawnOptions = (apps) => ({
  stdio: 'inherit',
  env: {
    ...process.env,
    FEATURE_APP_DATA: JSON.stringify(
      Object.fromEntries(apps.map((app) => [app, APP_PORTS[app]])),
    ),
  },
});

module.exports = {
  APP_PORTS,
  promptSelectApp,
  validateSelectedApps,
  lernaCmd,
  commands,
  spawnOptions,
};
