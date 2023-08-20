import { Column, Container } from '@components/Container';
import { EllipsisText } from '@components/EllipsisText';
import { Image } from '@components/Image';
import { Text } from '@components/Text';
import { Page } from '@defs/pages';
import { EditOutline, DeleteOutline } from '@icons';
import { TravelLogsActions } from '@templates/TravelLogs';
import { getSrcForImage } from '@utils/file';

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
      </Container>

      {page.photo && (
        <Image
          alt="Photo"
          containerCss={{ flex: 1 }}
          css={{ aspectRatio: '1.5' }}
          objectFit="cover"
          src={getSrcForImage(page.photo)}
        />
      )}

      <Container
        css={{
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollPadding: '$none',
          maxHeight: '100%',
          flex: 2,
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
