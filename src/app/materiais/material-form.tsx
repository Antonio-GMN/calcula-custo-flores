'use client'

import { useActionState, useReducer, useEffect } from 'react'
import { createMaterial } from './actions'
import type { ActionState } from './actions'
import { CurrencyInput } from '@/components/currency-input'

type FormState = {
  unidade: string
  resetKey: number
}

function formReducer(state: FormState, action: { type: 'setUnidade'; value: string } | { type: 'reset' }): FormState {
  switch (action.type) {
    case 'setUnidade':
      return { ...state, unidade: action.value }
    case 'reset':
      return { unidade: '', resetKey: state.resetKey + 1 }
  }
}

export function MaterialForm() {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    createMaterial,
    null
  )
  const [form, dispatch] = useReducer(formReducer, { unidade: '', resetKey: 0 })

  useEffect(() => {
    if (state?.success) {
      dispatch({ type: 'reset' })
    }
  }, [state])

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="nome" className="mb-2 block text-sm font-medium text-rose-800/80">
            Nome do material
          </label>
          <input
            id="nome"
            name="nome"
            required
            className="block h-12 w-full rounded-full border border-rose-200 bg-rose-50/80 px-4 text-sm text-black shadow-sm outline-none transition placeholder:text-rose-200 focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100"
            placeholder="ex: Fita de cetim"
          />
        </div>

        <div>
          <label htmlFor="custoPorUnidade" className="mb-2 block text-sm font-medium text-rose-800/80">
            {form.unidade === 'pacote' ? 'Custo por pacote (R$)' : form.unidade === 'metro' ? 'Custo total (R$)' : 'Custo unitário (R$)'}
          </label>
          <CurrencyInput
            key={form.resetKey}
            name="custoPorUnidade"
            className="block h-12 w-full rounded-full border border-rose-200 bg-rose-50/80 px-4 pl-9 text-sm text-black shadow-sm outline-none transition placeholder:text-rose-200 focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="unidade" className="mb-2 block text-sm font-medium text-rose-800/80">
            Tipo de unidade
          </label>
          <select
            id="unidade"
            name="unidade"
            required
            value={form.unidade}
            onChange={(e) => dispatch({ type: 'setUnidade', value: e.target.value })}
            className="block h-12 w-full rounded-full border border-rose-200 bg-rose-50/80 px-4 text-sm text-black shadow-sm outline-none transition focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100"
          >
            <option value="">Selecione...</option>
            <option value="unidade">Unidade</option>
            <option value="metro">Metro</option>
            <option value="pacote">Pacote</option>
          </select>
        </div>

        {form.unidade === 'pacote' && (
          <div>
            <label htmlFor="unidadesPorPacote" className="mb-2 block text-sm font-medium text-rose-800/80">
              Unidades por pacote
            </label>
            <input
              id="unidadesPorPacote"
              name="unidadesPorPacote"
              type="text"
              inputMode="numeric"
              required
              className="block h-12 w-full rounded-full border border-rose-200 bg-rose-50/80 px-4 text-sm text-black shadow-sm outline-none transition placeholder:text-rose-200 focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100"
              placeholder="ex: 10"
            />
          </div>
        )}

        {form.unidade === 'metro' && (
          <div>
            <label htmlFor="metrosTotal" className="mb-2 block text-sm font-medium text-rose-800/80">
              Metros no material
            </label>
            <input
              id="metrosTotal"
              name="metrosTotal"
              type="text"
              inputMode="decimal"
              required
              className="block h-12 w-full rounded-full border border-rose-200 bg-rose-50/80 px-4 text-sm text-black shadow-sm outline-none transition placeholder:text-rose-200 focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100"
              placeholder="ex: 50"
            />
          </div>
        )}
      </div>

      {state?.error && (
        <p className="rounded-full bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-rose-400 px-6 text-sm font-semibold text-white shadow-lg shadow-rose-300/45 transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-rose-400"
      >
        <span aria-hidden="true">+</span>
        {pending ? 'Salvando...' : 'Adicionar Material'}
      </button>
    </form>
  )
}
