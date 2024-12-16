import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from 'lucide-react';

interface TagInputProps {
  tags: string[];
  updateTags: (tags: string[]) => void;
}

export function TagInput({ tags, updateTags }: TagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      addTags(inputValue);
    } else if (e.key === 'Backspace' && !inputValue) {
      removeTag(tags.length - 1);
    }
  };

  const addTags = (input: string) => {
    const newTags = input.split(' ')
      .map(tag => tag.trim())
      .filter(tag => tag !== '')
      .map(tag => tag.startsWith('#') ? tag.slice(1) : tag);
    
    const updatedTags = [...tags, ...newTags];
    updateTags(updatedTags);
    setInputValue('');
  };

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    updateTags(newTags);
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2 p-2 border rounded-md">
        {tags.map((tag, index) => (
          <Badge key={index} variant="secondary" className="flex items-center gap-1">
            <span className="text-blue-500 text-sm font-bold p-0.5">#</span>
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="ml-1 text-gray-500 hover:text-gray-700"
              aria-label={`Remove tag ${tag}`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className="flex-grow border-none shadow-none"
          placeholder="Type tags and press Enter"
          aria-label="Enter tags"
        />
      </div>
    </div>
  );
}
