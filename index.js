const puppeteer = require('puppeteer');
const DEFAULT_TIMEOUT = 60000;
(async () => {
  const browser = await puppeteer.launch({
    ignoreDefaultArgs: [
        '--disable-extensions',
        '--enable-automation',
    ],
    args: [
        '--disable-features=IsolateOrigins,site-per-process',
        '--start-fullscreen',
        '--disable-infobars',
    ],
    ignoreHTTPSErrors: true,
    defaultViewport:null,
    headless:false
  })
  const page = await browser.newPage()
  page.setDefaultNavigationTimeout(DEFAULT_TIMEOUT);
  page.setDefaultTimeout(DEFAULT_TIMEOUT);
  const navigationPromise = page.waitForNavigation().catch(e =>{console.error("Error In Navigation")});

  await page.goto('https://www.vietjetair.com/Sites/Web/en-US/Home')
  await page.setViewport({ width: 1680, height: 873 })
  
  await navigationPromise.catch(e =>{console.error("Error In Navigation")});
  console.log("Wait For Login Dropdown")
  await page.waitForSelector('.pad1 > .menubar > #jMenu > li:nth-child(5) > .fNiv' , {visible:true , hidden:true}).catch(e =>{})
  console.log("Click On Login Dropdown")
  await page.click('.pad1 > .menubar > #jMenu > li:nth-child(5) > .fNiv')
  
  console.log("Wait For Travel Agency");
  await page.waitForSelector('#jMenu > li:nth-child(5) > ul > li:nth-child(3) > a' , {visible:true , hidden:true}).catch(e =>{})
  console.log("Click on Travel Agency")
  await page.evaluate((selector) =>{
      document.querySelector(selector).click();
  } , '#jMenu > li:nth-child(5) > ul > li:nth-child(3) > a')
  
  await navigationPromise.catch(e =>{console.error("Error In Navigation")});
  await page.waitForSelector("#txtAgentID" , {visible:true , timeout:DEFAULT_TIMEOUT}).catch(e =>{});
  await page.type("#txtAgentID","username" , {delay:50});

  await page.waitForSelector('#txtAgentPswd' , {visible:true , hidden:true}).catch(e =>{})
  await page.type('#txtAgentPswd' , "password" , {delay:50});
  
  await page.waitForSelector('table > tbody > tr > td > .button' , {visible:true , hidden:true}).catch(e =>{})
  await page.click('table > tbody > tr > td > .button')
  
  await navigationPromise.catch(e =>{console.error("Error In Navigation")});
  
//   await browser.close()
})()