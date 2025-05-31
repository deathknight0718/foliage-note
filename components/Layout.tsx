/*
 * Copyright 2025 Foliage Develop Team.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import styled from "@emotion/styled";
import { IconButton, Menu, MenuItem, Tab, Tabs, Toolbar, Tooltip } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { MessageSquare } from "react-feather";
import { useTranslation } from "react-i18next";

type LanguageOption = {
  icon: string;
  name: string;
};

type LanguageOptions = {
  [key: string]: LanguageOption;
};

const languageOptions: LanguageOptions = {
  zh: { icon: "/flags/cn.png", name: "简体中文" },
  en: { icon: "/flags/us.png", name: "English" },
};

const Grid = styled.div`
`;

const Flag = styled.img`
    border-radius: 50%;
    width: 22px;
    height: 22px;
`;

const HeadSide = styled.header`
  position: sticky;
  inset: 0 auto auto 0;
  height: calc(var(--mui-spacing) * 8);
  background-color: var(--mui-palette-primary-main);
  border-bottom: 1px solid var(--mui-palette-grey-200);
`;

const HeadMain = styled.header`
  position: sticky;
  inset: 0 0 auto auto;
  height: calc(var(--mui-spacing) * 8);
  background-color: var(--mui-palette-background-default);
  border-bottom: 1px solid var(--mui-palette-grey-200);
`;

const HeadSideToolbar = styled(Toolbar)`
  width: calc(var(--mui-spacing) * 16 * 3);
`;

const HeadMainToolbar = styled(Toolbar)`
  width: calc(var(--mui-spacing) * 16 * 9);
`;

const FootSide = styled.aside`
  background-color: var(--mui-palette-primary-main);
  height: 100%;
`;

const FootMain = styled.div`
  padding: calc(var(--mui-spacing) * 4) calc(var(--mui-spacing) * 8);
  background-color: var(--mui-palette-background-default);
`;

function HeadMainMessages() {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Tooltip title={t("KEYWORD_CHAT")}>
        <IconButton size="large">
          <MessageSquare />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}

function HeadMainLanguages() {
  const { i18n } = useTranslation();
  const [anchorMenu, setAnchorMenu] = React.useState<Element>();
  const selectedLanguage = languageOptions[i18n.language] as LanguageOption;
  const toggleMenu: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorMenu(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorMenu(undefined);
  };
  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    closeMenu();
  };
  return (
    <React.Fragment>
      <Tooltip title="Languages">
        <IconButton aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined} aria-haspopup="true" onClick={toggleMenu} size="large">
          <Flag src={selectedLanguage.icon} alt={selectedLanguage.name} />
        </IconButton>
      </Tooltip>
      <Menu id="menu-appbar" anchorEl={anchorMenu} open={Boolean(anchorMenu)} onClose={closeMenu}>
        {Object.keys(languageOptions).map((language) => (
          <MenuItem key={language} onClick={() => handleLanguageChange(language)}>
            {languageOptions[language].name}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const { asPath, push } = useRouter();
  return (
    <Grid className="grid grid-cols-12">
      <HeadSide className="hidden 2xl:flex 2xl:flex-row-reverse 2xl:col-span-3">
        <HeadSideToolbar>
          <Image src="/logo.svg" alt="Foliage Logo" width={130} height={32} priority />
        </HeadSideToolbar>
      </HeadSide>
      <HeadMain className="col-span-12 2xl:col-span-9">
        <HeadMainToolbar>
          <Tabs value={asPath} sx={{ flexGrow: 1 }}>
            <Tab label={t("KEYWORD_HOME")} value="/" onClick={() => push("/")} />
            <Tab label={t("KEYWORD_POSTS")} value="/posts" onClick={() => push("/posts")} />
            <Tab label={t("KEYWORD_PROFILE")} value="/#profile" onClick={() => push("/#profile")} />
            <Tab label={t("KEYWORD_BUSINESS")} value="/#business" onClick={() => push("/#business")} />
            <Tab label={t("KEYWORD_SKILL")} value="/#skill" onClick={() => push("/#skill")} />
            <Tab label={t("KEYWORD_EXPERIENCE")} value="/#experience" onClick={() => push("/#experience")} />
          </Tabs>
          <HeadMainMessages />
          <HeadMainLanguages />
        </HeadMainToolbar>
      </HeadMain>
      {children}
      <FootSide className="hidden 2xl:block 2xl:col-span-3" />
      <FootMain className="col-span-12 2xl:col-span-9">© 2025 | Liuzheng | CC_BY-NC 4.0</FootMain>
    </Grid>
  );
}
