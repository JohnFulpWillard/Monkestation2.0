import { useBackend, useSharedState } from '../../backend';
import { Stack, Input, Section, Button } from '../../components';

type Data = {
  upperText: string;
  lowerText: string;
  maxStatusLineLength: number;
};

export const StatusDisplayControls = (props) => {
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
          content="Off"
          color="bad"
          onClick={() => act('setStatusPicture', { picture: 'blank' })}
        />
        <Button
          icon="space-shuttle"
          content="Shuttle ETA / Off"
          color=""
          onClick={() => act('setStatusPicture', { picture: 'shuttle' })}
        />
      </Section>

      <Section title="Graphics">
        <Button
          icon="flag"
          content="Logo"
          onClick={() => act('setStatusPicture', { picture: 'default' })}
        />

        <Button
          icon="exclamation"
          content="Security Alert Level"
          onClick={() => act('setStatusPicture', { picture: 'currentalert' })}
        />

        <Button
          icon="exclamation-triangle"
          content="Lockdown"
          onClick={() => act('setStatusPicture', { picture: 'lockdown' })}
        />

        <Button
          icon="biohazard"
          content="Biohazard"
          onClick={() => act('setStatusPicture', { picture: 'biohazard' })}
        />

        <Button
          icon="radiation"
          content="Radiation"
          onClick={() => act('setStatusPicture', { picture: 'radiation' })}
        />
      </Section>

      <Section title="Message">
        <Stack direction="column" align="stretch">
          <Stack.Item mb={1}>
            <Input
              fluid
              maxLength={maxStatusLineLength}
              value={upperText}
              onChange={(_, value) => setUpperText(value)}
            />
          </Stack.Item>

          <Stack.Item mb={1}>
            <Input
              fluid
              maxLength={maxStatusLineLength}
              value={lowerText}
              onChange={(_, value) => setLowerText(value)}
            />
          </Stack.Item>

          <Stack.Item>
            <Button
              icon="comment-o"
              onClick={() => act('setStatusMessage', { upperText, lowerText })}
              content="Send"
            />
          </Stack.Item>
        </Stack>
      </Section>
    </>
  );
};
