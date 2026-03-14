import{expect,test}from '../Fixtures/fixture'
import{AxeBuilder}from '@axe-core/playwright'
import {createHtmlReport} from 'axe-html-reporter'

test("normal accessability",async({page},testInfo)=>{

   await page.goto("https://the-internet.herokuapp.com/");
   const accessabilityScanResult = await new AxeBuilder({page}).analyze();
   createHtmlReport({results:accessabilityScanResult,
      options:{outputDir:'reports/accessability-reports/',
               reportFileName:`${testInfo.title}.html`

      }
   })
   expect(accessabilityScanResult.violations).toEqual([]);

});


test("accessability with tags",async({page})=>{

   await page.goto("https://the-internet.herokuapp.com/");
   const accessabilityScanResult = await new AxeBuilder({page}).withTags(['wcag2aa']).analyze();
   expect(accessabilityScanResult.violations).toEqual([]);
   
});


test("accessability with Include",async({page})=>{

   await page.goto("https://the-internet.herokuapp.com/");
   const accessabilityScanResult = await new AxeBuilder({page}).include('[id="login-button"]').analyze();
   expect(accessabilityScanResult.violations).toEqual([]);
   
});