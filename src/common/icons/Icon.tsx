import { icons, type IconName } from '../../assets/icons/icons';

type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
  title?: string;
};

export const Icon = ({ name, size = 24, className, title }: IconProps) => {
  const icon = icons[name];

  return (
    <svg
      viewBox={icon.viewBox}
      width={size}
      height={size}
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
    >
      {title && <title>{title}</title>}
      {icon.content}
    </svg>
  );
};
