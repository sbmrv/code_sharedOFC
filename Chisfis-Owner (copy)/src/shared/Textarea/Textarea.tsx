import React, { TextareaHTMLAttributes, ChangeEvent } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder: string;
  value: any;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", children, value, handleChange, ...args }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`block w-full text-sm rounded-2xl border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 ${className}`}
        rows={4}
        {...args}
        value={value}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          handleChange(e); // Pass the entire event object
        }}
      >
        {children}
      </textarea>
    );
  }
);

export default Textarea;
