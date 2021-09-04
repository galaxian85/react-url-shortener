import Database from 'better-sqlite3';
import redis from 'redis';
import {isProduction} from '../server';

const db = new Database(isProduction ? 'sqlite.db' : ':memory:');
const rds = redis.createClient(process.env.REDIS_URL);
const keyTemplate = `RUS:URLMAP:ID:`;

export function initDB(): void {
  db.prepare(`CREATE TABLE IF NOT EXISTS urlMapping (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL)`).run();
}

// if an url not exist then save it and retrieve auto increment id
// if already exist, just retrieve id
export function retrieveId(rawUrl: string): number {
  const url = rawUrl.replace(new RegExp('^(http://|https://)'), '');

  let id: number;

  const row = db.prepare(`SELECT id FROM urlMapping WHERE url = ?`).get(url);
  if (row) {
    id = row.id as number;
  } else {
    const info = db.prepare(`INSERT INTO urlMapping (url) VALUES (?)`).run(url);
    id = info.lastInsertRowid as number;
  }

  rds.set(`${keyTemplate}${id}`, url);
  return id;
}

export function getUrlById(id: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const redisKey = `${keyTemplate}${id}`;
    rds.get(redisKey, (err, reply) => {
      if (reply) {
        resolve(reply);
        return;
      }

      const row = db.prepare(`SELECT url FROM urlMapping WHERE id = ?`).get(id);
      if (!row) {
        resolve(null);
        return;
      }

      rds.set(redisKey, row.url);
      resolve(row.url);
    });
  });
}
