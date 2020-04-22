# United States Covid19 Stats To Google Spreadsheets #
Grabs stats from the CDC website and the Indiana Coronavirus webpage and saves these to a Google Spreadsheet

## Getting Started ##
1. Install Salenium Web Driver for your os
2. Install all packages `npm install`
3. Create a new Google Spreadsheet doc with two sheets (u.s., indiana)
4. Make sure that the column headers match the opbject property names
5. Follow the authentication service account steps: https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
6. Save credentials from Google API to `./credentials.json`
7. Replace Google sheet ID in `./index.json`
8. Go to document share > share with service email address

## State Tracker ##
| State | Project Type | Code |
|-------|--------------|------|
|AL     |
|AK     |Postman	| No	|
|AZ     |
|AR     |
|CA     |
|CO     |
|CT     |
|DE     |
|FL     |
|GA     |
|HI     |
|ID     |
|IL     |Salenium	| Yes	|
|IN     |Salenium	| Yes	|
|IA     |Salenium	| No	|
|KS     |
|KY     |
|LA     |
|ME     |
|MD     |
|MA     |
|MI     |Salenium	| No	|
|MN     |Postman	| No	|
|MS     |
|MO     |Postman	| No	|
|MT     |
|NE     |
|NV     |
|NH     |
|NJ     |
|NY     |
|NC     |
|ND     |
|OH     |Salenium	| No	|
|OK     |
|OR     |
|PA     |
|RI     |
|SC     |
|SD     |
|TN     |
|TX     |
|UT     |
|VT     |
|VA     |
|WA     |
|WV     |
|WI     |Postman	| No	|
|WY     |

## Resources ##
- Installing node on Raspberry Pi: `curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -`
	- `sudo apt install nodejs`
- Installing on Raspberry Pi: `apt-get install chromium-chromedriver`
	- Linux Path to chromedriver: `/usr/lib/chromium-browser/chromedriver`
- [How to execute node chron job](https://stackoverflow.com/questions/5849402/how-can-you-execute-a-node-js-script-via-a-cron-job#5849463)
- [cromedriver headless](https://stackoverflow.com/questions/44197253/headless-automation-with-nodejs-selenium-webdriver#48677891)
