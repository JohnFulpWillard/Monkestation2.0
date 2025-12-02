import { map, sortBy } from 'common/collections';
import { flow } from 'common/fp';
import { useBackend } from '../backend';
import { Box, Button, Stack, Section, Table } from 'tgui-core/components';
import { Window } from '../layouts';

export const AtmosControlPanel = (props) => {
  const { act, data } = useBackend();
  const groups = flow([
    map((group, i) => ({
      ...group,
      // Generate a unique id
      id: group.area + i,
    })),
    sortBy((group) => group.id),
  ])(data.excited_groups);
  return (
    <Window title="SSAir Control Panel" width={900} height={500}>
      <Section m={1}>
        <Stack justify="space-between" align="baseline">
          <Stack.Item>
            <Button
              onClick={() => act('toggle-freeze')}
              color={data.frozen === 1 ? 'good' : 'bad'}
            >
              {data.frozen === 1 ? 'Freeze Subsystem' : 'Unfreeze Subsystem'}
            </Button>
          </Stack.Item>
          <Stack.Item>Fire Cnt: {data.fire_count}</Stack.Item>
          <Stack.Item>Active Turfs: {data.active_size}</Stack.Item>
          <Stack.Item>Excited Groups: {data.excited_size}</Stack.Item>
          <Stack.Item>Hotspots: {data.hotspots_size}</Stack.Item>
          <Stack.Item>Superconductors: {data.conducting_size}</Stack.Item>
          <Stack.Item>
            <Button.Checkbox
              checked={data.showing_user}
              onClick={() => act('toggle_user_display')}
            >
              Personal View
            </Button.Checkbox>
          </Stack.Item>
          <Stack.Item>
            <Button.Checkbox
              checked={data.show_all}
              onClick={() => act('toggle_show_all')}
            >
              Display all
            </Button.Checkbox>
          </Stack.Item>
        </Stack>
      </Section>
      <Box fillPositionedParent top="45px">
        <Window.Content scrollable>
          <Section>
            <Table>
              <Table.Row header>
                <Table.Cell>Area Name</Table.Cell>
                <Table.Cell collapsing>Breakdown</Table.Cell>
                <Table.Cell collapsing>Dismantle</Table.Cell>
                <Table.Cell collapsing>Turfs</Table.Cell>
                <Table.Cell collapsing>
                  {data.display_max === 1 && 'Max Share'}
                </Table.Cell>
                <Table.Cell collapsing>Display</Table.Cell>
              </Table.Row>
              {groups.map((group) => (
                <tr key={group.id}>
                  <td>
                    <Button
                      content={group.area}
                      onClick={() =>
                        act('move-to-target', {
                          spot: group.jump_to,
                        })
                      }
                    />
                  </td>
                  <td>{group.breakdown}</td>
                  <td>{group.dismantle}</td>
                  <td>{group.size}</td>
                  <td>{data.display_max === 1 && group.max_share}</td>
                  <td>
                    <Button.Checkbox
                      checked={group.should_show}
                      onClick={() =>
                        act('toggle_show_group', {
                          group: group.group,
                        })
                      }
                    />
                  </td>
                </tr>
              ))}
            </Table>
          </Section>
        </Window.Content>
      </Box>
    </Window>
  );
};
