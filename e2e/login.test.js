/* eslint-disable no-undef */
import { device, element, by,  } from 'detox';

describe('Login', () => {
  beforeAll(async () => {
      await device.launchApp();
      await device.reloadReactNative();
  });

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

describe('Logout action', () => {
  it('should navigate to Home tab when Home tab button is clicked', async () => {
    await element(by.id('test-icon-Account')).atIndex(0).tap();
    await waitFor(element(by.text('teste cinco'))).toBeVisible()

    await element(by.text('Sair')).tap();
  });
});


describe('Incorrect Login', () => {
  it('should navigate to Home tab when Home tab button is clicked', async () => {
    await element(by.id('test-icon-Account')).atIndex(0).tap();
    await waitFor(element(by.text('Entre para visualizar o seu perfil'))).toBeVisible()
    await element(by.id('login')).tap();
  });

  it('with invalid user, should not login', async () => {
    await element(by.id('login-input')).typeText('testeicorreto');
    await element(by.id('password-input')).typeText('123456');
    await element(by.id('submit-button')).tap();
    await expect(element(by.text('Usuario não cadastrado.'))).toBeVisible();
    await element(by.text('OK')).tap();
  });

  it('with invalid user, should not login', async () => {
    await element(by.id('password-input')).clearText();
    await element(by.id('login-input')).clearText();
    await element(by.id('login-input')).typeText('enzo5');
    await element(by.id('password-input')).typeText('123456@');
    await element(by.id('submit-button')).tap();
    await waitFor(element(by.text('Senha inválida'))).toBeVisible()
    await element(by.text('OK')).tap();
  });

  it('No username or password, no login', async () => {
    await element(by.id('password-input')).clearText();
    await element(by.id('login-input')).clearText();
    await element(by.id('submit-button')).tap();
    await waitFor(element(by.text('E-mail ou usuário obrigatória'))).toBeVisible()
    
  });

  it('no password, cant login', async () => {
    await element(by.id('password-input')).clearText();
    await element(by.id('login-input')).clearText();
    await element(by.id('login-input')).typeText('enzo5');
    await element(by.id('submit-button')).tap();
    await waitFor(element(by.text('Faça seu login'))).toBeVisible()
    
  });

});

