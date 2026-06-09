import { getMateriais, getBuques, getFlores } from '@/lib/store'
import { BouquetForm } from './bouquet-form'
import { BouquetList } from './bouquet-list'

export default function BuquesPage() {
  const materiais = getMateriais()
  const flores = getFlores()
  const bouquets = getBuques()

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6">
      <h1 className="text-2xl font-bold">Buquês</h1>

      <BouquetForm materiais={materiais} flores={flores} />

      <div>
        <h2 className="mb-4 text-xl font-semibold">Buquês Criados</h2>
        <BouquetList bouquets={bouquets} materiais={materiais} flores={flores} />
      </div>
    </div>
  )
}
