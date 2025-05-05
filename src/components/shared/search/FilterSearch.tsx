import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const FilterSearch = () => {
  const handleChange = (value: string) => {
    console.log(value);
  };

  return (
    <div className="flex w-full flex-col gap-1 rounded-md bg-indigo-50 p-2 dark:bg-primary-foreground">
      <p className="font-semibold text-gray-500 dark:text-gray-400">Filter</p>
      <RadioGroup onValueChange={handleChange}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="newest"
            id="newest"
            className="h-3 w-3 appearance-none rounded-none border-[1.5px] border-indigo-600 data-[state=checked]:bg-indigo-500"
          />
          <Label htmlFor="newest">Newest</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="most-popular"
            id="most-popular"
            className="h-3 w-3 rounded-none border-[1.5px] border-indigo-600 data-[state=checked]:bg-indigo-500"
          />
          <Label htmlFor="most-popular">Most Popular</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="trending"
            id="trending"
            className="h-3 w-3 rounded-none border-[1.5px] border-indigo-600 data-[state=checked]:bg-indigo-500"
          />
          <Label htmlFor="trending">Trending</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="oldest"
            id="oldest"
            className="h-3 w-3 rounded-none border-[1.5px] border-indigo-600 data-[state=checked]:bg-indigo-500"
          />
          <Label htmlFor="oldest">Oldest</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default FilterSearch;
