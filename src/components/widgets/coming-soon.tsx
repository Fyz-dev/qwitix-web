import { PencilRuler } from 'lucide-react';
import { FC } from 'react';

const ComingSoon: FC = () => {
  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <PencilRuler size={72} />
        <h1 className="text-4xl leading-tight font-bold">Coming Soon 👀</h1>
        <p className="text-muted-foreground text-center">
          This page has not been created yet. <br />
          Stay tuned though!
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
