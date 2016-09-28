import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import uuid from 'node-uuid';

let nodes = (state = [], action = {}) => {
  switch(action.type) {
    case 'ADD-NODE':
	return [
     	      ...state,
              Object.assign({}, { id: uuid.v4() }, action.paylod) 
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

let combinedReducers = function(reducersMap = defaultReducersMap()) {
  let defaultValues = defaultReducersMap();
  const getReducer = (map, key, dValues) => {
    if (Array.isArray(map[key])) {
      if (map[key].length > 0) {
        return map[key];
      }
    }
    return dValues[key];
  };
  let nodesReducers = [nodes].concat(getReducer(reducersMap, 'nodes', defaultValues));
  let graphReducers = [graph].concat(getReducer(reducersMap, 'graph', defaultValues));
  let connectionsReducers = [connections].concat(getReducer(reducersMap, 'connections', defaultValues));

  const genericReducerFn  = function(reducers, state, action) {
    if(reducers.length > 1){
      return reducers
        .reduce((prev, curr) => curr.bind(null, prev(state, action), action))();
    } else {
      return reducers[0]();
    }
  };
  return combineReducers({
    nodes: (state, action) => {
      return genericReducerFn(nodesReducers, state, action);
    },
    connections: (state, action) => {
      return genericReducerFn(connectionsReducers, state, action);
    },
    graph: (state, action) => {
      return genericReducerFn(graphReducers, state, action);
    }
  });
};

export function configureStore(data, reducersMap, middlewares = [], enhancers= []) {
  let store = createStore(
    combinedReducers(reducersMap),
    data,
    compose.apply(
      null,
      [
        applyMiddleware.apply(null, middlewares)
      ].concat(enhancers.map(enhancer => enhancer()))
    )
  );
  return store;
};
