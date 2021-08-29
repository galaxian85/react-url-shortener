import { addUrlToDB, getUrlById } from "../db/db";

export async function zipUrl(url: string): Promise<string> {
  const id = await addUrlToDB(url);
  return idToShortenId(id);
}

export async function unzipUrl(shortenId: string): Promise<string> {
  return await getUrlById(shortenIdToId(shortenId));
}

const candidateChars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const candidateLenth = candidateChars.length;

function idToShortenId(id: number): string {
  const arr = [];
  let quotient = id;

  do {
    let mod = quotient % candidateLenth;
    quotient = (quotient - mod) / candidateLenth;
    arr.unshift(candidateChars[mod]);
  } while (quotient);

  return arr.join('');
}

function shortenIdToId(str: string): number {
  const candidateLen = candidateChars.length;
  let id = 0;

  for (let i = 0, len = str.length; i < len; i++) {
    id *= candidateLenth;
    id += candidateChars.indexOf(str[i]);
  }
  return id;
}
