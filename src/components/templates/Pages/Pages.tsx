'use client';
import { Container } from '@components/Container';
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
    <Container className="h-full min-w-[405px] overflow-hidden rounded-md border-1 border-solid border-outlineVariant">
      <Container className="gap-md p-md">
        <EllipsisText className="headline-large" containerStyle="max-H-[44]">
          {page.title}
        </EllipsisText>
        <Text className="title-large">{new Date(page.date).toDateString()}</Text>
      </Container>

      {page.photo && (
        <Image
          alt="Photo"
          classNames={{
            wrapper: 'flex-1 px-md',
            img: 'aspect-[1.5] object-cover',
          }}
          src={getSrcForImage(page.photo)}
        />
      )}

      <Container className="scroll-padding-none max-h-full flex-[2] overflow-y-auto overflow-x-hidden p-md">
        <Text className="body-large whitespace-pre-wrap">{page.content}</Text>
      </Container>

      <TravelLogsActions
        isVisible
        actions={[
          { icon: <EditOutline />, label: 'Edit', onPress: onUpdate },
          { icon: <DeleteOutline />, label: 'Delete', onPress: onDelete },
        ]}
        containerStyle="bg-primaryContainer"
      />
    </Container>
  );
}

export default Pages;
