import moment from 'moment';
import fs from 'fs';
import chalk from 'chalk';
import {
  database,
  DB_USERS,
  DB_BUDGET_COLLECTION,
  DB_EXSPENSES_COLLECTION,
} from './firebase.mjs';

const BACKUP_DIR = './backup';

function saveCollection(collection) {
  const filename = `${moment().format('YYYYMMDD-HHmmss')}-${collection}.txt`;
  const wstream = fs.createWriteStream(`${BACKUP_DIR}/${filename}`);
  return database.collection(collection)
    // .limit(2)
    .get()
    .then((snapshot) => {
      console.log(`${chalk.blue(snapshot.docs.length)} records saved to ${chalk.white(filename)}`);
      const data = snapshot.docs.map(doc => doc.data());
      wstream.write(JSON.stringify(data, null, 4));
    })
    .then(() => { wstream.end(); });
}

export default async function backupDbToFile() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR);
  }

  const start = new Date();

  await saveCollection(DB_USERS);
  await saveCollection(DB_BUDGET_COLLECTION);
  await saveCollection(DB_EXSPENSES_COLLECTION);

  const end = new Date() - start;
  console.info(`Execution time: ${chalk.red.bold(end)} ms\n`);

  return Promise.resolve('done');
}
