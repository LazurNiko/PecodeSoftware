Cypress.Commands.add('login', (username = 'Niko', password = '12345Qwert!') => {
  cy.visit('/qa-portal');
  cy.get('[placeholder="Username"]')
    .type(username);
  cy.get('[placeholder="Password"]')
    .type(password);
  cy.get('[type="submit"]')
    .click();
});
