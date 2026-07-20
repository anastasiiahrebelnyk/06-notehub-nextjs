'use client';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div>
      <h1>
        <p>
          Something went wrong.
          {error.message}
        </p>
        ;
      </h1>
      <button onClick={() => reset()}>Reload</button>
    </div>
  );
}
