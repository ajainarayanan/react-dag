export const data = {
  connections: [
    {
      sourceId: "1",
      targetId: "2",
    },
    {
      sourceId: "2",
      targetId: "3.5",
    },
    {
      data: {
        condition: "true",
      },
      sourceId: "3.5",
      targetId: "4.5",
    },
    {
      data: {
        condition: "false",
      },
      sourceId: "3.5",
      targetId: "3",
    },
    {
      sourceId: "3",
      targetId: "4",
    },
  ],
  nodes: [
    {
      config: {
        label: "Default Node",
        type: "source",
      },
      id: "1",
    },
    {
      config: {
        label: "Node Type 1",
        type: "transform",
      },
      id: "2",
    },
    {
      config: {
        label: "Node Type 1(Sink)",
        type: "sink",
      },
      id: "3",
    },
    {
      config: {
        label: "Node Type 3",
        type: "condition",
      },
      id: "3.5",
    },
    {
      config: {
        label: "Node Type 2",
        type: "action",
      },
      id: "4",
    },
    {
      config: {
        label: "Node Type 2",
        type: "action",
      },
      id: "4.5",
    },
  ],
};
