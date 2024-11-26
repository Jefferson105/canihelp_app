/* eslint-disable no-undef */
//Comodando para rodar: fisico: detox test -c android.att.debug
// roda um arquivo especifio ex: detox test login.test.js -c android.att.debug

import { device, element, by,  } from 'detox';

describe('Welcome Screen Test', () => {
    beforeAll(async () => {
      await device.launchApp();  
    });
  
    it('should click the next button', async () => {
      await element(by.id('next-button')).tap();
    });
  });
;
