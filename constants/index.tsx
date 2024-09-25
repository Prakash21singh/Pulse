import {
  IconHome,
  IconLayoutDashboard,
  IconHourglassEmpty,
  IconBrandGoogleAnalytics,
  IconStopwatch,
} from "@tabler/icons-react";
import { PlusIcon } from "lucide-react";
export const links = [
  {
    title: "Home",
    icon: (
      <IconHome className="h-full w-full text-black-1 dark:text-neutral-300" />
    ),
    href: "/",
  },

  {
    title: "Create Session",
    icon: (
      <PlusIcon className="h-full w-full text-black-1 dark:text-neutral-300" />
    ),
    href: "/create-session",
  },
  {
    title: "Focus Session",
    icon: (
      <IconHourglassEmpty className="h-full w-full text-black-1 dark:text-neutral-300" />
    ),
    href: "/session",
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
