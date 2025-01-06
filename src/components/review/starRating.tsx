"use client";

import { FaStar } from "react-icons/fa6";

interface IProps {
  setFieldValue: (a: string, b: number) => void;
  values: number;
}

export default function StartRating({ setFieldValue, values }: IProps) {
  const handleClick = (e: number) => {
    setFieldValue("rating", e);
  };

  return (
    <>
      {Array.from({ length: 5 }).map((_, idx) => {
        const pointRate = idx + 1;
        return (
          <label key={pointRate}>
            <input
              type="radio"
              name="rating"
              value={values}
              onClick={() => handleClick(pointRate)}
              className="hidden"
            />
            <FaStar
              className={`text-3xl cursor-pointer ${
                pointRate <= values ? "text-yellow-300" : "text-slate-400"
              }`}
            />
          </label>
        );
      })}
    </>
  );
}
