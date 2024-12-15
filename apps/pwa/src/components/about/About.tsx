import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useLocale } from "@/hooks/useLocale";
import { HUB } from "@/routes";
import LocaleSelector from "@/components/locale-selector/LocaleSelector";
import Card from "@/components/shared/card/Card";
import IconButton from "@/components/shared/icon-button/IconButton";
import Navbar from "@/components/shared/navbar/Navbar";
import ThemeSelector from "@/components/theme-selector/ThemeSelector";
import { FULL_VERSION } from "@/constants";

function About() {
  const navigate = useNavigate();
  const { i18n } = useLocale();

  const onNavbarBackButtonClick = React.useCallback(
    () => navigate(HUB),
    [navigate],
  );
  return (
    <div className="flex flex-col min-h-full bg-accent-50 text-accent-950 dark:bg-accent-950 dark:text-accent-50">
      <Navbar
        className="shadow-sm"
        title={i18n("nav_about")}
        onBackButtonClick={onNavbarBackButtonClick}
      />

      <div className="pl-safe-left pr-safe-right pb-safe-bottom container">
        <Card rounded={true} className="m-4">
          <div className="p-4 uppercase font-semibold text-sm">
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
