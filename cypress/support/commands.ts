Cypress.Commands.add('move_node', (nodeId, toPageX, toPageY) => {
  cy.get(nodeId)
    .trigger('mousedown', { which: 1, pageX: 0, pageY: 0 })
    .trigger('mousemove', { which: 1, pageX: toPageX, pageY: toPageY })
    .trigger('mouseup');
});
