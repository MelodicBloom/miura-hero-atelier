// src/components/MiuraHero/MiuraHeroSpline.stories.jsx
import MiuraHeroSplineWrapper from './MiuraHeroSplineWrapper.jsx';

export default {
  title: 'Atelier/Hero/MiuraHeroSpline',
  component: MiuraHeroSplineWrapper,
  parameters: {
    chromatic: {
      viewports: [320, 768, 1280, 1920],
      modes: {
        Frame1_FirstCrease: { initialFold: 0 },
        Frame2_HingeInitiation: { initialFold: 0.25 },
        Frame3_MidfieldZigzag: { initialFold: 0.5 },
        Frame4_FullDeployment: { initialFold: 1 },
      },
    },
  },
};

const Template = ({ initialFold = 0 }) => (
  <div style={{ width: '100%', height: '100vh' }}>
    <MiuraHeroSplineWrapper initialFold={initialFold} />
  </div>
);

export const Frame1_FirstCrease = Template.bind({});
export const Frame2_HingeInitiation = Template.bind({});
export const Frame3_MidfieldZigzag = Template.bind({});
export const Frame4_FullDeployment = Template.bind({});
