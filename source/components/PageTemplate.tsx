import React from "react";
import { EuiProvider, EuiPageTemplate } from "@elastic/eui";

export const PageTemplate = ({
  children,
}: {
  children: React.ReactElement;
}) => (
  <EuiProvider colorMode="light">
    <EuiPageTemplate>{children}</EuiPageTemplate>
  </EuiProvider>
);
