import Head from 'next/head';
import { useSession } from 'next-auth/react';

import { useJournal } from '../hooks/useJournal';

import { Button } from '@components/Button';
import { Container } from '@components/Container';
import { Text } from '@components/Text';
import { useLoginRedirect } from '@hooks';
import { AddCircleOutline } from '@icons';
import { EditJournalModal, Journals } from '@templates/Journals';

export default function Home() {
  useLoginRedirect();
  const { data } = useSession();

  const { closeModal, journals, modalProps, onDeleteJournal, openModal, pageLoading, visible } =
    useJournal();

  if (!data || pageLoading) return null;

  return (
    <>
      <Head>
        <title>Your Travel Journals</title>
        <meta content="Generated by create next app" name="description" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <main>
        <Container
          fluid
          css={{
            height: '100vh',
            width: '100vw',
            p: '$xxl',
            bg: '$background',
          }}
          responsive={false}
        >
          <Text css={{ m: '$xl' }} type="displayLarge">
            Journals
          </Text>
          <Container
            alignCenter
            fluid
            row
            css={{
              height: 'auto',
              minWidth: '100%',
              gridGap: '$3xl',
              gridTemplateColumns: 'repeat(auto-fit, minmax(406px, 1fr))',
            }}
            display="grid"
          >
            {journals?.map((journal) => (
              <Journals
                key={journal.journalId}
                journal={journal}
                onDelete={() => onDeleteJournal(journal.journalId)}
                onUpdate={() => openModal(false, journal)}
              />
            ))}
          </Container>
          <Button
            auto
            color="primary"
            css={{ position: 'fixed', bottom: '$xl', right: '$xl', fontWeight: '600' }}
            icon={<AddCircleOutline />}
            size="lg"
            onPress={() => openModal(true)}
          >
            Journal
          </Button>
          {modalProps && (
            <EditJournalModal visible={visible} onCancel={closeModal} {...modalProps} />
          )}
        </Container>
      </main>
    </>
  );
}
