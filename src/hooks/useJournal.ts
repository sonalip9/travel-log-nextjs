import { Reducer, useCallback, useReducer, useState } from 'react';

import { useTravelLogActions } from './useActions';

import { UserJournal } from '@defs/journals';
import { deleteJournal, getAllJournals, patchUpdateJournal, postCreateJournal } from '@service/api';
import { CreateProps, UpdateProps } from '@templates/Journals';

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

export const useJournal = () => {
  const { onCreateTravelLog, onDeleteTravelLog, onUpdateTravelLog, pageLoading, travelLog } =
    useTravelLogActions(getAllJournals());

  const [visible, setVisible] = useState(false);

  const [modalProps, dispatch] = useReducer<Reducer<ModalProps | undefined, ActionParam>>(
    modalPropsAction,
    undefined,
  );

  const openModal = useCallback(
    (isCreate: boolean, journal?: UserJournal) => {
      if (isCreate) {
        dispatch({
          type: MODAL_PROPS_ACTIONS.CREATE,
          payload: {
            isCreate: true,
            onCreate: (createJournal) => onCreateTravelLog(postCreateJournal(createJournal)),
          },
        });
      } else if (journal) {
        dispatch({
          type: MODAL_PROPS_ACTIONS.UPDATE,
          payload: {
            isCreate: false,
            onUpdate: (journalId, updateJournal) =>
              onUpdateTravelLog(patchUpdateJournal(journalId, updateJournal)),
            updateJournal: journal,
          },
        });
      }
      setVisible(true);
    },
    [onCreateTravelLog, onUpdateTravelLog],
  );

  const onDeleteJournal = useCallback(
    (journalId: string) => onDeleteTravelLog(deleteJournal(journalId)),
    [onDeleteTravelLog],
  );

  const closeModal = useCallback(() => {
    dispatch({ type: MODAL_PROPS_ACTIONS.RESET });
    setVisible(false);
  }, []);

  return {
    pageLoading,
    journals: travelLog,
    visible,
    modalProps,
    openModal,
    closeModal,
    onDeleteJournal,
  };
};
