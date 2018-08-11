const fs = require('fs');
const {notesList, CommandName, ArgumentIndex } = require('./utils');

const argv = process.argv;
const command = argv[ArgumentIndex.COMMAND_INDEX];
const noteTitle = argv[ArgumentIndex.NOTE_TITLE_INDEX];
const noteContent = argv[ArgumentIndex.NOTE_CONTENT_INDEX];

switch (command) {
  case CommandName.VIEW_LIST:
    getList((error, notes) => {
      if (error) return console.error(error.message);

      notes.forEach((note, index) => console.log(`${index + 1}: ${note.title}`));
    });

    break;
  case CommandName.SHOW_ITEM:
    showNote(noteTitle, (error, note) => {
      if (error) return console.error(error.message);

      console.log(`# ${note.title}\r\n\r\n---\r\n\r\n${note.content}`);
    });

    break;
  case CommandName.CREATE_ITEM:
    createNote(noteTitle, noteContent, (error) => {
      if (error) return console.error(error.message);

      console.log('Заметка создана');
    });

    break;
  case CommandName.REMOVE_ITEM:
    removeNote(noteTitle, (error) => {
      if (error) return console.error(error.message);

      console.log('Заметка удалена');
    });
    break;
  default:
    console.log('Неизвестная команда');
}

function getList(done) {
  fs.readFile(notesList, (error, data) => {
    if (error) done(error);

    done (null, JSON.parse(data));
  });
}

function showNote(title, done) {
  fs.readFile(notesList, (error, data) => {
    if (error) done(error);

    const notes = JSON.parse(data);
    const note = notes.find(item => item.title === title);

    if (!note) return done(new Error('Заметка не найдена'));

    done (null, note);
  });
}

function createNote(title, content, done) {
  fs.readFile(notesList, (error, data) => {
    if (error) done(error);

    const notes = JSON.parse(data);

    notes.push({title, content});

    fs.writeFile(notesList, JSON.stringify(notes), (error) => {
      if (error) return done(error);

      done();
    });
});
}

function removeNote(title, done) {
  fs.readFile(notesList, (error, data) => {
    if (error) done(error);

    const notes = JSON.parse(data).filter(item => item.title !== title);

    fs.writeFile(notesList, JSON.stringify(notes), (error) => {
      if (error) return done(error);

      done();
    });
  });
}