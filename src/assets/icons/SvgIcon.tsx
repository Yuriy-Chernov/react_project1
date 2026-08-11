import type { ReactNode, SVGProps } from 'react';

export type SvgIconProps = Omit<SVGProps<SVGSVGElement>, 'children'> & {
  size?: number;
  title?: string;
  children?: ReactNode;
};

type SvgIconBaseProps = SvgIconProps & {
  viewBox: string;
};

export const SvgIcon = ({
  size = 24,
  title,
  viewBox,
  className,
  children,
  ...props
}: SvgIconBaseProps) => (
  <svg
    viewBox={viewBox}
    width={size}
    height={size}
    className={className}
    aria-hidden={title ? undefined : true}
    role={title ? 'img' : undefined}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {title ? <title>{title}</title> : null}
    {children}
  </svg>
);
