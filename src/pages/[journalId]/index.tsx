import Head from 'next/head';

import { Button } from '@components/Button';
import { Container } from '@components/Container';
import { Text } from '@components/Text';
import { useLoginRedirect, usePages } from '@hooks';
import { AddCircleOutline } from '@icons';
import { NavBar } from '@templates/NavBar';
import { Pages } from '@templates/Pages';
import { EditPageModal } from '@templates/Pages';

export default function PagePages() {
  const { data } = useLoginRedirect();

  const {
    closeHandler,
    journalDetails,
    modalProps,
    onDeletePage,
    handler,
    pageLoading,
    visible,
    pages,
  } = usePages();

  if (!data || pageLoading) return null;

  return (
    <>
      <Head>
        <title>Your Travel Pages</title>
        <meta content="Generated by create next app" name="description" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <main>
        <Container className="h-screen min-w-full gap-xl bg-background">
          <Container className="min-w-full gap-sm p-xxl pb-none">
            <Container row alignItems="start" className="mb-xl min-w-full">
              <Text className="display-large">{journalDetails?.title}</Text>
              <Container className="flex-1 " />
              <NavBar />
            </Container>
            <Text className="headline-small normal-case">{journalDetails?.description}</Text>
          </Container>

          <Container
            row
            alignItems="center"
            className="overflow-y-none min-w-full gap-xl overflow-x-scroll p-xxl pt-none"
          >
            {pages?.map((page) => (
              <Pages
                key={page.pageId}
                page={page}
                onDelete={() => onDeletePage(page.pageId)}
                onUpdate={() => handler(false, page)}
              />
            ))}
          </Container>
          <Button
            className="fixed bottom-xl right-xl font-semibold"
            color="primary"
            endContent={<AddCircleOutline />}
            size="lg"
            onPress={() => handler(true)}
          >
            Page
          </Button>
          {modalProps && (
            <EditPageModal visible={visible} onCancel={closeHandler} {...modalProps} />
          )}
        </Container>
      </main>
    </>
  );
}
