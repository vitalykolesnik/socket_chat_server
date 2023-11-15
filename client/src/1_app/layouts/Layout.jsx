import { Outlet } from "react-router-dom";
import { LeftPanel } from "2_pages/leftPanel/LeftPanel";
import { RightPanel } from "2_pages/rightPanel/RightPanel";
import { Header } from "3_widgets/header/Header";
import { TemplateLayout } from "1_app/layouts/TemplateLayout";

export const Layout = () => {
  return (
    <TemplateLayout
      headerSlot={Header}
      leftSlot={LeftPanel}
      rightSlot={RightPanel}
    >
      <Outlet />
    </TemplateLayout>
  );
};
