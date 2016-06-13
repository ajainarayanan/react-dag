import {combineReducers, createStore, applyMiddleware} from 'redux';
import uuid from 'node-uuid';

let nodes = (state = [], action = {}) => {
  switch(action.type) {
    case 'ADD-NODE':
      return [
        ...state,
        {
          id: uuid.v4(),
          label: action.payload.label,
          type: action.payload.type
        }
      ];
    case 'UPDATE_NODE':
      return state.map(node => {
        if (node.id === action.payload.nodeId) {
          node.style = action.payload.style;
          return node;
        }
        return node;
      });
    case 'RESET':
      return [];
    default:
      return state;
  }
};
const connections = (state = [], action = {}) => {
  switch(action.type) {
    case 'ADD-CONNECTIONS':
      return [
        ...state,
        {
          from: action.connection.from,
          to: action.connection.to
        }
      ];
    case 'SET-CONNECTIONS':
      return [...action.payload.connections];
    case 'RESET':
      return [];
    default:
      return state;
  }
};

const graph = (state = {}, action = {}) => {
  switch(action.type) {
    case 'LOADING':
      return Object.assign({}, state, {loading: action.payload.loading});
    case 'RESET':
      return {};
    default:
      return state;
  }
};

const defaultReducersMap = () => {
  return {
    nodes: [ (state = [], action = {}) => state ],
    graph: [ (state = {}, action = {}) => state ],
    connections: [ (state = [], action = {}) => state ]
  }
};

let combinedReducers = (reducersMap = defaultReducersMap()) => {
  let nodesReducers = [nodes].concat(reducersMap['nodes']);
  let graphReducers = [graph].concat(reducersMap['graph']);

  return combineReducers({
    nodes: (state, action) => {
      return nodesReducers
        .reduce((prev, curr) => curr.bind(null, prev(state, action), action))();
    },
    connections,
    graph: (state, action) => {
      return graphReducers
        .reduce((prev, curr) => curr.bind(null, prev(state, action), action))();
    }
  });
};

export function configureStore(data, reducersMap, middlewares = []) {
  let store = createStore(
    combinedReducers(reducersMap),
    data,
    applyMiddleware.apply(null, middlewares)
  );
  return store;
};
