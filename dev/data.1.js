export const data = {
  nodes: [
    {
      id: "1",
      config: {
        label: "Source Node",
        type: "source",
        style: {
          top: "223px",
          left: "52.5px",
        },
      },
    },
    {
      id: "2",
      config: {
        label: "Sink Node",
        type: "sink",
        style: {
          top: "261px",
          left: "1077.5px",
        },
      },
    },
    {
      id: "3",
      config: {
        label: "Transform Node 3",
        type: "transform",
        style: {
          top: "375px",
          left: "462.5px",
        },
      },
    },
    {
      id: "3.5",
      config: {
        label: "Transform Node 3.5",
        type: "transform",
        style: {
          top: "489px",
          left: "667.5px",
        },
      },
    },
    {
      id: "4",
      config: {
        label: "Transform Node 4",
        type: "transform",
        style: {
          top: "109px",
          left: "667.5px",
        },
      },
    },
    {
      id: "4.5",
      config: {
        label: "Transform Node 4.5",
        type: "transform",
        style: {
          top: "33px",
          left: "462.5px",
        },
      },
    },
    {
      id: "5",
      config: {
        label: "Transform Node 5",
        type: "transform",
        style: {
          top: "185px",
          left: "872.5px",
        },
      },
    },
    {
      id: "741a4a95-fe28-4266-a2ed-c799732499c8",
      config: {
        label: "transform47432",
        type: "transform",
        style: {
          top: "489px",
          left: "872.5px",
        },
      },
    },
    {
      id: "8c57a51e-f2af-4f1e-9181-59d948ba2de3",
      config: {
        label: "transform55724",
        type: "transform",
        style: {
          top: "337px",
          left: "872.5px",
        },
      },
    },
    {
      id: "ecc7ec1b-1a6f-46fd-a485-7268bae1bb72",
      config: {
        label: "transform55875",
        type: "transform",
        style: {
          top: "375px",
          left: "667.5px",
        },
      },
    },
    {
      id: "2dc1dc76-4483-4c80-a04b-b26e2847053c",
      config: {
        label: "transform81089",
        type: "transform",
        style: {
          top: "33px",
          left: "667.5px",
        },
      },
    },
    {
      id: "f2d2a5b0-3392-4d27-9b0a-f4130af8d9f9",
      config: {
        label: "transform81249",
        type: "transform",
        style: {
          top: "33px",
          left: "872.5px",
        },
      },
    },
    {
      id: "e55b2602-f988-4e4c-9339-f231ac70705f",
      config: {
        label: "transform81400",
        type: "transform",
        style: {
          top: "109px",
          left: "872.5px",
        },
      },
    },
    {
      id: "67b70b83-d964-43f3-a1a0-f2bacb53c1bc",
      config: {
        label: "transform22356",
        type: "transform",
        style: {
          top: "413px",
          left: "872.5px",
        },
      },
    },
    {
      id: "c9dd4f48-f49c-44fb-b723-3ce8141f4da4",
      config: {
        label: "transform22620",
        type: "transform",
        style: {
          top: "375px",
          left: "257.5px",
        },
      },
    },
    {
      id: "a630e804-18a0-4dba-81cd-6cf34e4354ee",
      config: {
        label: "transform22804",
        type: "transform",
        style: {
          top: "261px",
          left: "872.5px",
        },
      },
    },
  ],
  connections: [
    {
      source: "1",
      target: "4.5",
    },
    {
      source: "1",
      target: "4",
    },
    {
      source: "1",
      target: "4.5",
    },
    {
      source: "1",
      target: "5",
    },
    {
      source: "3",
      target: "ecc7ec1b-1a6f-46fd-a485-7268bae1bb72",
    },
    {
      source: "3.5",
      target: "741a4a95-fe28-4266-a2ed-c799732499c8",
    },
    {
      source: "4.5",
      target: "2dc1dc76-4483-4c80-a04b-b26e2847053c",
    },
    {
      source: "4",
      target: "e55b2602-f988-4e4c-9339-f231ac70705f",
    },
    {
      source: "5",
      target: "2",
    },
    {
      source: "ecc7ec1b-1a6f-46fd-a485-7268bae1bb72",
      target: "8c57a51e-f2af-4f1e-9181-59d948ba2de3",
    },
    {
      source: "8c57a51e-f2af-4f1e-9181-59d948ba2de3",
      target: "2",
    },
    {
      source: "741a4a95-fe28-4266-a2ed-c799732499c8",
      target: "2",
    },
    {
      source: "2dc1dc76-4483-4c80-a04b-b26e2847053c",
      target: "f2d2a5b0-3392-4d27-9b0a-f4130af8d9f9",
    },
    {
      source: "f2d2a5b0-3392-4d27-9b0a-f4130af8d9f9",
      target: "2",
    },
    {
      source: "e55b2602-f988-4e4c-9339-f231ac70705f",
      target: "2",
    },
    {
      source: "1",
      target: "a630e804-18a0-4dba-81cd-6cf34e4354ee",
    },
    {
      source: "a630e804-18a0-4dba-81cd-6cf34e4354ee",
      target: "2",
    },
    {
      source: "1",
      target: "c9dd4f48-f49c-44fb-b723-3ce8141f4da4",
    },
    {
      source: "c9dd4f48-f49c-44fb-b723-3ce8141f4da4",
      target: "3",
    },
    {
      source: "ecc7ec1b-1a6f-46fd-a485-7268bae1bb72",
      target: "67b70b83-d964-43f3-a1a0-f2bacb53c1bc",
    },
    {
      source: "67b70b83-d964-43f3-a1a0-f2bacb53c1bc",
      target: "2",
    },
    {
      source: "1",
      target: "3.5",
    },
  ],
};
