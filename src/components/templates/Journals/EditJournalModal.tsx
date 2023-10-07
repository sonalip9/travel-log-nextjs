'use client';
import { ModalContent } from '@nextui-org/react';
import { useReducer, useState } from 'react';

import { Button } from '@components/Button';
import { Container } from '@components/Container';
import { Modal } from '@components/Modal';
import { Text } from '@components/Text';
import { TextInput } from '@components/TextInput';
import { CreateJournalPayload as JournalMetaPayload, UserJournal } from '@defs/journals';

enum UPDATE_JOURNAL_ACTIONS {
  UPDATE_TITLE = 'UPDATE_TITLE',
  UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION',
  RESET = 'RESET',
}

const editJournalAction = (
  state: JournalMetaPayload | undefined,
  action: { type: UPDATE_JOURNAL_ACTIONS; payload: string },
) => {
  switch (action.type) {
    case 'UPDATE_TITLE':
      return { ...state, title: action.payload };
    case 'UPDATE_DESCRIPTION':
      if (!state) return { title: '', description: action.payload };
      return { ...state, description: action.payload };
    case 'RESET':
      return undefined;
    default:
      return state;
  }
};

export type CreateProps = {
  isCreate: true;
  onCreate: (createJournal: JournalMetaPayload) => void;
};
export type UpdateProps = {
  isCreate: false;
  onUpdate: (journalId: string, createJournal: JournalMetaPayload) => void;
  updateJournal: UserJournal;
};
export type EditJournalModalProps = {
  visible: boolean;
  onCancel: () => void;
} & (CreateProps | UpdateProps);

function EditJournalModal({ onCancel, visible, ...props }: EditJournalModalProps) {
  const [journal, setJournal] = useReducer(
    editJournalAction,
    'updateJournal' in props ? props.updateJournal : (undefined as JournalMetaPayload | undefined),
  );

  const [titleIsValid, setTitleIsValid] = useState<boolean | undefined>();

  return (
    <Modal hideCloseButton isOpen={visible} onClose={onCancel}>
      <ModalContent>
        <Container
          as="form"
          className="gap-xxl px-lg pt-lg"
          onSubmit={() => {
            if (!journal) return onCancel();
            if (props.isCreate) {
              props.onCreate(journal);
            } else {
              props.onUpdate(props.updateJournal.journalId, journal);
            }
          }}
        >
          <Text uppercase className="headline-small">
            Create Journal
          </Text>
          <TextInput
            fullWidth
            required
            className="items-start"
            color={titleIsValid === false ? 'danger' : 'primary'}
            defaultValue={'updateJournal' in props ? props.updateJournal?.title : ''}
            error={titleIsValid === false}
            label="Title"
            placeholder="Please enter a title"
            type="text"
            value={journal?.title}
            variant="bordered"
            onChange={({ target }) => {
              setTitleIsValid(undefined);
              setJournal({ type: UPDATE_JOURNAL_ACTIONS.UPDATE_TITLE, payload: target.value });
            }}
            onInvalid={(event) => {
              event.preventDefault();
              event.currentTarget.focus();
              setTitleIsValid(false);
            }}
          />
          <TextInput
            fullWidth
            multiline
            primary
            className="items-start"
            defaultValue={'updateJournal' in props ? props.updateJournal?.description : ''}
            label="Description"
            maxRows={5}
            placeholder="Please enter a description"
            value={journal?.description}
            variant="bordered"
            onChange={({ target }) =>
              setJournal({
                type: UPDATE_JOURNAL_ACTIONS.UPDATE_DESCRIPTION,
                payload: target.value,
              })
            }
          />

          <Container row className="gap-sm p-xl" justifyContent="flex-end">
            <Button variant="light" onPress={onCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="light">
              {props.isCreate ? 'Create' : 'Update'}
            </Button>
          </Container>
        </Container>
      </ModalContent>
    </Modal>
  );
}

export default EditJournalModal;
