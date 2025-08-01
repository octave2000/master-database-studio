import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { PenToolIcon } from "lucide-react";
import { QueryEditor } from "./QueryEditor";

export function QueryEditorDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-3 mt-auto" variant={"outline"}>
          <PenToolIcon className="h-4 w-4" />
          Query Console
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-3xl">
        <DialogHeader>
          <DialogTitle>Query Console</DialogTitle>
          <DialogDescription>
            Write and execute SQL queries against your connected databases.
          </DialogDescription>
        </DialogHeader>
        <QueryEditor />
      </DialogContent>
    </Dialog>
  );
}
