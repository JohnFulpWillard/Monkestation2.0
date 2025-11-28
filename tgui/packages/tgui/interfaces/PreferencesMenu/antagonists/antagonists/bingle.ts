import { Antagonist, Category } from '../base';
import { multiline } from 'tgui-core/string';

const Bingle: Antagonist = {
  key: 'bingle',
  name: 'Bingle',
  description: [
    multiline`
    You are a blue fella.
    Feed the pit, love the pit, protect the pit.
    `,
  ],
  category: Category.Midround,
};

export default Bingle;
