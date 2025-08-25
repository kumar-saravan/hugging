"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Project } from "@/types";
import { api } from "@/lib/api";

const AppEditor = dynamic(
  () => import("@/components/editor").then((mod) => mod.AppEditor),
  {
    ssr: false,
  }
);

export default function ProjectNamespacePage() {
  const { namespace, repoId } = useParams<{
    namespace: string;
    repoId: string;
  }>();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const getProject = async () => {
      try {
        const { data } = await api.get(`/me/projects/${namespace}/${repoId}`);
        setProject(data.project);
      } catch (error) {
        console.error(error);
      }
    };
    getProject();
  }, [namespace, repoId]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return <AppEditor project={project} />;
}
