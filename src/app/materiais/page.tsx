import { getMateriais } from '@/lib/store'
import { MaterialForm } from './material-form'
import { MaterialList } from './material-list'
import { NavigationTabs } from '@/components/navigation-tabs'

export default function MateriaisPage() {
  const materiais = getMateriais()

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
      <NavigationTabs />
      <div className="mt-5 overflow-hidden rounded-[2rem] border border-rose-200/70 bg-rose-50/85 p-5 shadow-2xl shadow-rose-200/50 backdrop-blur-2xl sm:p-7">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-500">
            Materiais
          </p>
          <h1 className="mt-1 font-serif text-3xl font-semibold text-rose-950 sm:text-4xl">
            Novo Material
          </h1>
        </div>

        <MaterialForm />

        {materiais.length > 0 && (
          <div className="mt-8 border-t border-rose-100 pt-6">
            <MaterialList materiais={materiais} />
          </div>
        )}
      </div>
    </section>
  )
}
