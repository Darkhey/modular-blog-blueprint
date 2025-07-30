import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface Props {
  open: boolean;
}

export default function AdblockPopup({ open }: Props) {
  const [visible, setVisible] = useState(open);

  return (
    <Dialog open={visible} onOpenChange={setVisible}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Werbeblocker erkannt</DialogTitle>
          <DialogDescription>
            Wir haben festgestellt, dass ein Werbeblocker aktiv ist. Bitte
            unterstütze uns, indem du deinen Adblocker für diese Seite
            deaktivierst.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Verstanden</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
