/* eslint-disable no-undef */

describe('Social Post', () => {
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
    await waitFor(element(by.text('Entre para visualizar o seu perfil'))).toBeVisible();
    await element(by.id('login')).tap();
  }); 

  it('Should login', async () => {
    await element(by.id('login-input')).typeText('empresa10@test.com');  
    await element(by.id('password-input')).typeText('123456');
    await element(by.id('submit-button')).tap();
  });
});


describe('Social post interactions', () => {
  it('Should open social', async () => {
      await element(by.id('test-icon-Social')).atIndex(0).tap();
  });

  it('Should like a post', async () => {
      await element(by.id('test-heart-0')).tap();
  });
  it('Should remove like', async () => {
      await element(by.id('test-heart-0')).tap();
  });
  it('Should open post', async () => {
      await element(by.id('test-open-post-0')).tap();
  });
  it('Should leave a coment', async () => {
      await element(by.id('test-comment')).replaceText('Isso é um Teste e2e!');
      await element(by.id('SendTest')).tap();
  });

  it(' Should edit and then delete a comment', async () => {
    
    await element(by.id('test-edit-modal')).tap();
    await element(by.text('Editar')).tap();
    await element(by.id('test-edit-coment')).replaceText(
        'Teste e2e editado'
    );
    await element(by.text('Comentários')).tap();
    await element(by.id('scrollView')).scrollTo('bottom');
    await element(by.text('Salvar')).tap();
    
    await element(by.id('test-edit-modal')).atIndex(0).tap();
    await element(by.text('Deletar')).tap();

  });

});

