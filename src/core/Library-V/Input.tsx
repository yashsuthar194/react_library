import React from "react";
import { capitalizeFirstLetter } from "../helpers/Utility";

export type InputProps = {
  label: string;
  placeholder: string;
  layout?: "vertical" | "horizontal";
  className?: string;
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = React.memo(function Input({
  label,
  placeholder,
  layout,
  className,
  value,
  onChange,
}: InputProps) {
  console.log("re render");
  return (
    <>
      <div
        className={`flex ${
          layout === "horizontal" ? "flex-col" : "items-center"
        }
        `}
      >
        <label className="mr-2">{capitalizeFirstLetter(label)} :</label>
        <input
          id="price"
          name="price"
          type="text"
          placeholder={placeholder}
          value={value}
          className={`border-1 rounded-sm block min-w-0  py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400  sm:text-sm/6 ${className}`}
          onChange={onChange}
        />
      </div>
    </>
  );
});

export default Input;
