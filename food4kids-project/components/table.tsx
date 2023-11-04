import React from "react";
import { HotkeysProvider } from "@blueprintjs/core";
import { Cell, Column, Table2 } from "@blueprintjs/table";
import { Package } from "@/types";
import { Stat, Stats } from "@/stats";

interface FoodTableProps {
  selectedPackage: Package;
}

const statCellRenderer = (rowIndex: number, columnIndex: number) => {
  return <Cell />;
};

export default function FoodTable({ selectedPackage }: FoodTableProps) {
  return (
    <div className="overflow-x-auto overflow-y-auto">
      <HotkeysProvider>
        <Table2 numRows={10}>
          {[
            <Column
              name="Food Name"
              key="food-name"
              cellRenderer={statCellRenderer}
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
