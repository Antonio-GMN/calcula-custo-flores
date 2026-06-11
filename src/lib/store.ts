import { supabase } from './supabase'
import type { Material, Bouquet, Flor } from './types'

export async function getMateriais(): Promise<Material[]> {
  const { data } = await supabase().from('materiais').select('*')
  return (data as Material[]) ?? []
}

export async function getMaterial(id: string): Promise<Material | undefined> {
  const { data } = await supabase().from('materiais').select('*').eq('id', id).maybeSingle()
  return (data as Material) ?? undefined
}

export async function addMaterial(material: Material): Promise<void> {
  const { error } = await supabase().from('materiais').insert(material)
  if (error) throw new Error(error.message)
}

export async function updateMaterial(id: string, data: Partial<Omit<Material, 'id'>>): Promise<void> {
  const { error } = await supabase().from('materiais').update(data).eq('id', id)
  if (error) throw new Error(error.message)
}

export async function deleteMaterial(id: string): Promise<void> {
  const { error } = await supabase().from('materiais').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

export async function getBuques(): Promise<Bouquet[]> {
  const { data } = await supabase().from('buques').select('*')
  return (data as Bouquet[]) ?? []
}

export async function addBuque(bouquet: Bouquet): Promise<void> {
  const { error } = await supabase().from('buques').insert(bouquet)
  if (error) throw new Error(error.message)
}

export async function deleteBuque(id: string): Promise<void> {
  const { error } = await supabase().from('buques').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

export async function getFlores(): Promise<Flor[]> {
  const { data } = await supabase().from('flores').select('*')
  return (data as Flor[]) ?? []
}

export async function getFlor(id: string): Promise<Flor | undefined> {
  const { data } = await supabase().from('flores').select('*').eq('id', id).maybeSingle()
  return (data as Flor) ?? undefined
}

export async function addFlor(flor: Flor): Promise<void> {
  const { error } = await supabase().from('flores').insert(flor)
  if (error) throw new Error(error.message)
}

export async function deleteFlor(id: string): Promise<void> {
  const { error } = await supabase().from('flores').delete().eq('id', id)
  if (error) throw new Error(error.message)
}
