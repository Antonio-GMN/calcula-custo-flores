import fs from 'fs'
import path from 'path'
import { put, list } from '@vercel/blob'
import type { Material, Bouquet, Flor } from './types'

const DATA_DIR = path.join(process.cwd(), 'data')
const MATERIAIS_FILE = path.join(DATA_DIR, 'materiais.json')
const BUQUES_FILE = path.join(DATA_DIR, 'buques.json')
const FLORES_FILE = path.join(DATA_DIR, 'flores.json')

const isVercel = process.env.VERCEL === '1'

// ---- Vercel Blob helpers ----

async function getBlobUrl(prefix: string): Promise<string | null> {
  try {
    const { blobs } = await list({ prefix })
    return blobs.length > 0 ? blobs[0].url : null
  } catch {
    return null
  }
}

async function readBlobJSON<T>(key: string, defaultValue: T): Promise<T> {
  const url = await getBlobUrl(key)
  if (!url) return defaultValue
  try {
    const res = await fetch(url)
    if (!res.ok) return defaultValue
    return await res.json()
  } catch {
    return defaultValue
  }
}

async function writeBlobJSON<T>(key: string, data: T): Promise<void> {
  await put(key, JSON.stringify(data, null, 2), {
    contentType: 'application/json',
    access: 'public',
  })
}

// ---- Local fs helpers ----

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

function readLocalJSON<T>(filePath: string, defaultValue: T): T {
  ensureDir()
  if (!fs.existsSync(filePath)) {
    return defaultValue
  }
  const content = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(content) as T
}

function writeLocalJSON<T>(filePath: string, data: T): void {
  ensureDir()
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

// ---- Public API ----

export async function getMateriais(): Promise<Material[]> {
  if (isVercel) {
    return readBlobJSON<Material[]>('materiais.json', [])
  }
  return readLocalJSON<Material[]>(MATERIAIS_FILE, [])
}

export async function getMaterial(id: string): Promise<Material | undefined> {
  const materiais = await getMateriais()
  return materiais.find(m => m.id === id)
}

export async function addMaterial(material: Material): Promise<void> {
  const materiais = await getMateriais()
  materiais.push(material)
  if (isVercel) {
    await writeBlobJSON('materiais.json', materiais)
  } else {
    writeLocalJSON(MATERIAIS_FILE, materiais)
  }
}

export async function updateMaterial(id: string, data: Partial<Omit<Material, 'id'>>): Promise<void> {
  const materiais = await getMateriais()
  const idx = materiais.findIndex(m => m.id === id)
  if (idx !== -1) {
    materiais[idx] = { ...materiais[idx], ...data }
    if (isVercel) {
      await writeBlobJSON('materiais.json', materiais)
    } else {
      writeLocalJSON(MATERIAIS_FILE, materiais)
    }
  }
}

export async function deleteMaterial(id: string): Promise<void> {
  const materiais = await getMateriais()
  const filtered = materiais.filter(m => m.id !== id)
  if (isVercel) {
    await writeBlobJSON('materiais.json', filtered)
  } else {
    writeLocalJSON(MATERIAIS_FILE, filtered)
  }
}

export async function getBuques(): Promise<Bouquet[]> {
  if (isVercel) {
    return readBlobJSON<Bouquet[]>('buques.json', [])
  }
  return readLocalJSON<Bouquet[]>(BUQUES_FILE, [])
}

export async function addBuque(bouquet: Bouquet): Promise<void> {
  const buques = await getBuques()
  buques.push(bouquet)
  if (isVercel) {
    await writeBlobJSON('buques.json', buques)
  } else {
    writeLocalJSON(BUQUES_FILE, buques)
  }
}

export async function deleteBuque(id: string): Promise<void> {
  const buques = await getBuques()
  const filtered = buques.filter(b => b.id !== id)
  if (isVercel) {
    await writeBlobJSON('buques.json', filtered)
  } else {
    writeLocalJSON(BUQUES_FILE, filtered)
  }
}

export async function getFlores(): Promise<Flor[]> {
  if (isVercel) {
    return readBlobJSON<Flor[]>('flores.json', [])
  }
  return readLocalJSON<Flor[]>(FLORES_FILE, [])
}

export async function getFlor(id: string): Promise<Flor | undefined> {
  const flores = await getFlores()
  return flores.find(f => f.id === id)
}

export async function addFlor(flor: Flor): Promise<void> {
  const flores = await getFlores()
  flores.push(flor)
  if (isVercel) {
    await writeBlobJSON('flores.json', flores)
  } else {
    writeLocalJSON(FLORES_FILE, flores)
  }
}

export async function deleteFlor(id: string): Promise<void> {
  const flores = await getFlores()
  const filtered = flores.filter(f => f.id !== id)
  if (isVercel) {
    await writeBlobJSON('flores.json', filtered)
  } else {
    writeLocalJSON(FLORES_FILE, filtered)
  }
}
