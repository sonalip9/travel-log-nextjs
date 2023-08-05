import { IconProps } from './types';

function DeleteOutline({ fill = 'currentColor', size, height, width, ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M15 3V4H20V6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4V4H9V3H15ZM7 19H17V6H7V19ZM9 8H11V17H9V8ZM15 8H13V17H15V8Z"
        fill={fill}
        fillRule="evenodd"
      />
    </svg>
  );
}

export default DeleteOutline;
