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
    <Container className="border-1 border-outlineVariant border-solid rounded-md min-w-[405px] h-full overflow-hidden">
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

      <Container className="overflow-y-auto overflow-x-hidden scroll-padding-none max-h-full flex-[2] p-md">
        <Text className="whitespace-pre-wrap body-large">{page.content}</Text>
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
