import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Element } from "@/Element";
import { ElementsSettings } from "@/hooks/useSettings";
import { useElements } from "@/hooks/useElements";
import { useLocale } from "@/hooks/useLocale";
import { TEST_PERIODIC_TABLE_SETTINGS, TEST_SELECTION } from "@/routes";
import { shuffle } from "@/utils/shuffle";
import PeriodicTable from "@/components/periodic-table/PeriodicTable";
import PtElementTest from "@/components/pt-element/PtElementTest";
import Card from "@/components/shared/card/Card";
import Navbar from "@/components/shared/navbar/Navbar";
import SwipeableModal from "@/components/shared/swipeable-modal/SwipeableModal";
import QuizResults from "@/components/quiz-results/QuizResults";
import { usePeriodicTableTestSettings } from "./hooks/usePeriodicTableTestSettings";
import { useAddRecent } from "@/hooks/useRecent";
import { useConfirm } from "@/components/shared/confirm";
import { usePreventDocumentOverscroll } from "@/hooks/usePreventDocumentOverscroll";
import { cn } from "@/utils/styles";

interface PeriodicTableTestQuestion {
  element: Element;
}

function PeriodicTableTest() {
  const navigate = useNavigate();
  const { i18n } = useLocale();
  const { getElement } = useElements();
  const { confirmAction } = useConfirm();

  useAddRecent("periodic-table-quiz");
  usePreventDocumentOverscroll();

  const { settings, updateSettings, isElementAvailable } =
    usePeriodicTableTestSettings();

  const createTestQuestions = React.useCallback(
    (settings: ElementsSettings) => {
      if (!settings.elements) {
        return [];
      }

      const questions = settings.elements
        .filter(
          (element) => isElementAvailable(element.atomic) && element.enabled,
        )
        .map((elementSetting) => getElement(elementSetting.atomic))
        .map((element) => ({ element: element as Element }));

      return shuffle(questions);
    },
    [getElement, isElementAvailable],
  );

  const [questionModalOpen, setQuestionModalOpen] = React.useState(true);
  const [questions, setQuestions] = React.useState<PeriodicTableTestQuestion[]>(
    () => createTestQuestions(settings),
  );
  const [wrongAnswers, setWrongAnswers] = React.useState<
    PeriodicTableTestQuestion[]
  >([]);
  const [rightAnswers, setRightAnswers] = React.useState<
    PeriodicTableTestQuestion[]
  >([]);

  const currentQuestion = questions.length ? questions[0] : null;

  function onNavbarBackButtonClick() {
    navigate(TEST_SELECTION);
  }

  function elementRenderer(atomic: number) {
    const element = getElement(atomic);
    if (!element) return null;
    return (
      <PtElementTest
        discovered={!isElementInQuestions(element)}
        element={element}
        onClick={elementOnClick}
        shouldShowError={!isAnswerRight(element)}
      />
    );
  }

  function elementOnClick(element: Element) {
    onUserAnswer(element);
  }

  function onUserAnswer(element: Element) {
    if (!isElementInQuestions(element)) {
      return;
    }

    const currentQuestion = getCurrentQuestion();
    const alreadyAnswered = isAlreadyAnswered(
      currentQuestion as PeriodicTableTestQuestion,
    );
    const rightAnswer = isAnswerRight(element);

    if (!alreadyAnswered) {
      updateSettings((settings) => {
        const elementSetting = settings.elements?.find(
          (setting) => setting.atomic === currentQuestion?.element.atomic,
        );

        if (!elementSetting) {
          return;
        }

        elementSetting.stats.times++;

        if (rightAnswer) {
          elementSetting.stats.right++;
        } else {
          elementSetting.stats.wrong++;
        }
      });

      if (rightAnswer) {
        addRightAnsweredQuestion(currentQuestion as PeriodicTableTestQuestion);
      } else {
        addWrongAnsweredQuestion(currentQuestion as PeriodicTableTestQuestion);
      }
    }

    if (rightAnswer) {
      removeCurrentQuestion();
    }
  }

  function removeCurrentQuestion() {
    const currentQuestion = questions[0];

    setQuestions(questions.filter((question) => question !== currentQuestion));
  }

  function isAnswerRight(element: Element): boolean {
    const currentQuestion = getCurrentQuestion();

    if (!currentQuestion) {
      return false;
    }

    const currentElement = currentQuestion.element;
    if (currentElement.atomic === element.atomic) {
      return true;
    }

    return false;
  }

  function getCurrentQuestion(): PeriodicTableTestQuestion | null {
    return questions.length ? questions[0] : null;
  }

  function isElementInQuestions(element: Element): boolean {
    return !!questions.find(
      (question) => question.element.atomic === element.atomic,
    );
  }

  function openQuestionModal() {
    setQuestionModalOpen(true);
  }

  function closeQuestionModal() {
    setQuestionModalOpen(false);
  }

  function isAlreadyAnswered(question: PeriodicTableTestQuestion): boolean {
    return [...rightAnswers, ...wrongAnswers].indexOf(question) !== -1;
  }

  function addRightAnsweredQuestion(question: PeriodicTableTestQuestion) {
    setRightAnswers([...rightAnswers, question]);
  }

  function addWrongAnsweredQuestion(question: PeriodicTableTestQuestion) {
    setWrongAnswers([...wrongAnswers, question]);
  }

  function clearWrongResults() {
    setWrongAnswers([]);
  }

  function clearRightResults() {
    setRightAnswers([]);
  }

  function clearResults() {
    clearWrongResults();
    clearRightResults();
  }

  function repeatTest() {
    clearResults();
    setQuestions(createTestQuestions(settings));
  }

  function repeatWrongAnswers() {
    setQuestions(shuffle(wrongAnswers));
    clearWrongResults();
  }

  return (
    <div className="flex flex-col h-full">
      <Navbar
        title="Periodic Table Test"
        className="shadow-sm z-[1]"
        onBackButtonClick={() =>
          confirmAction({
            title: i18n("are_you_sure"),
            message: i18n("confirm_exit_quiz_message"),
            onConfirm: () => onNavbarBackButtonClick(),
          })
        }
        rightButton={{
          iconName: "settings",
          label: i18n("Settings"),
          onClick: () =>
            confirmAction({
              title: i18n("are_you_sure"),
              message: i18n("confirm_exit_quiz_message"),
              onConfirm: () => navigate(TEST_PERIODIC_TABLE_SETTINGS),
            }),
        }}
      />

      {currentQuestion && (
        <div className="flex-1 z-[1]">
          <PeriodicTable elementRenderer={elementRenderer} />
        </div>
      )}

      {!currentQuestion && (
        <div className="flex-1 flex items-center justify-center">
          <Card className="m-4 max-w-[360px] w-full" rounded>
            <QuizResults
              gaTestName="Periodic Table Test"
              wrongAnswers={wrongAnswers.length}
              rightAnswers={rightAnswers.length}
              onRepeat={repeatTest}
              onRepeatWrongAnswers={repeatWrongAnswers}
            />
          </Card>
        </div>
      )}

      <SwipeableModal
        className="max-w-[288px] max-h-[80%] h-auto p-0 shadow-md"
        open={questionModalOpen}
        onClose={closeQuestionModal}
        title={i18n("complete_the_table")}
        closeButton={true}
      >
        {currentQuestion && (
          <div
            className={cn(
              "flex items-center justify-center p-4 text-5xl font-bold",
              "element",
              currentQuestion.element.group,
            )}
          >
            {currentQuestion.element.symbol}
          </div>
        )}

        <div className="p-4 opacity-65">{i18n("complete_the_table_desc")}</div>
      </SwipeableModal>

      {currentQuestion && (
        <div className=" rounded-full flex items-center justify-center h-20 w-20 z-10 shadow-lg bg-white dark:bg-accent-900 fixed left-[calc(24px_+_var(--safe-area-inset-left,0px))] bottom-[calc(32px_+_var(--safe-area-inset-bottom,0px))]">
          <button
            className={cn(
              "rounded-full font-semibold [text-transform:_none] w-full text-2xl h-full cursor-pointer border-0",
              "element",
              currentQuestion.element.group,
            )}
            onClick={openQuestionModal}
            aria-live="polite"
          >
            {currentQuestion.element.symbol}

            <div
              className="shadow-lg absolute bottom-0 right-0 flex items-center justify-center rounded-full text-xs h-6 w-6 bg-white text-accent-950 dark:bg-accent-900 dark:text-accent-50"
              aria-label={i18n("help")}
            >
              ?
            </div>
          </button>
        </div>
      )}
    </div>
  );
}

export default PeriodicTableTest;
