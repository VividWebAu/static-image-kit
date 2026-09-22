"use client";
import { ImageStatic } from "@vividwebau/react-static-images";
import { useState } from "react";

export const CsrClientComponent = () => {
  const [count, setCount] = useState(0);

  const image = "portrait.jpg"; 

  return (
    <div>
      <p>This is a client component for the CSR demo.</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)} type="button">
        Increment
      </button>

      <ImageStatic image={image} alt="this image should work in the CSR demo" />
    </div>
  );
};
