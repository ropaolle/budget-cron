import backupDbToFile from './backup';
import cron from './cron';

async function runCron() {
  await backupDbToFile();
  await cron();
}

runCron();
