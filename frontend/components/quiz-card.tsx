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
  const [submittedQuestions, setSubmittedQuestions] = React.useState<Set<number>>(new Set());

  const handleLockQuestion = (index: number) => {
    setSubmittedQuestions((prev) => {
      const newSet = new Set(prev);
      newSet.add(index);
      return newSet;
    });
  };

  return (
    <div className="space-y-6">
      {quiz.map((q, qIndex) => {
        const isLocked = submittedQuestions.has(qIndex);
        const isCorrect =
          selectedAnswers[qIndex]?.toLowerCase() === q.answer.toLowerCase();

        return (
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
                  onValueChange={(value: string) => {
                    onAnswerChange(qIndex, value);
                    handleLockQuestion(qIndex);
                  }}
                  value={selectedAnswers[qIndex] ?? ""} // Safe access
                  disabled={isLocked}
                >
                  {q.options.map((option, oIndex) => (
                    <div
                      key={oIndex}
                      className="flex items-center space-x-2 my-2"
                    >
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
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={selectedAnswers[qIndex] || ""}
                      onChange={(e) => onAnswerChange(qIndex, e.target.value)}
                      className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-neon-cyan disabled:opacity-50"
                      placeholder="Your answer..."
                      disabled={isLocked}
                    />
                    {!isLocked && (
                      <Button
                        onClick={() => handleLockQuestion(qIndex)}
                        disabled={!selectedAnswers[qIndex]}
                        variant="secondary"
                        className="bg-neon-purple hover:bg-neon-cyan text-white"
                      >
                        Submit
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {isLocked && selectedAnswers[qIndex] && (
                <div className="mt-4 p-3 rounded-md bg-gray-900/50 border border-gray-700">
                  <p
                    className={`font-medium ${
                      isCorrect ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
                  </p>
                  {!isCorrect && (
                    <p className="text-gray-300 mt-1">
                      Correct Answer: <span className="text-neon-cyan">{q.answer}</span>
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
