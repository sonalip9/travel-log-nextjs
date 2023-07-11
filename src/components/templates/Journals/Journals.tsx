import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { Card } from '@components/Card';
import { Text } from '@components/Text';
import { UserJournal } from '@defs/journals';

export type JournalsProps = {
  journal?: UserJournal;
};
function Journals({ journal }: JournalsProps) {
  const router = useRouter();
  const onClick = useCallback(() => {
    if (journal) {
      router.push(`/${journal.journalId}`).catch(console.error);
    } else {
      // TODO: Create a new journal
    }
  }, []);
  return (
    <Card
      isPressable
      css={{
        bg: journal ? '$primary' : '$accents8',
        height: '200px',
        alignItems: 'center',
        p: '$md',
        '@xs': { height: '300px', p: '$xl' },
        '@md': { height: '400px', p: '$xl' },
      }}
      onPress={() => onClick()}
    >
      {journal ? (
        <>
          <Text h4 css={{ textAlign: 'center', mb: '$sm' }}>
            {journal.title}
          </Text>

          <Text>{journal.description}</Text>
        </>
      ) : (
        <Text h4 color="$background">
          Create a new journal
        </Text>
      )}
    </Card>
  );
}

export default Journals;
