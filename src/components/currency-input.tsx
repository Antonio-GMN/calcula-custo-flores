'use client'

import { useState, useRef } from 'react'

function formatCurrency(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  if (digits.length === 0) return ''
  const value = parseInt(digits, 10)
  if (isNaN(value)) return ''
  return (value / 100).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function CurrencyInput({ name, className, placeholder }: {
  name: string
  className?: string
  placeholder?: string
}) {
  const [display, setDisplay] = useState('')
  const [focused, setFocused] = useState(false)
  const hiddenRef = useRef<HTMLInputElement>(null)
  const hasValue = display.length > 0
  const corR$ = hasValue || focused ? 'text-rose-800' : 'text-rose-200'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    if (raw.length === 0) {
      setDisplay('')
      if (hiddenRef.current) hiddenRef.current.value = ''
      return
    }
    const formatted = formatCurrency(raw)
    setDisplay(formatted)
    if (hiddenRef.current) {
      hiddenRef.current.value = (parseInt(raw, 10) / 100).toFixed(2)
    }
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true)
    e.target.select()
  }

  const handleBlur = () => {
    setFocused(false)
  }

  return (
    <div className="relative">
      <span className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm ${corR$}`}>
        R$
      </span>
      <input type="hidden" ref={hiddenRef} name={name} />
      <input
        type="text"
        inputMode="numeric"
        value={display}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`${className ?? ''} pl-9`}
      />
    </div>
  )
}
