import React, { useEffect, useState } from "react";
import ProjectDetail from "../../components/ProjectDetail";
import { getAllProject } from "../../utils/Projects";

export default function HomePage() {
  const [projects, setProjects] = useState([]);

  async function fetchProjects() {
    try {
      const response = await getAllProject();
      setProjects(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      {projects.length > 0 &&
        projects.map((item, index) => (
          <ProjectDetail key={index} project={item} />
        ))}
    </>
  );
}
