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
          ? "bg-white dark:bg-slate-900 text-slate-950 dark:text-slate-50"
          : undefined
      )}
    >
      <div className="p-4 pb-2 font-semibold text-lg">
        {i18n("test_results")}
      </div>
      <div className="flex justify-center pt-2 pb-4">
        <span className="text-9xl font-extralight">{rightAnswers}</span>

        <span className="text-5xl font-extralight self-end">/</span>

        <span className="text-3xl self-end">{total}</span>
      </div>
      <div>
        {onRepeat && (
          <Button
            className="justify-start p-4 flex items-center"
            onClick={onRepeat}
          >
            <div className="flex items-center">
              <Icon name="replay" />
            </div>

            <div className="font-medium text-base pl-4 leading-none">
              {i18n("retake_full_test")}
            </div>
          </Button>
        )}
        {showRepeatWrong && (
          <Button
            className="justify-start p-4 flex items-center"
            onClick={onRepeatWrongAnswers}
          >
            <div className="flex items-center">
              <Icon name="edit" />
            </div>

            <div className="font-medium text-base pl-4 leading-none">
              {i18n("retake_incorrect_answers")}
            </div>
          </Button>
        )}
      </div>
    </div>
  );
}

export default QuizResults;
