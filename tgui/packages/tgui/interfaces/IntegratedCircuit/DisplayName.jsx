import { Box, Button, Stack } from '../../components';
import {
  FUNDAMENTAL_DATA_TYPES,
  DATATYPE_DISPLAY_HANDLERS,
} from './FundamentalTypes';

export const DisplayName = (props) => {
  const { port, isOutput, componentId, portIndex, act, ...rest } = props;

  const InputComponent = FUNDAMENTAL_DATA_TYPES[port.type || 'unknown'];
  const TypeDisplayHandler = DATATYPE_DISPLAY_HANDLERS[port.type || 'unknown'];

  const hasInput =
    !isOutput &&
    !port.connected_to?.length &&
    (componentId || port.type === 'option') &&
    InputComponent;

  const displayType = TypeDisplayHandler ? TypeDisplayHandler(port) : port.type;

  return (
    <Box {...rest}>
      <Stack direction="column">
        <Stack.Item textAlign={isOutput ? 'right' : 'left'}>
          {(hasInput && (
            <InputComponent
              setValue={(val, extraParams) =>
                act('set_component_input', {
                  component_id: componentId,
                  port_id: portIndex,
                  input: val,
                  ...extraParams,
                })
              }
              color={port.color}
              name={port.name}
              value={port.current_data}
              extraData={port.datatype_data}
            />
          )) ||
            (isOutput && (
              <Button
                compact
                color="transparent"
                onClick={() =>
                  act('get_component_value', {
                    component_id: componentId,
                    port_id: portIndex,
                  })
                }
              >
                <Box color="white">{port.name}</Box>
              </Button>
            )) ||
            port.name}
        </Stack.Item>
        <Stack.Item>
          <Box
            fontSize={0.75}
            opacity={0.25}
            textAlign={isOutput ? 'right' : 'left'}
          >
            {displayType || 'unknown'}
          </Box>
        </Stack.Item>
      </Stack>
    </Box>
  );
};
