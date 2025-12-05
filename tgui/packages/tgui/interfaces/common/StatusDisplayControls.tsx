import { Button, Stack, Input, Section } from 'tgui-core/components';

import { useBackend, useSharedState } from '../../backend';

type Data = {
  upperText: string;
  lowerText: string;
  maxStatusLineLength: number;
};

export function StatusDisplayControls() {
  const { act, data } = useBackend<Data>();
  const {
    upperText: initialUpper,
    lowerText: initialLower,
    maxStatusLineLength,
  } = data;

  const [upperText, setUpperText] = useSharedState(
    'statusUpperText',
    initialUpper,
  );
  const [lowerText, setLowerText] = useSharedState(
    'statusLowerText',
    initialLower,
  );

  return (
    <>
      <Section>
        <Button
          icon="toggle-off"
          color="bad"
          onClick={() => act('setStatusPicture', { picture: 'blank' })}
        >
          Off
        </Button>
        <Button
          icon="space-shuttle"
          color=""
          onClick={() => act('setStatusPicture', { picture: 'shuttle' })}
        >
          Shuttle ETA / Off
        </Button>
      </Section>

      <Section title="Graphics">
        <Button
          icon="flag"
          onClick={() => act('setStatusPicture', { picture: 'default' })}
        >
          Logo
        </Button>

        <Button
          icon="exclamation"
          onClick={() => act('setStatusPicture', { picture: 'currentalert' })}
        >
          Security Alert Level
        </Button>

        <Button
          icon="exclamation-triangle"
          onClick={() => act('setStatusPicture', { picture: 'lockdown' })}
        >
          Lockdown
        </Button>

        <Button
          icon="biohazard"
          onClick={() => act('setStatusPicture', { picture: 'biohazard' })}
        >
          Biohazard
        </Button>

        <Button
          icon="radiation"
          onClick={() => act('setStatusPicture', { picture: 'radiation' })}
        >
          Radiation
        </Button>
      </Section>

      <Section title="Message">
        <Stack direction="column" align="stretch">
          <Stack.Item mb={1}>
            <Input
              fluid
              maxLength={maxStatusLineLength}
              value={upperText}
              onChange={setUpperText}
            />
          </Stack.Item>

          <Stack.Item mb={1}>
            <Input
              fluid
              maxLength={maxStatusLineLength}
              value={lowerText}
              onChange={setLowerText}
            />
          </Stack.Item>

          <Stack.Item>
            <Button
              icon="comment-o"
              onClick={() => act('setStatusMessage', { upperText, lowerText })}
            >
              Send
            </Button>
          </Stack.Item>
        </Stack>
      </Section>
    </>
  );
}
