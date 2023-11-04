import React from "react";
import { HotkeysProvider } from "@blueprintjs/core";
import { Cell, Column, Table2 } from "@blueprintjs/table";
import { Package } from "@/types";
import { Stat, Stats } from "@/stats";
import { calculateTotalStats } from "@/calculator";

interface FoodTableProps {
  selectedPackage: Package;
}

export default function FoodTable({ selectedPackage }: FoodTableProps) {
  const [overallStats, setOverallStats] = React.useState<Stats[]>([]);
  const [overallNames, setOverallNames] = React.useState<string[]>([]);
  const [overallQuantities, setOverallQuantities] = React.useState<number[]>(
    []
  );
  const [totalStat, settotalStat] = React.useState<Stats>(new Stats());
  const [rec, setRec] = React.useState(0);

  React.useEffect(() => {
    console.log("recomputing");
    const mySimpleFoodStats = selectedPackage.simpleFoods.map(
      Stats.fromSimpleFood
    );
    const myProductStats = selectedPackage.products.map(Stats.fromProduct);
    setOverallStats(myProductStats.concat(mySimpleFoodStats));
    setOverallNames(
      selectedPackage.simpleFoods
        .map((element) => element.name)
        .concat(selectedPackage.products.map((element) => element.title))
    );
    setOverallQuantities(
      selectedPackage.simpleFoods
        .map((element) => element.quantity)
        .concat(selectedPackage.products.map((element) => element.quantity))
    );
    settotalStat(calculateTotalStats(selectedPackage));
    setRec((r) => r + 1);
  }, [selectedPackage]);

  const statCellRenderer = (rowIndex: number, columnIndex: number) => {
    const stat = Object.values(Stat)[columnIndex - 2];
    const x =
      Math.round(
        (rowIndex === overallNames.length ? totalStat : overallStats[rowIndex])
          .values[stat] * 10
      ) / 10;
    return (
      <Cell>
        {x ? x + (stat === Stat.Price || stat === Stat.Weight ? "" : "%") : ""}
      </Cell>
    );
  };

  const foodNameRenderer = (rowIndex: number) => {
    if (rowIndex === overallNames.length) return <Cell>Total</Cell>;
    return <Cell>{overallNames[rowIndex]}</Cell>;
  };

  const quantityRenderer = (rowIndex: number) => {
    if (rowIndex === overallNames.length) return <Cell></Cell>;
    return <Cell>{overallQuantities[rowIndex]}</Cell>;
  };

  return (
    <div className="overflow-x-auto overflow-y-auto w-full">
      <HotkeysProvider>
        <Table2 numRows={overallNames.length + 1} key={rec}>
          {[
            <Column
              name="Food Name"
              key="food-name"
              cellRenderer={foodNameRenderer}
            />,
            <Column
              name="Quantity"
              key="qty"
              cellRenderer={quantityRenderer}
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
