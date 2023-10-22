import React from "react";

import {
  EuiPageTemplate,
  EuiHeader,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiSelectableTemplateSitewide,
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
    paddingSize="none"
    restrictWidth={false}
  >
    <EuiHeader theme="dark">
      <EuiFlexGroup justifyContent="center">
        <EuiFlexItem style={{ maxWidth: "600px" }}>
          <EuiSpacer size="xs" />
          <EuiSearchBar
            onChange={(query) => {
              console.log("changed query up here", query);
              setSearchQuery(query.queryText);
            }}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiHeader>
  </EuiPageTemplate.Section>
);
