'use client'

import { useActionState, useState, useEffect } from 'react'
import { createMaterial } from './actions'
import type { ActionState } from './actions'
import { CurrencyInput } from '@/components/currency-input'

export function MaterialForm() {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    createMaterial,
    null
  )
  const [unidade, setUnidade] = useState('')
  const [formKey, setFormKey] = useState(0)

  useEffect(() => {
    if (state?.success) {
      setUnidade('')
      setFormKey(k => k + 1)
    }
  }, [state])

  return (
    <form action={formAction} className="space-y-4 rounded-lg border p-4">
      <h2 className="text-lg font-semibold">Novo Material</h2>

      <div>
        <label htmlFor="nome" className="block text-sm font-medium">
          Nome do Material
        </label>
        <input
          id="nome"
          name="nome"
          required
          className="mt-1 block w-full rounded-md border px-3 py-2 text-sm"
          placeholder="ex: Fita de cetim"
        />
      </div>

      <div>
        <label htmlFor="unidade" className="block text-sm font-medium">
          Unidade
        </label>
        <select
          id="unidade"
          name="unidade"
          required
          value={unidade}
          onChange={(e) => setUnidade(e.target.value)}
          className="mt-1 block w-full rounded-md border px-3 py-2 text-sm"
        >
          <option value="">Selecione...</option>
          <option value="unidade">Unidade</option>
          <option value="metro">Metro</option>
          <option value="rolo">Rolo</option>
          <option value="grama">Grama</option>
          <option value="pacote">Pacote</option>
        </select>
      </div>

      {unidade === 'pacote' && (
        <div>
          <label htmlFor="unidadesPorPacote" className="block text-sm font-medium">
            Unidades por Pacote
          </label>
          <input
            id="unidadesPorPacote"
            name="unidadesPorPacote"
            type="text"
            inputMode="numeric"
            required
            className="mt-1 block w-full rounded-md border px-3 py-2 text-sm"
            placeholder="ex: 10"
          />
          <p className="mt-1 text-xs text-gray-500">
            Quantas unidades deste produto v&ecirc;m em cada pacote.
          </p>
        </div>
      )}

      {unidade === 'metro' && (
        <div>
          <label htmlFor="metrosTotal" className="block text-sm font-medium">
            Metros no Material
          </label>
          <input
            id="metrosTotal"
            name="metrosTotal"
            type="text"
            inputMode="decimal"
            required
            className="mt-1 block w-full rounded-md border px-3 py-2 text-sm"
            placeholder="ex: 50"
          />
          <p className="mt-1 text-xs text-gray-500">
            Quantos metros deste material voc&ecirc; possui ou comprou.
          </p>
        </div>
      )}

      <div>
        <label htmlFor="custoPorUnidade" className="block text-sm font-medium">
          {unidade === 'pacote' ? 'Custo por Pacote' : unidade === 'metro' ? 'Custo Total' : 'Custo por Unidade'}
        </label>
        <CurrencyInput
          key={formKey}
          name="custoPorUnidade"
          className="mt-1 block w-full rounded-md border px-3 py-2 text-sm"
        />
        {unidade === 'pacote' && (
          <p className="mt-1 text-xs text-gray-500">
            Valor total do pacote. O custo por unidade ser&aacute; calculado automaticamente.
          </p>
        )}
        {unidade === 'metro' && (
          <p className="mt-1 text-xs text-gray-500">
            Valor total pago. O custo por metro ser&aacute; calculado automaticamente.
          </p>
        )}
      </div>

      {state?.error && (
        <p className="text-sm text-red-600">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700 disabled:opacity-50"
      >
        {pending ? 'Salvando...' : 'Adicionar Material'}
      </button>
    </form>
  )
}
