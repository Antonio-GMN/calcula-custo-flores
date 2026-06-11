'use client'

import { useFormStatus } from 'react-dom'
import { removeBouquet } from './actions'
import type { Bouquet, Material, Flor } from '@/lib/types'
import { getCustoUnitario, calcularCustoFlor, calcularCustoBouquet, getUnidadeLabel } from '@/lib/types'

function DeleteButton({ id }: { id: string }) {
  const handleRemove = async (formData: FormData) => {
    await removeBouquet(null, formData)
  }

  return (
    <form action={handleRemove}>
      <input type="hidden" name="id" value={id} />
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="text-sm text-red-600 hover:text-red-800 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? 'Removendo...' : 'Remover'}
    </button>
  )
}

export function BouquetList({
  bouquets,
  materiais,
  flores,
}: {
  bouquets: Bouquet[]
  materiais: Material[]
  flores: Flor[]
}) {
  if (bouquets.length === 0) {
    return <p className="text-gray-500">Nenhum buquê criado ainda.</p>
  }

  return (
    <div className="space-y-4">
      {bouquets.map((bouquet) => {
        const custoTotal = calcularCustoBouquet(bouquet, materiais, flores)
        return (
          <div key={bouquet.id} className="rounded-lg border p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{bouquet.nome}</h3>
                <p className="text-sm text-gray-500">
                  Criado em {new Date(bouquet.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-lg font-bold text-pink-600">
                  R$ {custoTotal.toFixed(2)}
                </p>
                <DeleteButton id={bouquet.id} />
              </div>
            </div>

            <div className="mt-3 space-y-1">
              {bouquet.itens.map((item) => {
                if (item.materialId) {
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
                }
                if (item.florId) {
                  const flor = flores.find((f) => f.id === item.florId)
                  if (!flor) return null
                  const custoUnitario = calcularCustoFlor(flor, materiais)
                  const subtotal = custoUnitario * item.quantidade
                  return (
                    <div key={item.florId} className="flex justify-between text-sm text-gray-600">
                      <span>
                        {flor.nome} &times; {item.quantidade}
                      </span>
                      <span>R$ {subtotal.toFixed(2)}</span>
                    </div>
                  )
                }
                return null
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
