"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface DeclineReasonDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  reason: string
  onReasonChange: (reason: string) => void
  onSubmit: () => void
}

export function DeclineReasonDialog({
  open,
  onOpenChange,
  reason,
  onReasonChange,
  onSubmit,
}: DeclineReasonDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogTitle className="text-center text-xl font-semibold">
         Let us know why. Helps us match better next time
        </DialogTitle>
        <div className="mt-4">
          <Textarea
            placeholder="Your reason..."
            value={reason}
            onChange={(e) => onReasonChange(e.target.value)}
            className="min-h-[200px]"
          />
        </div>

        <DialogFooter className="mt-6 flex justify-center gap-4 sm:justify-center">
          <Button size='lg' variant="outline" onClick={() => onOpenChange(false)} className="min-w-[170px]">
            Cancel
          </Button>
          <Button size='lg' onClick={onSubmit} className=" bg-warning-200 hover:bg-warning-200 text-white min-w-[170px]">
            Decline
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
