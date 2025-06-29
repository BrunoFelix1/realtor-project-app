import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { login as loginService } from "./api/authService";
import { User, Lock, Building2 } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await loginService(email, password);
      if (result.token) {
        if (remember) {
          localStorage.setItem("token", result.token);
        } else {
          sessionStorage.setItem("token", result.token);
        }
        navigate("/home");
      } else {
        setError("Token não recebido do servidor");
      }
    } catch (err: any) {
      setError(err.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-primary/5 px-2 font-quicksand">
      <div className="flex w-full max-w-4xl bg-card/90 rounded-3xl shadow-2xl overflow-hidden">
        {/* Lado esquerdo: Boas-vindas */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-primary to-primary/60 p-10 relative text-white">
          <div className="absolute inset-0 z-0">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 400 400"
              fill="none"
              className="absolute top-0 left-0 opacity-30"
            >
              <circle
                cx="200"
                cy="200"
                r="200"
                fill="#fff"
                fillOpacity="0.05"
              />
            </svg>
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
              className="absolute top-10 left-10 opacity-40"
            >
              <path
                d="M60 0C93.1371 0 120 26.8629 120 60C120 93.1371 93.1371 120 60 120C26.8629 120 0 93.1371 0 60C0 26.8629 0 60 0Z"
                fill="#fff"
                fillOpacity="0.07"
              />
            </svg>
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              className="absolute bottom-10 right-10 opacity-30"
            >
              <rect
                width="80"
                height="80"
                rx="40"
                fill="#fff"
                fillOpacity="0.08"
              />
            </svg>
          </div>
          <div className="relative z-10 flex flex-col items-center">
            <Building2 className="w-16 h-16 mb-4 text-white drop-shadow-lg" />
            <h2 className="text-3xl font-extrabold mb-2 font-quicksand">
              RealtorApp
            </h2>

          </div>
        </div>
        {/* Lado direito: Formulário */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 bg-card/95">
          <Card className="w-full max-w-md p-0 shadow-none border-none bg-transparent flex flex-col items-center">
            <Building2 className="w-12 h-12 text-primary mb-2" />
            <h1 className="text-2xl font-extrabold text-foreground mb-1 tracking-tight w-full text-center font-quicksand">
              Entrar
            </h1>
            <form
              className="w-full flex flex-col gap-5 mt-2"
              onSubmit={handleSubmit}
              autoComplete="on"
            >
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <User className="w-5 h-5" />
                  </span>
                  <Input
                    id="email"
                    type="email"
                    placeholder="E-mail"
                    className="h-11 pl-10 pr-4 text-base border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 transition rounded-full font-quicksand"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="username"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Lock className="w-5 h-5" />
                  </span>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Senha"
                    className="h-11 pl-10 pr-4 text-base border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 transition rounded-full font-quicksand"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>
              </div>
              <div className="flex items-center text-sm mt-1">
                <label className="flex items-center gap-2 select-none">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={() => setRemember((v) => !v)}
                    className="accent-primary w-4 h-4 rounded border-input focus:ring-primary"
                  />
                  Lembrar-me
                </label>
              </div>
              {error && (
                <div className="bg-destructive/10 border border-destructive/30 text-destructive text-sm rounded-md px-3 py-2 text-center font-medium animate-fade-in">
                  {error}
                </div>
              )}
              <Button
                type="submit"
                className="w-full h-11 rounded-full font-bold text-base bg-primary text-primary-foreground transition-colors shadow-md mt-2 font-quicksand"
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
            <div className="w-full text-center text-xs text-muted-foreground py-0 font-quicksand mt-4">
              © {new Date().getFullYear()} Programação 4. Todos os direitos reservados.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}