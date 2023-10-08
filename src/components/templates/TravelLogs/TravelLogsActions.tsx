'use client';
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
  containerStyle?: ContainerProps['className'];
};

function TravelLogsActions({ isVisible, actions, containerStyle = '' }: TravelLogsActionsProps) {
  return (
    <Container
      row
      className={`relative gap-md bg-onPrimary p-md ${
        isVisible ? 'bottom-0' : '-bottom-96'
      } transition-bottom duration-300 ease-in-out ${containerStyle}}`}
    >
      {actions.map((action) => (
        <Button
          key={action.label}
          className="flex flex-1"
          color="primary"
          endContent={action.icon}
          variant="light"
          onPress={action.onPress}
        >
          {action.label}
        </Button>
      ))}
    </Container>
  );
}

export default TravelLogsActions;
