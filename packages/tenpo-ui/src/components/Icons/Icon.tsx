import React, { FC, memo } from 'react';
import { CHEVRON_RIGHT, CIRCLE_CROSS_FILL_PATH } from './svgIcons';

export interface IconProps {
  /** Custom class name for styling */
  className?: string;
  /** Defines the icon color */
  color?: string;
  /** Displays the filled version of the icon */
  filled?: boolean;
  /** Name of the icon to render */
  name: 'chevron-right' | 'circle-cross-fill';
  /** Defines the icon size */
  size?: number;
}

/**
 * Mapping of available icons to their respective SVG paths.
 */
const ICONS_MAP: Record<IconProps['name'], string> = {
  'chevron-right': CHEVRON_RIGHT,
  'circle-cross-fill': CIRCLE_CROSS_FILL_PATH,
};

/**
 * Icon component that renders an SVG based on the provided icon name.
 * The component is optimized using React.memo to prevent unnecessary re-renders.
 *
 * @component
 * @example
 * ```tsx
 * <Icon name="chevron-right" size={16} className="custom-class" />
 * ```
 *
 * @param {IconProps} props - The properties of the Icon component.
 * @returns {JSX.Element} Rendered SVG icon.
 */
const Icon: FC<IconProps> = memo(
  ({ size = 14, className, name }) => {
    const iconSvg = ICONS_MAP[name] || CHEVRON_RIGHT;

    return (
      <svg
        data-testid="icon-test-id"
        className={className}
        height={size}
        width={size}
        fill="none"
        viewBox="0 0 16 16"
        dangerouslySetInnerHTML={{
          __html: iconSvg.includes('fill="')
            ? iconSvg.replace(/fill="[^"]*"/g, `fill="var(--tenpo-gray-50)"`)
            : iconSvg,
        }}
      />
    );
  },
  (prevProps, nextProps) =>
    prevProps.className === nextProps.className &&
    prevProps.size === nextProps.size &&
    prevProps.name === nextProps.name,
);

export default Icon;
