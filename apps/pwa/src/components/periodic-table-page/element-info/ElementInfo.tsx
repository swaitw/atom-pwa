import { Element } from "@/Element";
import { useElements } from "@/hooks/useElements";
import { useLocale } from "@/hooks/useLocale";
import { cn } from "@/utils/styles";

interface ElementInfoDataEntryProps {
  name: string;
  value: string | number;
  unit?: string;
}

const ElementInfoDataEntry = ({
  name,
  value,
  unit,
}: ElementInfoDataEntryProps) => {
  if (!value) {
    return null;
  }

  return (
    <div className="flex items-center p-4 even:bg-accent-50 dark:even:bg-accent-950">
      <div className="text-sm font-semibold">{name}</div>

      <div className="ml-auto">
        {value}
        {unit ? ` ${unit}` : ""}
      </div>
    </div>
  );
};

interface ElementInfoProps {
  element: Element;
}

function ElementInfo({ element }: ElementInfoProps) {
  const { i18n } = useLocale();
  const { getElementLocales } = useElements();

  if (!element) {
    return null;
  }

  const elementLocales = getElementLocales(element);

  return (
    <div className="h-full bg-white dark:bg-accent-900">
      <div className={cn("p-4 font-semibold", "element", element.group)}>
        <div className="text-xl font-bold">{elementLocales.name}</div>
        <div className="opacity-80 pt-1 text-base">{elementLocales.group}</div>
      </div>

      <div>
        <ElementInfoDataEntry
          name={i18n("element_data_atomic")}
          value={element.atomic}
        />
        <ElementInfoDataEntry
          name={i18n("element_data_symbol")}
          value={element.symbol}
        />
        <ElementInfoDataEntry
          name={i18n("element_data_atomicMass")}
          value={element.atomicMass}
          unit={i18n("g_mol")}
        />
        <ElementInfoDataEntry
          name={i18n("element_data_electronicConfiguration")}
          value={element.electronicConfiguration}
        />
        <ElementInfoDataEntry
          name={i18n("element_data_electronegativity")}
          value={element.electronegativity}
        />
        <ElementInfoDataEntry
          name={i18n("element_data_atomicRadius")}
          value={element.atomicRadius}
          unit={i18n("pm")}
        />
        <ElementInfoDataEntry
          name={i18n("element_data_ionRadius")}
          value={element.ionRadius}
          unit={i18n("pm")}
        />
        <ElementInfoDataEntry
          name={i18n("element_data_vanDelWaalsRadius")}
          value={element.vanDelWaalsRadius}
          unit={i18n("pm")}
        />
        <ElementInfoDataEntry
          name={i18n("element_data_ionizationEnergy")}
          value={element.ionizationEnergy}
          unit={i18n("kJ_mol")}
        />
        <ElementInfoDataEntry
          name={i18n("element_data_electronAffinity")}
          value={element.electronAffinity}
        />
        <ElementInfoDataEntry
          name={i18n("element_data_oxidationState")}
          value={element.oxidationStates}
        />
        <ElementInfoDataEntry
          name={i18n("element_data_standardState")}
          value={elementLocales.standardState}
        />
        <ElementInfoDataEntry
          name={i18n("element_data_bondingType")}
          value={elementLocales.bondingType}
        />
        <ElementInfoDataEntry
          name={i18n("element_data_meltingPoint")}
          value={element.meltingPoint}
          unit={i18n("kelvin_unit")}
        />
        <ElementInfoDataEntry
          name={i18n("element_data_boilingPoint")}
          value={element.boilingPoint}
          unit={i18n("kelvin_unit")}
        />
        <ElementInfoDataEntry
          name={i18n("element_data_density")}
          value={element.density}
          unit={i18n("g_cm3")}
        />
        <ElementInfoDataEntry
          name={i18n("element_data_yearDiscovered")}
          value={element.yearDiscovered}
        />
        <ElementInfoDataEntry
          name={i18n("element_data_valency")}
          value={element.valency}
        />
      </div>
    </div>
  );
}

export default ElementInfo;
