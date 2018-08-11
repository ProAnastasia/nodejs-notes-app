const fs = require('fs');
const { CommandName, ArgumentIndex } = require('./utils');

const argv = process.argv;
const command = argv[ArgumentIndex.COMMAND_INDEX];
const noteTitle = argv[ArgumentIndex.NOTE_TITLE_INDEX];
const content = argv[ArgumentIndex.NOTE_CONTENT_INDEX];

switch (command) {
  case CommandName.VIEW_LIST:
    break;
  case CommandName.SHOW_ITEM:
    break;
  case CommandName.CREATE_ITEM:
    break;
  case CommandName.REMOVE_ITEM:
    break;
  default:
    console.log('Unknown command');
}