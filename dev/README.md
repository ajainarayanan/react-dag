# React-dag Demo

This is a simplified demo to show how `react-dag` as a component can be used in a dev environment

## Context

This is to demo,

  - Different types of nodes, that has different types of endpoints and different types of connections coming in and out of them. 
  - Defines connection encoders/decoders for different nodes. The connection encoders and decoders help in encoding/decoding connection objects. This means converting connections to/from a node to its specific endpoints defined by the node.
  - Showcase a basic canvas(ish) user experience (pan, zoom/in out) and auto layout(ish) using third-party libraries. This opens possibilities of doing a lot of more.
  - Showcases a rudimentary jsplumb settings for endpoints and connections.

## Specific components,

  `NodeType1` - A node with any number of incoming connection and one endpoint to the right that defines all the output connections from the node.

  `NodeType2` - Similar to `NodeType1` but the connections incoming or outgoing connections are customized (dotted)

  `NodeType3` - Has a slightly different shape for a node and the endpoints are placed at different locations. An example for nodes having different shapes and multiple endpoints

  `DefaultNode` - Default node that comes with the dag component. Has an endpoint for outgoing connections and doesn't accept any incoming connections. An example of specifying rules to define what connections can come in or go out.

## Connection Encoders/Decoders,

  `transformConnectionEncoder/Decoder` - Functions that convert the generic connection object to return specific connections to endpoint and vice-versa.

  For example,
    The connection object could just define,

    ```javascript
      {
        sourceId: 'Node-1',
        targetId: 'Node-2'
      }
    ```

  But while rendering we need the `Node-1` outgoing connection to go from a specific endpoint (say to the right).

  `transformConnectionEncoder` will convert this object to be,

    ```javascript
      {
        sourceId: 'Node-1-right',
        targetId: 'Node-2'
      }
    ```

  for internal use. 
    
   But when the `onChange` event happens the parent doesn't care about 
   what endpoint was used to connect two nodes. So this has to be converted back to the 
   original connection object (given as input) for the parent to use henceforth. When 
   using such graph systems in general in a realworld application, the backend system do 
   not care about what endpoints were used for a node representation in UI. They 
   generally care about what node connects to what. Hence this encoding the connection 
   object for internal use and decoding the same to be passed on to other systems (like 
   the backends)
    

