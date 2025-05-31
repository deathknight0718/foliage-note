import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import type { Root } from "hast";
import { toString } from "hast-util-to-string";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import { VFile } from "vfile";

type TreeViewLevelItem = TreeViewBaseItem & {
  level: number;
};

type ComponentProps = {
  path: string;
};

const MarkdownNavigation = styled.aside`
  position: sticky;
  top: calc(var(--mui-spacing) * 8);
  height: calc(100vh - var(--mui-spacing) * 8);
  background-color: var(--mui-palette-primary-main);
`;

const MarkdownContent = styled.main`
  max-width: calc(var(--mui-spacing) * 16 * 9);
  border-bottom: 1px solid var(--mui-palette-grey-200);
`;

function rehypeHeadings() {
  return (tree: Root, file: VFile) => {
    const stack: TreeViewLevelItem[] = [{ id: "root", level: 0, label: "Table of Contents", children: [] }];
    visit(tree, "element", (node) => {
      if (node.tagName.startsWith("h") && node.properties?.id) {
        const level = parseInt(node.tagName.replace("h", ""), 10);
        const id = node.properties.id as string;
        const label = toString(node);
        const item: TreeViewLevelItem = { id, level, label, children: [] };
        while (stack[stack.length - 1]?.level >= level) stack.pop();
        const parent = stack[stack.length - 1];
        if (parent.children) parent.children.push(item);
        stack.push(item);
      }
    });
    if (!file.data.headings) file.data.headings = stack[0].children;
  };
}

function useBundle() {
  const router = useRouter();
  const { bundle, id } = router.query;
  return { bundle, id };
}

function useMarkdown(path: string) {
  const ref = useRef<HTMLDivElement>(null);
  const [toc, onToc] = useState<TreeViewLevelItem[]>([]);
  const [markdown, onMarkdown] = useState("Loading...");
  const { bundle, id } = useBundle();
  useEffect(() => {
    if (!bundle || !id) return;
    (async () => {
      const response = await fetch(`/posts/${path}/${bundle}/${id}.md`);
      if (response.ok) {
        const text = await response.text();
        const processer = unified()
          .use(remarkParse)
          .use(remarkGfm)
          .use(remarkMath)
          .use(remarkStringify)
          .use(remarkFrontmatter, { type: "yaml", marker: "-" })
          .use(remarkRehype, { allowDangerousHtml: true })
          .use(rehypeRaw)
          .use(rehypeKatex)
          .use(rehypeSlug)
          .use(rehypeHeadings)
          .use(rehypeStringify);
        const file = await processer.process(text);
        onToc(file.data.headings as TreeViewLevelItem[]);
        onMarkdown(String(file));
      }
    })();
  }, [path, bundle, id]);
  return { ref, markdown, toc };
}

function Component({ path }: ComponentProps) {
  const { ref, markdown, toc } = useMarkdown(path);
  const { push } = useRouter();
  return (
    <React.Fragment>
      <MarkdownNavigation className="hidden 2xl:flex 2xl:flex-row-reverse 2xl:col-span-3 pt-4 overflow-y-auto text-white">
        <RichTreeView items={toc} onItemClick={(_, id) => push(`#${id}`)} sx={{ width: 384, padding: 2 }} />
      </MarkdownNavigation>
      <MarkdownContent className="col-span-12 2xl:col-span-9 p-16">
        <Box sx={{ my: 4 }}>
          <div className="markdown-preview" ref={ref} dangerouslySetInnerHTML={{ __html: markdown }} />
        </Box>
      </MarkdownContent>
    </React.Fragment>
  );
}

export default Component;
