/* eslint-disable no-undef */
import { device, element, by,  } from 'detox';

describe('Account', () => {
  beforeAll(async () => {
      await device.launchApp();
      await device.reloadReactNative();
  }, 240000);

  it('should show home screen after close welcome', async () => {
      await expect(element(by.text('Qual serviço você precisa agora?'))).toBeVisible();
  });
});

describe('Tab Bar Navigation', () => {
  it('should navigate to Home tab when Home tab button is clicked', async () => {
    await element(by.id('test-icon-Account')).atIndex(0).tap();
    await waitFor(element(by.text('Entre para visualizar o seu perfil'))).toBeVisible()
    await element(by.id('login')).tap();
  });

  it('Should  login', async () => {
    await element(by.id('login-input')).typeText('enzo5');  
    await element(by.id('password-input')).typeText('123456');
    await element(by.id('submit-button')).tap();
  });

});

describe('Navigate to the account page', () => {
  it('should navigate to Home tab when Home tab button is clicked', async () => {
    await element(by.id('test-icon-Account')).atIndex(0).tap();
    await waitFor(element(by.text('teste cinco'))).toBeVisible()

  });

  it('should  open contacts', async () => {
    await element(by.text('Contatos')).tap();
    await waitFor(element(by.text('Todos'))).toBeVisible()
  });

  it('should  show followers profile', async () => {
      await element(by.id('press-Seguindo')).tap();
  });
  
  it('should  show followig profile', async () => {
      await element(by.id('press-Seguidores')).tap();
      await element(by.id('arrowBack')).tap();
  });
});

describe('Navigate to the Ratings page', () => {
  it('should  open Ratings', async () => {
    await element(by.text('Avaliações')).tap();
  });

  it('should  show client rattings', async () => {
    await element(by.text('Cliente')).tap();
  });

  it('should  show pro rattings', async () => {
    await element(by.text('Profissional')).tap();
    await element(by.id('arrowBack')).tap();
  });
});

describe('Navigate to the archived messages page', () => {
  it('should  open archived messages', async () => {
    await element(by.text('Mensagens arquivadas')).tap();
    await waitFor(element(by.text('Mensagens arquivadas'))).toBeVisible()
    await element(by.id('arrowBack')).tap();
  });
});

describe('Navigate to the blocked contacts page', () => {
  it('should  open contacts', async () => {
    await element(by.text('Bloqueios')).tap();
    await waitFor(element(by.text('Contados Bloqueados'))).toBeVisible()
    await element(by.id('arrowBack')).tap();
  });
});

describe('Navigate to the scrapbook', () => {
  it('should  open scrapbook', async () => {
    await element(by.text('Recados')).tap();
    await waitFor(element(by.text('Recados'))).toBeVisible()
    await element(by.id('arrowBack')).tap();
  });
});

describe('Navigate to the privacy page', () => {
  it('should  open privacy page', async () => {
    await element(by.text('Privacidade')).tap();
    await waitFor(element(by.text('TERMOS DE USO'))).toBeVisible()
    await element(by.id('arrowBack')).tap();
  });
});

describe('Navigate to the reset password page', () => {
  it('should  open reset password page', async () => {
    await element(by.text('Redefinir senha')).tap();
    await waitFor(element(by.text('Nova senha'))).toBeVisible()
  });

  it('should  change pass', async () => {
    await element(by.id('teste-new')).typeText('123456');
    await element(by.id('teste-repeat')).typeText('123456');
    await element(by.id('scrollView')).scrollTo('bottom');
    await element(by.id('teste-button')).tap();
    await element(by.id('arrowBack')).tap();
  }); 
});