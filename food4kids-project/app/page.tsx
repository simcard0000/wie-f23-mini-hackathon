'use client'
import { useState, useEffect } from 'react';
import Sidebar from '@/components/sidebar'
import SearchAddFood from '@/components/search-add-food'
import EditDetails from '@/components/edit-details'
import { Package } from '@/types';

export default function Home() {
  const [savedPackages, setSavedPackages] = useState<Package[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  useEffect(() => {
    const packages = JSON.parse(localStorage.getItem('packages') ?? '[]');
    console.log(packages);
    setSelectedPackage(packages ? packages[0] : null);
    setSavedPackages(packages);
  }, []);

  const editSelectedPackage = (newPackage: Package) => {
    if (!selectedPackage) return;
    const newPackages = savedPackages.map(p => p === selectedPackage ? newPackage : p);
    setSavedPackages(newPackages);
    setSelectedPackage(newPackage);
    localStorage.setItem('packages', JSON.stringify(newPackages));
  }

  return (
    <>
    <div className='flex flex-row w-full h-full'>
      <Sidebar {...{ savedPackages, setSavedPackages, selectedPackage, setSelectedPackage }} />
      <div className='flex flex-col w-full bg-slate-200'>
        <SearchAddFood />
        <EditDetails {...{ selectedPackage, editSelectedPackage }} />
      </div>
    </div>
    </>
  )
}
