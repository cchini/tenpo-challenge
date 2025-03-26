#!/usr/bin/env node

// Import the 'prompts' library for interactive command-line prompts
const prompts = require('prompts');

// Override prompt values with command-line arguments using 'yargs'
prompts.override(require('yargs').argv);

// Import the 'spawn' function from the Node.js child process module
const { spawn } = require('node:child_process');

// Import utility functions from 'develop-utils'
const utils = require('./develop-utils');

(async () => {
  // Prompt the user to select applications
  const { appSelection } = await prompts([utils.promptSelectApp]);

  // Validate the selected applications
  utils.validateSelectedApps(appSelection);

  // Execute the Lerna command to start the selected applications
  spawn(
    utils.lernaCmd, // Lerna CLI command
    utils.commands(appSelection, 'start'), // Generate command arguments
    utils.spawnOptions(appSelection), // Set spawn options based on selection
  );
})();
