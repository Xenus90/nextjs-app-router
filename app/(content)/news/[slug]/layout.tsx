import React from "react"

type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function Layout(props: Props) {
  return (
    <>
      {props.modal}
      {props.children}
    </>
  );
}