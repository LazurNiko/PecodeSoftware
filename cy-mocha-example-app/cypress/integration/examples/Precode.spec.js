describe('Login form should exist', () => {

  it(`Login form has 'Username', 'Password' fields and 'Submit' button`, () => {
  cy.visit('/qa-portal');
  cy.get('.wrapper').should('be.visible');
  cy.get('#logomini').should('have.attr', 'src', 'https://pecode-software.web.app/static/media/icon-logo.f8576d05.svg');
  cy.get('center>h1').contains('QA Portal Login');
  cy.get('form')
    .should('be.visible')
    .within(() => {
  cy.get('.form-group>.form-control')
    .eq(0)
    .should('have.attr', 'type', 'text');
  cy.get('.form-group>.form-control')
    .eq(1)
    .should('have.attr', 'type', 'password');
  cy.get('.form-group>input')
    .eq(2)
    .should('have.attr', 'type', 'submit');
  });
});

describe('Unsuccessful login', () => {
  let user;

  before(() => {
    cy.task('unregisteredUser').then((unregisteredUser) => {
      user = unregisteredUser;
   });
  })
  
  it(`Unregistered user shouldn't be able to login`, () => {
    cy.get('[placeholder="Username"]')
      .type(user.username);
    cy.get('[placeholder="Password"]')
      .type(user.password);
    cy.get('[type="submit"]')
      .click();
    cy.contains('.has-error > .help-block', 'No account found with that username.')
      .should('be.visible');
    });

  it(`User not be able to login with 'Username' blank field`, () => {
    cy.get('[placeholder="Username"]')
      .clear();
    cy.get('[placeholder="Password"]')
      .type(user.password);
    cy.get('[type="submit"]')
      .click();
    cy.contains('.has-error > .help-block', 'Please enter username.')
      .should('be.visible');
  });

    it(`User not be able to login with 'Username' blank field`, () => {
      cy.get('[placeholder="Username"]')
        .type(user.username);
      cy.get('[placeholder="Password"]')
        .clear();
      cy.get('[type="submit"]')
        .click();
      cy.contains('.has-error > .help-block', 'Please enter your password.')
        .should('be.visible');
    });
});

})

describe('Registered user login', () => {

  it('Registered user should be able to login', () => {

    cy.login();

   });

   it(`Registered user can login with incorrect password`, () => {
    cy.get('[placeholder="Username"]')
      .clear()
      .type('test');
    cy.get('[placeholder="Password"]')
      .clear()
      .type('12345')
    cy.get('[type="submit"]')
      .click();
    cy.contains('.has-error > .help-block', 'The password you entered was not valid.')
      .should('not.exist')
  });
});
