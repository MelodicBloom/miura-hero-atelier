// src/components/MiuraHero/MiuraHeroThree.stories.jsx
import MiuraHeroThree from './MiuraHeroThree.jsx';
import { within, expect } from '@storybook/test';

export default {
  title: 'Atelier/Hero/MiuraHeroThree',
  component: MiuraHeroThree,
  parameters: {
    chromatic: {
      viewports: [320, 768, 1280, 1920],
      modes: {
        Frame1_FirstCrease: { foldProgress: 0 },
        Frame2_HingeInitiation: { foldProgress: 0.25 },
        Frame3_MidfieldZigzag: { foldProgress: 0.5 },
        Frame4_FullDeployment: { foldProgress: 1 },
      },
    },
  },
  tags: ['autodocs'],
};

const Template = ({ foldProgress = 0 }) => (
  <div style={{ width: '100%', height: '100vh' }}>
    <MiuraHeroThree foldProgress={foldProgress} />
  </div>
);

export const Frame1_FirstCrease = Template.bind({});
Frame1_FirstCrease.args = { foldProgress: 0 };

export const Frame2_HingeInitiation = Template.bind({});
Frame2_HingeInitiation.args = { foldProgress: 0.25 };

export const Frame3_MidfieldZigzag = Template.bind({});
Frame3_MidfieldZigzag.args = { foldProgress: 0.5 };
Frame3_MidfieldZigzag.play = async ({ canvasElement }) => {
  const canvas = canvasElement.querySelector('canvas');
  await expect(canvas).toBeTruthy();
};

export const Frame4_FullDeployment = Template.bind({});
Frame4_FullDeployment.args = { foldProgress: 1 };
Frame4_FullDeployment.play = async ({ canvasElement, context }) => {
  await Frame3_MidfieldZigzag.play(context);
  const canvas = canvasElement.querySelector('canvas');
  await expect(canvas).toBeTruthy();
};
