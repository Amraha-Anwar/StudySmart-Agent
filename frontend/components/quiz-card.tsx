"use client";

import * as RadioGroup from "@radix-ui/react-radio-group";
import { Check, X } from "lucide-react";
import React from "react";

import { QuizQuestion, resolveAnswer } from "@/lib/types";
import { cn } from "@/lib/utils";

interface QuizCardProps {
  quiz: QuizQuestion[];
  selectedAnswers?: Record<number, string>; // Make optional
  onAnswerChange: (questionIndex: number, value: string) => void;
}

// Splits "B. Thylakoid" into its letter and text so the letter can sit in a badge
function splitOption(option: string, index: number) {
  const match = option.match(/^\s*([A-Da-d])\s*[.)]\s*(.*)$/);
  return match
    ? { letter: match[1].toUpperCase(), text: match[2] }
    : { letter: String.fromCharCode(65 + index), text: option };
}

export function QuizCard({
  quiz,
  selectedAnswers = {}, // Provide default empty object
  onAnswerChange,
}: QuizCardProps) {
  return (
    <ol className="lift divide-y divide-rule overflow-hidden rounded-xl bg-sheet text-ink">
      {quiz.map((q, qIndex) => {
        const selected = selectedAnswers[qIndex];
        // Answers lock as soon as an option is chosen
        const isLocked = selected !== undefined;
        const correctAnswer = resolveAnswer(q);
        const isCorrect = selected === correctAnswer;
        const correctIndex = q.options.indexOf(correctAnswer);
        const questionId = `q${qIndex}`;

        return (
          <li key={qIndex} className="flex gap-3 p-5 sm:gap-5 sm:p-8">
            <span className="w-6 shrink-0 pt-0.5 text-right text-sm font-semibold tabular-nums text-pen">
              {qIndex + 1}
            </span>

            <div className="min-w-0 flex-1">
              <p id={questionId} className="font-serif text-[1.125rem] leading-[1.55] sm:text-[1.1875rem]">
                {q.question}
              </p>

              <RadioGroup.Root
                aria-labelledby={questionId}
                onValueChange={(value: string) => onAnswerChange(qIndex, value)}
                value={selected ?? ""} // Safe access
                disabled={isLocked}
                className="mt-5 grid gap-2"
              >
                {q.options.map((option, oIndex) => {
                  const { letter, text } = splitOption(option, oIndex);
                  const isAnswer = isLocked && option === correctAnswer;
                  const isWrongPick = isLocked && option === selected && !isCorrect;

                  return (
                    <RadioGroup.Item
                      key={oIndex}
                      value={option}
                      className={cn(
                        "group flex w-full items-start gap-3 rounded-md border px-3.5 py-3 text-left text-[0.9375rem] leading-snug transition-colors duration-150",
                        !isLocked && "border-rule hover:border-pen/50 hover:bg-pen-wash/60",
                        isAnswer && "border-correct bg-correct/[0.07] shadow-[0_0_18px_-4px_rgba(46,125,87,0.55)]",
                        isWrongPick && "border-margin bg-margin/[0.06] shadow-[0_0_18px_-4px_rgba(194,54,68,0.5)]",
                        isLocked && !isAnswer && !isWrongPick && "border-rule/70 text-ink-soft"
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-6 shrink-0 place-items-center rounded-[4px] border text-xs font-semibold",
                          !isLocked && "border-rule group-hover:border-pen/50 group-hover:text-pen",
                          isAnswer && "border-correct bg-correct text-white",
                          isWrongPick && "border-margin bg-margin text-white",
                          isLocked && !isAnswer && !isWrongPick && "border-rule/70"
                        )}
                      >
                        {isAnswer ? (
                          <Check className="size-3.5" strokeWidth={3} />
                        ) : isWrongPick ? (
                          <X className="size-3.5" strokeWidth={3} />
                        ) : (
                          letter
                        )}
                      </span>
                      <span className="pt-0.5">{text}</span>
                    </RadioGroup.Item>
                  );
                })}
              </RadioGroup.Root>

              <p aria-live="polite" className={cn("text-sm font-semibold", isLocked && "mt-4")}>
                {isLocked &&
                  (isCorrect ? (
                    <span className="text-correct">Correct.</span>
                  ) : (
                    <span className="text-margin">
                      Incorrect. The answer is {correctIndex >= 0 ? splitOption(correctAnswer, correctIndex).letter : correctAnswer}.
                    </span>
                  ))}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
