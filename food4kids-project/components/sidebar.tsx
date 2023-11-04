import React, { useEffect, useState } from 'react'
import { Card, CardList, Section, SectionCard, Button, Icon } from "@blueprintjs/core";


type Package = {
    name: string;
    preset: string;
    calories: number;
    weight: number;
    selected?: boolean;
}

const savedMeals = useState([]);

function setSelection(props: Package) {
    props.selected = !props.selected;
}

function Item(props: Package) {
    const { name, preset, calories, weight, selected } = props;

    return (
        <Card 
            interactive={true} 
            elevation={selected ? 4 : 0} 
            compact={true}
            className="flex flex-row ml-auto" 
            selected={selected}
            onClick={() => setSelection(props)}
        >
            <div className="flex flex-col ml-auto w-full pr-5">
                <div className="flex flex-row justify-between text-sm font-bold">
                    <div>{name}</div>
                    <div className="text-right">{weight} g</div>
                </div>
                <div className="flex flex-row justify-between text-xs">
                    <div>{preset}</div>
                    <div className="text-right">{calories} kcal</div>
                </div>
            </div>
            <Button icon="chevron-right" minimal={true} disabled={true} />
        </Card>
    )
}

export default function Sidebar() {
    return (
        <aside className="flex flex-col w-72 h-screen bg-white border-r">
            <Section 
                title="Food4Kids Nutrition Calculator"
                subtitle="Calculate the nutrition + weight of your food selection and save your package"
                className="py-5"
            >
            </Section>
            <Section 
                title="Packages"
                rightElement={<Button icon="plus" minimal />}
                elevation={0}
            >
                <SectionCard padded={false} >
                    <CardList>
                        {savedMeals.map((item) => (
                            <Item {...item} />
                        ))}
                    </CardList>
                </SectionCard>
            </Section>
        </aside>
    )
}
