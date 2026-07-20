'use client';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div>
      <h1>Could not fetch the list of notes. {error.message};</h1>
      <button onClick={() => reset()}>Reload</button>
    </div>
  );
}
