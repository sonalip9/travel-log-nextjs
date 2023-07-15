import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { Card } from '@components/Card';
import { Container } from '@components/Container';
import { EllipsisText } from '@components/EllipsisText';
import { UserJournal } from '@defs/journals';

export type JournalsProps = {
  journal: UserJournal;
};
function Journals({ journal }: JournalsProps) {
  const router = useRouter();
  const onClick = useCallback(() => {
    router
      .push(`/${journal.journalId}`)
      .catch((err) => console.error('Redirect to journal failed', err));
  }, [journal.journalId, router]);

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
        p: '$xl',
        pl: '$3xl',
        borderRadius: '$none',
        borderTopRightRadius: '$xxl',
        borderBottomRightRadius: '$xxl',
        gap: '$xl',
      }}
      onPress={() => onClick()}
    >
      <Container>
        <EllipsisText
          uppercase
          color="$onPrimary"
          containerStyle={{
            maxHeight: '80px',
            overflow: 'hidden',
            mb: '$sm',
          }}
          css={{
            overflow: 'hidden',
            maxLines: 2,
          }}
          type={'headlineLarge'}
        >
          {journal.title}
        </EllipsisText>

        <EllipsisText
          color="$onPrimary"
          containerStyle={{
            maxHeight: '200px',
            overflow: 'hidden',
            mb: '$sm',
          }}
          css={{
            overflow: 'hidden',
            maxLines: 2,
          }}
          type={'bodyLarge'}
        >
          {journal.description}
        </EllipsisText>
      </Container>
    </Card>
  );
}

export default Journals;
