/* jshint esversion: 6, node: true */

const http = require('http');
const fs = require('fs');

const puppeteer = require('puppeteer');

const port = 8000;

function launchServer() {
  return new Promise(resolve => {
    http.createServer((req, res) => {
      console.log(req.method, req.url);

      fs.createReadStream('./index.html').pipe(res);
    }).listen(port, () => {
      console.log('server is listening on port', port);

      resolve();
    });
  });
}

async function launchBrowser() {
  const browser = await puppeteer.connect({
    browserURL: 'http://127.0.0.1:8123/',
//    browserWSEndpoint: ''
//    "webSocketDebuggerUrl": "ws://127.0.0.1:8123/devtools/browser/37b72a0a-ba0e-4bb2-b457-1ec1de9aafa7"
  });
//  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('http://localhost:' + port);
  await page.goto('https://mdn.github.io/web-speech-api/speech-color-changer/');
}

(async () => {
  await launchServer();
  await launchBrowser();
})();
