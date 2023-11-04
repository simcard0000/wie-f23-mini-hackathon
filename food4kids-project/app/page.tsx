"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import SearchAddFood from "@/components/search-add-food";
import EditDetails from "@/components/edit-details";
import { Package, ProductInfo, SearchResult, SimpleFoodInfo } from "@/types";
import FoodTable from "@/components/table";

export default function Home() {
  const [savedPackages, setSavedPackages] = useState<Package[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  useEffect(() => {
    const packages = JSON.parse(localStorage.getItem("pkg2") ?? "[]");
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
    localStorage.setItem("pkg2", JSON.stringify(newPackages));
    setSelectedPackage(newPackage);
  };

  const addItemToPackage = async ({ id }: SearchResult) => {
    console.log("additemtopackage", { selectedPackage, id });
    if (!selectedPackage) return;

    let newPackage: Package;
    if (id.startsWith("S")) {
      const data = (await (
        await fetch("/api/simple?id=" + id)
      ).json()) as SimpleFoodInfo;
      newPackage = {
        ...selectedPackage,
        simpleFoods: [...selectedPackage.simpleFoods, data],
      };
    } else {
      const data = (await (
        await fetch("/api/product?id=" + id)
      ).json()) as ProductInfo;
      newPackage = {
        ...selectedPackage,
        products: [...selectedPackage.products, data],
      };
    }

    editSelectedPackage(newPackage);
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
        <div className="flex flex-col flex-1 min-w-0 bg-slate-200">
          <SearchAddFood {...{ addItemToPackage }} />
          {selectedPackage && (
            <EditDetails {...{ selectedPackage, editSelectedPackage }} />
          )}
          {selectedPackage && <FoodTable {...{ selectedPackage }} />}
        </div>
      </div>
    </>
  );
}
