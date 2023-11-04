import React from "react";
import {
  MenuItem,
  Card,
  Elevation,
  Intent,
  InputGroup,
  Button,
} from "@blueprintjs/core";
import { Suggest } from "@blueprintjs/select";
import { useEffect, useState } from "react";
import { type SearchResult } from "@/types";

interface SearchAddProps {
  addItemToPackage: (newItem: SearchResult) => void;
}

export default function SearchAddFood({ addItemToPackage }: SearchAddProps) {
  const [items, setItems] = useState<SearchResult[]>([]);
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

  const add = (selectedRes: SearchResult) => {
    console.log("HANDLE VALUE CHANGE!!");
    console.log("adding", selectedRes);
    addItemToPackage(selectedRes);
  };

  const FoodItem = ({ res }: { res: SearchResult }) => {
    let truncated_name = res.name;
    if (res.name.length > 50) {
      truncated_name = res.name.substring(0, 50) + "...";
    }
    return (
      <Button
        text={truncated_name}
        intent={res.id.startsWith("S") ? Intent.PRIMARY : Intent.SUCCESS}
        icon="add"
        onClick={() => add(res)}
      />
    );
  };

  return (
    <div className="flex flex-col">
      <Card interactive={false} elevation={Elevation.ONE} className="w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setCurrentSearch(currentText);
          }}
        >
          <InputGroup
            id="search"
            value={currentText}
            onValueChange={setCurrentText}
            leftIcon="search"
            placeholder="Search for food items..."
            type="search"
          />
        </form>
        <div className="flex flex-row gap-x-4 gap-y-3 flex-wrap mt-4">
          {items.map((sr) => (
            <FoodItem key={sr.id} res={sr} />
          ))}
        </div>
      </Card>
    </div>
  );
}
