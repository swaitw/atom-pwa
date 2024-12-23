import Atom from "#src/components/atom";
import PeriodicTable from "#src/components/periodic-table/PeriodicTable";
import PtElementInfo from "#src/components/pt-element/PtElementInfo";
import { useSearchInput } from "#src/components/search-view/useSearchInput";
import Icon from "#src/components/shared/icon/Icon";
import { useElements } from "#src/hooks/useElements";
import { useLocale } from "#src/hooks/useLocale";
import { usePreventDocumentOverscroll } from "#src/hooks/usePreventDocumentOverscroll";
import { useAddRecent } from "#src/hooks/useRecent";
import { useShouldAnimate } from "#src/hooks/useShouldAnimate";
import { cn } from "#src/utils/styles";
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

  const shouldAnimate = useShouldAnimate("home");

  const { isSearching, openSearch } = useSearchInput("replace");

  return (
    <>
      <div className="h-full">
        <PeriodicTable
          elementRenderer={elementRenderer}
          className={cn(
            "ml-[calc(16px_+_var(--safe-area-inset-left))] mt-[calc(90px_+_var(--safe-area-inset-top))] overflow-hidden rounded-xl border shadow-xl dark:border-accent-400/20",
            shouldAnimate &&
              "animate-in fade-in slide-in-from-bottom-[64px] slide-in-from-right-[64px] [animation-duration:1s]",
          )}
        />
      </div>

      <SearchHeader
        onFocus={() => {
          openSearch();
        }}
        animate={shouldAnimate}
        hidden={isSearching}
      />

      <SearchView />
    </>
  );
}

interface SearchHeaderProps {
  autoFocus?: boolean;
  onFocus?: () => void;
  showBackButton?: boolean;
  hidden?: boolean;
  animate?: boolean;
}

function SearchHeader({
  autoFocus = false,
  onFocus,
  showBackButton,
  hidden,
  animate,
}: SearchHeaderProps) {
  const { i18n } = useLocale();
  const navigate = useNavigate();

  return (
    <header
      className={cn(
        "fixed left-safe-left right-safe-right top-safe-top z-10 p-4",
        animate && "duration-1000 animate-in fade-in slide-in-from-top",
      )}
    >
      {!hidden && (
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
      )}
    </header>
  );
}

function SearchView() {
  const { value, inputProps, isSearching, closeSearch } =
    useSearchInput("replace");
  const { i18n } = useLocale();

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

        <Dialog aria-label={i18n("Search")}>
          <SearchHeader autoFocus={true} showBackButton />
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
