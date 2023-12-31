import React, { useEffect, useState } from "react";
import {
  FormGroup,
  InputGroup,
  Card,
  Elevation,
  Popover,
  Menu,
  Button,
  MenuItem,
  Icon,
} from "@blueprintjs/core";
import { Package } from "../types";
import { optimizeQuantities } from "@/calculator";

interface EditDetailsProps {
  selectedPackage: Package;
  editSelectedPackage: (newPackage: Package) => void;
}

export default function EditDetails({
  selectedPackage,
  editSelectedPackage,
}: EditDetailsProps) {
  let { name, preset } = selectedPackage;
  const [savedName, setSavedName] = useState<string>(name);
  const [savedPreset, setSavedPreset] = useState<string>(preset);

  useEffect(() => {
    if (selectedPackage == null) return;
    setSavedName(name);
    setSavedPreset(preset);
  }, [selectedPackage, name, preset]);

  const renderPresetItem = (text: string) => {
    return (
      <MenuItem
        text={text}
        roleStructure="listoption"
        key={text}
        selected={text === preset}
        onClick={() => {
          setSavedPreset(text);
          editSelectedPackage({ ...selectedPackage, preset: text });
        }}
      />
    );
  };

  return (
    <>
      <Card interactive={false} elevation={Elevation.ONE}>
        <FormGroup inline label="Title" labelFor="title-input">
          <InputGroup
            id="title-input"
            value={savedName}
            onValueChange={(value: string) => setSavedName(value)}
            rightElement={
              <Button
                text="Save"
                disabled={savedName === name}
                onClick={() => {
                  editSelectedPackage({ ...selectedPackage, name: savedName });
                }}
              />
            }
          />
        </FormGroup>
        <FormGroup inline label="Preset" labelFor="title-input">
          <Popover
            content={
              <Menu>
                {[
                  "Young Teen (11-14)",
                  "Child (7-10)",
                  "Young Child (3-6)",
                ].map((text) => renderPresetItem(text))}
              </Menu>
            }
            placement="bottom"
          >
            <Button
              alignText="left"
              rightIcon="caret-down"
              text={savedPreset}
            />
          </Popover>

          <Button
            className="ml-4"
            icon="calculator"
            text="Optimize Quantities"
            onClick={() =>
              editSelectedPackage(optimizeQuantities(selectedPackage))
            }
          />
        </FormGroup>
      </Card>
    </>
  );
}
