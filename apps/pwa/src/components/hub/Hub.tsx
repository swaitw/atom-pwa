import { useServiceWorker } from "@/contexts/ServiceWorkerContext";
import { useHubCategoryById } from "@/hooks/useHubCategories";
import { useHubItemById } from "@/hooks/useHubItems";
import { useLocale } from "@/hooks/useLocale";
import { useRecent } from "@/hooks/useRecent";
import { useTheme } from "@/hooks/useTheme";
import { ABOUT } from "@/routes";
import { useFlagStore } from "@/services/flags";
import { logEvent } from "@/services/spycat";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Atom from "@/components/atom";
import Button from "@/components/shared/button/Button";
import { useConfirm } from "@/components/shared/confirm";
import IconButton from "@/components/shared/icon-button/IconButton";
import Icon from "@/components/shared/icon/Icon";
import HubItem from "./hub-item";
import HubSection from "./hub-section";
import { HubSectionData, useHub } from "./useHub";

function Hub() {
  const { i18n } = useLocale();
  const { theme, setTheme } = useTheme();
  const { sections } = useHub();
  const { recent } = useRecent();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center bg-accent-50 pb-safe-bottom pt-safe-top text-accent-950 dark:bg-accent-950 dark:text-accent-50">
      <div className="flex w-full flex-col items-center">
        <div className="flex w-full flex-col items-center px-6 [@media_(min-width:420px)]:max-w-[420px]">
          <div className="mt-6 flex w-full items-center">
            <div className="z-[1] mr-auto rounded-full bg-white p-2 shadow-sm">
              <Atom aria-label="Atom" weight={24} size={32} color="primary" />
            </div>

            <UpdateButton />

            <IconButton
              className="h-12 w-12 rounded-full p-3"
              aria-label={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
              iconName={
                theme === "light" ? "dark_mode_outlined" : "dark_mode_filled"
              }
              onClick={() =>
                theme === "light" ? setTheme("dark") : setTheme("light")
              }
            />

            <IconButton
              className="h-12 w-12 rounded-full p-3"
              aria-label="Settings"
              iconName="settings"
              onClick={() => navigate(ABOUT)}
            />
          </div>

          <Button
            className="mb-4 mt-6 h-12 w-full justify-start overflow-hidden rounded-lg bg-white pl-4 pr-3 text-left text-lg font-normal text-accent-950 shadow-sm dark:bg-accent-900 dark:text-accent-50"
            onClick={() => navigate({ search: "openSearch=true" })}
          >
            <Icon
              name="search"
              aria-hidden={true}
              className="mr-6 opacity-60"
            />

            <span className="opacity-60">{i18n("Search_dots")}</span>
          </Button>
        </div>
      </div>
      <div className="flex w-full flex-col items-center px-6 [@media_(min-width:420px)]:max-w-[420px]">
        <div className="w-full pb-4 pt-8">
          {recent.length > 0 && (
            <>
              <HubSection title={i18n("Recent")}>
                {recent.slice(0, 2).map((id) => (
                  <HubItemWithData key={id} item={id} showCategory={true} />
                ))}
              </HubSection>
              <div className="h-6" />
            </>
          )}

          {sections.map((section) => (
            <React.Fragment key={section.title}>
              <HubSectionWithData key={section.title} {...section} />
              <div className="h-6" />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hub;

function HubSectionWithData({ title, items }: HubSectionData) {
  return (
    <HubSection title={title}>
      {items.map((item) => (
        <HubItemWithData key={item.item} {...item} />
      ))}
    </HubSection>
  );
}

type HubItemWithDataProps = HubSectionData["items"][number] & {
  showCategory?: boolean;
};

function HubItemWithData({
  item,
  colSpan,
  rowSpan,
  showCategory = false,
}: HubItemWithDataProps) {
  const flags = useFlagStore();
  const data = useHubItemById(item);
  const category = useHubCategoryById(data.category);
  const navigate = useNavigate();
  const { confirmAction } = useConfirm();
  const { i18n } = useLocale();

  const isAd = category.id === "yelepo";

  if (isAd) {
    showCategory = true;
  }

  if (data.flag && !flags[data.flag]) {
    return null;
  }

  function onClick() {
    if (data.disabled) {
      logEvent(`interested in ${item}`);

      confirmAction({
        title: i18n("wip_title"),
        message: i18n("wip_message"),
        hideCancel: true,
        hideConfirm: true,
      });
      return;
    }

    if (data.href.startsWith("http")) {
      if (isAd) {
        logEvent(`ad clicked`, {
          id: data.id,
        });
      }

      window.open(data.href);
      return;
    }

    navigate(data.href);
  }

  return (
    <HubItem
      title={data.title}
      disabled={data.disabled}
      imageUrl={data.imageUrl}
      category={showCategory ? category.title : undefined}
      colSpan={colSpan}
      rowSpan={rowSpan}
      onClick={onClick}
    />
  );
}

function UpdateButton() {
  const { waitingState, update, checkForUpdates } = useServiceWorker();
  const { confirmAction } = useConfirm();
  const { i18n } = useLocale();

  React.useEffect(() => {
    checkForUpdates();
  }, [checkForUpdates]);

  if (!waitingState) {
    return null;
  }

  function launchUpdatePrompt() {
    confirmAction({
      message: i18n("update_message"),
      title: i18n("update_title"),
      okButtonText: i18n("update_confirm"),
      onConfirm: () => {
        logEvent("install update");
        update();
      },
    });
  }

  return (
    <Button
      className={"h-12 w-12 rounded-full p-3"}
      onClick={launchUpdatePrompt}
      circle={true}
      aria-label={i18n("update_button_label")}
    >
      {waitingState === "installed" ? (
        <Icon name="system_update" className="animate-pulse" />
      ) : (
        <Atom spinning={true} color="inherit" size={24} weight={32} />
      )}
    </Button>
  );
}
