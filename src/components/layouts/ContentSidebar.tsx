"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  BookOpen, 
  FolderOpen,
  FileVideo,
  Package,
  FileText,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const contentNavItems = [
  {
    title: "Dashboard",
    href: "/content",
    icon: LayoutDashboard,
  },
  {
    title: "Courses",
    href: "/content/courses",
    icon: BookOpen,
  },
  {
    title: "Media Library",
    href: "/content/media",
    icon: FolderOpen,
  },
  {
    title: "Lessons",
    href: "/content/lessons",
    icon: FileVideo,
  },
  {
    title: "Products",
    href: "/content/products",
    icon: Package,
  },
  {
    title: "Assignments",
    href: "/content/assignments",
    icon: FileText,
  },
];

export function ContentSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();
    if (error?.code) {
      toast.error(error.code);
    } else {
      localStorage.removeItem("bearer_token");
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 py-6">
        <div className="px-3 mb-4">
          <h2 className="text-lg font-semibold text-primary">Content Panel</h2>
          <p className="text-sm text-muted-foreground">Create & Manage</p>
        </div>
        <nav className="space-y-1 px-2">
          {contentNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
