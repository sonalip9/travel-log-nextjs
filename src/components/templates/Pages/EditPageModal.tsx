import { useReducer, useState } from 'react';

import { Button } from '@components/Button';
import { Container } from '@components/Container';
import { Modal } from '@components/Modal';
import { Text } from '@components/Text';
import { TextInput } from '@components/TextInput';
import { CreatePagePayload as PageMetaPayload, Page } from '@defs/pages';
import { formatDateTime } from '@utils/date-time';

enum UPDATE_PAGE_ACTIONS {
  UPDATE_TITLE = 'UPDATE_TITLE',
  UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION',
  UPDATE_DATE = 'UPDATE_DATE',
  RESET = 'RESET',
}

type ActionParam =
  | { type: UPDATE_PAGE_ACTIONS.UPDATE_DATE; payload: string }
  | { type: UPDATE_PAGE_ACTIONS.UPDATE_TITLE; payload: string }
  | { type: UPDATE_PAGE_ACTIONS.UPDATE_DESCRIPTION; payload: string }
  | { type: UPDATE_PAGE_ACTIONS.RESET };

const editPageAction = (
  state: PageMetaPayload | undefined,
  action: ActionParam,
): PageMetaPayload | undefined => {
  const today = new Date().toISOString();
  switch (action.type) {
    case 'UPDATE_TITLE':
      return { ...state, date: state?.date || today, title: action.payload };
    case 'UPDATE_DESCRIPTION':
      if (!state) return { title: '', content: action.payload, date: today };
      return { ...state, date: state?.date || today, content: action.payload };
    case 'UPDATE_DATE':
      if (!state) return { title: '', content: '', date: action.payload };
      return { ...state, date: action.payload };
    case 'RESET':
      return undefined;
    default:
      return state;
  }
};

export type CreateProps = {
  isCreate: true;
  onCreate: (createPage: PageMetaPayload) => void;
};
export type UpdateProps = {
  isCreate: false;
  onUpdate: (pageId: string, createPage: PageMetaPayload) => void;
  updatePage: Page;
};
export type EditPageModalProps = {
  visible: boolean;
  onCancel: () => void;
} & (CreateProps | UpdateProps);

function EditPageModal({ onCancel, visible, ...props }: EditPageModalProps) {
  const [page, setPage] = useReducer(
    editPageAction,
    'updatePage' in props ? props.updatePage : (undefined as PageMetaPayload | undefined),
  );

  const [titleIsValid, setTitleIsValid] = useState<boolean | undefined>();

  return (
    <Modal open={visible} onClose={onCancel}>
      <Container
        as="form"
        css={{ px: '$lg', pt: '$lg', gap: '$xxl' }}
        onSubmit={() => {
          if (!page) return onCancel();
          if (props.isCreate) {
            props.onCreate(page);
          } else {
            props.onUpdate(props.updatePage.pageId, page);
          }
        }}
      >
        <Text uppercase type="headlineSmall">
          Create Page
        </Text>
        <TextInput
          bordered
          fullWidth
          required
          color={titleIsValid === false ? 'error' : 'primary'}
          css={{ alignItems: 'flex-start' }}
          error={titleIsValid === false}
          initialValue={'updatePage' in props ? props.updatePage?.title : ''}
          label="Title"
          placeholder="Please enter a title"
          type="text"
          value={page?.title}
          onChange={({ target }) => {
            setTitleIsValid(undefined);
            setPage({ type: UPDATE_PAGE_ACTIONS.UPDATE_TITLE, payload: target.value });
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
          css={{ alignItems: 'flex-start' }}
          label="Date"
          type="date"
          value={formatDateTime(new Date(page?.date ?? new Date()), 'YYYY-MM-DD')}
          onChange={({ target }) =>
            setPage({
              type: UPDATE_PAGE_ACTIONS.UPDATE_DATE,
              payload: target.value,
            })
          }
        />

        <TextInput
          bordered
          fullWidth
          multiline
          primary
          css={{ alignItems: 'flex-start' }}
          initialValue={'updatePage' in props ? props.updatePage?.content : ''}
          label="Description"
          maxRows={5}
          placeholder="Please enter a description"
          value={page?.content}
          onChange={({ target }) =>
            setPage({
              type: UPDATE_PAGE_ACTIONS.UPDATE_DESCRIPTION,
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

export default EditPageModal;
