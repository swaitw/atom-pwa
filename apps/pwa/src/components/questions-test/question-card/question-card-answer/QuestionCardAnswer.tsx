import * as React from "react";
import Button, { ButtonProps } from "@/components/shared/button/Button";

import { cn } from "@/utils/styles";

export interface Answer {
  answer: string;
  right: boolean;
}

interface QuestionCardAnswerProps extends Omit<ButtonProps, "children"> {
  answer: Answer;
  index: number;
}

function QuestionCardAnswer({
  answer: { answer, right },
  index,
  onClick,
}: QuestionCardAnswerProps) {
  const [clicked, setClicked] = React.useState(false);

  React.useEffect(() => {
    setClicked(false);
  }, [answer]);

  const onButtonClick = React.useCallback(() => {
    setClicked(true);
    onClick?.();
  }, [onClick]);

  const isWrong = clicked && !right;

  return (
    <Button
      className={cn(
        "min-w-[50%] flex-1 font-bold",
        isWrong && "text-danger-400"
      )}
      onClick={onButtonClick}
      id={`question-answer-${index}`}
    >
      {answer}
    </Button>
  );
}

export default QuestionCardAnswer;
