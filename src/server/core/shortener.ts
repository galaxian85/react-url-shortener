import axios from 'axios';
import {retrieveId, getUrlById} from '../db/db';

export function zipUrl(url: string): string {
  const id = retrieveId(url);
  return idToShortenId(id);
}

export function unzipUrl(shortenId: string): string {
  return getUrlById(shortenIdToId(shortenId));
}

export async function checkUrlValid(rawUrl: string): Promise<boolean> {
  return new Promise((resolve) => {
    let url = rawUrl.trim();
    if (!url.startsWith('http')) {
      url = `http://${url}`;
    }

    axios.get(url)
        .then((res) => {
          const status = res.status;
          resolve(status >= 200 && status <= 399);
        })
        .catch(() => resolve(false));
  });
}

const candidateChars =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const candidateLenth = candidateChars.length;

function idToShortenId(id: number): string {
  const arr = [];
  let quotient = id;

  do {
    const mod = quotient % candidateLenth;
    quotient = (quotient - mod) / candidateLenth;
    arr.unshift(candidateChars[mod]);
  } while (quotient);

  return arr.join('');
}

function shortenIdToId(str: string): number {
  let id = 0;

  for (let i = 0, len = str.length; i < len; i++) {
    id *= candidateLenth;
    id += candidateChars.indexOf(str[i]);
  }
  return id;
}
