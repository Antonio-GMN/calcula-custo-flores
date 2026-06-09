export interface Material {
  id: string
  nome: string
  unidade: string
  custoPorUnidade: number
  unidadesPorPacote?: number
  metrosTotal?: number
}

export function getCustoUnitario(material: Material): number {
  if (material.unidade === 'pacote' && material.unidadesPorPacote && material.unidadesPorPacote > 0) {
    return material.custoPorUnidade / material.unidadesPorPacote
  }
  if (material.unidade === 'metro' && material.metrosTotal && material.metrosTotal > 0) {
    return material.custoPorUnidade / material.metrosTotal
  }
  return material.custoPorUnidade
}

export function getUnidadeLabel(material: Material): string {
  if (material.unidade === 'pacote' && material.unidadesPorPacote && material.unidadesPorPacote > 0) {
    return 'unidade'
  }
  return material.unidade
}

export function formatUnidade(material: Material): string {
  if (material.unidade === 'pacote' && material.unidadesPorPacote && material.unidadesPorPacote > 0) {
    return `pacote (${material.unidadesPorPacote} unid.)`
  }
  if (material.unidade === 'metro' && material.metrosTotal && material.metrosTotal > 0) {
    return `metro (${material.metrosTotal}m)`
  }
  return material.unidade
}

export interface FlorItem {
  materialId: string
  quantidade: number
}

export interface Flor {
  id: string
  nome: string
  itens: FlorItem[]
  createdAt: string
}

export function calcularCustoFlor(flor: Flor, materiais: Material[]): number {
  return flor.itens.reduce((total, item) => {
    const material = materiais.find(m => m.id === item.materialId)
    if (!material) return total
    return total + getCustoUnitario(material) * item.quantidade
  }, 0)
}

export interface BouquetItem {
  materialId?: string
  florId?: string
  quantidade: number
}

export interface Bouquet {
  id: string
  nome: string
  itens: BouquetItem[]
  createdAt: string
}

export function calcularCustoBouquet(bouquet: Bouquet, materiais: Material[], flores: Flor[]): number {
  return bouquet.itens.reduce((total, item) => {
    if (item.materialId) {
      const material = materiais.find(m => m.id === item.materialId)
      if (!material) return total
      return total + getCustoUnitario(material) * item.quantidade
    }
    if (item.florId) {
      const flor = flores.find(f => f.id === item.florId)
      if (!flor) return total
      return total + calcularCustoFlor(flor, materiais) * item.quantidade
    }
    return total
  }, 0)
}
