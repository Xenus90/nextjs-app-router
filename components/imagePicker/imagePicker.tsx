"use client";
import { ChangeEvent, useRef, useState } from "react";
import style from "./style.module.css";
import Image from "next/image";

type Props = {
  label: string;
  name: string;
};

export default function ImagePicker({ label, name }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [pickedImage, setPickedImage] = useState<string | null>(null);

  const handlePickClick = () => {
    inputRef.current?.click();
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setPickedImage(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => setPickedImage(fileReader.result as string);
    fileReader.readAsDataURL(file);
  };

  return (
    <div className={style.picker}>
      <label htmlFor={name}>
        {label}
      </label>
      <div className={style.control}>
        <div className={style.preview}>
          {pickedImage ? (
            <Image fill src={pickedImage} alt="User selected image" />
          ) : (
            <p>
              No image picked yet
            </p>
          )}
        </div>
        <input
          required
          ref={inputRef}
          id={name}
          name={name}
          className={style.input}
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
        />
        <button className={style.button} type="button" onClick={handlePickClick}>
          Pick an Image
        </button>
      </div>
    </div>
  );
}