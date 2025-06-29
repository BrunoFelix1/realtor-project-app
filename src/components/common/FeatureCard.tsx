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
    <Card className="h-full flex flex-col items-center justify-between py-5 px-2">
      <CardHeader className="flex flex-col items-center gap-1 pb-1 pt-0">
        {icon}
        <CardTitle className="text-base mt-1 mb-0 font-semibold text-center leading-tight">
          {title}
        </CardTitle>
      </CardHeader>
      <div className="text-center text-sm text-muted-foreground px-2 mb-2 mt-0 leading-snug">
        {description}
      </div>
      <CardAction className="flex justify-center w-full pt-0 pb-2">
        <Button asChild size="sm">
          <Link to={to}>Acessar</Link>
        </Button>
      </CardAction>
    </Card>
  );
}
