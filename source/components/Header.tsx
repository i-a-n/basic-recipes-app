import React from "react";

import {
  EuiPageTemplate,
  EuiHeader,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiSelectableTemplateSitewide,
} from "@elastic/eui";

export const Header = () => (
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
          <EuiSelectableTemplateSitewide options={[]} />
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiHeader>
  </EuiPageTemplate.Section>
);
