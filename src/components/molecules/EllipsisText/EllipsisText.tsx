import { useLayoutEffect, useMemo, useRef } from 'react';

import { Container, ContainerProps } from '@components/Container';
import { Text, TextProps } from '@components/Text';

export type EllipsisTextProps = TextProps & {
  containerStyle?: ContainerProps['className'];
};

/**
 * A text component that truncates the text to fit in the container and max lines
 *
 * To truncate the text, the component uses the css property `max-lines` or the `max-height` of the container
 * @param props The props for the EllipsisText component - containerStyle and textProps
 * @returns A JSX element
 */
function EllipsisText({ containerStyle, ...textProps }: EllipsisTextProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  // The max lines defined in the props
  const maxLines: number | undefined = useMemo(
    () => (typeof textProps?.maxLines === 'number' ? textProps.maxLines : undefined),
    [textProps?.maxLines],
  );

  useLayoutEffect(() => {
    const currText = textRef.current?.innerText;
    if (!currText) return;

    // Properties related to the text component
    const textComputedStyle = window.getComputedStyle(textRef.current);
    const textWidth = textRef.current?.offsetWidth || 0;
    const textHeight = textRef.current?.offsetHeight || 0;
    const lineHeight = parseInt(
      textComputedStyle.getPropertyValue('line-height').replace('px', ''),
    );

    // Properties related to the container
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const containerHeight = containerRef.current?.offsetHeight || 0;

    // If the text fits in the container and max line is not defined, return
    if (
      textWidth <= containerWidth &&
      textHeight <= containerHeight &&
      typeof maxLines !== 'number'
    )
      return;

    const currLines = Math.floor(textHeight / lineHeight);
    // If the text fits in the container then the lines count is maxLines
    // else the lines count is the number of lines that fit in the container
    // Todo - CHeck implementation with both, maxLines and container height
    const lineCount: number =
      textHeight <= containerHeight
        ? maxLines ?? currLines
        : Math.floor(containerHeight / lineHeight);

    // If number of lines is less than the max lines, return
    if (currLines <= lineCount) return;

    // Approximate the number of characters that fit in the first line
    let charInLine = Math.floor(currText.length / currLines);
    charInLine = currText.indexOf(' ', charInLine);

    textRef.current.innerText = currText.slice(0, charInLine);

    // Find the number of characters that fit in the first line
    while (textRef.current.offsetHeight / lineHeight <= 1) {
      textRef.current.innerText += currText[charInLine];
      charInLine += 1;
    }

    // Add the total characters that fit in the `lineCount` lines
    textRef.current.innerText = currText.slice(0, charInLine * lineCount);

    // Remove words until the text fits in the container or is less than the max lines
    if (
      textRef.current.offsetHeight > containerHeight ||
      textRef.current.offsetHeight / lineHeight > lineCount
    ) {
      while (
        textRef.current.offsetHeight > containerHeight ||
        textRef.current.offsetHeight / lineHeight > lineCount
      ) {
        textRef.current.innerText = textRef.current.innerText.split(' ').slice(0, -1).join(' ');
      }
    }

    // Add ellipsis
    textRef.current.innerText = textRef.current.innerText + '...';

    // The useEffect dependency array is empty because we want this to run only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container ref={containerRef} className={containerStyle}>
      <Text
        ref={textRef}
        {...textProps}
        className={`whitespace-pre-wrap ${textProps.className || ''}`}
      >
        {textProps.children}
      </Text>
    </Container>
  );
}

export default EllipsisText;
