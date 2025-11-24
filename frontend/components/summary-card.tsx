"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SummaryCardProps {
  summary: string;
}

export function SummaryCard({ summary }: SummaryCardProps) {
  return (
    <Card className="glassmorphic-card">
      <CardHeader>
        <CardTitle className="text-neon-cyan drop-shadow-neon-cyan">Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300">{summary}</p>
      </CardContent>
    </Card>
  );
}
