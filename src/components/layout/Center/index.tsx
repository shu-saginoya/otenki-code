import { ReactNode, FC, JSX } from 'react';

type CenterProps = {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

export const Center: FC<CenterProps> = ({ children, as: Component = "div" }) => {
  return (
    <Component className="w-full h-full flex items-center justify-center">
      {children}
    </Component>
  );
};
