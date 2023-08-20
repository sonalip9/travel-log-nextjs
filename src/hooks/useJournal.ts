import { useCallback } from 'react';

import { useTravelLogActions } from './useActions';
import { useModal } from './useModal';

import { UserJournal } from '@defs/journals';
import { deleteJournal, getAllJournals, patchUpdateJournal, postCreateJournal } from '@service/api';
import { CreateProps, UpdateProps } from '@templates/Journals';

export const useJournal = () => {
  const { onCreateTravelLog, onDeleteTravelLog, onUpdateTravelLog, pageLoading, travelLog } =
    useTravelLogActions(getAllJournals);

  const onDeleteJournal = useCallback(
    (journalId: string) => onDeleteTravelLog(deleteJournal(journalId)),
    [onDeleteTravelLog],
  );

  const { visible, modalProps, openModal, closeModal } = useModal(
    {
      isCreate: true,
      onCreate: (createJournal) => onCreateTravelLog(postCreateJournal(createJournal)),
    } as CreateProps,
    (journal: UserJournal) =>
      ({
        isCreate: false as const,
        updateJournal: journal,
        onUpdate: (journalId, updateJournal) => {
          onUpdateTravelLog(patchUpdateJournal(journalId, updateJournal));
        },
      } as UpdateProps),
  );

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
