import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useLocale } from "#src/hooks/useLocale";
import { HUB } from "#src/routes";
import LocaleSelector from "#src/components/locale-selector/LocaleSelector";
import Card from "#src/components/shared/card/Card";
import IconButton from "#src/components/shared/icon-button/IconButton";
import Navbar from "#src/components/shared/navbar/Navbar";
import ThemeSelector from "#src/components/theme-selector/ThemeSelector";
import { FULL_VERSION } from "#src/constants";

function About() {
  const navigate = useNavigate();
  const { i18n } = useLocale();

  const onNavbarBackButtonClick = React.useCallback(
    () => navigate(HUB),
    [navigate],
  );
  return (
    <div className="flex min-h-full flex-col bg-accent-50 text-accent-950 dark:bg-accent-950 dark:text-accent-50">
      <Navbar
        className="shadow-sm"
        title={i18n("nav_about")}
        onBackButtonClick={onNavbarBackButtonClick}
      />

      <div className="container pb-safe-bottom pl-safe-left pr-safe-right">
        <Card rounded={true} className="m-4">
          <div className="p-4 text-sm font-semibold uppercase">
            {i18n("app_settings")}
          </div>

          <div className="flex">
            <div className="flex-1 text-center">
              <LocaleSelector />
            </div>
            <div className="flex-1 text-center">
              <ThemeSelector />
            </div>
          </div>
        </Card>

        <Card rounded={true} className="m-4">
          <div className="flex">
            <div className="flex-1 text-center">
              <IconButton
                link={i18n("contact_me_url")}
                iconName="at"
                text={i18n("contact_me")}
              />
            </div>

            <div className="flex-1 text-center">
              <IconButton
                link="https://github.com/HorusGoul/atom-pwa"
                iconName="source_branch"
                text={i18n("source_code")}
              />
            </div>

            <div className="flex-1 text-center">
              <IconButton
                link={`mailto:${i18n("author_email")}`}
                iconName="bug_report"
                text={i18n("bug_report")}
              />
            </div>
          </div>
        </Card>

        <div className="text-center text-xs opacity-80">{FULL_VERSION}</div>
      </div>
    </div>
  );
}

export default About;
