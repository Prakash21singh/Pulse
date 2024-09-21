import {
  IconHome,
  IconLayoutDashboard,
  IconHourglassEmpty,
  IconBrandGoogleAnalytics,
  IconStopwatch,
} from "@tabler/icons-react";
export const links = [
  {
    title: "Home",
    icon: (
      <IconHome className="h-full w-full text-black-1 dark:text-neutral-300" />
    ),
    href: "/",
  },

  {
    title: "Dashboard",
    icon: (
      <IconLayoutDashboard className="h-full w-full text-black-1 dark:text-neutral-300" />
    ),
    href: "/dashboard",
  },
  {
    title: "Focus Session",
    icon: (
      <IconHourglassEmpty className="h-full w-full text-black-1 dark:text-neutral-300" />
    ),
    href: "/focus",
  },
  {
    title: "Timer",
    icon: (
      <IconStopwatch className="h-full w-full text-black-1 dark:text-neutral-300" />
    ),
    href: "/timer",
  },
  {
    title: "Tracker",
    icon: (
      <IconBrandGoogleAnalytics className="h-full w-full text-black-1 dark:text-neutral-300" />
    ),
    href: "/track",
  },
];
