import React from 'react';
import { Icon, InputGroup } from "@blueprintjs/core";

export default function SearchAddFood() {
  return (
    <>
      <div className="w-full">
        <InputGroup
            //disabled={disabled}
            //large={large}
            placeholder="Search..."
            //readOnly={readOnly}
            //small={small}
            type="search"
            leftIcon="search"
        />
      </div>
    </>
  )
}
