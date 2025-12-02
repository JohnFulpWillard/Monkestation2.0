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
  a_ckey: string;
  timestamp: string;
  asn: string;
};

type Data = {
  displayData: Array<OverwatchDisplayData>;
};

export const OverwatchASNManager = (props) => {
  const { act, data } = useBackend<Data>();
  const { displayData } = data;
  const [inputIP, setinputIP] = useLocalState('inputIPkey', '');
  return (
    <Window width={600} height={500} title="Overwatch ASN Panel" theme="admin">
      <Window.Content scrollable>
        <Section title="Add ASN to Overwatch Banlist">
          <Stack>
            <Stack.Item grow>
              <Input
                value={inputIP}
                placeholder="Input IP address"
                fluid
                onChange={(e, value) => {
                  setinputIP(value);
                }}
              />
            </Stack.Item>
            <Stack.Item>
              <Button
                color="green"
                content="OK"
                icon="check"
                onClick={() => {
                  if (inputIP === '') return;
                  act('asn_add_entry', {
                    ip: inputIP,
                  });
                  setinputIP('');
                }}
              />
            </Stack.Item>
          </Stack>
        </Section>
        <Section title={'ASN Ban Entries: ' + (displayData?.length || 0)}>
          {((displayData?.length || 0) !== 0 && (
            <Stack vertical>
              <Stack.Item>
                <Stack justify="space-evenly">
                  <Stack.Item grow>
                    <Box> ASN </Box>
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
                          {displayRow.asn}
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
                              act('asn_remove_entry', {
                                asn: displayRow.asn,
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
          )) || <NoticeBox fluid> No ASN Ban entries to display. </NoticeBox>}
        </Section>
      </Window.Content>
    </Window>
  );
};
