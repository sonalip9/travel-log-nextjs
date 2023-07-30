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
      css={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        bg: '$primary',
        height: '515px',
        width: '406px',
        alignItems: 'flex-start',
        borderRadius: '$none',
        borderTopRightRadius: '$xxl',
        borderBottomRightRadius: '$xxl',
      }}
      onMouseLeave={() => setIsActionVisible(false)}
      onMouseOver={() => setIsActionVisible(true)}
      onPress={() => onClick()}
    >
      <Container
        css={{
          overflow: 'hidden',
          alignItems: 'flex-start',
          p: '$xl',
          pl: '$3xl',
          gap: '$xl',
          flex: 1,
        }}
      >
        <EllipsisText uppercase color="$onPrimary" css={{ maxLines: 2 }} type="headlineLarge">
          {journal.title}
        </EllipsisText>

        <EllipsisText color="$onPrimary" css={{ maxLines: 10 }} type="bodyLarge">
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
