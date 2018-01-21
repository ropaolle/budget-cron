### Production install
``` bash
# Install
ssh olle@192.168.10.146
git clone git@github.com:ropaolle/budget-cron.git
npm i --production
scp ~/.ssh/id* olle@192.168.10.146:~/.ssh
scp ~/Projects/budget-cron/keys/* olle@192.168.10.146:~/budget-cron/keys
# Run
node --experimental-modules src/index
# Crone
crontab -e
* * * * * node --experimental-modules ~/budget-cron/src/index
grep CRON /var/log/syslog
sudo apt-get install postfix
sudo tail -f /var/mail/olle
```

# Info
[Using Babel](https://github.com/babel/example-node-server)

### SCP
``` bash
# download: remote -> local
scp user@remote_host:remote_file local_file 
where local_file might actually be a directory to put the file you're copying in. To upload, it's the opposite:
# upload: local -> remote
scp local_file user@remote_host:remote_file
```

