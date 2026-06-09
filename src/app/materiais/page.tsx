import { getMateriais } from '@/lib/store'
import { MaterialForm } from './material-form'
import { MaterialList } from './material-list'

export default function MateriaisPage() {
  const materiais = getMateriais()

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6">
      <h1 className="text-2xl font-bold">Materiais</h1>

      <MaterialForm />

      {materiais.length === 0 ? (
        <p className="text-gray-500">Nenhum material cadastrado ainda.</p>
      ) : (
        <MaterialList materiais={materiais} />
      )}
    </div>
  )
}
