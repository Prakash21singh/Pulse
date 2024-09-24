import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useUser } from "@clerk/nextjs"; // Clerk user hook
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
import { Input } from "@/components/ui/input"; // shadcn input
import { Label } from "@/components/ui/label"; // shadcn label
import { Button } from "@/components/ui/button"; // shadcn button
import { useToast } from "@/hooks/use-toast";
import { IconChevronDown, IconChevronUp, IconPlus } from "@tabler/icons-react";

// Validation schema using zod
const createSessionSchema = z.object({
  label: z.string().min(1, "Session topic is required"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  goal: z
    .number()
    .min(20, "Minimum goal is 20")
    .max(400, "Maximum goal is 400"),
});

export function CreateSession() {
  const [goal, setGoal] = React.useState(30);
  const { toast } = useToast();
  const { user } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createSessionSchema),
    defaultValues: {
      label: "",
      description: "",
      goal: 30,
    },
  });

  function onClick(adjustment: number) {
    setGoal(Math.max(20, Math.min(400, goal + adjustment)));
  }

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post("/api/focus", {
        ...data,
        userId: user?.id,
      });

      if (response.statusText !== "OK")
        throw new Error("Error creating session");

      toast({
        title: "Success",
        description: "Session created successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create session.",
        variant: "destructive",
      });
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <span className="w-44 h-44 rounded-lg m-3 hover:bg-white-3/70 bg-white-3/40 transition-all flex-center">
          <IconPlus className="text-3xl" size={40} />
        </span>
      </DrawerTrigger>
      <DrawerContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-white-3">Create Session</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>

          {/* Label Field */}
          <div className="p-4 pb-0 text-white-1">
            <Label htmlFor="label">Label</Label>
            <Input
              id="label"
              placeholder="Enter session label"
              className="text-black-2"
              {...register("label")}
            />
            {errors.label && (
              <p className="text-red-1">{errors.label.message}</p>
            )}
          </div>

          {/* Description Field */}
          <div className="p-4 pb-0 text-white-1">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Enter session description"
              className="text-black-2"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-red-1/70">{errors.description.message}</p>
            )}
          </div>

          {/* Goal Field */}
          <div className="p-4 pb-0 text-white-1">
            <Label htmlFor="goal">Goal</Label>
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
            <Input
              type="hidden"
              value={goal}
              {...register("goal", { valueAsNumber: true })}
            />
            {errors.goal && <p className="text-red-1">{errors.goal.message}</p>}
          </div>

          <DrawerFooter>
            <Button
              type="submit"
              className="hover:bg-yellow-1/80 bg-yellow-1 text-black-3">
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
