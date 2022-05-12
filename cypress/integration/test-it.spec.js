describe('Check It Vanilla', () => {
  it('deve criar uma tarefa, marcar como feita e remover', () => {
    cy.visit('http://localhost:3000/check-it-vanilla/');
    cy.get('.form__field__input').click();
    cy.get('.form__field__input').type('teste');
    cy.get('.form__button').click();
    cy.get('#list-todo li').should('have.length', 1);
    cy.get('#list-done li').should('have.length', 0);

    cy.get('#list-todo li .tasks-section__item__text').first().should('have.text', 'teste');

    cy.get('#list-todo li .tasks-section__item__checkbox').click();
    cy.get('#list-todo li').should('have.length', 0);
    cy.get('#list-done li').should('have.length', 1);

    cy.get('#list-done li .tasks-section__item__remove').click();
    cy.get('#list-todo li').should('have.length', 0);
    cy.get('#list-done li').should('have.length', 0);
  })

  it('deve criar uma tarefa com a tecla "Enter", marcar como feita e remover', () => {
    cy.visit('http://localhost:3000/check-it-vanilla/');
    cy.get('.form__field__input').click();
    cy.get('.form__field__input').type('teste').type('{enter}');
    cy.get('#list-todo li').should('have.length', 1);
    cy.get('#list-done li').should('have.length', 0);

    cy.get('#list-todo li .tasks-section__item__text').first().should('have.text', 'teste');

    cy.get('#list-todo li .tasks-section__item__checkbox').click();
    cy.get('#list-todo li').should('have.length', 0);
    cy.get('#list-done li').should('have.length', 1);

    cy.get('#list-done li .tasks-section__item__remove').click();
    cy.get('#list-todo li').should('have.length', 0);
    cy.get('#list-done li').should('have.length', 0);
  })

  it('não deve criar uma tarefa com o campo vazio', () => {
    cy.visit('http://localhost:3000/check-it-vanilla/');
    cy.get('.form__button').click();
    cy.get('#list-todo li').should('have.length', 0);
    cy.get('#list-done li').should('have.length', 0);
  })
})