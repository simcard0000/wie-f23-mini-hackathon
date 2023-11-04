import React from "react";
import {
  Icon,
  MenuItem,
  Card,
  Elevation,
  Intent,
  CardList,
} from "@blueprintjs/core";
import { type ItemRenderer, Suggest } from "@blueprintjs/select";
import { useEffect, useState } from "react";
import { type SearchResult } from "@/types";

export default function SearchAddFood() {
  let matchTargetWidth: boolean = false;
  let minimal: boolean = true;

  const [items, setItems] = useState<SearchResult[]>([]);
  const [selectedItem, setSelectedItems] = useState<SearchResult | null>(null);
  const [currentText, setCurrentText] = useState<string>("");
  const [currentSearch, setCurrentSearch] = useState<string>("");

  useEffect(() => {
    async function getStartFood() {
      const response = await fetch("/api/search?q=" + currentSearch);
      const data = await response.json();
      let itemList = data.simpleFoods.concat(data.products);
      setItems(itemList);
    }

    getStartFood();
  }, [currentSearch]);

  const renderInputValue = (res: SearchResult) => res.name;

  const handleValueChange = (selectedRes: SearchResult) => {
    // Once a food item is selected, we need to add it to the food list below
    setSelectedItems(selectedRes);
  };

  const filterItems = (query: string, items: SearchResult[]) => {
    setCurrentSearch(query);
    return items;
  };

  const renderFoodItem = (res: SearchResult) => {
    let truncated_name = res.name;
    if (res.name.length > 50) {
      truncated_name = res.name.substring(0, 50) + "...";
    }

    return (
      <MenuItem
        text={truncated_name}
        intent={
          res.id.toString().charAt(0) != "S" ? Intent.PRIMARY : Intent.SUCCESS
        }
        icon="add"
        roleStructure="listoption"
        selected={res === selectedItem}
        key={res.id}
      />
    );
  };

  return (
    <div className="flex flex-column">
      <Card interactive={false} elevation={Elevation.ONE} className="w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setCurrentSearch(currentText);
          }}
        >
          <Suggest<SearchResult>
            resetOnQuery={false}
            resetOnClose={false}
            inputValueRenderer={renderInputValue}
            items={items}
            itemsEqual="id"
            itemRenderer={renderFoodItem}
            noResults={
              <MenuItem
                disabled={true}
                text="No results."
                roleStructure="listoption"
              />
            }
            onItemSelect={handleValueChange}
            popoverProps={{ matchTargetWidth, minimal }}
            query={currentText}
            onQueryChange={setCurrentText}
          />
        </form>
      </Card>
      <CardList>
        <Card>Basil</Card>
        <Card>Olive oil</Card>
        <Card>Kosher Salt</Card>
        <Card>Garlic</Card>
        <Card>Pine nuts</Card>
        <Card>Parmigiano Reggiano</Card>
      </CardList>
    </div>
  );
}
