import { Card, CardList, Section, SectionCard, Button } from "@blueprintjs/core";

type Package = {
    name: string;
    preset: string;
    calories: number;
    weight: number;
    selected?: boolean;
}

function Item(props: Package) {
    const { name, preset, calories, weight, selected } = props;

    return (
        <Card interactive={true} elevation={selected ? 4 : 1} compact className="flex flex-row ml-auto" selected={selected}>
            <div className="flex flex-col ml-auto w-full">
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
    const savedMeals: Package[] = [];
    savedMeals.push({name: "Monday", preset: "Young Teens", calories: 100, weight: 100});

    return (
        <aside className="flex flex-col w-64 h-screen bg-white border-r">
            <Section title={<h2 className="py-5">Food4Kids Nutrition Calculator</h2>} subtitle="Calculate the nutrition + weight of your food selection and save your package" className="h-full">
                <SectionCard padded={false}>
                    <CardList title="Meals">
                        {savedMeals.map((item) => (
                            <Item {...item} />
                        ))}
                    </CardList>
                </SectionCard>
            </Section>
        </aside>
    )
}
