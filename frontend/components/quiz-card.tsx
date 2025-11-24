"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React from "react";

import { QuizQuestion } from "@/lib/types";

interface QuizCardProps {
  quiz: QuizQuestion[];
  selectedAnswers?: Record<number, string>; // Make optional
  onAnswerChange: (questionIndex: number, value: string) => void;
}

export function QuizCard({
  quiz,
  selectedAnswers = {}, // Provide default empty object
  onAnswerChange,
}: QuizCardProps) {
  return (
    <div className="space-y-6">
      {quiz.map((q, qIndex) => (
        <Card key={qIndex} className="glassmorphic-card">
          <CardHeader>
            <CardTitle className="text-neon-cyan drop-shadow-neon-cyan">
              Question {qIndex + 1}
            </CardTitle>

            <CardDescription className="text-gray-400">
              {q.options && Array.isArray(q.options)
                ? "Multiple Choice"
                : q.answer.toLowerCase() === "true" ||
                  q.answer.toLowerCase() === "false"
                ? "True/False"
                : "Short Answer"}
            </CardDescription>

            <CardDescription className="text-gray-200 pt-2">
              {q.question}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {q.options && Array.isArray(q.options) ? (
              <RadioGroup
                onValueChange={(value: string) => onAnswerChange(qIndex, value)}
                value={selectedAnswers[qIndex] ?? ""} // Safe access
              >
                {q.options.map((option, oIndex) => (
                  <div key={oIndex} className="flex items-center space-x-2 my-2">
                    <RadioGroupItem
                      value={option}
                      id={`q${qIndex}-o${oIndex}`}
                    />
                    <Label
                      htmlFor={`q${qIndex}-o${oIndex}`}
                      className="text-gray-300"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <input
                type="text"
                value={selectedAnswers[qIndex] || ""}
                onChange={(e) =>
                  onAnswerChange(qIndex, e.target.value)
                }
                className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-neon-cyan"
                placeholder="Your answer..."
              />
            )}

            {selectedAnswers[qIndex] && (
              <p
                className={`mt-2 text-sm ${
                  selectedAnswers[qIndex].toLowerCase() ===
                  q.answer.toLowerCase()
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                Your answer: {selectedAnswers[qIndex]}
                {selectedAnswers[qIndex].toLowerCase() !==
                  q.answer.toLowerCase() &&
                  ` (Correct: ${q.answer})`}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
