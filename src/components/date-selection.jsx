import { useQueryClient } from '@tanstack/react-query'
import { addMonths, format, isValid } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

import { useAuthContext } from '@/context/auth'
import { usersQueryKeys } from '@/keys/queries'

import { DatePickerWithRange } from './ui/date-picker-with-rage'

const getInitialDateState = (searchParams) => {
  const defaultDate = {
    from: new Date(),
    to: addMonths(new Date(), 1),
  }
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  if (!from || !to) {
    return defaultDate
  }
  const dateAreInvalid = !isValid(new Date(from)) || !isValid(new Date(to))
  if (dateAreInvalid) {
    return defaultDate
  }
  return { from: new Date(from + 'T00:00:00'), to: new Date(to + 'T00:00:00') }
}

const DateSelection = () => {
  const { user } = useAuthContext()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [date, setDate] = useState(getInitialDateState(searchParams))

  const formatDateToQueryParam = (date) => {
    return format(date, 'yyyy-MM-dd')
  }

  useEffect(() => {
    if (!date.from || !date.to) return
    const queryParams = new URLSearchParams()
    const from = formatDateToQueryParam(date.from)
    const to = formatDateToQueryParam(date.to)
    queryParams.set('from', from)
    queryParams.set('to', to)
    navigate(`/?${queryParams.toString()}`)
    queryClient.invalidateQueries({
      queryKey: usersQueryKeys.getBalance({
        userId: user.id,
        from: from,
        to: to,
      }),
    })
  }, [navigate, date, user.id, queryClient])
  return <DatePickerWithRange value={date} onChange={setDate} />
}

export default DateSelection
