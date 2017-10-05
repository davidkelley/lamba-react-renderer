import fs from 'fs';

import Request from './request';

const readStats = () => {
  try {
    const stats = fs.readFileSync(`./stats.json`, { encoding: 'utf8' });
    return JSON.parse(stats);
  } catch (e) {
    return {};
  }
};

const STATS = readStats();

export default async function (event, context, cb) {
  try {
    if (!event.stats) event.stats = STATS;
    const request = new Request(event);
    const data = await request.send();
    cb(null, data);
  } catch (err) {
    cb(err);
  }
};
