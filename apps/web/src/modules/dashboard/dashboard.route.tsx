import { SidebarInset, SidebarProvider } from "@repo/mtt-ui/sidebar";
import { createRoute } from "@tanstack/react-router";

import { Header } from "../../shared/components/header";
import { AppSidebar } from "../../shared/components/app-sidebar";
import { SectionCards } from "../../shared/components/section-cards";

import type { RootRoute } from "@tanstack/react-router";

const Dashboard: React.FunctionComponent = () => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <Header />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                {/* <ChartAreaInteractive /> */}
                Foo
              </div>
              {/* <DataTable data={data} /> */}
              Bar
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default (parentRoute: RootRoute) =>
  createRoute({
    path: "/dashboard",
    component: Dashboard,
    getParentRoute: () => parentRoute,
  });
