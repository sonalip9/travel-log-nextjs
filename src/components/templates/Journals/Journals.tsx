'use client';
import { useRouter } from 'next/navigation';
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
    router.push(`/${journal.journalId}`);
  }, [journal.journalId, router]);

  const [isActionVisible, setIsActionVisible] = useState(false);

  return (
    <Card
      isPressable
      className="flex h-[515px] w-[406px] flex-col items-start overflow-hidden rounded-none rounded-br-xxl rounded-tr-xxl bg-primary"
      onMouseLeave={() => setIsActionVisible(false)}
      onMouseOver={() => setIsActionVisible(true)}
      onPress={() => onClick()}
    >
      <Container alignItems="start" className="flex-1 gap-xl overflow-hidden p-xl pl-3xl">
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
