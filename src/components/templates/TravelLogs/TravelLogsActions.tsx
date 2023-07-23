import { ReactNode } from 'react';

import { Button } from '@components/Button';
import { Container, ContainerProps } from '@components/Container';

type Button = {
  label: string;
  onPress: () => void;
  icon: ReactNode;
};

type TravelLogsActionsProps = {
  isVisible: boolean;
  actions: Button[];
  containerStyle?: ContainerProps['css'];
};

function TravelLogsActions({ isVisible, actions, containerStyle }: TravelLogsActionsProps) {
  return (
    <Container
      flex
      row
      css={{
        gap: '$md',
        bg: '$onPrimary',
        position: 'relative',
        p: '$md',
        bottom: isVisible ? 0 : -100,
        ...containerStyle,
        transition: 'bottom 0.3s ease-in-out',
      }}
    >
      {actions.map((action) => (
        <Button
          key={action.label}
          auto
          light
          color="primary"
          css={{ display: 'flex', flex: 1 }}
          icon={action.icon}
          onPress={action.onPress}
        >
          {action.label}
        </Button>
      ))}
    </Container>
  );
}

export default TravelLogsActions;
