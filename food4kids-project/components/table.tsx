import React from "react";
import { HotkeysProvider } from "@blueprintjs/core";
import { Cell, Column, Table2 } from "@blueprintjs/table";
import { Package } from "@/types";
import { Stat, Stats } from "@/stats";

interface FoodTableProps {
  selectedPackage: Package;
}

export default function FoodTable({ selectedPackage }: FoodTableProps) {
  let mySimpleFoodStats = selectedPackage.simpleFoods.map(Stats.fromSimpleFood);
  let myProductStats = selectedPackage.products.map(Stats.fromProduct);
  let overallStats = myProductStats.concat(mySimpleFoodStats);
  let overallNames = selectedPackage.simpleFoods
    .map((element) => element.name)
    .concat(selectedPackage.products.map((element) => element.title));

  const statCellRenderer = (rowIndex: number, columnIndex: number) => {
    return (
      <Cell>
        {overallStats.at(rowIndex)?.values[Object.values(Stat)[columnIndex]]}
      </Cell>
    );
  };

  const foodNameRenderer = (rowIndex: number) => {
    return <Cell>{overallNames[rowIndex]}</Cell>;
  };

  return (
    <div className="overflow-x-auto overflow-y-auto w-full">
      <HotkeysProvider>
        <Table2 numRows={10}>
          {[
            <Column
              name="Food Name"
              key="food-name"
              cellRenderer={foodNameRenderer}
            />,
            ...Object.values(Stat).map((stat) => (
              <Column name={stat} key={stat} cellRenderer={statCellRenderer} />
            )),
          ]}
        </Table2>
      </HotkeysProvider>
    </div>
  );
}
