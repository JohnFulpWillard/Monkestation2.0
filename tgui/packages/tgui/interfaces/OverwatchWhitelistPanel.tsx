import { useBackend, useLocalState } from '../backend';
import {
  Section,
  Stack,
  Button,
  Box,
  Input,
  NoticeBox,
} from 'tgui-core/components';
import { Window } from '../layouts';

type OverwatchDisplayData = {
  ckey: string;
  timestamp: string;
  a_ckey: string;
};

type Data = {
  displayData: Array<OverwatchDisplayData>;
};

export const OverwatchWhitelistPanel = (props) => {
  const { act, data } = useBackend<Data>();
  const { displayData } = data;
  const [inputWLCkey, setInputWLCkey] = useLocalState('inputWLCkey', '');
  return (
    <Window
      width={600}
      height={500}
      title="Overwatch Whitelist Panel"
      theme="admin"
    >
      <Window.Content scrollable>
        <Section title="Add CKEY to Overwatch Whitelist">
          <Stack>
            <Stack.Item grow>
              <Input
                value={inputWLCkey}
                placeholder="Input ckey"
                fluid
                onChange={(e, value) => {
                  setInputWLCkey(value);
                }}
              />
            </Stack.Item>
            <Stack.Item>
              <Button
                color="green"
                content="OK"
                icon="check"
                onClick={() => {
                  if (inputWLCkey === '') return;
                  act('wl_add_ckey', {
                    ckey: inputWLCkey,
                  });
                  setInputWLCkey('');
                }}
              />
            </Stack.Item>
          </Stack>
        </Section>
        <Section title={'Whitelist Entries: ' + (displayData?.length || 0)}>
          {((displayData?.length || 0) !== 0 && (
            <Stack vertical>
              <Stack.Item>
                <Stack justify="space-evenly">
                  <Stack.Item grow>
                    <Box> CKEY </Box>
                  </Stack.Item>
                  <Stack.Item grow>
                    <Box> TIMESTAMP </Box>
                  </Stack.Item>
                  <Stack.Item grow>
                    <Box> ADMIN CKEY </Box>
                  </Stack.Item>
                  <Stack.Item width="4%" />
                </Stack>
              </Stack.Item>
              <Stack.Divider />
              {displayData.map((displayRow, index) => {
                return (
                  <Stack.Item key={index}>
                    <Box>
                      <Stack justify="space-around" align="center">
                        <Stack.Item grow order={1}>
                          {displayRow.ckey}
                        </Stack.Item>
                        <Stack.Item grow order={2}>
                          {displayRow.timestamp}
                        </Stack.Item>
                        <Stack.Item grow order={3}>
                          {displayRow.a_ckey}
                        </Stack.Item>
                        <Stack.Item order={4}>
                          <Button
                            icon="trash"
                            color="red"
                            onClick={() => {
                              act('wl_remove_entry', {
                                ckey: displayRow.ckey,
                              });
                            }}
                          />
                        </Stack.Item>
                      </Stack>
                    </Box>
                  </Stack.Item>
                );
              })}
            </Stack>
          )) || <NoticeBox fluid> No whitelist entries to display. </NoticeBox>}
        </Section>
      </Window.Content>
    </Window>
  );
};
