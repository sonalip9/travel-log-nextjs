import { Card } from '@components/Card';
import { Text } from '@components/Text';
import { UserJournal } from '@defs/journals';

export type JournalsProps = {
  journal?: UserJournal;
};
function Journals({ journal }: JournalsProps) {
  return (
    <Card
      css={{
        bg: journal ? '$primary' : '$accents8',
        height: '200px',
        alignItems: 'center',
        p: '$md',
        '@xs': { height: '300px', p: '$xl' },
        '@md': { height: '400px', p: '$xl' },
      }}
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
