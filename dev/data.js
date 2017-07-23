export const data = {
  nodes: [
    {
      id: '1',
      label: 'Source Node',
      type: 'source',
      style: {
        top: '223px',
        left: '52.5px',
      },
    },
    {
      id: '2',
      label: 'Sink Node',
      type: 'sink',
      style: {
        top: '261px',
        left: '1077.5px',
      },
    },
    {
      id: '3',
      label: 'Transform Node 3',
      type: 'transform',
      style: {
        top: '375px',
        left: '462.5px',
      },
    },
    {
      id: '3.5',
      label: 'Transform Node 3.5',
      type: 'transform',
      style: {
        top: '489px',
        left: '667.5px',
      },
    },
    {
      id: '4',
      label: 'Transform Node 4',
      type: 'transform',
      style: {
        top: '109px',
        left: '667.5px',
      },
    },
    {
      id: '4.5',
      label: 'Transform Node 4.5',
      type: 'transform',
      style: {
        top: '33px',
        left: '462.5px',
      },
    },
    {
      id: '5',
      label: 'Transform Node 5',
      type: 'transform',
      style: {
        top: '185px',
        left: '872.5px',
      },
    },
    {
      id: '741a4a95-fe28-4266-a2ed-c799732499c8',
      label: 'transform47432',
      type: 'transform',
      style: {
        top: '489px',
        left: '872.5px',
      },
    },
    {
      id: '8c57a51e-f2af-4f1e-9181-59d948ba2de3',
      label: 'transform55724',
      type: 'transform',
      style: {
        top: '337px',
        left: '872.5px',
      },
    },
    {
      id: 'ecc7ec1b-1a6f-46fd-a485-7268bae1bb72',
      label: 'transform55875',
      type: 'transform',
      style: {
        top: '375px',
        left: '667.5px',
      },
    },
    {
      id: '2dc1dc76-4483-4c80-a04b-b26e2847053c',
      label: 'transform81089',
      type: 'transform',
      style: {
        top: '33px',
        left: '667.5px',
      },
    },
    {
      id: 'f2d2a5b0-3392-4d27-9b0a-f4130af8d9f9',
      label: 'transform81249',
      type: 'transform',
      style: {
        top: '33px',
        left: '872.5px',
      },
    },
    {
      id: 'e55b2602-f988-4e4c-9339-f231ac70705f',
      label: 'transform81400',
      type: 'transform',
      style: {
        top: '109px',
        left: '872.5px',
      },
    },
    {
      id: '67b70b83-d964-43f3-a1a0-f2bacb53c1bc',
      label: 'transform22356',
      type: 'transform',
      style: {
        top: '413px',
        left: '872.5px',
      },
    },
    {
      id: 'c9dd4f48-f49c-44fb-b723-3ce8141f4da4',
      label: 'transform22620',
      type: 'transform',
      style: {
        top: '375px',
        left: '257.5px',
      },
    },
    {
      id: 'a630e804-18a0-4dba-81cd-6cf34e4354ee',
      label: 'transform22804',
      type: 'transform',
      style: {
        top: '261px',
        left: '872.5px',
      },
    },
  ],
  connections: [
    {
      from: '1',
      to: '4.5',
    },
    {
      from: '1',
      to: '4',
    },
    {
      from: '1',
      to: '4.5',
    },
    {
      from: '1',
      to: '5',
    },
    {
      from: '3',
      to: 'ecc7ec1b-1a6f-46fd-a485-7268bae1bb72',
    },
    {
      from: '3.5',
      to: '741a4a95-fe28-4266-a2ed-c799732499c8',
    },
    {
      from: '4.5',
      to: '2dc1dc76-4483-4c80-a04b-b26e2847053c',
    },
    {
      from: '4',
      to: 'e55b2602-f988-4e4c-9339-f231ac70705f',
    },
    {
      from: '5',
      to: '2',
    },
    {
      from: 'ecc7ec1b-1a6f-46fd-a485-7268bae1bb72',
      to: '8c57a51e-f2af-4f1e-9181-59d948ba2de3',
    },
    {
      from: '8c57a51e-f2af-4f1e-9181-59d948ba2de3',
      to: '2',
    },
    {
      from: '741a4a95-fe28-4266-a2ed-c799732499c8',
      to: '2',
    },
    {
      from: '2dc1dc76-4483-4c80-a04b-b26e2847053c',
      to: 'f2d2a5b0-3392-4d27-9b0a-f4130af8d9f9',
    },
    {
      from: 'f2d2a5b0-3392-4d27-9b0a-f4130af8d9f9',
      to: '2',
    },
    {
      from: 'e55b2602-f988-4e4c-9339-f231ac70705f',
      to: '2',
    },
    {
      from: '1',
      to: 'a630e804-18a0-4dba-81cd-6cf34e4354ee',
    },
    {
      from: 'a630e804-18a0-4dba-81cd-6cf34e4354ee',
      to: '2',
    },
    {
      from: '1',
      to: 'c9dd4f48-f49c-44fb-b723-3ce8141f4da4',
    },
    {
      from: 'c9dd4f48-f49c-44fb-b723-3ce8141f4da4',
      to: '3',
    },
    {
      from: 'ecc7ec1b-1a6f-46fd-a485-7268bae1bb72',
      to: '67b70b83-d964-43f3-a1a0-f2bacb53c1bc',
    },
    {
      from: '67b70b83-d964-43f3-a1a0-f2bacb53c1bc',
      to: '2',
    },
    {
      from: '1',
      to: '3.5',
    },
  ],
};
