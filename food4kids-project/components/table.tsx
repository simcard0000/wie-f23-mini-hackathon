import React from "react";
import { HotkeysProvider } from "@blueprintjs/core";
import { Cell, Column, Table2 } from "@blueprintjs/table";
import { Package, SearchResult } from "@/types";

interface FoodTableProps {
  selectedPackageFood: SearchResult[];
}

const dollarCellRenderer = (rowIndex: number) => (
  <Cell>{`$${(rowIndex * 10).toFixed(2)}`}</Cell>
);
const euroCellRenderer = (rowIndex: number) => (
  <Cell>{`€${(rowIndex * 10 * 0.85).toFixed(2)}`}</Cell>
);

export default function FoodTable({ selectedPackageFood }: FoodTableProps) {
  return (
    <HotkeysProvider>
      <Table2 numRows={10}>
        <Column name="Dollars" cellRenderer={dollarCellRenderer} />
        <Column name="Euros" cellRenderer={euroCellRenderer} />
      </Table2>
    </HotkeysProvider>
  );
}
