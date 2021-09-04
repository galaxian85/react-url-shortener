import Database from 'better-sqlite3';
import {isProduction} from '../server';

const db = new Database(isProduction ? 'sqlite.db' : ':memory:');

export function initDB(): void {
  // db = new Database(isProduction ? 'sqlite.db' : ':memory:');
  db.prepare(`CREATE TABLE IF NOT EXISTS urlMapping (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL)`).run();
}

// if an url not exist then save it and retrieve auto increment id
// if already exist, just retrieve id
export function retrieveId(url: string): number {
  const row = db.prepare(`SELECT id FROM urlMapping WHERE url = ?`).get(url);
  if (row) return row.id;

  const info = db.prepare(`INSERT INTO urlMapping (url) VALUES (?)`).run(url);
  return info.lastInsertRowid as number;
}

export function getUrlById(id: number): string {
  return db.prepare(`SELECT url FROM urlMapping WHERE id = ?`).get(id).url;
}
