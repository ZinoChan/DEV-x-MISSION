describe('Navigation', () => {
  beforeEach(() => {
    cy.task('resetDB');
    cy.task('seedDB');
    cy.visit('/');
  });
  it('visit the missions page', () => {
    cy.findByRole('link', { name: /get started/i }).click();
    cy.findByRole('link', { name: /create mission/i }).should('exist');
  });
  it('visit the mission detail page', () => {
    cy.findByRole('link', { name: /get started/i }).click();
    cy.findByRole('link', { name: /create mission/i }).should('exist');
    cy.findByRole('link', { name: /mission 1/i }).click();
    cy.findByRole('heading', { name: /mission: mission 1/i }).should('exist');
  });

  it('goes back to misisons page on back click', () => {
    cy.findByRole('link', { name: /get started/i }).click();
    cy.findByRole('link', { name: /create mission/i }).should('exist');
    cy.findByRole('link', { name: /mission 1/i }).click();
    cy.findByRole('heading', { name: /mission: mission 1/i }).should('exist');
    cy.findAllByRole('heading', { name: /back/i }).eq(0).click();
    cy.findByRole('link', { name: /create mission/i }).should('exist');
  });
  it('navigate using navbar', () => {
    cy.findByRole('link', { name: /missions/i }).click();
    cy.findByRole('link', { name: /create mission/i }).should('exist');
    cy.findByRole('link', { name: /home/i }).click();
    cy.findByRole('link', { name: /get started/i }).should('exist');
  });
  it('displays name for mission that was not present at build time', () => {
    cy.task('addMission');
    cy.findByRole('link', { name: /get started/i }).click();
    cy.findByRole('link', { name: /mission 3/i }).click();
    cy.findByRole('heading', { name: /mission: mission 3/i }).should('exist');
  });
});
