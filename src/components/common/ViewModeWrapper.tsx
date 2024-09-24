import { ReactNode } from "react";
import { ViewMode } from "../../types/type.common";

export default function ViewModeWrapper({
  children,
  viewMode,
}: {
  children: ReactNode;
  viewMode: ViewMode;
}) {
  return <div className={viewMode}>{children}</div>;
}
