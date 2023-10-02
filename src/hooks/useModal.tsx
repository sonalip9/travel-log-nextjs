import { useDisclosure } from '@nextui-org/react';
import { useReducer, Reducer, useCallback } from 'react';

import { UserJournal } from '@defs/journals';
import { Page } from '@defs/pages';

enum MODAL_PROPS_ACTIONS {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  RESET = 'RESET',
}

export type ActionParam<C, U> =
  | { type: MODAL_PROPS_ACTIONS.CREATE; payload: C }
  | { type: MODAL_PROPS_ACTIONS.UPDATE; payload: U }
  | { type: MODAL_PROPS_ACTIONS.RESET };

const modalPropsAction = <C extends Record<string, unknown>, U extends Record<string, unknown>>(
  state: C | U | undefined,
  action: ActionParam<C, U>,
) => {
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

export const useModal = <
  C extends Record<string, unknown>,
  U extends Record<string, unknown>,
  TravelLog extends Page | UserJournal,
>(
  createPayload: C,
  updatePayload: (travelLog: TravelLog) => U,
) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [modalProps, dispatch] = useReducer<Reducer<C | U | undefined, ActionParam<C, U>>>(
    modalPropsAction,
    undefined,
  );

  const openModal = useCallback(
    (isCreate: boolean, travelLog?: TravelLog) => {
      if (isCreate) {
        dispatch({ type: MODAL_PROPS_ACTIONS.CREATE, payload: createPayload });
      } else if (travelLog) {
        dispatch({ type: MODAL_PROPS_ACTIONS.UPDATE, payload: updatePayload(travelLog) });
      }
      onOpen();
    },
    [createPayload, onOpen, updatePayload],
  );

  const closeModal = () => {
    dispatch({ type: MODAL_PROPS_ACTIONS.RESET });
    onClose();
  };

  return { visible: isOpen, modalProps, openModal, closeModal };
};
