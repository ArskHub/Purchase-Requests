function iconProps(props) {
  return {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
    ...props,
  };
}

export function BookIcon(props) {
  return (
    <svg {...iconProps(props)}>
      <path d="M4 19.5V5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5" />
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M9 7h7M9 10.5h5" />
    </svg>
  );
}

export function BackpackIcon(props) {
  return (
    <svg {...iconProps(props)}>
      <path d="M8 8V6a4 4 0 1 1 8 0v2" />
      <path d="M6 9.5A2.5 2.5 0 0 1 8.5 7h7A2.5 2.5 0 0 1 18 9.5V19a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9.5Z" />
      <path d="M9.5 12.5h5M10 15.5h4" />
      <path d="M9 7v2.5M15 7v2.5" />
    </svg>
  );
}

export function PosterIcon(props) {
  return (
    <svg {...iconProps(props)}>
      <rect x="4" y="3.5" width="16" height="17" rx="1.2" />
      <circle cx="9.5" cy="9.5" r="1.8" />
      <path d="M4.8 17.5 9 12.8l3 3.2 3-3.4 4.2 4.4" />
    </svg>
  );
}

export function BoxIcon(props) {
  return (
    <svg {...iconProps(props)}>
      <path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z" />
      <path d="M4 7l8 4 8-4M12 11v10" />
    </svg>
  );
}

export function BasketIcon(props) {
  return (
    <svg {...iconProps(props)}>
      <path d="M5 9h14l-1.4 9.2a2 2 0 0 1-2 1.8H8.4a2 2 0 0 1-2-1.8L5 9Z" />
      <path d="M8.5 9 10 4h4l1.5 5M10 12.5v4M14 12.5v4" />
    </svg>
  );
}

export function TruckIcon(props) {
  return (
    <svg {...iconProps(props)}>
      <rect x="2.5" y="7" width="11" height="9" rx="1" />
      <path d="M13.5 10h3.5l3 3v3h-6.5" />
      <circle cx="6.5" cy="18" r="1.6" />
      <circle cx="16" cy="18" r="1.6" />
    </svg>
  );
}

export function ReceiptIcon(props) {
  return (
    <svg {...iconProps(props)}>
      <path d="M6 3h12v18l-2.5-1.5L13 21l-2.5-1.5L8 21l-2-1.5V3Z" />
      <path d="M9 8h6M9 11.5h6M9 15h4" />
    </svg>
  );
}

export function SearchIcon(props) {
  return (
    <svg {...iconProps(props)}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M20 20l-4.8-4.8" />
    </svg>
  );
}

export function ChevronIcon(props) {
  return (
    <svg {...iconProps(props)}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function CheckCircleIcon(props) {
  return (
    <svg {...iconProps(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.3 12.3l2.6 2.6 5-5.4" />
    </svg>
  );
}

export function TrashIcon(props) {
  return (
    <svg {...iconProps(props)}>
      <path d="M4.5 6.5h15M9.5 6.5V4.8a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1.7M7 6.5 7.7 19a1.5 1.5 0 0 0 1.5 1.4h5.6A1.5 1.5 0 0 0 16.3 19L17 6.5" />
    </svg>
  );
}

export const CATEGORY_ICONS = {
  Modul: BookIcon,
  Perlengkapan: BackpackIcon,
  'Media Belajar': PosterIcon,
};
