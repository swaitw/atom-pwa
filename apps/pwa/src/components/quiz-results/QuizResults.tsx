import { logEvent } from "@/services/spycat";
import * as React from "react";
import { useLocale } from "@/hooks/useLocale";
import { useRateApp } from "@/hooks/useRateApp";
import { cn } from "@/utils/styles";
import Button from "@/components/shared/button/Button";
import Icon from "@/components/shared/icon/Icon";

export interface TestResultsProps {
  gaTestName: string;
  rightAnswers: number;
  wrongAnswers: number;
  onRepeat?: () => void;
  onRepeatWrongAnswers?: () => void;
}

function QuizResults({
  rightAnswers,
  wrongAnswers,
  onRepeat,
  onRepeatWrongAnswers,
  gaTestName,
}: TestResultsProps) {
  const total = rightAnswers + wrongAnswers;
  const percentage = total ? rightAnswers / total : 1;

  const { i18n } = useLocale();
  const goodResults = percentage > 0.7;

  React.useEffect(() => {
    if (total > 0) {
      logEvent("test", {
        event_action: `Finished a ${gaTestName}`,
        value: percentage,
      });
    }
  }, [total, percentage, gaTestName]);

  const { launchRateAppFlow } = useRateApp();

  React.useEffect(() => {
    if (goodResults) {
      launchRateAppFlow();
    }
  }, [goodResults, launchRateAppFlow]);

  const showRepeatWrong = onRepeatWrongAnswers && rightAnswers !== total;

  return (
    <div
      className={cn(
        "bg-danger-800 text-white",
        goodResults
          ? "bg-white text-accent-950 dark:bg-accent-900 dark:text-accent-50"
          : undefined,
      )}
    >
      <div className="p-4 pb-2 text-lg font-semibold">
        {i18n("test_results")}
      </div>
      <div className="flex justify-center pb-4 pt-2">
        <span className="text-9xl font-extralight">{rightAnswers}</span>

        <span className="self-end text-5xl font-extralight">/</span>

        <span className="self-end text-3xl">{total}</span>
      </div>
      <div>
        {onRepeat && (
          <Button
            className="flex items-center justify-start p-4"
            onClick={onRepeat}
          >
            <div className="flex items-center">
              <Icon name="replay" />
            </div>

            <div className="pl-4 text-base font-medium leading-none">
              {i18n("retake_full_test")}
            </div>
          </Button>
        )}
        {showRepeatWrong && (
          <Button
            className="flex items-center justify-start p-4"
            onClick={onRepeatWrongAnswers}
          >
            <div className="flex items-center">
              <Icon name="edit" />
            </div>

            <div className="pl-4 text-base font-medium leading-none">
              {i18n("retake_incorrect_answers")}
            </div>
          </Button>
        )}
      </div>
    </div>
  );
}

export default QuizResults;
