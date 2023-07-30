import { useLayoutEffect, useMemo, useRef } from 'react';

import { Container, ContainerProps } from '@components/Container';
import { Text, TextProps } from '@components/Text';

export type EllipsisTextProps = TextProps & {
  containerStyle?: ContainerProps['css'];
};

function EllipsisText({ containerStyle, ...textProps }: EllipsisTextProps) {
  const textRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  // The max lines defined in the props
  const maxLines: number | undefined = useMemo(
    () => (typeof textProps.css?.maxLines === 'number' ? textProps.css.maxLines : undefined),
    [textProps.css?.maxLines],
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

    // If the text fits in the container or no max line is defined, return
    if (
      textWidth <= containerWidth &&
      textHeight <= containerHeight &&
      typeof maxLines !== 'number'
    )
      return;


      const currLines = Math.floor(textHeight / lineHeight);
    const lineCount: number =
      textHeight <= containerHeight
        ? (maxLines ?? currLines)
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container ref={containerRef} css={containerStyle}>
      <Text ref={textRef} {...textProps} css={{ whiteSpace: 'pre-wrap', ...textProps.css }}>
        {textProps.children}
      </Text>
    </Container>
  );
}

export default EllipsisText;
