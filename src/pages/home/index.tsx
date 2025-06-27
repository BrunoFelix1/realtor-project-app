import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NavigationMenu, NavigationMenuItem } from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Wallet, FileText, Wrench } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-[#F9FAFB] text-[#1F2937] font-sans">
      {/* 1. Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-[#E5E7EB] px-6 py-4 flex justify-between items-center z-50">
        <h1 className="text-xl font-bold">Gestão Fácil</h1>
        <nav className="flex gap-6 items-center">
          <NavigationMenu>
            <NavigationMenuItem>Recursos</NavigationMenuItem>
            <NavigationMenuItem>Preços</NavigationMenuItem>
            <NavigationMenuItem>Depoimentos</NavigationMenuItem>
          </NavigationMenu>
          <Button variant="ghost">Login</Button>
          <Button className="bg-[#3B82F6] text-white">Começar Grátis</Button>
        </nav>
      </header>

      {/* 2. Hero Section */}
      <section className="pt-32 pb-20 text-center px-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">A gestão de aluguéis, finalmente simplificada.</h1>
        <p className="text-muted-foreground mb-6 text-lg">
          Automatize cobranças, gerencie contratos e centralize a comunicação com seus inquilinos. Menos burocracia, mais rentabilidade.
        </p>
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <Button size="lg" className="bg-[#3B82F6] text-white">Iniciar meu teste de 14 dias</Button>
          <Button variant="outline" size="lg">Agendar uma demonstração</Button>
        </div>
        <img
          src="/dashboard-demo.png"
          alt="Dashboard simplificado"
          className="mx-auto rounded-xl shadow-md"
        />
      </section>

      {/* 3. Features */}
      <section className="px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-12">Tudo o que você precisa em um só lugar</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <Wallet className="w-6 h-6 text-[#3B82F6]" />
              <CardTitle>Cobrança Automatizada</CardTitle>
              <CardDescription>
                Configure boletos e lembretes automáticos. Diga adeus aos atrasos e à cobrança manual.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <FileText className="w-6 h-6 text-[#3B82F6]" />
              <CardTitle>Gestão de Contratos</CardTitle>
              <CardDescription>
                Armazene e gerencie todos os seus contratos digitalmente, com alertas de vencimento.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Wrench className="w-6 h-6 text-[#3B82F6]" />
              <CardTitle>Solicitações de Manutenção</CardTitle>
              <CardDescription>
                Receba e organize os pedidos de manutenção dos seus inquilinos de forma centralizada.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* 4. Depoimentos */}
      <section className="bg-white py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">O que nossos clientes dizem</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardContent className="flex gap-4 items-center">
              <Avatar>
                <AvatarImage src="/avatar1.jpg" />
                <AvatarFallback>JM</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">Júlia M. - Proprietária de 3 imóveis</p>
                <p className="text-muted-foreground">
                  "O Gestão Fácil transformou a maneira como administro meus apartamentos. Economizo pelo menos 5 horas por semana!"
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex gap-4 items-center">
              <Avatar>
                <AvatarImage src="/avatar2.jpg" />
                <AvatarFallback>CL</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">Carlos L. - Pequeno investidor</p>
                <p className="text-muted-foreground">
                  "Nunca mais precisei lembrar vencimentos de contrato. Tudo automatizado e claro. Excelente sistema!"
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="py-16 px-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Perguntas Frequentes</h2>
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="seguranca">
            <AccordionTrigger>Meus dados e dos meus inquilinos estão seguros?</AccordionTrigger>
            <AccordionContent>
              Sim. Utilizamos criptografia de ponta e seguimos as melhores práticas de segurança para garantir a proteção de todos os dados.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="limite">
            <AccordionTrigger>Existe um limite de imóveis que posso cadastrar?</AccordionTrigger>
            <AccordionContent>
              Nossos planos se adaptam às suas necessidades, desde um único imóvel até um portfólio completo.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* 6. Call to Action Final */}
      <section className="bg-[#3B82F6] text-white py-16 text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Pronto para otimizar a gestão dos seus imóveis?</h2>
        <p className="mb-6 text-lg">Sem cartão de crédito. Cancele quando quiser.</p>
        <Button size="lg" className="bg-white text-[#3B82F6] hover:bg-gray-100">
          Comece a usar gratuitamente
        </Button>
      </section>

      {/* 7. Footer */}
      <footer className="bg-white py-12 px-6 border-t border-[#E5E7EB] mt-10">
        <div className="grid md:grid-cols-4 gap-8 text-sm max-w-6xl mx-auto">
          <div>
            <h3 className="font-bold text-lg mb-2">Gestão Fácil</h3>
            <p className="text-muted-foreground">&copy; {new Date().getFullYear()} Todos os direitos reservados.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Produto</h4>
            <ul className="space-y-1">
              <li>Recursos</li>
              <li>Preços</li>
              <li>Login</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Empresa</h4>
            <ul className="space-y-1">
              <li>Sobre Nós</li>
              <li>Contato</li>
              <li>Carreiras</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Legal</h4>
            <ul className="space-y-1">
              <li>Termos de Serviço</li>
              <li>Política de Privacidade</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
