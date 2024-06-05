"use client";

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface MultiSelectProps {
  placeholder: string;
  options: { _id: string; title: string }[]; 
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  options,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  const selected = value.map((id) => options.find((option) => option._id === id)) as {
    _id: string;
    title: string;
  }[];

  const selectables = options.filter((option) => !selected.includes(option));

  return (
    <Command className="overflow-visible bg-white">
      <div className="flex gap-1 flex-wrap border rounded-md">
        {selected.map((option) => (
          <Badge key={option._id}>
            {option.title}
            <button
              type="button"
              className="ml-1 hover:text-red-1"
              onClick={() => onRemove(option._id)}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}

        <CommandInput
          placeholder={placeholder}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
        />
      </div>

      <div className="relative mt-2">
        {open && (
          <CommandGroup className="absolute w-full z-30 top-0 overflow-auto border rounded-md shadow-md">
            {selectables.map((option) => (
              <CommandItem
                key={option._id}
                onMouseDown={(e) => e.preventDefault()}
                onSelect={() => {
                  onChange(option._id);
                  setInputValue("");
                }}
                className="hover:bg-grey-2 cursor-pointer"
              >
                {option.title}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </div>
    </Command>
  );
};

export default MultiSelect;
