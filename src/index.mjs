import backupDbToFile from './backup.mjs';
import cron from './cron.mjs';

async function runCron() {
  await backupDbToFile();
  await cron();
}

runCron();
