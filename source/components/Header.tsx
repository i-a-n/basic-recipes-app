import React from "react";

import {
  EuiPageTemplate,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSearchBar,
} from "@elastic/eui";

export const Header = ({
  setSearchQuery,
}: {
  setSearchQuery: (query: string) => void;
}) => (
  <EuiPageTemplate.Section
    grow={false}
    bottomBorder="extended"
    paddingSize="m"
    restrictWidth={false}
    style={{ backgroundColor: "black" }}
  >
    <EuiFlexGroup justifyContent="center">
      <EuiFlexItem style={{ maxWidth: "600px" }}>
        <EuiSearchBar
          onChange={(query) => {
            console.log("changed query up here", query);
            setSearchQuery(query.queryText);
          }}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  </EuiPageTemplate.Section>
);
