const fs = require('fs');
const {notesList, CommandName, ArgumentIndex } = require('./utils');

const argv = process.argv;
const command = argv[ArgumentIndex.COMMAND_INDEX];
const noteTitle = argv[ArgumentIndex.NOTE_TITLE_INDEX];
const content = argv[ArgumentIndex.NOTE_CONTENT_INDEX];

switch (command) {
  case CommandName.VIEW_LIST:
    getList((error, notes) => {
      if (error) return console.error(error.message);

      notes.forEach((note, index) => console.log(`${index + 1}: ${note.title}`));
    });

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

function getList(done) {
  fs.readFile(notesList, (error, data) => {
    if (error) done(error);

    done (null, JSON.parse(data));
  });
}