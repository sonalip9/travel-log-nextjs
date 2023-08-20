import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';

import { useTravelLogActions } from './useActions';
import { useModal } from './useModal';

import { UserJournal } from '@defs/journals';
import { Page, CreatePagePayload } from '@defs/pages';
import { getJournalById, postCreatePage, patchUpdatePage, deletePage } from '@service/api';
import { CreateProps, UpdateProps } from '@templates/Pages';

export const usePages = () => {
  const router = useRouter();

  const [journalDetails, setJournalDetails] =
    useState<Pick<UserJournal, 'title' | 'description'>>();

  const [journalId, setJournalId] = useState<string | undefined>(router.query.journalId as string);
  useEffect(() => {
    if (router.isReady && router.query.journalId && router.query.journalId !== journalId) {
      setJournalId(router.query.journalId as string);
    }
  }, [journalId, router.isReady, router.query.journalId]);

  const fetchJournal = useCallback(() => {
    if (!journalId) {
      return Promise.resolve(undefined);
    }
    return getJournalById(journalId).then((res) => {
      if (!res) {
        return res;
      }
      setJournalDetails({
        title: res.data?.title,
        description: res.data?.description,
      });
      setJournalId(res.data?.journalId);
      return res;
    });
  }, [journalId]);

  const {
    onCreateTravelLog,
    onDeleteTravelLog,
    onUpdateTravelLog,
    pageLoading,
    travelLog: pages,
  } = useTravelLogActions(fetchJournal);

  const onCreatePage = (createPage: CreatePagePayload) => {
    if (!journalId) return;
    onCreateTravelLog(postCreatePage(journalId, createPage));
  };
  const onUpdatePage = (pageId: string, createPage: CreatePagePayload) => {
    if (!journalId) return;
    onUpdateTravelLog(patchUpdatePage(journalId, pageId, createPage));
  };

  const onDeletePage = (pageId: string) => {
    if (!journalId) return;
    onDeleteTravelLog(deletePage(journalId, pageId));
  };

  const {
    closeModal: closeHandler,
    openModal: handler,
    visible,
    modalProps,
  } = useModal(
    { isCreate: true, onCreate: onCreatePage } as CreateProps,
    (page: Page) =>
      ({ isCreate: false as const, onUpdate: onUpdatePage, updatePage: page } as UpdateProps),
  );

  return {
    journalDetails,
    journalId,
    onDeletePage,
    handler,
    closeHandler,
    modalProps,
    visible,
    pages,
    pageLoading,
  };
};
