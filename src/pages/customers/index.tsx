

export default function Customers() {
  return (
    <main className="w-full min-h-[85vh] bg-gradient-to-br from-card to-background flex flex-col items-center justify-start pt-16 px-4">
      <section className="flex flex-col items-center text-center mb-10">
        <h1 className="text-5xl font-extrabold text-primary font-quicksand mb-3 drop-shadow-sm tracking-tight">
          Clientes
        </h1>
        <p className="text-lg text-muted-foreground mb-0 max-w-xl">
          Gerencie seus clientes de forma eficiente.
        </p>
      </section>
      <section className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-0">
        {/* Aqui você pode adicionar cards ou componentes relacionados aos clientes */}
      </section>
    </main>
  );
}