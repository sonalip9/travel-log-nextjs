import { ModalContent } from '@nextui-org/react';
import { useReducer, useRef, useState } from 'react';

import { Close } from '@/components/icons';
import { Button } from '@components/Button';
import { Container } from '@components/Container';
import { ExpandImage } from '@components/ExpandImage';
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
    <Modal isOpen={visible} onClose={onCancel}>
      <ModalContent>
        <Container
          as="form"
          className="gap-lg px-lg pt-lg"
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
          <Text uppercase className="headline-small">
            Create Page
          </Text>
          <TextInput
            fullWidth
            required
            className="items-start"
            color={titleIsValid === false ? 'danger' : 'primary'}
            defaultValue={'updatePage' in props ? props.updatePage?.title : ''}
            error={titleIsValid === false}
            label="Title"
            placeholder="Please enter a title"
            type="text"
            value={page?.title}
            variant="bordered"
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
            fullWidth
            required
            className="items-start"
            color={titleIsValid === false ? 'danger' : 'primary'}
            defaultValue={'updatePage' in props ? props.updatePage?.title : ''}
            error={titleIsValid === false}
            label="Date"
            type="date"
            value={formatDateTime(new Date(page?.date ?? new Date()), 'YYYY-MM-DD')}
            variant="bordered"
            onChange={({ target }) =>
              setPage({
                type: UPDATE_PAGE_ACTIONS.UPDATE_DATE,
                payload: target.value,
              })
            }
          />

          <Container flex className="gap-xs">
            <TextInput
              ref={ref}
              accept="image/*"
              className="items-start"
              classNames={{ input: 'pb-0 mb-sm', inputWrapper: 'h-fit' }}
              color="primary"
              defaultValue=""
              label="Photo"
              placeholder="Click to add a photo"
              type="file"
              variant="bordered"
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
              <Container row className="aspect-[1:1.18] mt-md max-w-[40%]">
                <ExpandImage
                  alt="Photo"
                  src={getSrcForImage(page.photo)}
                  // OnHoverStyles={{ '&+ button': { visibility: 'hidden' } }}
                />
                <Button
                  className="-top-[10px] right-[10px] z-10 aspect-square h-lg min-w-0 rounded-full px-none peer-hover:hidden"
                  color="danger"
                  endContent={<Close size={16} />}
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
            fullWidth
            multiline
            className="items-start"
            color="primary"
            defaultValue={'updatePage' in props ? props.updatePage?.content : ''}
            label="Description"
            maxRows={5}
            placeholder="Please enter a description"
            value={page?.content}
            variant="bordered"
            onChange={({ target }) =>
              setPage({
                type: UPDATE_PAGE_ACTIONS.UPDATE_DESCRIPTION,
                payload: target.value,
              })
            }
          />

          <Container row className="gap-sm p-xl" justifyContent="flex-end">
            <Button color="primary" variant="light" onPress={onCancel}>
              Cancel
            </Button>
            <Button color="primary" type="submit" variant="light">
              {props.isCreate ? 'Create' : 'Update'}
            </Button>
          </Container>
        </Container>
      </ModalContent>
    </Modal>
  );
}

export default EditPageModal;
