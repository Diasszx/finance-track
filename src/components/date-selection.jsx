import { useQueryClient } from '@tanstack/react-query'
import { addMonths, format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

import { useAuthContext } from '@/context/auth'
import { usersQueryKeys } from '@/keys/queries'

import { DatePickerWithRange } from './ui/date-picker-with-rage'

const DateSelection = () => {
  const { user } = useAuthContext()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [date, setDate] = useState({
    from: searchParams.get('from')
      ? new Date(searchParams.get('from') + 'T00:00:00')
      : new Date(),
    to: searchParams.get('to')
      ? new Date(searchParams.get('to') + 'T00:00:00')
      : addMonths(new Date(), 1),
  })

  const formatDateToQueryParam = (date) => {
    return format(date, 'yyyy-MM-dd')
  }

  useEffect(() => {
    if (!date.from || !date.to) return
    const queryParams = new URLSearchParams()
    queryParams.set('from', formatDateToQueryParam(date.from))
    queryParams.set('to', formatDateToQueryParam(date.to))
    navigate(`/?${queryParams.toString()}`)
    queryClient.invalidateQueries({
      queryKey: usersQueryKeys.getBalance({
        userId: user.id,
        from: date.from,
        to: date.to,
      }),
    })
  }, [navigate, date, user.id, queryClient])
  return <DatePickerWithRange value={date} onChange={setDate} />
}

export default DateSelection
