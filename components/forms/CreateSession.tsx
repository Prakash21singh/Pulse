import * as React from "react";
import { useForm } from "react-hook-form";
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
import { createSessionSchema } from "@/validation";
import { useRouter } from "next/navigation";

// Validation schema using zod

export function CreateSession() {
  const [goal, setGoal] = React.useState(10);
  const { toast } = useToast();
  const { user } = useUser();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createSessionSchema),
    defaultValues: {
      topic: "",
      description: "",
      initialTime: goal,
    },
  });

  function onClick(adjustment: number) {
    setGoal(Math.max(10, Math.min(400, goal + adjustment)));
  }

  const onSubmit = async (data: any) => {
    const sessionData = {
      ...data,
      userId: user?.id,
      initialTime: goal,
    };

    try {
      const response = await axios.post("/api/focus", {
        ...sessionData,
      });

      if (response.statusText !== "OK")
        throw new Error("Error creating session");

      router.push("/session");
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
      <DrawerTrigger asChild className="w-full h-full">
        <span className="w-full h-32 md:w-[100dvw] border-2 border-dashed border-black-2 md:h-[60dvh] rounded-lg m-3 hover:bg-black-2/40 bg-black-2/30 flex flex-col items-center gap-3 transition-all flex-center">
          <IconPlus className="text-3xl text-black-2" size={40} />
          <p className="text-sm font-medium text-white-3/30">
            Create Your Focus Session
          </p>
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
            <Label htmlFor="label">Topic</Label>
            <Input
              id="label"
              placeholder="eg: DSA, One Month Push..."
              className="text-white-3/50 bg-black-3/20 border-none"
              {...register("topic")}
            />
            {errors.topic && (
              <p className="text-red-1">{errors.topic.message}</p>
            )}
          </div>

          {/* Description Field */}
          <div className="p-4 pb-0 text-white-1">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="eg: One hour dedicated to this..."
              className="text-white-3/50 bg-black-3/20 border-none"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-red-1/70">{errors.description.message}</p>
            )}
          </div>

          {/* Goal Field */}
          <div className="p-4 pb-0 text-white-1">
            <Label htmlFor="goal">Session Period</Label>
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
            {/* Set the hidden input's value to be directly tied to goal */}
            <Input
              type="hidden"
              value={goal}
              {...register("initialTime", { valueAsNumber: true })}
            />
            {errors.initialTime && (
              <p className="text-red-1">{errors.initialTime.message}</p>
            )}
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
