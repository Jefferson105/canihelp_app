/* eslint-disable no-undef */
import { device, element, by,  } from 'detox';

describe('Chat', () => {
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
    await element(by.id('test-icon-Conversations')).atIndex(0).tap();

    await expect(element(by.text('Entre para ver mensagens'))).toBeVisible();

    await element(by.id('login')).tap();
  });

  it('Should  login', async () => {
    await element(by.id('login-input')).typeText('enzo5');
    await element(by.id('password-input')).typeText('123456');
    await element(by.id('submit-button')).tap();
});
});

describe('Open Chat', () => {
  it('should navigate to Home tab when Home tab button is clicked', async () => {
    await element(by.id('test-icon-Conversations')).atIndex(0).tap();
  });

  it('should  open conversation', async () => {
    await element(by.text('teste tab')).tap();
  });
});

describe('Text message chat', () => {
  it('Send text message', async () => {
      await element(by.id('test-send-chat')).typeText('Opa, tudo bom?');
      await element(by.id('test-send-message')).tap();
  });
});

describe('Audio message chat', () => {
  it('Send audio message', async () => {
      await element(by.id('test-start-audio')).tap();

      await device.disableSynchronization();
      await element(by.id('test-audio-button')).tap();
      await element(by.text('Toque parar de gravar'));
      await element(by.id('test-audio-button')).tap();

      await device.enableSynchronization();
      await element(by.id('test-audio-send')).tap();
  });
});
