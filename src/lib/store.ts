import fs from 'fs'
import path from 'path'
import type { Material, Bouquet, Flor } from './types'

const DATA_DIR = path.join(process.cwd(), 'data')
const MATERIAIS_FILE = path.join(DATA_DIR, 'materiais.json')
const BUQUES_FILE = path.join(DATA_DIR, 'buques.json')
const FLORES_FILE = path.join(DATA_DIR, 'flores.json')

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

function readJSON<T>(filePath: string, defaultValue: T): T {
  ensureDir()
  if (!fs.existsSync(filePath)) {
    return defaultValue
  }
  const content = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(content) as T
}

function writeJSON<T>(filePath: string, data: T): void {
  ensureDir()
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

export function getMateriais(): Material[] {
  return readJSON<Material[]>(MATERIAIS_FILE, [])
}

export function getMaterial(id: string): Material | undefined {
  return getMateriais().find(m => m.id === id)
}

export function addMaterial(material: Material): void {
  const materiais = getMateriais()
  materiais.push(material)
  writeJSON(MATERIAIS_FILE, materiais)
}

export function updateMaterial(id: string, data: Partial<Omit<Material, 'id'>>): void {
  const materiais = getMateriais()
  const idx = materiais.findIndex(m => m.id === id)
  if (idx !== -1) {
    materiais[idx] = { ...materiais[idx], ...data }
    writeJSON(MATERIAIS_FILE, materiais)
  }
}

export function deleteMaterial(id: string): void {
  const materiais = getMateriais()
  writeJSON(MATERIAIS_FILE, materiais.filter(m => m.id !== id))
}

export function getBuques(): Bouquet[] {
  return readJSON<Bouquet[]>(BUQUES_FILE, [])
}

export function addBuque(bouquet: Bouquet): void {
  const buques = getBuques()
  buques.push(bouquet)
  writeJSON(BUQUES_FILE, buques)
}

export function deleteBuque(id: string): void {
  const buques = getBuques()
  writeJSON(BUQUES_FILE, buques.filter(b => b.id !== id))
}

export function getFlores(): Flor[] {
  return readJSON<Flor[]>(FLORES_FILE, [])
}

export function getFlor(id: string): Flor | undefined {
  return getFlores().find(f => f.id === id)
}

export function addFlor(flor: Flor): void {
  const flores = getFlores()
  flores.push(flor)
  writeJSON(FLORES_FILE, flores)
}

export function deleteFlor(id: string): void {
  const flores = getFlores()
  writeJSON(FLORES_FILE, flores.filter(f => f.id !== id))
}
