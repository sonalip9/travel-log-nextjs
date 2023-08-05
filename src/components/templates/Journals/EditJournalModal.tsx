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
    <Modal open={visible} onClose={onCancel}>
      <Container
        as="form"
        css={{ px: '$lg', pt: '$lg', gap: '$xxl' }}
        onSubmit={() => {
          if (!journal) return onCancel();
          if (props.isCreate) {
            props.onCreate(journal);
          } else {
            props.onUpdate(props.updateJournal.journalId, journal);
          }
        }}
      >
        <Text uppercase type="headlineSmall">
          Create Journal
        </Text>
        <TextInput
          bordered
          fullWidth
          required
          color={titleIsValid === false ? 'error' : 'primary'}
          css={{ alignItems: 'flex-start' }}
          error={titleIsValid === false}
          initialValue={'updateJournal' in props ? props.updateJournal?.title : ''}
          label="Title"
          placeholder="Please enter a title"
          type="text"
          value={journal?.title}
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
          bordered
          fullWidth
          multiline
          primary
          css={{ alignItems: 'flex-start' }}
          initialValue={'updateJournal' in props ? props.updateJournal?.description : ''}
          label="Description"
          maxRows={5}
          placeholder="Please enter a description"
          value={journal?.description}
          onChange={({ target }) =>
            setJournal({
              type: UPDATE_JOURNAL_ACTIONS.UPDATE_DESCRIPTION,
              payload: target.value,
            })
          }
        />

        <Container row css={{ p: '$xl', gap: '$sm' }} justify="flex-end">
          <Button auto light color="primary" onPress={onCancel}>
            Cancel
          </Button>
          <Button auto light color="primary" type="submit">
            {props.isCreate ? 'Create' : 'Update'}
          </Button>
        </Container>
      </Container>
    </Modal>
  );
}

export default EditJournalModal;
