describe('react-dag behavior test', () => {
  it('Should render', () => {
    cy.visit('/');
    cy.get('#btn-wipeout').click();
    cy.get('#btn-add-node-type-4').click();
    cy.get('#btn-add-node-type-1').click();
    cy.get('#btn-add-node-type-2').click();
    cy.get('#btn-add-node-type-3').click();
    cy.get('#btn-add-node-type-5').click();

    cy.move_node('#Node-5', 1000, 100);
    cy.move_node('#Node-4', 900, 300);
    cy.move_node('#Node-3', 700, 100);
    cy.move_node('#Node-2', 300, 100);
    cy.move_node('#Node-1', 100, 100);

    cy.move_node('.Node-1-source', 200, -50);
    cy.move_node('.Node-2-transform', 200, 0);
    cy.move_node('.Node-3-DottedEndpoint-right', 200, 0);
    cy.move_node('.Node-3-DottedEndpoint-right', 0, 200);
    cy.move_node('.Node-4-condition-right', 100, -200);

    cy.get('.connector-class').then((elements) => expect(elements.length).to.equal(5));
  });
  it('Should delete nodes & connections', () => {
    cy.get('#Node-3 [data-cy="close-button"]').click();
    cy.get('.connector-class').then((elements) => expect(elements.length).to.equal(2));

    cy.get('#btn-add-node-type-3').click();
    cy.move_node('#Node-6', 700, 100);
    cy.move_node('.Node-2-transform', 200, 0);
    cy.move_node('.Node-6-condition-right', 200, 0);
    cy.move_node('.Node-6-condition-bottom', 200, 150);
    cy.move_node('.Node-4-condition-right', 50, -200);

    cy.get('.connector-class').then((elements) => expect(elements.length).to.equal(5));
  });
});
