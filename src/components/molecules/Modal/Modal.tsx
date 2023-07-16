import { Modal as NUIModal, ModalProps as NUIModalProps } from '@nextui-org/react';

export type ModalProps = NUIModalProps;

function Modal(props: ModalProps) {
  return <NUIModal {...props} />;
}

export default Modal;
