'use client'

import { removeFlor } from './actions'
import type { Flor, Material } from '@/lib/types'
import { calcularCustoFlor, getCustoUnitario, getUnidadeLabel } from '@/lib/types'

function DeleteButton({ id }: { id: string }) {
  const handleRemove = async (formData: FormData) => {
    await removeFlor(null, formData)
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

export function FlorList({
  flores,
  materiais,
}: {
  flores: Flor[]
  materiais: Material[]
}) {
  if (flores.length === 0) {
    return <p className="text-gray-500">Nenhuma flor criada ainda.</p>
  }

  return (
    <div className="space-y-4">
      {flores.map((flor) => {
        const custoTotal = calcularCustoFlor(flor, materiais)
        return (
          <div key={flor.id} className="rounded-lg border p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{flor.nome}</h3>
                <p className="text-sm text-gray-500">
                  Criada em {new Date(flor.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-lg font-bold text-pink-600">
                  R$ {custoTotal.toFixed(2)}
                </p>
                <DeleteButton id={flor.id} />
              </div>
            </div>

            <div className="mt-3 space-y-1">
              {flor.itens.map((item) => {
                const material = materiais.find((m) => m.id === item.materialId)
                if (!material) return null
                const custoUnitario = getCustoUnitario(material)
                const subtotal = custoUnitario * item.quantidade
                return (
                  <div key={item.materialId} className="flex justify-between text-sm text-gray-600">
                    <span>
                      {material.nome} &times; {item.quantidade} {getUnidadeLabel(material)}
                      {custoUnitario !== material.custoPorUnidade && (
                        <span className="text-xs text-gray-400">
                          {' '}(R$ {custoUnitario.toFixed(2)}/{getUnidadeLabel(material)})
                        </span>
                      )}
                    </span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
