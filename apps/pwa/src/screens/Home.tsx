import Atom from "@/components/atom";
import PeriodicTable from "@/components/periodic-table/PeriodicTable";
import PtElementInfo from "@/components/pt-element/PtElementInfo";
import { useSearchInput } from "@/components/search-view/useSearchInput";
import Icon from "@/components/shared/icon/Icon";
import { useElements } from "@/hooks/useElements";
import { useLocale } from "@/hooks/useLocale";
import { usePreventDocumentOverscroll } from "@/hooks/usePreventDocumentOverscroll";
import { useAddRecent } from "@/hooks/useRecent";
import { cn } from "@/utils/styles";
import {
  Button,
  Dialog,
  Input,
  Label,
  Modal,
  ModalOverlay,
  SearchField,
} from "react-aria-components";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { getElement } = useElements();
  const { i18n } = useLocale();

  useAddRecent("periodic-table");
  usePreventDocumentOverscroll();

  const elementRenderer = (atomic: number) => {
    const element = getElement(atomic);

    return (
      <PtElementInfo
        element={element}
        onClick={(element) => {
          alert(`You clicked on ${element.name}`);
        }}
      />
    );
  };

  const { isSearching, openSearch } = useSearchInput("replace");

  return (
    <>
      <PeriodicTable elementRenderer={elementRenderer} />

      {!isSearching && (
        <SearchHeader
          onFocus={() => {
            openSearch();
          }}
        />
      )}

      <SearchView />

      <nav className="fixed bottom-0 w-full border-t pb-safe-bottom pl-safe-left pr-safe-right shadow-xl backdrop-blur-sm dark:border-accent-400/20 dark:bg-accent-950/80">
        <ul className="h-16">
          <li></li>
        </ul>
      </nav>
    </>
  );
}

interface SearchHeaderProps {
  autoFocus?: boolean;
  onFocus?: () => void;
  showBackButton?: boolean;
}

function SearchHeader({
  autoFocus = false,
  onFocus,
  showBackButton,
}: SearchHeaderProps) {
  const { i18n } = useLocale();
  const navigate = useNavigate();

  return (
    <header className="fixed left-safe-left right-safe-right top-safe-top z-10 p-4">
      <SearchField
        autoFocus={autoFocus}
        className="group flex h-12 items-center rounded-xl border px-1 shadow-xl backdrop-blur-sm dark:border-accent-400/20 dark:bg-accent-950/80"
        onFocus={onFocus}
      >
        <Label className="sr-only">{i18n("Search")}</Label>
        {showBackButton ? (
          <Button
            onPress={() => navigate(-1)}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
          >
            <Icon name="arrow_back" />
          </Button>
        ) : (
          <div
            aria-hidden="true"
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
          >
            <Atom size={28} weight={40} />
          </div>
        )}
        <Input
          className="h-full w-full bg-transparent px-3 text-xl font-semibold leading-none outline-none dark:text-accent-50 dark:placeholder:text-accent-50 [&::-webkit-search-cancel-button]:hidden"
          placeholder={i18n("Search_dots")}
        />

        <Button className="h-full w-10 group-empty:invisible">
          <Icon name="close" />
        </Button>
      </SearchField>
    </header>
  );
}

function SearchView() {
  const { value, inputProps, isSearching, closeSearch } =
    useSearchInput("replace");

  return (
    <ModalOverlay
      isDismissable
      isOpen={isSearching}
      className={cn(
        "fixed inset-0",
        isSearching ? "animate-in" : "animate-out",
      )}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          closeSearch();
        }
      }}
    >
      <Modal>
        <div
          className={cn(
            "fixed inset-0 backdrop-blur-sm motion-reduce:animate-none dark:bg-accent-950/80",
            isSearching ? "animate-in fade-in" : "animate-out fade-out",
          )}
        />

        <Dialog>
          <SearchHeader autoFocus={true} showBackButton />
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
