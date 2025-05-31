import { Layout, SectionMain, SectionSide } from "@foliage-note/components";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

function BlogCard({ title, image, children }: { title: string; image: string; children: React.ReactNode }) {
  return (
    <Card variant="outlined">
      <CardMedia component="img" sx={{ height: 128 }} image={image} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">{title}</Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>{children}</Typography>
      </CardContent>
    </Card>
  );
}

function Home() {
  return (
    <React.Fragment>
      <SectionSide id="posts" title="开发日记">
        通过对系统工程原理的深刻理解和对行业的持续关注，致力于为客户提供能够应对可持续的系统级解决方案
      </SectionSide>
      <SectionMain>
        <BlogCard title="软件工程" image="/202504281636.jpg">
          本文系统梳理了系统架构师考试中软件工程相关的核心知识，包括基础概念、认知哲学、生命周期模型、架构设计方法与理念、质量属性分析、系统测试与可靠性建模，以及系统演化策略。内容涵盖理论基础、主流模型、实际案例和标准方法，帮助读者全面理解软件工程的体系化方法与实践要点。
        </BlogCard>
        <BlogCard title="数据工程" image="/202504281636.jpg">
          本文总结了系统架构师考试中数据工程部分的核心知识，包括数据库的基本概念、发展历程、数据模型（层次、网状、关系、非关系型）、数据库管理系统（DBMS）的主要功能及 SQL 命令分类，详细介绍了数据库三级模式、关系数据库的基本概念与设计理论（如函数依赖、多值依赖、规范化），并梳理 ...
        </BlogCard>
        <BlogCard title="系统工程" image="/202504281636.jpg">
          本文总结了系统架构师考试中信息系统相关知识，包括信息系统的定义、发展阶段、分类、生命周期、建设原则及开发方法。内容涵盖业务处理系统、管理信息系统、决策支持系统、专家系统、办公自动化系统、企业资源规划等典型信息系统的概念、功能、组成及特点，并介绍了政府信息化与企业信息化的架构模型。适合备考和系统性复习信息系统基础知识。
        </BlogCard>
      </SectionMain>
      <SectionSide id="profile" title="个人简介">致力于通过技术为医疗、城市管理和安全防御场景提供可持续解决方案</SectionSide>
      <SectionMain>
        <ul>
          <li>Organize your notes</li>
          <li>Search functionality</li>
          <li>Tagging system</li>
        </ul>
      </SectionMain>
      <SectionSide id="business" title="行业领域">致力于通过技术为医疗、城市管理和安全防御场景提供可持续解决方案</SectionSide>
      <SectionMain>
        <p>To get started, create an account and start taking notes!</p>
      </SectionMain>
      <SectionSide id="skill" title="专业技能">致力于通过技术为医疗、城市管理和安全防御场景提供可持续解决方案</SectionSide>
      <SectionMain>
        <p>To get started, create an account and start taking notes!</p>
      </SectionMain>
      <SectionSide id="experience" title="工作经历">致力于通过技术为医疗、城市管理和安全防御场景提供可持续解决方案</SectionSide>
      <SectionMain>
        <p>To get started, create an account and start taking notes!</p>
      </SectionMain>
    </React.Fragment>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
