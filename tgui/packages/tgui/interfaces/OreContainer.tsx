import { createSearch, toTitleCase } from 'common/string';
import { useBackend, useLocalState } from '../backend';
import {
  Button,
  Input,
  Stack,
  Section,
  DmIcon,
  Icon,
} from 'tgui-core/components';
import { Window } from '../layouts';

type Ores = {
  id: string;
  name: string;
  amount: number;
  icon: string;
  icon_state: string;
};

type Data = {
  ores: Ores[];
};

export const OreContainer = (props) => {
  const { act, data } = useBackend<Data>();
  const { ores = [] } = data;
  const [searchItem, setSearchItem] = useLocalState('searchItem', '');
  const search = createSearch(searchItem, (ore: Ores) => ore.name);
  const ores_filtered =
    searchItem.length > 0 ? ores.filter((ore) => search(ore)) : ores;
  return (
    <Window title="Ore Container" width={550} height={400}>
      <Window.Content>
        <Stack fill vertical>
          <Stack.Item>
            <Section>
              <Input
                autofocus
                position="relative"
                mt={0.5}
                bottom="5%"
                height="20px"
                width="150px"
                placeholder="Search Ore..."
                value={searchItem}
                onChange={(e, value) => {
                  setSearchItem(value);
                }}
                fluid
              />
            </Section>
          </Stack.Item>
          <Stack.Item grow>
            <Section title="Stock" fill scrollable>
              <Stack wrap>
                {ores_filtered.map((ore) => (
                  <Stack.Item key={ore.id}>
                    <Stack direction="column" m={0.5} textAlign="center">
                      <Stack.Item>
                        <RetrieveIcon ore={ore} />
                      </Stack.Item>
                      <Stack.Item>
                        <Orename ore_name={toTitleCase(ore.name)} />
                      </Stack.Item>
                      <Stack.Item>Amount: {ore.amount}</Stack.Item>
                      <Stack.Item>
                        <Button
                          content="Withdraw"
                          color="transparent"
                          onClick={() =>
                            act('withdraw', {
                              reference: ore.id,
                            })
                          }
                        />
                      </Stack.Item>
                    </Stack>
                  </Stack.Item>
                ))}
              </Stack>
            </Section>
          </Stack.Item>
        </Stack>
      </Window.Content>
    </Window>
  );
};

const RetrieveIcon = (props) => {
  const { ore } = props;
  return (
    <DmIcon
      height="64px"
      width="64px"
      icon={ore.icon}
      icon_state={ore.icon_state}
      fallback={<Icon name="spinner" size={2} spin />}
    />
  );
};

const Orename = (props) => {
  const { ore_name } = props;
  const return_name = ore_name.split(' ');
  if (return_name.length === 0) {
    return null;
  }
  return return_name[0];
};
