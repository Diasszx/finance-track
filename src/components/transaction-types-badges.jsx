import { cva } from 'class-variance-authority'

const TransactionTypesBadges = (variant) => {
  const variants = cva(
    'flex w-fit py-[2px] px-2 bg-muted rounded-full text-xs font-bold items-center gap-1.5',
    {
      variants: {
        variant: {
          earning: 'text-primary-green bg-primary-green/10',
          expense: 'text-primary-red bg-primary-red/10',
          investment: 'text-primary-blue bg-primary-blue/10',
        },
      },
    }
  )

  const getText = (variant) => {
    switch (variant) {
      case 'earning':
        return 'Ganho'
      case 'expense':
        return 'Gasto'
      case 'investment':
        return 'Investimento'
      default:
        return ''
    }
  }
  return <div className={variants({ variant })}>{getText(variant)}</div>
}

export default TransactionTypesBadges
