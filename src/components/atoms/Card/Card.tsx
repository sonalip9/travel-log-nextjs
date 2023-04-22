import { Card as NUICard, CardProps as NUICardProps } from '@nextui-org/react';

export type CardProps = NUICardProps;

export default function Card(props: CardProps) {
  return <NUICard {...props} />;
}

Card.displayName = 'Card';
