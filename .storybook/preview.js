// .storybook/preview.js
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { expanded: true },
  chromatic: {
    disableSnapshot: false,
    viewports: [320, 768, 1280, 1920],
  },
};
