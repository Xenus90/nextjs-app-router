"use client";

type Props = {
  error: {
    message: string;
  };
};

export default function Error(props: Props) {
  return (
    <div id="error">
      <h2>An error occurred!</h2>
      <p>{props.error.message}</p>
    </div>
  );
}