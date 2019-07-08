const dataOld = {
  connections: [
    {
      sourceId: '1',
      targetId: '2',
    },
    {
      sourceId: '2',
      targetId: '3.5',
    },
    {
      data: {
        condition: 'true',
      },
      sourceId: '3.5',
      targetId: '4.5',
    },
    {
      data: {
        condition: 'false',
      },
      sourceId: '3.5',
      targetId: '3',
    },
    {
      sourceId: '3',
      targetId: '4',
    },
  ],
  nodes: [
    {
      config: {
        label: 'Default Node (ID#1)',
        type: 'source',
      },
      id: '1',
    },
    {
      config: {
        label: 'Node Type 1 (ID#2)',
        type: 'transform',
      },
      id: '2',
    },
    {
      config: {
        label: 'Node Type 1 (ID#3)',
        type: 'sink',
      },
      id: '3',
    },
    {
      config: {
        label: 'Node Type 3 (ID#3.5)',
        type: 'condition',
      },
      id: '3.5',
    },
    {
      config: {
        label: 'Node Type 2 (ID#4)',
        type: 'action',
      },
      id: '4',
    },
    {
      config: {
        label: 'Node Type 2 (ID#4.5)',
        type: 'action',
      },
      id: '4.5',
    },
  ],
};

const complexData = {
  connections: [
    {
      sourceId: 'A',
      targetId: 'B',
    },
    {
      sourceId: 'B',
      targetId: 'C',
    },
    {
      sourceId: 'B',
      targetId: 'D',
    },
    {
      sourceId: 'C',
      targetId: 'D',
    },
    {
      sourceId: 'C',
      targetId: 'E',
    },
    {
      sourceId: 'D',
      targetId: 'E',
    },
    {
      sourceId: 'G-right',
      targetId: 'F',
    },
    {
      sourceId: 'F-DottedEndpoint-right',
      targetId: 'D',
    },
    {
      sourceId: 'F-DottedEndpoint-right',
      targetId: 'E',
    },
    {
      sourceId: 'B',
      targetId: 'G',
    },
  ],
  nodes: [
    {
      config: {
        label: 'Default Node (ID#1)',
        type: 'source',
        style: {
          left: '50px',
          top: '102.5px',
        },
      },
      id: 'A',
    },
    {
      config: {
        label: 'Node Type 1 (ID#2)',
        type: 'action',
        style: {
          left: '350px',
          top: '102.5px',
        },
      },
      id: 'B',
    },
    {
      config: {
        label: 'Node Type 1 (ID#3)',
        type: 'action',
        style: {
          left: '650px',
          top: '50px',
        },
      },
      id: 'C',
    },
    {
      config: {
        label: 'Node Type 2 (ID#4)',
        type: 'action',
        style: {
          left: '950px',
          top: '165px',
        },
      },
      id: 'D',
    },
    {
      config: {
        label: 'Node Type 2 (ID#5)',
        type: 'action',
        style: {
          left: '1250px',
          top: '112.5px',
        },
      },
      id: 'E',
    },
    {
      config: {
        label: 'Node Type: action #1',
        type: 'action',
      },
      id: 'F',
    },
    {
      config: {
        label: 'Node Type: transform #2',
        type: 'transform',
      },
      id: 'G',
    },
  ],
  zoom: 1,
  loading: false,
};
export const data = {
  connections: [
    {
      sourceId: '1.1',
      targetId: '2.1',
    },
    {
      sourceId: '2.1',
      targetId: '3.1',
    },
    {
      sourceId: '2.1',
      targetId: '4.1',
    },
    {
      sourceId: '3.1',
      targetId: '4.1',
    },
    {
      sourceId: '3.1',
      targetId: '5.1',
    },
    {
      sourceId: '4.1',
      targetId: '5.1',
    },
  ],
  nodes: [
    {
      config: {
        label: 'Default Node (ID#1)',
        type: 'source',
      },
      id: '1.1',
    },
    {
      config: {
        label: 'Node Type 1 (ID#2)',
        type: 'action',
      },
      id: '2.1',
    },
    {
      config: {
        label: 'Node Type 1 (ID#3)',
        type: 'action',
      },
      id: '3.1',
    },
    {
      config: {
        label: 'Node Type 2 (ID#4)',
        type: 'action',
      },
      id: '4.1',
    },
    {
      config: {
        label: 'Node Type 2 (ID#5)',
        type: 'action',
      },
      id: '5.1',
    },
  ],
};

export { dataOld, complexData };
