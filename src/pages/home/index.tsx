import { Building2, User, Calendar, KeyRound } from "lucide-react";
import { FeatureCard } from "@/components/common/FeatureCard";

export default function Home() {
  return (
    <main className="w-full min-h-[90vh] bg-gradient-to-br from-card to-background flex flex-col items-center justify-start pt-16 px-4">
      <section className="flex flex-col items-center text-center mb-10">
        <Building2 className="w-20 h-20 text-primary mb-6 drop-shadow-lg" />
        <h1 className="text-5xl font-extrabold text-primary font-quicksand mb-3 drop-shadow-sm tracking-tight">
          RealtorApp
        </h1>
        <p className="text-lg text-muted-foreground mb-0 max-w-xl">
          Gestão imobiliária fácil e rápida.
        </p>
      </section>
      <section className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-0">
        <FeatureCard
          icon={<User className="w-10 h-10 text-primary" />}
          title="Clientes"
          description="Gerencie seus clientes."
          to="/customers"
        />
        <FeatureCard
          icon={<Building2 className="w-10 h-10 text-primary" />}
          title="Propriedades"
          description="Controle seus imóveis."
          to="/properties"
        />
        <FeatureCard
          icon={<Calendar className="w-10 h-10 text-primary" />}
          title="Visitas"
          description="Agende visitas."
          to="/visits"
        />
        <FeatureCard
          icon={<KeyRound className="w-10 h-10 text-primary" />}
          title="Aluguéis"
          description="Gerencie contratos."
          to="/rentals"
        />
      </section>
    </main>
  );
}
