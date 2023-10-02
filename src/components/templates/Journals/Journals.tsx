import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import { Card } from '@components/Card';
import { Container } from '@components/Container';
import { EllipsisText } from '@components/EllipsisText';
import { UserJournal } from '@defs/journals';
import { DeleteOutline, EditOutline, ViewOutline } from '@icons';
import { TravelLogsActions } from '@templates/TravelLogs';

export type JournalsProps = {
  journal: UserJournal;
  onUpdate: () => void;
  onDelete: () => void;
};
function Journals({ journal, onUpdate, onDelete }: JournalsProps) {
  const router = useRouter();
  const onClick = useCallback(() => {
    router
      .push(`/${journal.journalId}`)
      .catch((err) => console.error('Redirect to journal failed', err));
  }, [journal.journalId, router]);

  const [isActionVisible, setIsActionVisible] = useState(false);

  return (
    <Card
      isPressable
      className="flex flex-col overflow-hidden bg-primary h-[515px] w-[406px] items-start rounded-none rounded-tr-xxl rounded-br-xxl"
      onMouseLeave={() => setIsActionVisible(false)}
      onMouseOver={() => setIsActionVisible(true)}
      onPress={() => onClick()}
    >
      <Container alignItems="start" className="overflow-hidden p-xl pl-3xl gap-xl flex-1">
        <EllipsisText uppercase className="headline-large" color="$onPrimary" maxLines={2}>
          {journal.title}
        </EllipsisText>

        <EllipsisText className="body-large" color="$onPrimary" maxLines={10}>
          {journal.description}
        </EllipsisText>
      </Container>

      <TravelLogsActions
        actions={[
          { icon: <ViewOutline />, label: 'View', onPress: onClick },
          { icon: <EditOutline />, label: 'Edit', onPress: onUpdate },
          { icon: <DeleteOutline />, label: 'Delete', onPress: onDelete },
        ]}
        isVisible={isActionVisible}
      />
    </Card>
  );
}

export default Journals;
