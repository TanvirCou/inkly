import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type FilterSearchProps = {
  onFilterChange: (value: string) => void;
};

const FilterSearch = ({ onFilterChange }: FilterSearchProps) => {
  const handleChange = (value: string) => {
    onFilterChange(value);
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-indigo-100/50 bg-gradient-to-br from-white via-indigo-50/50 to-purple-50/50 px-4 py-2 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md dark:border-gray-800/50 dark:from-gray-900/80 dark:via-indigo-950/50 dark:to-purple-950/50">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5"></div>
      <p className="relative mb-2 bg-gradient-to-r from-gray-800 to-indigo-600 bg-clip-text font-semibold text-transparent dark:from-white dark:to-indigo-400">
        Filter Posts
      </p>
      <RadioGroup onValueChange={handleChange} className="relative space-y-1">
        {[
          { value: 'newest', label: 'Newest' },
          { value: 'popular', label: 'Most Popular' },
          { value: 'trending', label: 'Trending' },
          { value: 'oldest', label: 'Oldest' },
        ].map((option) => (
          <div key={option.value} className="group flex items-center space-x-3">
            <RadioGroupItem
              value={option.value}
              id={option.value}
              className="relative h-4 w-4 rounded-full border-2 border-indigo-200 transition-all duration-300 before:absolute before:inset-[2px] before:scale-0 before:rounded-full before:bg-gradient-to-r before:from-indigo-600 before:to-purple-600 before:transition-transform before:duration-300 data-[state=checked]:border-indigo-600 data-[state=checked]:before:scale-100 dark:border-gray-600 dark:before:from-indigo-400 dark:before:to-purple-400 dark:data-[state=checked]:border-indigo-400"
            />
            <Label
              htmlFor={option.value}
              className="cursor-pointer text-sm text-gray-600 transition-colors duration-300 group-hover:text-indigo-600 dark:text-gray-300 dark:group-hover:text-indigo-400"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterSearch;
