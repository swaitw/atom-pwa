import * as React from "react";
import { useLocale } from "@/hooks/useLocale";
import Button from "@/components/shared/button/Button";
import Card from "@/components/shared/card/Card";
import IconButton from "@/components/shared/icon-button/IconButton";
import Icon from "@/components/shared/icon/Icon";

interface TestEntryProps {
  title: string;
  description: string;
  testRoute: string;
  settingsRoute: string;
  onPracticeClick?: () => void;
  onSettingsClick?: () => void;
}

function TestEntry({
  title,
  description,
  onPracticeClick,
  onSettingsClick,
}: TestEntryProps) {
  const { i18n } = useLocale();

  return (
    <Card className="m-4 p-4 overflow-hidden" rounded={true}>
      <div className="flex items-center h-10">
        <div className="text-xl font-medium">{title}</div>

        <IconButton
          circle={true}
          className="ml-auto p-2"
          iconName="settings"
          onClick={onSettingsClick}
        />
      </div>

      <div className="text-base py-2 leading-[1.6]">{description}</div>

      <div className="flex justify-end -mx-4 -mb-4">
        <Button onClick={onPracticeClick} className="text-base text-accent-400">
          {i18n("practice")}
          <Icon name="arrow_forward" className="ml-2" />
        </Button>
      </div>
    </Card>
  );
}

export default TestEntry;
