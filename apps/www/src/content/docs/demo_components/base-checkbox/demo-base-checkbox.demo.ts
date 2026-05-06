export default {
  type: 'demo',
  root: {
    kind: 'box',
    className: 'flex flex-col gap-4',
    children: [
      {
        kind: 'box',
        className: 'flex items-center gap-2',
        children: [
          {
            kind: 'proto',
            prototypeId: 'base-checkbox-root',
            children: [
              {
                kind: 'proto',
                prototypeId: 'base-checkbox-indicator',
                className: 'flex h-5 w-5 items-center justify-center rounded border',
                children: [
                  '<svg class="h-3 w-3" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" stroke-width="1.5" /></svg>',
                ],
              },
              'Unchecked',
            ],
          },
        ],
      },
      {
        kind: 'box',
        className: 'flex items-center gap-2',
        children: [
          {
            kind: 'proto',
            prototypeId: 'base-checkbox-root',
            props: { defaultChecked: true },
            children: [
              {
                kind: 'proto',
                prototypeId: 'base-checkbox-indicator',
                className: 'flex h-5 w-5 items-center justify-center rounded border',
                children: [
                  '<svg class="h-3 w-3" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" stroke-width="1.5" /></svg>',
                ],
              },
              'Checked',
            ],
          },
        ],
      },
      {
        kind: 'box',
        className: 'flex items-center gap-2',
        children: [
          {
            kind: 'proto',
            prototypeId: 'base-checkbox-root',
            props: { defaultIndeterminate: true },
            children: [
              {
                kind: 'proto',
                prototypeId: 'base-checkbox-indicator',
                className: 'flex h-5 w-5 items-center justify-center rounded border',
                children: ['—'],
              },
              'Indeterminate',
            ],
          },
        ],
      },
      {
        kind: 'box',
        className: 'flex items-center gap-2',
        children: [
          {
            kind: 'proto',
            prototypeId: 'base-checkbox-root',
            props: { disabled: true },
            children: [
              {
                kind: 'proto',
                prototypeId: 'base-checkbox-indicator',
                className: 'flex h-5 w-5 items-center justify-center rounded border opacity-50',
                children: [
                  '<svg class="h-3 w-3" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" stroke-width="1.5" /></svg>',
                ],
              },
              'Disabled',
            ],
          },
        ],
      },
    ],
  },
};
