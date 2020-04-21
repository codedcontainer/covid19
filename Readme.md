# Covid19 => Google Spreadsheet #
Grabs stats from the CDC website and the Indiana Coronavirus webpage and saves these to a Google Spreadsheet

## Getting Started ##
1. Install Salenium Web Driver for your os
2. Install all packages `npm install`
3. Create a new Google Spreadsheet doc with two sheets (u.s., indiana)
4. Follow the authentication service account steps: https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
5. Save credentials from Google API to `./credentials.json`
6. Replace Google sheet ID in `./index.json`
7. Go to document share > share with service email address

## Resources ##
- Installing node on Raspberry Pi: `curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -`
	- `sudo apt install nodejs`
- Installing on Raspberry Pi: `apt-get install chromium-chromedriver`
	- Linux Path to chromedriver: `/usr/lib/chromium-browser/chromedriver`
- [How to execute node chron job](https://stackoverflow.com/questions/5849402/how-can-you-execute-a-node-js-script-via-a-cron-job#5849463)
- [cromedriver headless](https://stackoverflow.com/questions/44197253/headless-automation-with-nodejs-selenium-webdriver#48677891)
