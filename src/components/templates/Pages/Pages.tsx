import { Column, Container } from '@components/Container';
import { EllipsisText } from '@components/EllipsisText';
import { Text } from '@components/Text';
import { Page } from '@defs/pages';
import { EditOutline, DeleteOutline } from '@icons';
import { TravelLogsActions } from '@templates/TravelLogs';

export type PagesProps = {
  page: Page;
  onUpdate: () => void;
  onDelete: () => void;
};
function Pages({ page, onDelete, onUpdate }: PagesProps) {
  return (
    <Column
      column
      flex
      css={{
        borderWidth: '1px',
        borderColor: '$outlineVariant',
        borderStyle: 'solid',
        borderRadius: '$md',
        minWidth: '405px',
        height: '100%',
        overflow: 'hidden',
      }}
      span={3}
    >
      <Container css={{ gap: '$md', p: '$md' }}>
        <EllipsisText containerStyle={{ maxH: 44 }} type="headlineLarge">
          {page.title}
        </EllipsisText>
        <Text type="titleLarge">{new Date(page.date).toDateString()}</Text>
        {/* Todo - add image */}
      </Container>
      <Container
        css={{
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollPadding: '$none',
          maxHeight: '100%',
          flex: 1,
          p: '$md',
        }}
      >
        <Text css={{ whiteSpace: 'preserve wrap' }} type="bodyLarge">
          {page.content}
        </Text>
      </Container>

      <TravelLogsActions
        isVisible
        actions={[
          { icon: <EditOutline />, label: 'Edit', onPress: onUpdate },
          { icon: <DeleteOutline />, label: 'Delete', onPress: onDelete },
        ]}
        containerStyle={{ bg: '$primaryContainer' }}
      />
    </Column>
  );
}

export default Pages;
