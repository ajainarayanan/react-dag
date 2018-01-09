# React-dag

![Imgur](https://i.imgur.com/n9bM1FS.gif)

React wrapper for jsplumb. Helps in rendering a Directed Acyclic Graph.

A demo of this module being used can be found here [Demo](http://react-dag-app.surge.sh).

## Install

`npm install react-dag`

## Usage

```
  import ReactDAG from "react-dag";
  class MyComponent extends Component {
    ...
    render() {
      return (
        <ReactDAG
          nodes={cloneDeep(this.state.nodes)}
          connections={cloneDeep(this.state.connections)}
          jsPlumbSettings={defaultSettings}
          connectionDecoders={[
            transformConnectionDecoder,
            conditionConnectionDecoder,
          ]}
          connectionEncoders={[
            transformConnectionEncoder,
            conditionConnectionEncoder,
          ]}
          onChange={({
            nodes: n,
            connections: c,
          }: {
            nodes: INode[];
            connections: IConnectionParams[];
          }) => {
            this.setState({ nodes: n, connections: c });
          }}
          eventListeners={eventListeners}
          registerTypes={registerTypes}
          zoom={this.state.zoom}
        >
          {this.state.nodes.map((node, i) => {
            const Component = getComponent(node.config ? node.config.type : "");
            return <Component key={i} id={node.id} />;
          })}
        </ReactDAG>
      );
    }
  }
```

## Older version docs:

For older version (version 1.x) please follow the readme here [README](https://github.com/ajainarayanan/react-dag).
Since this is a re-write the API is completely different and includes for a lot of additional functionality not available
in the previous version

## Props

* `settings` - Settings to be used for JsPlumb. Check out `dag-settings.ts` for base settings that are available.

  #### Note

  The `settings` prop is used as argument while creating a jsplumb instance. For individual nodes to use specific settings please import the same in each node module.

* `nodes`: Set of nodes to be rendered in the DAG. A node in the nodes array takes the type of [INode - type](https://github.com/ajainarayanan/react-dag/blob/feature/ui-2.0.0.alpha.1/src/models/index.ts#L8-L11).

  * Every node has to have an `id` to be uniquely identified
  * And an optional config that is needed for individual nodes

* `connections`: The set of connections are the rules for connecting the above nodes. A connection in the connections array takes the type of `IConnectionParams` [type](https://github.com/ajainarayanan/react-dag/blob/feature/ui-2.0.0.alpha.1/src/models/index.ts#L23-L29)

  * Every connection MUST have a `sourceId` and a `targetId`.
  * Optionally it can have other information too. The extra information should be evident when using encoders and decoders for connections.

* `connectionDecoders`: A connection decoder is nothing but a pure function that accepts a connection parameter and the set of nodes. This decoder helps in decoding a connection that has information about, say its endoint, to something more generic.

  An example would be,

  * Lets say we have two nodes. `NodeA` with two endpoints (left and right) and `NodeB` with only one endpoint (a source) and the entire node acts as a target (meaning it can accept incoming connections anywhere on its left side).
  * Now the right end point from `NodeA` connects to `NodeB`.

  When that happens `jsPlumb` returns a connection that is of the form,

  ```javascript
    {
      sourceId: "NodeA-right-endpoint",
      targetId: "NodeB"
    }
  ```

  (if we chose to name the end points of `NodeA` as `NodeA-right-endpoint` and `NodeA-left-endpoint`)

  In order to decode this to be,

  ```javascript
    {
      sourceId: "NodeA",
      targetId: "NodeB"
    }
  ```

  a decoder function is used. The list of decoders are passed a connection object (current connection), jsplumb instance and the list of nodes. Each function has logic to convert the incoming connection to what is desired. And it returns the modified connection object. The same is passed to subsequent decoders to decode the connection objects for different nodes.

  The reduce logic of decoders looks like this,

  ```javascript
  const newConnObj = encoders.reduce(
    (prev, curr) => curr(prev, this.state.jsPlumbInstance, this.props.nodes),
    { ...connObj }
  );
  ```

- `connectionEncoders`: As the name mentions a connection decoder converts a connection object from jsplumb to the one desired.

  An example of a encoder and a decoder can be [found here](https://github.com/ajainarayanan/react-dag/blob/feature/ui-2.0.0.alpha.1/dev/connectionReducers.ts#L57-L127)

- `eventListeners`: Is a key-value map where key represents the event and the value represents the callback to call when the event occurs. This is useful if you want to bind to specific events in jsplumb instance. For a list of possible events please check [jsplumb docs here](https://jsplumbtoolkit.com/community/doc/events.html#jsPlumbEvents)

- `registerTypes`: Is a key-value map where the key represents the type name and the value represents the paint style object. This is useful if you want to set types in jsplumb instance that you can use to style nodes/connections while drawing the graph. jsplumb docs for registerConnection/registerEndpoint types can be [found here](https://jsplumbtoolkit.com/community/apidocs/classes/jsPlumbInstance.html#method_registerConnectionTypes)

- `zoom`: Is an integer that represents the zoom level of the entire graph.

- `onChange`: Every time there is a change in the state of the graph (nodes/connections), the onChange callback is called back. This is similar to `onChange` in any input type html elements.

- `children`: The children should be an array of different types of nodes that needs to be rendered. Each child needs to have a unique id to be identified.

  `ReactDAG` accepts the children and wraps with extra properties that it needs to initialize and render itself. In addition to the `id` prop provided as part of the node, `ReactDAG` also provides the following props,

  * `config`: a config object if provided as part of the node in the nodes array.
  * `initNode`: a initializing function. Every node that needs to be rendered in the DAG **MUST** call `this.props.initNode` function. The function accepts 4 parameters in this order,

    * `nodeId`: the unique node identifier passed initially.
    * `endPointParams`: A list of endpoints to be added to the node. This endpointParam type reference can be [found here](https://github.com/ajainarayanan/react-dag/blob/feature/ui-2.0.0.alpha.1/src/models/index.ts#L31-L35). The endpoint param is the same object that you would pass to [addEndpoint](https://jsplumbtoolkit.com/community/apidocs/classes/jsPlumbInstance.html#method_addEndpoint) function in jsplumb. It accepts an `element`, `params` and `referenceParams`
    * `makeSourceParams`: is the same object passed to `makeSource` function in jsplumb. This is to make the entire node a source (or part of it based on the paramters). A doc reference for makeSource can be [found here](https://jsplumbtoolkit.com/community/apidocs/classes/jsPlumbInstance.html#method_makeSource)
    * `makeTargetParams`: Similar to `makeSource`. A doc reference for `makeTarget` in jsplumb can be [found here](https://jsplumbtoolkit.com/community/apidocs/classes/jsPlumbInstance.html#method_makeSource)

- `onDelete`: A callback function when deleting a node. This function has to be called if the DAG has to be re-rendered.
