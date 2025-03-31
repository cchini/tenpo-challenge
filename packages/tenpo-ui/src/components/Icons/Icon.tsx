import { FC } from 'react';
import { CHEVRON_RIGHT, CIRCLE_CROSS_FILL_PATH } from './svgIcons';

export interface IconProps {
  /** Overwrite className */
  className?: string;
  /** Set color for icon */
  color?: string;
  /** Show the version filled of icon */
  filled?: boolean;
  /** Icon name */
  name: 'chevron-right' | 'circle-cross-fill';
  /** Set size for the icon */
  size?: number;
}

const Icon: FC<IconProps> = ({
  size = 14,
  className,
  name,
  color = 'white',
}) => {
  const searchIcon = () => {
    let icon = '';
    switch (name) {
      case 'chevron-right':
        icon = CHEVRON_RIGHT;
        break;
      case 'circle-cross-fill':
        icon = CIRCLE_CROSS_FILL_PATH;
        break;
      default:
        icon = CHEVRON_RIGHT;
    }
    return icon;
  };

  const iconSvg = searchIcon();

  return (
    <svg
      data-testid="icon-test-id"
      className={className}
      dangerouslySetInnerHTML={{
        __html: iconSvg.replace(/fill="[^"]*"/g, `fill="var(--tenpo-gray-50)"`),
      }}
      height={size}
      width={size}
      fill="none"
      viewBox="0 0 16 16"
    />
  );
};

export default Icon;
