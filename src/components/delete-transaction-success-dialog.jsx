import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'

const DeleteTransactionSuccessDialog = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[400px] bg-card">
        <DialogHeader>
          <DialogTitle>Transação deletada!</DialogTitle>
          <DialogDescription>
            A transação foi deletada do sistema.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            className="bg-secondary hover:bg-secondary/50"
            onClick={() => onOpenChange(false)}
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteTransactionSuccessDialog
