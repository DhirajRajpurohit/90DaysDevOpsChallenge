import React, { useEffect } from "react";
import FolioCard from "./FolioCard";
import Title from "../ui/Title";
import { useView } from "@/contexts/ViewContext";

// @ts-ignore
import "intersection-observer";
import { useInView } from "react-intersection-observer";
import Timeline from "./Timeline";

export default function Works() {
  const { setSectionInView } = useView();

  const works = [
    {
      title: "kubernetes-gitops-platform",
      gitLink: "https://github.com/your_username/kubernetes-gitops-platform",
      liveLink: "https://docs-kubernetes-gitops.example.com",
      about:
        "A production-grade GitOps platform built on Kubernetes using ArgoCD and Flux. Features automated deployment pipelines, infrastructure as code templates, and comprehensive monitoring setup with Prometheus and Grafana dashboards.",
      stack: ["kubernetes", "argocd", "terraform", "prometheus", "golang"],
      img: "/project.png",
    },
    {
      title: "cloud-native-cicd",
      gitLink: "https://github.com/your_username/cloud-native-cicd",
      liveLink: "https://cloud-native-cicd.example.com",
      about:
        "Scalable CI/CD platform leveraging Jenkins, Docker, and Kubernetes. Implements infrastructure as code using Terraform for AWS resources, includes automated testing, security scanning, and blue-green deployment strategies.",
      stack: ["jenkins", "docker", "aws", "terraform", "python"],
      img: "/project.png",
    },
    {
      title: "infrastructure-monitoring-suite",
      gitLink: "https://github.com/your_username/infrastructure-monitoring-suite",
      liveLink: "https://monitoring-suite.example.com",
      about:
        "Comprehensive monitoring solution combining ELK Stack for log aggregation, Prometheus for metrics collection, and custom Grafana dashboards. Features automated alerting, log parsing, and performance analytics.",
      stack: ["elasticsearch", "prometheus", "grafana", "ansible", "python"],
      img: "/project.png",
    },
    {
      title: "container-security-platform",
      gitLink: "https://github.com/your_username/container-security-platform",
      liveLink: "https://security-platform.example.com",
      about:
        "Security-focused container platform implementing vulnerability scanning, secret management with HashiCorp Vault, and automated compliance checks. Includes CI/CD integration and real-time security monitoring.",
      stack: ["docker", "vault", "kubernetes", "python", "bash"],
      img: "/project.png",
    },
  ];

  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "-100px 0px",
  });

  useEffect(() => {
    if (inView) setSectionInView("work");
  }, [inView, setSectionInView]);

  return (
    <section
      className="flex flex-col gap-6 md:gap-10 pt-[110px]"
      ref={ref}
      id="work"
    >
      <Title>Projects</Title>
      {works.map((work, index) => (
        <FolioCard
          key={index}
          img={work.img}
          title={work.title}
          gitLink={work.gitLink}
          liveLink={work.liveLink}
          about={work.about}
          stack={work.stack}
        />
      ))}

      <Timeline />
    </section>
  );
}
