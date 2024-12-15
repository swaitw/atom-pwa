import * as React from "react";
import { useLocale } from "@/hooks/useLocale";
import { useTheme, THEMES_LIST } from "@/hooks/useTheme";
import IconButton from "@/components/shared/icon-button/IconButton";
import SelectorModal, {
  SelectorModalOption,
} from "@/components/shared/selector-modal/SelectorModal";

function ThemeSelector() {
  const { i18n } = useLocale();
  const { setTheme } = useTheme();
  const [selectorOpen, setSelectorOpen] = React.useState(false);

  const options = React.useMemo(
    () =>
      THEMES_LIST.map((theme) => ({
        key: theme,
        text: i18n("theme_" + theme),
      })),
    [i18n],
  );

  function closeSelector() {
    setSelectorOpen(false);
  }

  function openSelector() {
    setSelectorOpen(true);
  }

  function onOptionSelected(option: SelectorModalOption) {
    const theme = option.key;
    setTheme(theme);
    closeSelector();
  }
  return (
    <>
      <IconButton
        iconName="format_paint"
        text={i18n("change_theme")}
        onClick={openSelector}
      />

      <SelectorModal
        className="h-auto max-h-[80%] max-w-[288px] overflow-hidden bg-white p-0 text-accent-950 dark:bg-accent-900 dark:text-accent-50"
        title={i18n("change_theme")}
        closeButton={true}
        onOptionSelected={onOptionSelected}
        options={options}
        open={selectorOpen}
        onClose={closeSelector}
      />
    </>
  );
}

export default ThemeSelector;
