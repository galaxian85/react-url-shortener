import Database from 'better-sqlite3';
import redis from 'redis';
import {UrlRow} from '../../client/components/Home';
import {idToShortenId} from '../core/shortener';
import {isProduction, serviceUrl} from '../server';

const db = new Database(isProduction ? 'sqlite.db' : ':memory:');
const rds = redis.createClient(process.env.REDIS_URL);
const keyTemplate = `RUS:URLMAP:ID:`;

export function initDB(): void {
  db.prepare(`CREATE TABLE IF NOT EXISTS urlMapping (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL)`).run();

  db.prepare(`CREATE TABLE IF NOT EXISTS member (
    username TEXT PRIMARY KEY NOT NULL,
    password TEXT NOT NULL)`).run();

  db.prepare(`CREATE TABLE IF NOT EXISTS historyList (
    username TEXT NOT NULL,
    urlId INTEGER NOT NULL,
    PRIMARY KEY(username, urlId))`).run();
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

interface Member {
  username: string;
  password: string;
}

export function getMember(username: string): Member | null {
  const row = db.prepare(`SELECT * FROM member WHERE username = ?`)
      .get(username);

  if (!row) return null;

  return {
    username: row.username,
    password: row.password,
  };
}

// return true if add success and vise versa
export function addMember(username: string, password: string): boolean {
  try {
    db.prepare(`INSERT INTO member VALUES(?, ?)`).run(username, password);
    return true;
  } catch (_) {
    return false;
  }
}

export function getAllHistory(username: string): Array<UrlRow> {
  const stmt = db.prepare(`SELECT historyList.urlId, urlMapping.url
    FROM historyList
    INNER JOIN urlMapping ON historyList.urlId = urlMapping.id
    WHERE username = ?`);
  const rows = stmt.all(username);

  console.log(rows);

  return rows.reverse().map<UrlRow>((item) => {
    return {
      shortenUrl: `${serviceUrl}/${idToShortenId(item.urlId)}`,
      originUrl: item.url,
    };
  });
}

export function addHistory(username: string, urlId: number): void {
  try {
    db.prepare(`INSERT INTO historyList VALUES (?, ?)`).run(username, urlId);
  } catch (err) {
    console.log(err);
  };
}
