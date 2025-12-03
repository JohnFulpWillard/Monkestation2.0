import { useBackend } from '../backend';
import {
  BlockQuote,
  Box,
  Button,
  Divider,
  Stack,
  Section,
  Icon,
  DmIcon,
} from 'tgui-core/components';
import { Window } from '../layouts';
import { LobbyNotices, type LobbyNoticesType } from './common/LobbyNotices';

type Item = {
  path: string;
  name: string;
  cost: number;
  icon: string;
  icon_state: string;
};

type Data = {
  notices: LobbyNoticesType;
  currently_owned?: string;
  balance: number;
  items: Item[];
};

const ItemListEntry = (props) => {
  const {
    product: { name, cost, icon, icon_state },
    disabled,
    onClick,
  } = props;

  return (
    <>
      <Stack direction="row" align="center">
        <Stack.Item>
          <DmIcon
            icon={icon}
            icon_state={icon_state}
            fallback={<Icon mr={1} name="spinner" spin />}
            height={'32px'}
            width={'32px'}
            verticalAlign="middle"
          />
        </Stack.Item>
        <Stack.Item grow={1}>
          <Box bold>{name}</Box>
        </Stack.Item>
        <Stack.Item>
          {`Cost: ${cost}`} <Icon name="coins" pr={1} />
        </Stack.Item>
        <Stack.Item>
          <Button onClick={onClick} disabled={disabled}>
            Buy
          </Button>
        </Stack.Item>
      </Stack>
      <Divider />
    </>
  );
};

export const PreRoundStore = (_props) => {
  const {
    act,
    data: { notices, balance, items, currently_owned },
  } = useBackend<Data>();

  return (
    <Window title="Pre Round Shop" width={450} height={700}>
      <Window.Content scrollable>
        <Section>
          <LobbyNotices notices={notices} />
          <BlockQuote>
            Purchase an item that will spawn with you round start!
          </BlockQuote>
          <Stack vertical fill>
            {currently_owned ? (
              <Stack.Item>
                <Box>Held Item: {currently_owned}</Box>
              </Stack.Item>
            ) : (
              ''
            )}
            <Stack.Item>
              <Section>
                <Stack direction="row" align="center">
                  <Box>
                    Balance: {balance} <Icon name="coins" />
                  </Box>
                </Stack>
              </Section>
            </Stack.Item>
            <Stack.Item>
              {items.map((purchase) => {
                const { name, cost, path } = purchase;
                return (
                  <ItemListEntry
                    key={name}
                    product={purchase}
                    disabled={balance < cost}
                    onClick={() => act('attempt_buy', { path })}
                  />
                );
              })}
            </Stack.Item>
          </Stack>
        </Section>
      </Window.Content>
    </Window>
  );
};
