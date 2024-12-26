import * as React from "react";
import { useLocale, SUPPORTED_LOCALES } from "#src/hooks/useLocale";
import IconButton from "#src/components/shared/icon-button/IconButton";
import SelectorModal, {
  SelectorModalOption,
} from "#src/components/shared/selector-modal/SelectorModal";

function LocaleSelector() {
  const [selectorOpen, setSelectorOpen] = React.useState(false);

  const { i18n, setLang } = useLocale();

  const options = SUPPORTED_LOCALES.map((locale) => ({
    key: locale,
    text: i18n(locale),
  }));

  function openSelector() {
    setSelectorOpen(true);
  }

  function closeSelector() {
    setSelectorOpen(false);
  }

  function onOptionSelected(option: SelectorModalOption) {
    setLang(option.key);
    closeSelector();
  }

  return (
    <>
      <IconButton
        iconName="translate"
        text={i18n("change_language")}
        onClick={openSelector}
      />

      <SelectorModal
        className="h-auto max-h-[80%] max-w-[288px] overflow-hidden bg-white p-0 text-accent-950 dark:bg-accent-900 dark:text-accent-50"
        title={i18n("change_language")}
        closeButton={true}
        onOptionSelected={onOptionSelected}
        options={options}
        open={selectorOpen}
        onClose={closeSelector}
      />
    </>
  );
}

export default LocaleSelector;
