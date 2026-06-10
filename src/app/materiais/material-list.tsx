'use client'

import { removeMaterial } from './actions'
import type { Material } from '@/lib/types'
import { getCustoUnitario, formatUnidade } from '@/lib/types'

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

function DeleteButton({ id }: { id: string }) {
  const handleRemove = async (formData: FormData) => {
    await removeMaterial(null, formData)
  }

  return (
    <form action={handleRemove}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="rounded-full border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 hover:text-red-700"
      >
        Remover
      </button>
    </form>
  )
}

export function MaterialList({ materiais }: { materiais: Material[] }) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-rose-200/70 bg-rose-50/85 shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-rose-200/70 bg-rose-100/60 text-left text-xs font-semibold uppercase tracking-[0.18em] text-rose-600">
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Unidade</th>
              <th className="px-4 py-3">Custo (R$)</th>
              <th className="px-4 py-3">Custo Unit&aacute;rio (R$)</th>
              <th className="px-4 py-3 text-right">A&ccedil;&otilde;es</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rose-200/70">
            {materiais.map((material) => {
              const custoUnitario = getCustoUnitario(material)
              return (
                <tr key={material.id} className="text-sm text-rose-950/80">
                  <td className="px-4 py-3 font-medium">{material.nome}</td>
                  <td className="px-4 py-3">{formatUnidade(material)}</td>
                  <td className="px-4 py-3">{formatCurrency(material.custoPorUnidade)}</td>
                  <td className="px-4 py-3">
                    {custoUnitario !== material.custoPorUnidade ? (
                      <span className="font-semibold text-rose-700">{formatCurrency(custoUnitario)}</span>
                    ) : (
                      <span className="text-rose-300">&mdash;</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <DeleteButton id={material.id} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
