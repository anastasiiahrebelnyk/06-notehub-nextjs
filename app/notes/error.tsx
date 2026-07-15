'use client';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div>
      <h1>
        <p>Could not fetch the list of notes. {error.message}</p>;
      </h1>
      <button onClick={() => window.location.reload()}>Reload</button>
    </div>
  );
}
