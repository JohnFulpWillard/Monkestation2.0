import { useBackend } from '../backend';
import { Button, Stack } from 'tgui-core/components';
import { NtosWindow } from '../layouts';

type Data = {
  PC_device_theme: string;
  themes: ThemeInfo[];
};

type ThemeInfo = {
  theme_name: string;
  theme_ref: string;
};

export const NtosThemeConfigure = (props) => {
  const { act, data } = useBackend<Data>();
  const { PC_device_theme, themes } = data;
  return (
    <NtosWindow width={400} height={600}>
      <NtosWindow.Content scrollable>
        <Stack
          height="70%"
          grow
          direction="column"
          textAlign="center"
          align-items="center"
        >
          {themes.map((theme) => (
            <Stack.Item key={theme} width="100%" grow={1}>
              <Button.Checkbox
                checked={theme.theme_ref === PC_device_theme}
                width="75%"
                lineHeight="50px"
                content={theme.theme_name}
                onClick={() =>
                  act('PRG_change_theme', {
                    selected_theme: theme.theme_name,
                  })
                }
              />
            </Stack.Item>
          ))}
        </Stack>
      </NtosWindow.Content>
    </NtosWindow>
  );
};
