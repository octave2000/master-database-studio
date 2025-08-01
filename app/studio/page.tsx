"use client";
import { DatabaseZap, Moon, PanelLeft, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";
import { useSearchParams } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ConnectForm } from "@/modules/connection/ConnectForm";
import { ConnectionList } from "@/modules/connection/ConnectionList";
import { ExplorerSidebar } from "@/modules/data-viewer/ExplorerSidebar";
import { TableViewer } from "@/modules/data-viewer/TableViewer";
import { QueryEditor } from "@/modules/master-console/QueryEditor";

export default function StudioPage() {
  const { setTheme, theme } = useTheme();
  const searchParams = useSearchParams();

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40 dark:bg-muted/20">
        {/* --- Desktop Sidebar --- */}
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-[260px] flex-col border-r bg-background sm:flex">
          <div className="flex h-[60px] items-center border-b px-6">
            <a className="flex items-center gap-2 font-semibold" href="#">
              <DatabaseZap className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold tracking-tighter bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                MasterDB
              </span>
            </a>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <ExplorerSidebar />
          </div>
        </aside>

        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-[260px]">
          {/* --- Header --- */}
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            {/* Mobile Navigation */}
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                  <a
                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                    href="#"
                  >
                    <DatabaseZap className="h-5 w-5 transition-all group-hover:scale-110" />
                    <span className="sr-only">MasterDB</span>
                  </a>
                  <ExplorerSidebar />
                </nav>
              </SheetContent>
            </Sheet>

            {/* Breadcrumbs for context */}
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <a href="#">Studio</a>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>My Local Connection</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="relative ml-auto flex-1 md:grow-0"></div>

            {/* Theme Toggle Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle Theme</p>
              </TooltipContent>
            </Tooltip>
          </header>

          {/* --- Main Content --- */}
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <TableViewer />
          </main>

          {/* --- Footer --- */}
          <footer className="text-center p-4 text-sm text-muted-foreground">
            © {new Date().getFullYear()} MasterDB. All rights reserved.
          </footer>
        </div>
      </div>
    </TooltipProvider>
  );
}
