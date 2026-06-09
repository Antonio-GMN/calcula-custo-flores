'use client'

import { removeMaterial } from './actions'
import type { Material } from '@/lib/types'
import { getCustoUnitario, formatUnidade } from '@/lib/types'

function DeleteButton({ id }: { id: string }) {
  const handleRemove = async (formData: FormData) => {
    await removeMaterial(null, formData)
  }

  return (
    <form action={handleRemove}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-sm text-red-600 hover:text-red-800"
      >
        Remover
      </button>
    </form>
  )
}

export function MaterialList({ materiais }: { materiais: Material[] }) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <table className="min-w-full divide-y">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold">Nome</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Unidade</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Custo (R$)</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Custo Unit&aacute;rio (R$)</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y">
          {materiais.map((material) => {
            const custoUnitario = getCustoUnitario(material)
            return (
              <tr key={material.id}>
                <td className="px-4 py-3 text-sm">{material.nome}</td>
                <td className="px-4 py-3 text-sm">{formatUnidade(material)}</td>
                <td className="px-4 py-3 text-sm">
                  {material.custoPorUnidade.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-sm">
                  {custoUnitario !== material.custoPorUnidade ? (
                    <span>{custoUnitario.toFixed(2)}</span>
                  ) : (
                    <span className="text-gray-400">&mdash;</span>
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
  )
}
