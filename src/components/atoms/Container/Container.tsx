import {
  ComponentPropsWithoutRef,
  createElement,
  forwardRef,
  useCallback,
  useId,
  useImperativeHandle,
} from 'react';

import {
  alignContentMap,
  alignItemsMap,
  alignSelfMap,
  justifyContentMap,
  justifyItemsMap,
  justifySelfMap,
  placeContentMap,
  placeItemsMap,
  placeSelfMap,
} from '@utils/spacing';

type AsProp =
  | ({
      as?: 'div';
    } & ComponentPropsWithoutRef<'div'>)
  | ({
      as: 'form';
    } & ComponentPropsWithoutRef<'form'>)
  | ({
      as: 'col';
    } & ComponentPropsWithoutRef<'col'>);

export type ContainerProps = {
  row?: boolean;
  flex?: boolean;
  justifyContent?: keyof typeof justifyContentMap;
  justifyItems?: keyof typeof justifyItemsMap;
  justifySelf?: keyof typeof justifySelfMap;
  alignContent?: keyof typeof alignContentMap;
  alignItems?: keyof typeof alignItemsMap;
  alignSelf?: keyof typeof alignSelfMap;
  placeContent?: keyof typeof placeContentMap;
  placeItems?: keyof typeof placeItemsMap;
  placeSelf?: keyof typeof placeSelfMap;
} & AsProp;

const ContainerComponent = forwardRef(function (
  {
    className,
    row,
    flex = true,
    justifyContent = 'normal',
    justifyItems = 'start',
    justifySelf = 'auto',
    alignContent = 'normal',
    alignItems = 'normal',
    alignSelf = 'auto',
    placeContent = 'start',
    placeItems = 'start',
    placeSelf = 'auto',
    ...props
  }: ContainerProps,
  ref: React.Ref<HTMLElement>,
) {
  const id = useId();
  useImperativeHandle(ref, () => document.getElementById(id) as HTMLElement, [id]);

  const Component = useCallback((attr: AsProp) => {
    switch (attr.as) {
      case 'form':
        return createElement('form', attr);
      case 'col':
        return createElement('col', attr);
      case 'div':
      default:
        return createElement('div', attr);
    }
  }, []);

  return (
    <Component
      className={`container ${flex ? 'flex' : ''} ${row ? 'flex-row' : 'flex-col'} ${
        alignContentMap[alignContent]
      } ${alignItemsMap[alignItems]} ${alignSelfMap[alignSelf]} ${
        justifyContentMap[justifyContent]
      } ${justifyItemsMap[justifyItems]} ${justifySelfMap[justifySelf]}
      ${placeContentMap[placeContent]} ${placeItemsMap[placeItems]} ${placeSelfMap[placeSelf]}
      m-[0] flex-nowrap gap-[0] ${className || ''}`}
      id={id}
      {...props}
    />
  );
});

ContainerComponent.displayName = 'Container';

ContainerComponent.defaultProps = {
  as: 'div',
};

export default ContainerComponent;
