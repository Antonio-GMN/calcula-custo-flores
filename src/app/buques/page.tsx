import { getMateriais, getBuques, getFlores } from '@/lib/store'
import { BouquetForm } from './bouquet-form'
import { BouquetList } from './bouquet-list'
import { NavigationTabs } from '@/components/navigation-tabs'

export default function BuquesPage() {
  const materiais = getMateriais()
  const flores = getFlores()
  const bouquets = getBuques()

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
      <NavigationTabs />
      <div className="mt-5 overflow-hidden rounded-[2rem] border border-rose-200/70 bg-rose-50/85 p-5 shadow-2xl shadow-rose-200/50 backdrop-blur-2xl sm:p-7">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-500">
            Buquês
          </p>
          <h1 className="mt-1 font-serif text-3xl font-semibold text-rose-950 sm:text-4xl">
            Cadastro de Buquês
          </h1>
        </div>

        <BouquetForm materiais={materiais} flores={flores} />

        <div className="mt-8 border-t border-rose-100 pt-6">
          <h2 className="mb-4 text-lg font-semibold text-rose-900/80">Buquês Criados</h2>
          <BouquetList bouquets={bouquets} materiais={materiais} flores={flores} />
        </div>
      </div>
    </section>
  )
}
