
import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  BookOpen,
  Calendar,
  GraduationCap,
  Menu,
  Users,
  X,
  Info,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type SidebarProps = {
  className?: string;
};

type NavItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Students",
    href: "/students",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Courses",
    href: "/courses",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "Attendance",
    href: "/attendance",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    title: "Grades",
    href: "/grades",
    icon: <GraduationCap className="h-5 w-5" />,
  },
];

export function Sidebar({ className }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location.pathname, isMobile]);

  // Set sidebar to open by default on desktop
  useEffect(() => {
    if (!isMobile) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarWidth = isOpen ? "w-64" : "w-0 md:w-16";
  const contentPadding = isOpen ? "px-4" : "px-2";
  const iconOnlyVisible = !isOpen ? "md:flex" : "md:hidden";
  const textVisible = isOpen ? "opacity-100" : "opacity-0 md:hidden";
  
  const sidebarClass = cn(
    "bg-sidebar text-sidebar-foreground fixed h-full z-40 transition-all duration-300 ease-in-out",
    sidebarWidth,
    isMobile && !isOpen ? "-translate-x-full md:translate-x-0" : "translate-x-0",
    isMobile ? "shadow-xl" : "",
    className
  );

  const overlay = isOpen && isMobile && (
    <div
      className="fixed inset-0 bg-black/50 z-30"
      onClick={toggleSidebar}
    ></div>
  );
  
  return (
    <>
      {overlay}
      <div className={sidebarClass}>
        <div className={`flex items-center justify-between py-4 ${contentPadding}`}>
          <div className="flex items-center space-x-2 overflow-hidden">
            <GraduationCap className="h-8 w-8 text-primary shrink-0" />
            <h1 className={`text-xl font-bold transition-opacity duration-300 ${textVisible}`}>
              StudentHive
            </h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-sidebar-foreground md:flex"
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isOpen ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
        <Separator className="bg-sidebar-border" />
        <nav className={`flex-1 ${contentPadding} py-4 space-y-1 overflow-y-auto scrollbar-hide`}>
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center py-2 px-3 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "hover:bg-sidebar-accent/50 text-sidebar-foreground",
                  !isOpen && "md:justify-center"
                )
              }
            >
              <div className="flex items-center">
                <span className="shrink-0">{item.icon}</span>
                <span className={`ml-3 transition-opacity duration-300 ${textVisible} whitespace-nowrap`}>
                  {item.title}
                </span>
              </div>
            </NavLink>
          ))}
        </nav>
        <div className={`${contentPadding} py-2`}>
          <Separator className="bg-sidebar-border mb-4" />
          <div 
            className={`flex items-center cursor-pointer hover:bg-sidebar-accent/50 p-2 rounded-md ${!isOpen && "md:justify-center"}`}
            onClick={() => setIsAdminDialogOpen(true)}
          >
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-medium shrink-0">
              A
            </div>
            <div className={`ml-3 transition-opacity duration-300 ${textVisible}`}>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-sidebar-foreground/60">Administrator</p>
            </div>
          </div>
        </div>
      </div>
      
      {isMobile && !isOpen && (
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-20 bg-background/80 backdrop-blur-sm shadow-md"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      <Dialog open={isAdminDialogOpen} onOpenChange={setIsAdminDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Administrator Profile</DialogTitle>
            <DialogDescription>
              System administrator details and permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col sm:flex-row items-center gap-4 py-4">
            <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-medium">
              A
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-medium">Admin User</h3>
              <p className="text-sm text-muted-foreground">admin@studenthive.edu</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-1 flex items-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                About
              </h4>
              <p className="text-sm text-muted-foreground">
                System administrator with full access to all features and settings of the StudentHive management system.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Permissions</h4>
              <ul className="text-sm space-y-1 grid grid-cols-1 sm:grid-cols-2">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  User Management
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  Course Management
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  Grade Administration
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  System Configuration
                </li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
