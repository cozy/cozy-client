"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SCHEMA = exports.SOURCE_ACCOUNT_IDENTIFIER = exports.SOURCE_ACCOUNT_ID = exports.DOCTYPE_VERSION = exports.APP_VERSION = exports.APP_NAME = exports.FILE_2 = exports.FILE_1 = exports.TODO_WITH_AUTHOR = exports.AUTHORS = exports.TODO_WITH_RELATION = exports.TODOS = exports.TODO_4 = exports.TODO_3 = exports.TODO_2 = exports.TODO_1 = void 0;
var TODO_1 = {
  _id: 'todo_1',
  _rev: '4-43bdf4f7123f4d748645ba9536a46daa',
  _type: 'io.cozy.todos',
  label: 'Buy bread',
  done: false
};
exports.TODO_1 = TODO_1;
var TODO_2 = {
  _id: 'todo_2',
  _rev: '2-4e015d830d3246e5a83b3466f437bf1f',
  _type: 'io.cozy.todos',
  label: 'Check email',
  done: false
};
exports.TODO_2 = TODO_2;
var TODO_3 = {
  _id: 'todo_3',
  _rev: '22-6af94ee48bcc4867aa06b72b635837e9',
  _type: 'io.cozy.todos',
  label: 'Build stuff',
  done: true
};
exports.TODO_3 = TODO_3;
var TODO_4 = {
  _id: 'todo_4',
  _rev: '19-cc30042f909f4fa7a487c4c7f0a11d19',
  _type: 'io.cozy.todos',
  label: 'Run a semi-marathon',
  done: true
};
exports.TODO_4 = TODO_4;
var TODOS = [TODO_1, TODO_2, TODO_3];
exports.TODOS = TODOS;
var TODO_WITH_RELATION = {
  _id: 5,
  _rev: '1-7f02bbb542fb4eb0805b130a80b9be1a',
  _type: 'io.cozy.todos',
  label: 'tototot',
  relationships: {
    attachments: {
      doctype: 'io.cozy.files',
      files: [{
        _type: 'io.cozy.files',
        _id: 1
      }, {
        _type: 'io.cozy.files',
        _id: 2
      }]
    }
  }
};
exports.TODO_WITH_RELATION = TODO_WITH_RELATION;
var AUTHORS = [{
  id: 1,
  _id: 1,
  _type: 'io.cozy.persons',
  name: 'Alice'
}, {
  _id: 2,
  id: 2,
  _type: 'io.cozy.persons',
  name: 'Bob'
}];
exports.AUTHORS = AUTHORS;
var TODO_WITH_AUTHOR = {
  _id: 5,
  _rev: '1-7f02bbb542fb4eb0805b130a80b9be1a',
  _type: 'io.cozy.todos',
  label: 'Todo with several authors',
  relationships: {
    authors: {
      doctype: 'io.cozy.persons',
      data: [{
        _type: 'io.cozy.persons',
        _id: 1
      }, {
        _type: 'io.cozy.persons',
        _id: 2
      }]
    }
  }
};
exports.TODO_WITH_AUTHOR = TODO_WITH_AUTHOR;
var FILE_1 = {
  _id: 1,
  _rev: '3-bd9bb7286a094842b954d9e86429090d',
  _type: 'io.cozy.files',
  label: 'File 1',
  name: 'New document name'
};
exports.FILE_1 = FILE_1;
var FILE_2 = {
  _id: 2,
  _rev: '2-aa462e9a9867449f916c932fef481c27',
  _type: 'io.cozy.files',
  label: 'File 2'
};
exports.FILE_2 = FILE_2;
var APP_NAME = 'cozy-client-test';
exports.APP_NAME = APP_NAME;
var APP_VERSION = 2;
exports.APP_VERSION = APP_VERSION;
var DOCTYPE_VERSION = 1;
exports.DOCTYPE_VERSION = DOCTYPE_VERSION;
var SOURCE_ACCOUNT_ID = '123-456-abc';
exports.SOURCE_ACCOUNT_ID = SOURCE_ACCOUNT_ID;
var SOURCE_ACCOUNT_IDENTIFIER = 'testSourceAccountIdentifier';
exports.SOURCE_ACCOUNT_IDENTIFIER = SOURCE_ACCOUNT_IDENTIFIER;
var SCHEMA = {
  todos: {
    doctype: 'io.cozy.todos',
    doctypeVersion: DOCTYPE_VERSION,
    relationships: {
      attachments: {
        type: 'has-many',
        doctype: 'io.cozy.files'
      },
      authors: {
        type: 'has-many',
        doctype: 'io.cozy.persons'
      }
    }
  },
  files: {
    doctype: 'io.cozy.files',
    relationships: {
      icons: {
        type: 'has-many',
        doctype: 'io.cozy.files'
      }
    }
  }
};
exports.SCHEMA = SCHEMA;