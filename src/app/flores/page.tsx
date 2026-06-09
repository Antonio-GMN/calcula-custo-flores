import { getMateriais, getFlores } from '@/lib/store'
import { FlorForm } from './flor-form'
import { FlorList } from './flor-list'

export default function FloresPage() {
  const materiais = getMateriais()
  const flores = getFlores()

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6">
      <h1 className="text-2xl font-bold">Flores</h1>

      <FlorForm materiais={materiais} />

      <div>
        <h2 className="mb-4 text-xl font-semibold">Flores Criadas</h2>
        <FlorList flores={flores} materiais={materiais} />
      </div>
    </div>
  )
}
