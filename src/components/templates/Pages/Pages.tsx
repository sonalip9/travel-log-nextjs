import { Text } from '@components/Text';
import { Page } from '@defs/journals';

export type PagesProps = {
  page?: Page;
};
function Pages({ page }: PagesProps) {
  return <>{page ? <Text>{page.title}</Text> : <Text>Add new page</Text>}</>;
}

export default Pages;
