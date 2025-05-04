import { FC, Suspense, SuspenseProps } from 'react';

import { Spinner } from '../ui/spinner';

type SuspenseWrapperProps = SuspenseProps;

const SuspenseWrapper: FC<SuspenseWrapperProps> = ({
  children,
  fallback,
  ...props
}) => {
  return (
    <Suspense
      fallback={
        fallback || (
          <div className="absolute inset-x-0 flex size-full flex-col items-center justify-center">
            <Spinner size="large" />
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
