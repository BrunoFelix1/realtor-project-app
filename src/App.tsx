import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "./components/ui/card"

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Card>
        <CardHeader>
          Teste
        </CardHeader>
      <Button className="bg-black text-white">ola mundo, testando o tailwind e o shadcn</Button>

      </Card>
    </div>
  )
}

export default App