import { useLayoutEffect, useRef } from 'react';

import { Container, ContainerProps } from '@components/Container';
import { Text, TextProps } from '@components/Text';

export type EllipsisTextProps = TextProps & {
  containerStyle?: ContainerProps['css'];
};

function EllipsisText({ containerStyle, ...textProps }: EllipsisTextProps) {
  const textRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const currText = textRef.current?.innerText;
    if (!currText) return;

    const textComputedStyle = window.getComputedStyle(textRef.current);
    const textWidth = textRef.current?.offsetWidth || 0;
    const textHeight = textRef.current?.offsetHeight || 0;
    const lineHeight = parseInt(
      textComputedStyle.getPropertyValue('line-height').replace('px', ''),
    );

    const containerWidth = containerRef.current?.offsetWidth || 0;
    const containerHeight = containerRef.current?.offsetHeight || 0;

    if (textWidth <= containerWidth && textHeight <= containerHeight) return;

    const lineCount = Math.floor(containerHeight / lineHeight);
    const currLines = Math.floor(textHeight / lineHeight);

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

    // Remove words until the text fits in the container
    if (textRef.current.offsetHeight > containerHeight) {
      while (textRef.current.offsetHeight > containerHeight) {
        textRef.current.innerText = textRef.current.innerText.split(' ').slice(0, -1).join(' ');
      }
    }

    // Add ellipsis
    textRef.current.innerText = textRef.current.innerText + '...';
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
