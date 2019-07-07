export { }
declare global {
  namespace Cypress {
    interface Chainable {
      move_node: (nodeId: string, toPageX: number, toPageY: number) => Chainable<any>;
    }
  }
}
