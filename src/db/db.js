import Dexie from 'dexie';

export const db = new Dexie('TodoDB');

db.version(2).stores({
  todos: '++id, title, completed, createdAt, position'
});

export default db;
