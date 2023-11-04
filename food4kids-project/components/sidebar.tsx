import React, { useEffect, useState } from 'react';
import { Card, CardList, Section, SectionCard, Button } from '@blueprintjs/core';
import { Package } from '../types';

const defaultPackage: Package = {
  name: 'Untitled',
  preset: 'Custom',
  calories: 0,
  weight: 0,
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
    localStorage.setItem('packages', JSON.stringify([newPackage, ...savedPackages]));
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
        className='flex flex-row ml-auto'
        selected={selected}
        onClick={() => {
          if (selected) return;
          setSelectedPackage(selected ? null : props);
          setSavedPackages(savedPackages.filter(p => p !== defaultPackage));
          localStorage.setItem('packages', JSON.stringify(savedPackages.filter(p => p.calories !== 0)));
        }}
      >
        <div className='flex flex-col ml-auto w-full pr-2'>
          <div className='flex flex-row justify-between text-sm font-bold'>
            <div>{name}</div>
            <div className='text-right'>{weight} g</div>
          </div>
          <div className='flex flex-row justify-between text-xs'>
            <div>{preset}</div>
            <div className='text-right'>{calories} kcal</div>
          </div>
        </div>
        <Button icon='chevron-right' minimal={true} disabled={true} />
      </Card>
    );
  };

  return (
    <aside className='flex flex-col w-72 h-screen bg-white border-r'>
      <Section
        title='Food4Kids Nutrition Calculator'
        subtitle='Calculate the nutrition + weight of your food selection and save your package'
        className='py-5'
      ></Section>
      <Section title='Packages' rightElement={<Button icon='plus' minimal onClick={addPackage} />} elevation={0}>
        <SectionCard padded={false}>
          <CardList>{savedPackages.map(renderPackage)}</CardList>
        </SectionCard>
      </Section>
    </aside>
  );
}
