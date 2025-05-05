import { ComponentProps, FC, Suspense, SuspenseProps } from 'react';

import { Spinner } from '../ui/spinner';

interface SuspenseWrapperProps extends SuspenseProps {
  spinnerProps?: ComponentProps<typeof Spinner>;
}

const SuspenseWrapper: FC<SuspenseWrapperProps> = ({
  children,
  fallback,
  spinnerProps,
  ...props
}) => {
  return (
    <Suspense
      fallback={
        fallback || (
          <div className="absolute inset-x-0 flex size-full flex-col items-center justify-center">
            <Spinner size="large" {...spinnerProps} />
          </div>
        )
      }
      {...props}
    >
      {children}
    </Suspense>
  );
};

export default SuspenseWrapper;
