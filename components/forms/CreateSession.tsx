import * as React from "react";
import { IconChevronDown, IconChevronUp, IconPlus } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function CreateSession() {
  const [goal, setGoal] = React.useState(30);

  function onClick(adjustment: number) {
    setGoal(Math.max(20, Math.min(400, goal + adjustment)));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Create the session on submission
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <span className="w-44 h-44 rounded-lg m-3 hover:bg-white-3/70 bg-white-3/40 transition-all flex-center">
          <IconPlus className="text-3xl" size={40} />
        </span>
      </DrawerTrigger>
      <DrawerContent>
        <form onSubmit={handleSubmit} className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-white-3">Create Session</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2 bg-black-3/20 rounded-md">
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter text-white-3">
                  {goal}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  Minutes
                </div>
              </div>
              <div className="flex h-full flex-col items-center justify-center border-l border-white-3/20 ">
                <IconChevronUp
                  className="w-14 h-14 hover:bg-black-3/50 text-white-3 rounded-tr-md"
                  onClick={() => onClick(10)}
                />
                <IconChevronDown
                  className="w-14 h-14 hover:bg-black-3/50 text-white-3 rounded-br-md"
                  onClick={() => onClick(-10)}
                />
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button
              type="submit"
              className="hover:bg-yellow-1/80  bg-yellow-1 text-black-3">
              Create
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
