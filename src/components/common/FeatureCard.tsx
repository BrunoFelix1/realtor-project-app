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
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="flex flex-col items-center gap-2 pb-2">
        {icon}
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <div className="text-center text-sm text-muted-foreground px-4 pb-2 flex-1 flex items-center justify-center">
        {description}
      </div>
      <CardAction className="flex justify-center w-full pb-4">
        <Button asChild size="sm">
          <Link to={to}>Acessar</Link>
        </Button>
      </CardAction>
    </Card>
  );
}
