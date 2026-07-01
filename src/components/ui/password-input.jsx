import { EyeIcon, EyeOff } from 'lucide-react'
import { forwardRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const PasswordInput = forwardRef(
  ({ placeholder = 'Digite sua senha', ...props }, ref) => {
    const [passwordIsVisible, setPasswordIsVisible] = useState(false)

    return (
      <div className="relative">
        <Input
          ref={ref}
          type={passwordIsVisible ? 'text' : 'password'}
          placeholder={placeholder}
          {...props}
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setPasswordIsVisible((prev) => !prev)}
          className="absolute bottom-0 right-0 top-0 my-auto mr-1 h-8 w-8 text-muted-foreground"
        >
          {passwordIsVisible ? <EyeOff /> : <EyeIcon />}
        </Button>
      </div>
    )
  }
)

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput
