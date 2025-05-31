import { Layout, SectionMain, SectionSide } from "@foliage-note/components";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const rows = [
  { index: 1, date: "2023-10-01", title: "系统工程原理概述" },
  { index: 2, date: "2023-10-02", title: "现代软件开发方法" },
  { index: 3, date: "2023-10-03", title: "数据科学基础" },
  { index: 4, date: "2023-10-04", title: "人工智能的未来" },
  { index: 5, date: "2023-10-05", title: "云计算的优势与挑战" },
];

function PostTable() {
  const { t } = useTranslation();
  const { palette } = useTheme();
  return (
    <React.Fragment>
      <Typography variant="h5" sx={{ py: 1 }}>{t("KEYWORD_TOPIC")}</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ backgroundColor: palette.primary.main, color: palette.primary.contrastText }}>#</TableCell>
              <TableCell align="center" sx={{ backgroundColor: palette.primary.main, color: palette.primary.contrastText }}>{t("KEYWORD_DATE")}</TableCell>
              <TableCell sx={{ backgroundColor: palette.primary.main, color: palette.primary.contrastText, width: "70%" }}>{t("KEYWORD_TITLE")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.index}>
                <TableCell align="center">{row.index}</TableCell>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell>{row.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

function Page() {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <SectionSide id="posts" title={t("KEYWORD_POSTS")}>
        通过对系统工程原理的深刻理解和对行业的持续关注，致力于为客户提供能够应对可持续的系统级解决方案
      </SectionSide>
      <SectionMain>
        <PostTable />
        <PostTable />
        <PostTable />
      </SectionMain>
    </React.Fragment>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
