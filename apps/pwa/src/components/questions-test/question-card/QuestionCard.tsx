import * as React from "react";
import Card from "@/components/shared/card/Card";
import QuestionCardAnswer, {
  Answer,
} from "./question-card-answer/QuestionCardAnswer";
import { cn } from "@/utils/styles";

export interface Question {
  question: string;
  answers: Answer[];
  questionClass?: string;
}

interface QuestionCardProps {
  title: string;
  question: Question;
  onAnswerClick?: (answer: Answer) => void;
}

function QuestionCard({ question, title, onAnswerClick }: QuestionCardProps) {
  const onQuestionCardAnswerClickListener = React.useCallback(
    (answer: Answer) => {
      return () => onAnswerClick?.(answer);
    },
    [onAnswerClick],
  );

  return (
    <Card className="m-4 flex flex-col" rounded>
      <div className="p-4">{title}</div>

      <div
        className={cn(
          "flex items-center justify-center p-4",
          !question.questionClass && "text-5xl font-bold",
          question.questionClass,
        )}
        aria-live="polite"
        data-testid="question-title"
      >
        {question.question}
      </div>

      <div className="flex flex-wrap">
        {question.answers.map((answer, index) => (
          <QuestionCardAnswer
            key={`${question.question}-${answer.answer}`}
            answer={answer}
            onClick={onQuestionCardAnswerClickListener(answer)}
            index={index}
          />
        ))}
      </div>
    </Card>
  );
}

export default QuestionCard;
