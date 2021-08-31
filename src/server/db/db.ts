import sqlite3 from 'sqlite3';
const db = new sqlite3.Database(':memory:');

export function initDB(): void {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS urlMapping (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url TEXT NOT NULL
    )`);
  });
}

// save url and retrieve auto increment id
export function addUrlToDB(url: string): Promise<number> {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run('INSERT INTO urlMapping(url) VALUES ($url)', {$url: url});
      db.get('SELECT last_insert_rowid() FROM urlMapping', (err, row) => {
        resolve(row['last_insert_rowid()']);
      });
    });
  });
}

export function getUrlById(id: number): Promise<string> {
  return new Promise((resolve, reject) => {
    db.get('SELECT url FROM urlMapping WHERE id = ?', id, (err, row) => {
      resolve(row ? row['url'] : null);
    });
  });
}
