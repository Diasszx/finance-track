import { Loader, Trash2 } from 'lucide-react'

import { useDeleteTransaction } from '@/hooks/use-delete-transaction'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'
import { Button } from './ui/button'

const DeleteTransactionAlertDialog = ({ transactionId, onDeleted }) => {
  const { mutateAsync: deleteTransactionMutation, isPending: isDeleting } =
    useDeleteTransaction()

  const onDelete = async () => {
    await deleteTransactionMutation({ id: transactionId })
    onDeleted()
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="px-1 text-xs font-bold text-primary-red"
          disabled={isDeleting}
        >
          Deletar Transação
          <Trash2 size={16} />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent size="sm" className="w-[400px] max-w-[400px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja deletar essa transação?</AlertDialogTitle>
          <AlertDialogDescription>
            Uma vez deletada, você não poderá recuperá-la.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting} className="bg-card">
            Cancelar
          </AlertDialogCancel>

          <AlertDialogAction asChild>
            <Button
              className="bg-destructive hover:bg-destructive/70"
              onClick={onDelete}
              disabled={isDeleting}
            >
              {isDeleting ? <Loader className="animate-spin" /> : 'Excluir'}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteTransactionAlertDialog
