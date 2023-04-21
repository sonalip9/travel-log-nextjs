import { Loading as NUILoading, LoadingProps as NUILoadingProps } from '@nextui-org/react';

export type LoadingProps = NUILoadingProps;

function Loading(props: LoadingProps) {
  return <NUILoading {...props} />;
}

export default Loading;
