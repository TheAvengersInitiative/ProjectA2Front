import React from "react";
import ProjectDetail from "../../components/ProjectDetail";
import { projectOneMock } from "../../utils/ConstForTest";

export default function HomePage() {
  return <ProjectDetail project = {projectOneMock} />
 ;
}
//{PROJECTS.map((project, index) => <ProjectDetail key = {index} project = {project} /> )}
