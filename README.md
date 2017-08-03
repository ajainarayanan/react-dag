# React-dag

![Imgur](http://i.imgur.com/LlV5ZpA.gif)

React wrapper for jsplumb. Helps in managing a Directed Acyclic Graph using Redux. It allows enhancing the store with additional features (Zoomin/Zoomout? History?)

A demo of this module being used can be found here [Demo](react-dag-app.surge.sh).

#### Install

`npm install react-dag`

#### Usage
  ```
    import {DAG} from 'react-dag';
    class MyComponent extends Component {
      ...
      render() {
        return (
          <DAG settings={this.settings}
              data={this.data}
              enhancers={this.enhancers}
              additionalReducersMap={this.additionalReducersMap}
              middlewares={this.middlewares}/>
        );
      }
    }
  ```

#### Props
  - `settings` - Settings to be used for JsPlumb. Check out `dag-settings.js` for base settings that are available.
  ###### Note
    The `settings` prop is like either or - Either you provide the entire settings for the DAG or take the base settings. I am still yet to work on how to achieve granularity (or mixin) multiple different settings.
  
  - `renderNode` - Callback function to render your own nodes instead of the default nodes that comes with dag. Note: If you are using your own render function for nodes please do attach `.node` class name to the nodes. Till today thats how dag.js understands a node in the DAG and makes it draggable.

  - `onNodesClick` - Click handler for each node click. 

  - `data` - Is the initial state of the DAG. Could be used to render the DAG right away if the data is already available (instead of constructing the DAG one node at a time).

  - `enhancers` - Are the list of enhancers you would want to add to the `dag-store`. To read more about enhancers please check the [documentation here](https://github.com/reactjs/redux/blob/master/docs/Glossary.md#store-enhancer)

  - `additionalReducersMap` - The DAG comes with a base reducer that does some base operations. If you want additional reducers to be used for any property of the store you could pass in the map and the reducers would get `reduce`'d (as in executed one at a time. Something like reduce reducer)

    For instance the store right now has a structure like,
      ```
    {
      nodes: nodesReducer,
      connections: connectionsReducer,
      graph: graphReducer
    }
      ```
      In addition to the the `nodesReducer` if there are additional reducers that you want to add then it could be passed in as something like this,

      ```
    {
      nodes: [myReducer1, sometherReducer2]
    }
      ```

      Based on the additional reducer the above implementation of redux store's reducer becomes,

      ```
    {
      nodes: nodesReducers
              .reduce((prev, curr) => curr.bind(null, prev(state, action), action))(),
      connections: connectionsReducer
              .reduce((prev, curr) => curr.bind(null, prev(state, action), action))(),
      graph: graphReducer
              .reduce((prev, curr) => curr.bind(null, prev(state, action), action))(),
    }
      ```
    ##### Note
      This is a little crude as of now. Will have to see if I can use this as a generic functionality for any store.

  - `middlewares` - Similar to `additionalReducers` you could pass in additional middlewares that you want to add based on your reducers.
