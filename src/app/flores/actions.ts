'use server'

import { revalidatePath } from 'next/cache'
import { addFlor, deleteFlor, getMateriais } from '@/lib/store'
import type { Flor, FlorItem } from '@/lib/types'

export type ActionState = { error?: string; success?: boolean } | null

export async function createFlor(prevState: ActionState, formData: FormData) {
  const nome = formData.get('nome') as string
  if (!nome) {
    return { error: 'Dê um nome à flor.' }
  }

  const materiais = getMateriais()

  const itens: FlorItem[] = []
  for (const material of materiais) {
    const qty = parseFloat(formData.get(`qtd_${material.id}`) as string)
    if (!isNaN(qty) && qty > 0) {
      itens.push({ materialId: material.id, quantidade: qty })
    }
  }

  if (itens.length === 0) {
    return { error: 'Adicione pelo menos um material com quantidade maior que zero.' }
  }

  const flor: Flor = {
    id: crypto.randomUUID(),
    nome,
    itens,
    createdAt: new Date().toISOString(),
  }

  addFlor(flor)
  revalidatePath('/flores')
  return { success: true }
}

export async function removeFlor(prevState: ActionState, formData: FormData) {
  const id = formData.get('id') as string
  deleteFlor(id)
  revalidatePath('/flores')
  return { success: true }
}
