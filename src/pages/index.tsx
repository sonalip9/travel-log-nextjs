import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { Reducer, useEffect, useReducer, useState } from 'react';

import { Button } from '@components/Button';
import { Container } from '@components/Container';
import { Text } from '@components/Text';
import { CreateJournalPayload, UserJournal } from '@defs/journals';
import { useLoginRedirect } from '@hooks';
import { AddCircleOutline } from '@icons';
import { postCreateJournal, getAllJournals, patchUpdateJournal } from '@service/api';
import { CreateProps, EditJournalModal, Journals, UpdateProps } from '@templates/Journals';

enum MODAL_PROPS_ACTIONS {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  RESET = 'RESET',
}

type ModalProps = CreateProps | UpdateProps;

type ActionParam =
  | { type: MODAL_PROPS_ACTIONS.CREATE; payload: CreateProps }
  | { type: MODAL_PROPS_ACTIONS.UPDATE; payload: UpdateProps }
  | { type: MODAL_PROPS_ACTIONS.RESET };

const modalPropsAction = (state: ModalProps | undefined, action: ActionParam) => {
  switch (action.type) {
    case 'CREATE':
      return { ...action.payload };
    case 'UPDATE':
      return { ...action.payload };
    case 'RESET':
      return undefined;
    default:
      return state;
  }
};

export default function Home() {
  useLoginRedirect();
  const { data } = useSession();

  const [journals, setJournals] = useState<UserJournal[]>();

  const [pageLoading, setPageLoading] = useState(true);

  const fetchAllJournals = () => {
    setPageLoading(true);
    getAllJournals()
      .then((res) => setJournals(res.data.userJournals))
      .catch(console.error)
      .finally(() => setPageLoading(false));
  };

  useEffect(() => {
    fetchAllJournals();
  }, []);

  const [visible, setVisible] = useState(false);

  const [modalProps, dispatch] = useReducer<Reducer<ModalProps | undefined, ActionParam>>(
    modalPropsAction,
    undefined,
  );
  const handler = (isCreate: boolean, journal?: UserJournal) => {
    if (isCreate) {
      dispatch({
        type: MODAL_PROPS_ACTIONS.CREATE,
        payload: {
          isCreate: true,
          onCreate: onCreateJournal,
        },
      });
    } else if (journal) {
      dispatch({
        type: MODAL_PROPS_ACTIONS.UPDATE,
        payload: {
          isCreate: false,
          onUpdate: onUpdateJournal,
          updateJournal: journal,
        },
      });
    }
    setVisible(true);
  };
  const closeHandler = () => {
    dispatch({ type: MODAL_PROPS_ACTIONS.RESET });
    setVisible(false);
  };
  const onCreateJournal = (createJournal: CreateJournalPayload) => {
    postCreateJournal(createJournal)
      .then(() => fetchAllJournals())
      .catch(console.error)
      .finally(() => setVisible(false));
  };
  const onUpdateJournal = (journalId: string, createJournal: CreateJournalPayload) => {
    patchUpdateJournal(journalId, createJournal)
      .then(() => fetchAllJournals())
      .catch(console.error)
      .finally(() => setVisible(false));
  };

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
                onUpdate={() => handler(false, journal)}
              />
            ))}
          </Container>
          <Button
            auto
            color="primary"
            css={{ position: 'fixed', bottom: '$xl', right: '$xl', fontWeight: '600' }}
            icon={<AddCircleOutline />}
            size="lg"
            onPress={() => handler(true)}
          >
            Journal
          </Button>
          {modalProps && (
            <EditJournalModal visible={visible} onCancel={closeHandler} {...modalProps} />
          )}
        </Container>
      </main>
    </>
  );
}
