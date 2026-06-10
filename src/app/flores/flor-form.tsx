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
    <form action={formAction} className="space-y-4 rounded-[1.5rem] border border-rose-200/70 bg-rose-50/85 p-4 shadow-sm shadow-rose-200/40">
      <h2 className="text-lg font-semibold text-rose-800">Nova Flor</h2>

      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-rose-800/80">
          Nome da Flor
        </label>
        <input
          id="nome"
          name="nome"
          required
          className="mt-1 block w-full rounded-full border border-rose-200 bg-white/85 px-4 py-2 text-sm text-rose-800 placeholder-shown:text-rose-200 focus:placeholder-shown:text-rose-800 shadow-sm outline-none transition placeholder:text-rose-200 focus:placeholder:text-rose-800 focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100"
          placeholder="ex: Rosa Vermelha"
        />
      </div>

      {materiais.length === 0 ? (
        <p className="text-sm text-rose-700">
          Cadastre materiais primeiro antes de criar uma flor.
        </p>
      ) : (
        <div className="space-y-3">
          <p className="text-sm font-medium text-rose-800/80">Materiais</p>
          {materiais.map((material) => {
            const custoUnitario = getCustoUnitario(material)
            return (
              <div
                key={material.id}
                className="flex items-center gap-4 rounded-full bg-rose-100/60 p-3"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-rose-900/85">{material.nome}</p>
                    <p className="text-xs text-rose-700/70">
                    {formatUnidade(material)} &middot; R$ {custoUnitario.toFixed(2)} cada
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-rose-700/80">{getUnidadeLabel(material)}:</label>
                  <input
                    name={`qtd_${material.id}`}
                    type="text"
                    inputMode="decimal"
                    defaultValue="0"
                    onFocus={(e) => e.target.select()}
                    className="w-20 rounded-full border border-rose-200 bg-white/85 px-3 py-1.5 text-sm text-rose-800 placeholder-shown:text-rose-200 focus:placeholder-shown:text-rose-800 shadow-sm outline-none transition placeholder:text-rose-200 focus:placeholder:text-rose-800 focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100"
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}

      {state?.error && (
        <p className="rounded-full bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending || materiais.length === 0}
        className="rounded-full bg-rose-400 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-rose-300/40 transition hover:bg-rose-500 disabled:opacity-50 disabled:hover:bg-rose-400"
      >
        {pending ? 'Salvando...' : 'Criar Flor'}
      </button>
    </form>
  )
}
