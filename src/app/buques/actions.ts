'use server'

import { revalidatePath } from 'next/cache'
import { addBuque, deleteBuque, getMateriais, getFlores } from '@/lib/store'
import type { Bouquet, BouquetItem } from '@/lib/types'

export type ActionState = { error?: string; success?: boolean } | null

export async function createBouquet(prevState: ActionState, formData: FormData) {
  const nome = formData.get('nome') as string
  if (!nome) {
    return { error: 'Dê um nome ao buquê.' }
  }

  const [materiais, flores] = await Promise.all([
    getMateriais(),
    getFlores(),
  ])

  const itens: BouquetItem[] = []

  for (const material of materiais) {
    const qty = parseFloat(formData.get(`qtd_mat_${material.id}`) as string)
    if (!isNaN(qty) && qty > 0) {
      itens.push({ materialId: material.id, quantidade: qty })
    }
  }

  for (const flor of flores) {
    const qty = parseFloat(formData.get(`qtd_flo_${flor.id}`) as string)
    if (!isNaN(qty) && qty > 0) {
      itens.push({ florId: flor.id, quantidade: qty })
    }
  }

  if (itens.length === 0) {
    return { error: 'Adicione pelo menos um material ou flor com quantidade maior que zero.' }
  }

  const bouquet: Bouquet = {
    id: crypto.randomUUID(),
    nome,
    itens,
    createdAt: new Date().toISOString(),
  }

  await addBuque(bouquet)
  revalidatePath('/buques')
  return { success: true }
}

export async function removeBouquet(prevState: ActionState, formData: FormData) {
  const id = formData.get('id') as string
  await deleteBuque(id)
  revalidatePath('/buques')
  return { success: true }
}
