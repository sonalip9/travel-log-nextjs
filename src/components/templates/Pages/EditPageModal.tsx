import { useReducer, useRef, useState } from 'react';

import { Close } from '@/components/icons';
import { Button } from '@components/Button';
import { Container } from '@components/Container';
import { Image } from '@components/Image';
import { Modal } from '@components/Modal';
import { Text } from '@components/Text';
import { TextInput } from '@components/TextInput';
import { CreatePagePayload as PageMetaPayload, Page, Photo } from '@defs/pages';
import { formatDateTime } from '@utils/date-time';
import { photoObjectToFile, getSrcForImage } from '@utils/file';

enum UPDATE_PAGE_ACTIONS {
  UPDATE_TITLE = 'UPDATE_TITLE',
  UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION',
  UPDATE_DATE = 'UPDATE_DATE',
  UPDATE_IMAGE = 'UPDATE_IMAGE',
  RESET = 'RESET',
}

type ActionParam =
  | { type: UPDATE_PAGE_ACTIONS.UPDATE_DATE; payload: string }
  | { type: UPDATE_PAGE_ACTIONS.UPDATE_TITLE; payload: string }
  | { type: UPDATE_PAGE_ACTIONS.UPDATE_DESCRIPTION; payload: string }
  | { type: UPDATE_PAGE_ACTIONS.UPDATE_IMAGE; payload?: PageMetaPayload['photo'] }
  | { type: UPDATE_PAGE_ACTIONS.RESET };

type PageState = (Omit<PageMetaPayload, 'photo'> & { photo?: File | Photo }) | undefined;

const editPageAction = (state: PageState, action: ActionParam): PageState => {
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
    case 'UPDATE_IMAGE':
      if (!state) return { title: '', content: '', date: today };
      return { ...state, date: state?.date || today, photo: action.payload };
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
  updatePage: Pick<PageMetaPayload, 'photo'> & Page;
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

  const ref = useRef<HTMLInputElement>(null);

  return (
    <Modal open={visible} onClose={onCancel}>
      <Container
        as="form"
        css={{ px: '$lg', pt: '$lg', gap: '$xxl' }}
        onSubmit={() => {
          if (!page) return onCancel();
          if (props.isCreate) {
            if (page.photo && !(page.photo instanceof File)) {
              photoObjectToFile(page.photo)
                .then((file) => props.onCreate({ ...page, photo: file }))
                .catch(console.error);
              return;
            }
            // The below spread of object is required to avoid ts error
            props.onCreate({ ...page, photo: page.photo });
          } else {
            if (page.photo && !(page.photo instanceof File)) {
              photoObjectToFile(page.photo)
                .then((file) => {
                  props.onUpdate(props.updatePage.pageId, { ...page, photo: file });
                })
                .catch(console.error);
              return;
            }
            // The below spread of object is required to avoid ts error
            props.onUpdate(props.updatePage.pageId, { ...page, photo: page.photo });
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
          color="primary"
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

        <Container flex css={{ gap: '$sm' }}>
          <TextInput
            ref={ref}
            bordered
            accept="image/*"
            color="primary"
            css={{
              alignItems: 'flex-start',
              verticalAlign: 'bottom',
              input: { height: 'fit-content' },
            }}
            label="Photo"
            type="file"
            onChange={({ target }) => {
              const photo = (target as HTMLInputElement).files?.[0];
              if (!photo) return;

              setPage({
                type: UPDATE_PAGE_ACTIONS.UPDATE_IMAGE,
                payload: photo,
              });
            }}
          />
          {page?.photo && (
            <Container row css={{ flex: 1, width: '100%', mt: '$md' }}>
              <Image
                alt="Photo"
                containerCss={{ maxWidth: '35%', m: '$none' }}
                css={{ aspectRatio: 1 }}
                objectFit="cover"
                src={getSrcForImage(page.photo)}
              />
              <Button
                rounded
                color="error"
                css={{ position: 'relative', top: -10, right: 10, minWidth: 'auto', p: '$2' }}
                icon={<Close size={16} />}
                size="xs"
                onPress={() => {
                  setPage({
                    type: UPDATE_PAGE_ACTIONS.UPDATE_IMAGE,
                  });
                }}
              />
            </Container>
          )}
        </Container>

        <TextInput
          bordered
          fullWidth
          multiline
          color="primary"
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
