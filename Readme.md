# United States Covid19 Stats To Google Spreadsheets #
Grabs stats about number of cases, deaths, and more for the United States and individual states. After returning data the data is saved into a private Google spreadsheet.

## Getting Started ##
1. Install Salenium Web Driver for your os
2. Install all packages `npm install`
3. Create a new Google Spreadsheet doc with a sheet for the US total and each state
4. Make sure that the column headers match the opbject property names
5. Follow the authentication service account steps: https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
6. Save credentials from Google API to `./credentials.json`
7. Replace Google sheet ID in `./index.json`
8. Go to document share > share with service email address
9. If you need to update with past records go to http://coronavirusapi.com/, find state, and save as CSV. 
	- If you open this in Excel you can convert the Unix time to simple date (use resource link below)
## Tips ##
- Google sheets has a 40,000 query limit per day

## Resources ##
- Installing node on Raspberry Pi: `curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -`
	- `sudo apt install nodejs`
- Installing on Raspberry Pi: `apt-get install chromium-chromedriver`
	- Linux Path to chromedriver: `/usr/lib/chromium-browser/chromedriver`
- [How to execute node chron job](https://stackoverflow.com/questions/5849402/how-can-you-execute-a-node-js-script-via-a-cron-job#5849463)
- [cromedriver headless](https://stackoverflow.com/questions/44197253/headless-automation-with-nodejs-selenium-webdriver#48677891)
- [Spreadhseet convert unix to short date time](https://stackoverflow.com/questions/46130132/converting-unix-time-into-date-time-via-excel#48617380)
