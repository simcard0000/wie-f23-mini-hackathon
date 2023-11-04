import React from 'react';
import { Icon, MenuItem, Card, Elevation } from "@blueprintjs/core";
import { type ItemRenderer, Suggest } from "@blueprintjs/select";
import { FC, useContext, useEffect, useState } from 'react';

import { type SearchResult } from '@/types';

export default function SearchAddFood() {

  let matchTargetWidth: boolean = false;
  let minimal: boolean = true;
  let start_items: SearchResult[] = [{
    food_name: "Test Food",
    image: null,
    serving_unit: "1 gram",
    nix_brand_id: "Walmart",
    brand_name_item_name: "Walmart's Test Food",
    serving_qty: 5,
    nf_calories: 100,
    brand_name: "Walmart-0",
    brand_type: 1,
    nix_item_id: "999"
  },
  {
    food_name: "Lettuce",
    image: null,
    serving_unit: "2 grams",
    nix_brand_id: "Walmart",
    brand_name_item_name: "Walmart's Test Food",
    serving_qty: 10,
    nf_calories: 2,
    brand_name: "Walmart-0",
    brand_type: 1,
    nix_item_id: "1000"
  }]// get all food items (or top 100) - if item not in top 100, query and add to list
  const [items, setItems] = useState<SearchResult[]>(start_items);
  const [selectedItem, setSelectedItems] = useState<SearchResult | null>();

  const renderInputValue = (res: SearchResult) => res.food_name;

  const handleValueChange = (selectedRes: SearchResult) => {
    // Once a food item is selected, we need to add it to the food list below
    setSelectedItems(selectedRes);
  };

  const filterItems = (query: string, items: SearchResult[]) => {
    let new_items = items;
    return new_items;
  }

  const renderFoodItem = (res: SearchResult) => {
    return (
        <MenuItem
            text={res.food_name}
            icon="add"
            roleStructure="listoption"
            selected={res === selectedItem}
            key={res.nix_item_id}
        />
    );
};

  return (
    <>
    <Card interactive={false} elevation={Elevation.ONE}>
      <Suggest<SearchResult>
        inputValueRenderer={renderInputValue}
        items={items}
        itemsEqual="nix_item_id"
        itemListPredicate={filterItems}
        itemRenderer={renderFoodItem}
        noResults={<MenuItem disabled={true} text="No results." roleStructure="listoption" />}
        onItemSelect={handleValueChange}
        popoverProps={{ matchTargetWidth, minimal }}
      />
    </Card>
    </>
  )
}
