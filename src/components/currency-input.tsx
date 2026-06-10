'use client'

import { useState, useRef } from 'react'

function formatCurrency(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  if (digits.length === 0) return '0,00'
  const value = parseInt(digits, 10)
  if (isNaN(value)) return '0,00'
  return (value / 100).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function CurrencyInput({ name, className }: {
  name: string
  className?: string
}) {
  const [display, setDisplay] = useState('0,00')
  const hiddenRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/[^0-9]/g, '')
    const formatted = formatCurrency(digits)
    setDisplay(formatted)
    if (hiddenRef.current) {
      hiddenRef.current.value = digits.length === 0 ? '' : (parseInt(digits, 10) / 100).toFixed(2)
    }
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select()
  }

  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-rose-400">
        R$
      </span>
      <input type="hidden" ref={hiddenRef} name={name} />
      <input
        type="text"
        inputMode="numeric"
        value={display}
        onChange={handleChange}
        onFocus={handleFocus}
        className={`${className ?? ''} pl-9`}
      />
    </div>
  )
}
