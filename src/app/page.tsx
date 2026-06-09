import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center justify-center p-6 text-center">
      <div className="space-y-6 py-16">
        <h1 className="text-4xl font-bold tracking-tight">
          Controle de Custos para{" "}
          <span className="text-pink-600">Flores Artesanais</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-gray-600">
          Cadastre os materiais que você usa na criação de suas flores e
          descubra o custo de produção de cada buquê.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/materiais"
            className="rounded-md bg-pink-600 px-6 py-3 text-sm font-medium text-white hover:bg-pink-700"
          >
            Gerenciar Materiais
          </Link>
          <Link
            href="/flores"
            className="rounded-md border border-pink-600 px-6 py-3 text-sm font-medium text-pink-600 hover:bg-pink-50"
          >
            Gerenciar Flores
          </Link>
          <Link
            href="/buques"
            className="rounded-md border border-pink-600 px-6 py-3 text-sm font-medium text-pink-600 hover:bg-pink-50"
          >
            Calcular Buquês
          </Link>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-lg border p-6 text-left">
          <h2 className="mb-2 font-semibold">📦 Cadastro de Materiais</h2>
          <p className="text-sm text-gray-600">
            Registre todos os insumos: fitas, tecidos, arames, pérolas,
            cola, e qualquer material com seu custo por unidade.
          </p>
        </div>
        <div className="rounded-lg border p-6 text-left">
          <h2 className="mb-2 font-semibold">🌷 Cadastro de Flores</h2>
          <p className="text-sm text-gray-600">
            Crie flores personalizadas combinando materiais. Cada flor
            tem seu custo calculado automaticamente.
          </p>
        </div>
        <div className="rounded-lg border p-6 text-left">
          <h2 className="mb-2 font-semibold">💐 Cálculo de Buquês</h2>
          <p className="text-sm text-gray-600">
            Monte seus buquês selecionando materiais e flores. O
            custo total é calculado automaticamente.
          </p>
        </div>
      </div>
    </div>
  );
}
