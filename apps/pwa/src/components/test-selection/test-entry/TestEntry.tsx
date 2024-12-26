import * as React from "react";
import { useLocale } from "#src/hooks/useLocale";
import Button from "#src/components/shared/button/Button";
import Card from "#src/components/shared/card/Card";
import IconButton from "#src/components/shared/icon-button/IconButton";
import Icon from "#src/components/shared/icon/Icon";

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
    <Card className="m-4 overflow-hidden p-4" rounded={true}>
      <div className="flex h-10 items-center">
        <div className="text-xl font-medium">{title}</div>

        <IconButton
          circle={true}
          className="ml-auto p-2"
          iconName="settings"
          onClick={onSettingsClick}
        />
      </div>

      <div className="py-2 text-base leading-[1.6]">{description}</div>

      <div className="-mx-4 -mb-4 flex justify-end">
        <Button onClick={onPracticeClick} className="text-base text-accent-400">
          {i18n("practice")}
          <Icon name="arrow_forward" className="ml-2" />
        </Button>
      </div>
    </Card>
  );
}

export default TestEntry;
