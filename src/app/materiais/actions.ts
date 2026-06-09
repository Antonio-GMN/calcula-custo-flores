'use server'

import { revalidatePath } from 'next/cache'
import { addMaterial, updateMaterial, deleteMaterial } from '@/lib/store'
import type { Material } from '@/lib/types'

export type ActionState = { error?: string; success?: boolean } | null

export async function createMaterial(prevState: ActionState, formData: FormData) {
  const nome = formData.get('nome') as string
  const unidade = formData.get('unidade') as string
  const custoPorUnidade = parseFloat(formData.get('custoPorUnidade') as string)

  if (!nome || !unidade || isNaN(custoPorUnidade) || custoPorUnidade <= 0) {
    return { error: 'Preencha todos os campos corretamente.' }
  }

  let unidadesPorPacote: number | undefined = undefined
  if (unidade === 'pacote') {
    unidadesPorPacote = parseFloat(formData.get('unidadesPorPacote') as string)
    if (isNaN(unidadesPorPacote) || unidadesPorPacote <= 0) {
      return { error: 'Informe quantas unidades vem no pacote.' }
    }
  }

  let metrosTotal: number | undefined = undefined
  if (unidade === 'metro') {
    metrosTotal = parseFloat(formData.get('metrosTotal') as string)
    if (isNaN(metrosTotal) || metrosTotal <= 0) {
      return { error: 'Informe quantos metros tem o material.' }
    }
  }

  const material: Material = {
    id: crypto.randomUUID(),
    nome,
    unidade,
    custoPorUnidade,
    unidadesPorPacote,
    metrosTotal,
  }

  addMaterial(material)
  revalidatePath('/materiais')
  return { success: true }
}

export async function editMaterial(prevState: ActionState, formData: FormData) {
  const id = formData.get('id') as string
  const nome = formData.get('nome') as string
  const unidade = formData.get('unidade') as string
  const custoPorUnidade = parseFloat(formData.get('custoPorUnidade') as string)

  if (!id || !nome || !unidade || isNaN(custoPorUnidade) || custoPorUnidade <= 0) {
    return { error: 'Preencha todos os campos corretamente.' }
  }

  let unidadesPorPacote: number | undefined = undefined
  if (unidade === 'pacote') {
    unidadesPorPacote = parseFloat(formData.get('unidadesPorPacote') as string)
    if (isNaN(unidadesPorPacote) || unidadesPorPacote <= 0) {
      return { error: 'Informe quantas unidades vem no pacote.' }
    }
  }

  let metrosTotal: number | undefined = undefined
  if (unidade === 'metro') {
    metrosTotal = parseFloat(formData.get('metrosTotal') as string)
    if (isNaN(metrosTotal) || metrosTotal <= 0) {
      return { error: 'Informe quantos metros tem o material.' }
    }
  }

  updateMaterial(id, { nome, unidade, custoPorUnidade, unidadesPorPacote, metrosTotal })
  revalidatePath('/materiais')
  return { success: true }
}

export async function removeMaterial(prevState: ActionState, formData: FormData) {
  const id = formData.get('id') as string
  deleteMaterial(id)
  revalidatePath('/materiais')
  return { success: true }
}
