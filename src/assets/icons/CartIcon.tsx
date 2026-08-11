import { SvgIcon, type SvgIconProps } from './SvgIcon';

export const CartIcon = (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.17 14h9.66c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0021.25 5H5.21l-1-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7.42l-.25-.5z"
    />
  </SvgIcon>
);
