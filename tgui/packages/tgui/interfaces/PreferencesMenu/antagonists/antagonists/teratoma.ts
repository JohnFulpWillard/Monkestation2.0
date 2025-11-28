import { Antagonist, Category } from '../base';

const Teratoma: Antagonist = {
  key: 'teratoma',
  name: 'Teratoma',
  description: [
    `
      By all means, you should not exist. Your very existence is a sin against nature itself.
      You are loyal to nobody, except the forces of chaos itself.
    `,
    'Spread misery and chaos upon the station.',
  ],
  category: Category.Midround,
};

export default Teratoma;
