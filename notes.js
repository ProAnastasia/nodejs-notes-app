const fs = require('fs');
const { notesList, CommandName, ArgumentIndex } = require('./utils');

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
  load(done);
}

function showNote(title, done) {
  load((error, notes) => {
    if (error) return done(error);

    const note = notes.find(item => item.title === title);

    if (!note) return done(new Error('Заметка не найдена'));

    done (null, note);
  });
}

function createNote(title, content, done) {
  load((error, notes) => {
    if (error) return done(error);

    notes.push({title, content});
    save(notes, done);
  });
}

function removeNote(title, done) {
  load((error, notes) => {
    if (error) return done(error);

    notes = notes.filter(item => item.title !== title);
    save(notes, done);
});
}

function load(done) {
  fs.readFile(notesList, (error, data) => {
    if (error) {
      if (error.code === 'ENOENT') {
        return done (null, []);
      } else {
        return done(error);
      }
    }

    try {
      const notes = JSON.parse(data);
      
      done(null, notes);
    } catch (error) {
      done(new Error('Ошибка в данных'));
    }
  });
}

function save(notes, done) {
  try {
    const json = JSON.stringify(notes);
    fs.writeFile(notesList, json, (error) => {
      if (error) return done(error);
      done();
    });
  } catch (error) {
    done(error);
  }
}
