import { useRouter } from 'next/router';
import { useState, useReducer, Reducer, useEffect, useCallback } from 'react';

import { useTravelLogActions } from './useActions';

import { UserJournal } from '@defs/journals';
import { Page, CreatePagePayload } from '@defs/pages';
import { getJournalById, postCreatePage, patchUpdatePage, deletePage } from '@service/api';
import { CreateProps, UpdateProps } from '@templates/Pages';

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
  } = useTravelLogActions(fetchJournal());

  const [visible, setVisible] = useState(false);

  const [modalProps, dispatch] = useReducer<Reducer<ModalProps | undefined, ActionParam>>(
    modalPropsAction,
    undefined,
  );

  const handler = (isCreate: boolean, page?: Page) => {
    if (isCreate) {
      dispatch({
        type: MODAL_PROPS_ACTIONS.CREATE,
        payload: {
          isCreate: true,
          onCreate: onCreatePage,
        },
      });
    } else if (page) {
      dispatch({
        type: MODAL_PROPS_ACTIONS.UPDATE,
        payload: {
          isCreate: false,
          onUpdate: onUpdatePage,
          updatePage: page,
        },
      });
    }
    setVisible(true);
  };
  const closeHandler = () => {
    dispatch({ type: MODAL_PROPS_ACTIONS.RESET });
    setVisible(false);
  };
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
