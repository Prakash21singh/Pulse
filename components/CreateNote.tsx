"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import {
  Bell,
  UserPlus,
  Image as ImageIcon,
  Palette,
  MoreVertical,
  Undo,
  Redo,
  Save,
} from "lucide-react";

export default function CreateNote() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission here
    setIsOpen(false);
  };

  return (
    <div className="">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="bg-black-1">
            Create Note
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full md:min-w-[500px] transition-all lg:min-w-[700px] bg-[#D6E6F2]/10 border-none p-0 ">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-lg w-full  overflow-hidden">
            <div className="p-4 space-y-4">
              <Input
                placeholder="Title"
                className="text-lg bg-black-1 text-white-3 font-semibold border-none shadow-none focus-visible:ring-0"
              />
              <Textarea
                placeholder="Take a note..."
                className="min-h-[100px] bg-black-1 text-white-3 resize-none border-none shadow-none outline-none"
              />
            </div>
            <div className="flex justify-between items-center px-4 py-2 bg-gray-50">
              <div className="flex space-x-2">
                <Button type="button" size="icon" variant="secondary">
                  <Palette className="h-4 w-4" />
                </Button>
                <Button type="button" size="icon" variant="secondary">
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </div>
              <Button
                type="submit"
                variant="outline"
                className="font-medium flex items-center justify-center gap-4">
                <Save />
                Save
              </Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
}
