import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useLocale } from "@/hooks/useLocale";
import { TEST_SELECTION } from "@/routes";
import IconButton from "@/components/shared/icon-button/IconButton";
import Navbar from "@/components/shared/navbar/Navbar";
import { usePeriodicTableTestSettings } from "@/components/periodic-table-test/hooks/usePeriodicTableTestSettings";
import { useElements } from "@/hooks/useElements";
import PtElementSetting from "@/components/pt-element/PtElementSetting";
import PeriodicTable from "@/components/periodic-table/PeriodicTable";

function PeriodicTableTestSettings() {
  const navigate = useNavigate();
  const { i18n } = useLocale();
  const { settings, updateSettings, resetSettings, isElementAvailable } =
    usePeriodicTableTestSettings();

  const elementStates = React.useMemo(() => {
    const elements = settings.elements ?? [];

    return elements.reduce(
      (map, element) => {
        map[element.atomic] = element.enabled;

        return map;
      },
      {} as Record<number, boolean>,
    );
  }, [settings.elements]);

  const onSelectAllButtonClick = React.useCallback(() => {
    updateSettings((settings) => {
      settings.elements =
        settings.elements?.map((element) => ({
          ...element,
          enabled: true,
        })) ?? null;
    });
  }, [updateSettings]);

  const onDeselectAllButtonClick = React.useCallback(() => {
    updateSettings((settings) => {
      settings.elements =
        settings.elements?.map((element) => ({
          ...element,
          enabled: false,
        })) ?? null;
    });
  }, [updateSettings]);

  const onRestoreDefaultsButtonClick = React.useCallback(() => {
    resetSettings();
  }, [resetSettings]);

  const onNavbarButtonClick = React.useCallback(() => {
    navigate(TEST_SELECTION);
  }, [navigate]);

  const onTestElementSettingsClick = React.useCallback(
    (atomic: number) => {
      updateSettings((settings) => {
        const element = settings.elements?.find(
          (elementSettings) => elementSettings.atomic === atomic,
        );

        if (element) {
          element.enabled = !element.enabled;
        }
      });
    },
    [updateSettings],
  );

  const { getElement } = useElements();

  const elementRenderer = (atomic: number) => {
    const element = getElement(atomic);
    const enabled = elementStates[atomic];
    const isAvailable = isElementAvailable(atomic);

    if (!isAvailable) {
      return null;
    }

    return (
      <PtElementSetting
        element={element}
        enabled={enabled}
        onClick={(element) => {
          onTestElementSettingsClick(element.atomic);
        }}
      />
    );
  };

  return (
    <div className="flex flex-col h-full">
      <Navbar
        title={i18n("nav_settings")}
        onBackButtonClick={onNavbarButtonClick}
      />

      <div className="pl-safe-left pr-safe-right">
        <div className="p-4 opacity-65">{i18n("select_elements")}</div>
        <div className="flex opacity-80">
          <IconButton
            className="flex-1"
            onClick={onSelectAllButtonClick}
            iconName="check_box_true"
            text={i18n("select_all")}
          />
          <IconButton
            className="flex-1"
            onClick={onDeselectAllButtonClick}
            iconName="check_box_false"
            text={i18n("deselect_all")}
          />
          <IconButton
            className="flex-1"
            onClick={onRestoreDefaultsButtonClick}
            iconName="restore"
            text={i18n("restore_defaults")}
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <PeriodicTable elementRenderer={elementRenderer} />
      </div>
    </div>
  );
}

export default PeriodicTableTestSettings;
