import { Button } from '@components/Button';
import { Container } from '@components/Container';
import { DeleteOutline, EditOutline, ViewOutline } from '@icons';

function ActionButton({
  icon,
  children,
  onPress,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  onPress: () => void;
}) {
  return (
    <Button
      auto
      light
      color="primary"
      css={{ display: 'flex', flex: 1 }}
      icon={icon}
      onPress={onPress}
    >
      {children}
    </Button>
  );
}

type JournalActionsProps = {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

function JournalActions({ onView, onEdit, onDelete }: JournalActionsProps) {
  return (
    <Container flex row css={{ gap: '$md', bg: '$onPrimary', position: 'relative', p: '$md' }}>
      <ActionButton icon={<ViewOutline />} onPress={onView}>
        View
      </ActionButton>
      <ActionButton icon={<EditOutline />} onPress={onEdit}>
        Edit
      </ActionButton>
      <ActionButton icon={<DeleteOutline />} onPress={onDelete}>
        Delete
      </ActionButton>
    </Container>
  );
}

export default JournalActions;
