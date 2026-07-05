"use client";
import { Syne } from "next/font/google";
import Title from "../ui/Title";
import TimelineItem from "./TimelineItem";

const syne = Syne({ subsets: ["latin"] });

const TimelineData = [
  {
    companyImg: "/company1.png",
    jobTitle: "Senior DevOps Engineer",
    company: "Bluechip Technologies",
    jobType: "Full-time",
    duration: "Mar 2024 - Present",
    stuffIDid: [
      "Architected and implemented a comprehensive CI/CD pipeline using Jenkins and GitLab CI, reducing deployment time by 70% and improving release reliability.",
      "Orchestrated migration of legacy applications to containerized microservices using Docker and Kubernetes, achieving 40% reduction in infrastructure costs.",
      "Implemented Infrastructure as Code using Terraform and Ansible, automating the provisioning of cloud resources across AWS and Azure platforms.",
      "Designed and deployed a robust monitoring solution using Prometheus and Grafana, achieving 99.99% system uptime and reducing incident response time by 60%.",
      "Led the implementation of GitOps practices using ArgoCD, resulting in consistent deployment patterns and improved collaboration between development and operations teams.",
      "Established security best practices including HashiCorp Vault for secrets management and implemented automated security scanning in the CI pipeline.",
    ],
  },
  {
    companyImg: "/company1.png",
    jobTitle: "DevOps Engineer",
    company: "NNPC",
    jobType: "Full-time",
    duration: "July 2023 - Feb 2024",
    stuffIDid: [
      "Developed and maintained automation scripts in Python and Bash, reducing manual operational tasks by 50%.",
      "Implemented ELK Stack for centralized logging and monitoring, improving system observability and troubleshooting efficiency.",
      "Managed AWS cloud infrastructure including EC2, S3, RDS, and Lambda, ensuring high availability and scalability of production systems.",
      "Collaborated with development teams to optimize container images and Kubernetes configurations, resulting in 30% improvement in resource utilization.",
      "Implemented automated backup and disaster recovery solutions, achieving RPO of 15 minutes and RTO of 1 hour.",
    ],
  },
];

export default function Timeline() {
  return (
    <div className="mt-10 md:mt-[110px]">
      <Title> Work experience</Title>

      {/* THE THING, AFTER WHICH I WOULD DETERMINE THE HEIGHT */}
      <div className="flex mt-6 gap-4 pl-3">
        <div className="w-3 h-auto bg-gradient-to-b from-white to-transparent" />

        <div className="flex flex-col gap-10">
          {TimelineData.map((item, index) => (
            <TimelineItem
              key={index}
              companyImg={item.companyImg}
              jobTitle={item.jobTitle}
              company={item.company}
              jobType={item.jobType}
              duration={item.duration}
              stuffIDid={item.stuffIDid}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
