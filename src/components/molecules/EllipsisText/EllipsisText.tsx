import { useLayoutEffect, useRef, useState } from 'react';

import { Container, ContainerProps } from '@components/Container';
import { Text, TextProps } from '@components/Text';

export type EllipsisTextProps = TextProps & {
  containerStyle?: ContainerProps['css'];
};

function EllipsisText({ containerStyle, ...textProps }: EllipsisTextProps) {
  const textRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  const [text, setText] = useState(textRef.current?.innerText);

  useLayoutEffect(() => {
    const currText = textRef.current?.innerText;
    if (!currText) return;

    const textComputedStyle = window.getComputedStyle(textRef.current);
    const textWidth = textRef.current?.offsetWidth || 0;
    const textHeight = textRef.current?.offsetHeight || 0;
    const lineHeight = textComputedStyle.getPropertyValue('line-height').replace('px', '');

    const containerWidth = containerRef.current?.offsetWidth || 0;
    const containerHeight = containerRef.current?.offsetHeight || 0;

    if (textWidth <= containerWidth && textHeight <= containerHeight) return;

    const lineCount = Math.floor(containerHeight / parseInt(lineHeight));
    const currLines = Math.floor(textHeight / parseInt(lineHeight));

    const charInLine = currText.length / currLines;

    // Truncate all words that are beyond the limit
    // Add ellipsis to the last word
    const truncatedText = textRef.current?.innerText.split(' ').reduce((acc, word) => {
      if (acc.endsWith('...')) return acc;

      return acc.length + word.length + 4 > charInLine * lineCount
        ? `${acc} ...`
        : `${acc} ${word}`;
    }, '');
    setText(truncatedText || '');
  }, []);

  return (
    <Container ref={containerRef} css={containerStyle}>
      <Text ref={textRef} {...textProps}>
        {text || textProps.children}
      </Text>
    </Container>
  );
}

export default EllipsisText;
