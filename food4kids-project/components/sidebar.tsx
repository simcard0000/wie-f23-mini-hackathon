import React from "react";
import {
  Card,
  CardList,
  Section,
  SectionCard,
  Button,
} from "@blueprintjs/core";
import { Package } from "../types";

const defaultPackage: Package = {
  name: "Untitled",
  preset: "Custom",
  calories: 0,
  weight: 0,
  products: [],
  simpleFoods: [],
};

interface SidebarProps {
  savedPackages: Package[];
  setSavedPackages: (packages: Package[]) => void;
  selectedPackage: Package | null;
  setSelectedPackage: (selectedPackage: Package | null) => void;
}

export default function Sidebar({
  savedPackages,
  setSavedPackages,
  selectedPackage,
  setSelectedPackage,
}: SidebarProps) {
  const addPackage = () => {
    const newPackage = { ...defaultPackage };
    setSelectedPackage(newPackage);
    setSavedPackages([newPackage, ...savedPackages]);
    localStorage.setItem(
      "pkg2",
      JSON.stringify([newPackage, ...savedPackages])
    );
  };

  const renderPackage = (props: Package, index: number) => {
    const { name, preset, calories, weight } = props;
    const selected = selectedPackage === props;

    return (
      <Card
        key={index}
        interactive={true}
        elevation={selected ? 4 : 0}
        compact={true}
        className="flex flex-row ml-auto bg-slate-200"
        selected={selected}
        onClick={() => {
          if (selected) return;
          setSelectedPackage(selected ? null : props);
          setSavedPackages(savedPackages.filter((p) => p !== defaultPackage));
          localStorage.setItem(
            "pkg2",
            JSON.stringify(savedPackages.filter((p) => p.calories !== 0))
          );
        }}
      >
        <div className="flex flex-col ml-auto w-full pr-2">
          <div className="flex flex-row justify-between text-sm font-bold">
            <div>{name}</div>
            <div className="text-right">{weight} g</div>
          </div>
          <div className="flex flex-row justify-between text-xs">
            <div>{preset}</div>
            <div className="text-right">{calories} kcal</div>
          </div>
        </div>
        <Button icon="chevron-right" minimal={true} />
      </Card>
    );
  };

  return (
    <aside className="flex flex-col w-72 h-screen border-r bg-slate-300">
      <img src="/logo.png" alt="logo" className="bg-slate-300 p-5" />
      <Section
        title={<p className="text-2xl py-2">Nutrition Calculator</p>}
        subtitle="Calculate the nutrition + weight of your food selection and save your package"
        className="bg-slate-300 py-5"
      ></Section>
      <Section
        title="Packages"
        rightElement={<Button icon="plus" minimal onClick={addPackage} />}
        elevation={0}
        className="bg-slate-200"
      >
        <SectionCard padded={false}>
          <CardList>{savedPackages.map(renderPackage)}</CardList>
        </SectionCard>
      </Section>
    </aside>
  );
}
