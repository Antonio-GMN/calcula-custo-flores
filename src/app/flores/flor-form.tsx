'use client'

import { useActionState } from 'react'
import { createFlor } from './actions'
import type { Material } from '@/lib/types'
import type { ActionState } from './actions'
import { getCustoUnitario, formatUnidade, getUnidadeLabel } from '@/lib/types'

export function FlorForm({ materiais }: { materiais: Material[] }) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    createFlor,
    null
  )

  return (
    <form action={formAction} className="space-y-4 rounded-lg border p-4">
      <h2 className="text-lg font-semibold">Nova Flor</h2>

      <div>
        <label htmlFor="nome" className="block text-sm font-medium">
          Nome da Flor
        </label>
        <input
          id="nome"
          name="nome"
          required
          className="mt-1 block w-full rounded-md border px-3 py-2 text-sm"
          placeholder="ex: Rosa Vermelha"
        />
      </div>

      {materiais.length === 0 ? (
        <p className="text-sm text-amber-600">
          Cadastre materiais primeiro antes de criar uma flor.
        </p>
      ) : (
        <div className="space-y-3">
          <p className="text-sm font-medium">Materiais</p>
          {materiais.map((material) => {
            const custoUnitario = getCustoUnitario(material)
            return (
              <div
                key={material.id}
                className="flex items-center gap-4 rounded-md bg-gray-50 p-3"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium">{material.nome}</p>
                  <p className="text-xs text-gray-500">
                    {formatUnidade(material)} &middot; R$ {custoUnitario.toFixed(2)} cada
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">{getUnidadeLabel(material)}:</label>
                  <input
                    name={`qtd_${material.id}`}
                    type="text"
                    inputMode="decimal"
                    defaultValue="0"
                    onFocus={(e) => e.target.select()}
                    className="w-20 rounded-md border px-2 py-1 text-sm"
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}

      {state?.error && (
        <p className="text-sm text-red-600">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending || materiais.length === 0}
        className="rounded-md bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700 disabled:opacity-50"
      >
        {pending ? 'Salvando...' : 'Criar Flor'}
      </button>
    </form>
  )
}
