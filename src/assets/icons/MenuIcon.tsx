import { SvgIcon, type SvgIconProps } from './SvgIcon';

export const MenuIcon = (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"
    />
  </SvgIcon>
);
