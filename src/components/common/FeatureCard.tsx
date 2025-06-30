import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardAction } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  to: string;
}

export function FeatureCard({ icon, title, description, to }: FeatureCardProps) {
  return (
    <Card className="h-full flex flex-col items-center justify-between py-7 px-4 rounded-2xl shadow-md border border-border bg-white/90 hover:shadow-xl hover:border-primary/60 hover:-translate-y-1 transition-all duration-200 group">
      <CardHeader className="flex flex-col items-center gap-2 pb-1 pt-0">
        <span className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary shadow w-12 h-12 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
          {icon}
        </span>
        <CardTitle className="text-lg mt-2 mb-0 font-bold text-center leading-tight text-primary group-hover:text-primary/90">
          {title}
        </CardTitle>
      </CardHeader>
      <div className="text-center text-sm text-muted-foreground px-2 mb-4 mt-0 leading-snug min-h-[40px]">
        {description}
      </div>
      <CardAction className="flex justify-center w-full pt-0 pb-2">
        <Button asChild size="lg" className="w-full rounded-full font-semibold shadow-md group-hover:bg-primary/90 group-hover:text-white transition-all">
          <Link to={to}>Acessar</Link>
        </Button>
      </CardAction>
    </Card>
  );
}
