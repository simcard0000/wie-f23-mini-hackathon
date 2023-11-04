"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import SearchAddFood from "@/components/search-add-food";
import EditDetails from "@/components/edit-details";
import { Package, SearchResult } from "@/types";
import FoodTable from "@/components/table";

export default function Home() {
  const [savedPackages, setSavedPackages] = useState<Package[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [selectedPackageFood, setSelectedPackageFood] = useState<
    SearchResult[]
  >([]);

  useEffect(() => {
    const packages = JSON.parse(localStorage.getItem("packages") ?? "[]");
    console.log(packages);
    setSelectedPackage(packages ? packages[0] : null);
    setSavedPackages(packages);
  }, []);

  const editSelectedPackage = (newPackage: Package) => {
    if (!selectedPackage) return;
    const newPackages = savedPackages.map((p) =>
      p === selectedPackage ? newPackage : p
    );
    setSavedPackages(newPackages);
    setSelectedPackage(newPackage);
    localStorage.setItem("packages", JSON.stringify(newPackages));
  };

  const addItemToPackage = (newItem: SearchResult) => {
    if (!selectedPackage) return;
    let newFoodList = selectedPackage.food;
    newFoodList.push(newItem);
    setSelectedPackageFood(newFoodList);
    selectedPackage.food = newFoodList;
    editSelectedPackage(selectedPackage);
  };

  return (
    <>
      <div className="flex flex-row w-full h-full">
        <Sidebar
          {...{
            savedPackages,
            setSavedPackages,
            selectedPackage,
            setSelectedPackage,
          }}
        />
        <div className="flex flex-col w-full bg-slate-200">
          <SearchAddFood {...{ addItemToPackage }} />
          <EditDetails {...{ selectedPackage, editSelectedPackage }} />
          <FoodTable {...{ selectedPackageFood }} />
        </div>
      </div>
    </>
  );
}
