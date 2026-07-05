import React, { useEffect } from "react";
import Link from "next/link";
import { Syne } from "next/font/google";
import { useView } from "@/contexts/ViewContext";
import { useInView } from "react-intersection-observer";
import AnimatedBody from "../ui/AnimatedBody";
import AnimatedTitle from "../ui/AnimatedTitle";

const syne = Syne({ subsets: ["latin"] });

export default function About() {
  const { setSectionInView } = useView();

  const { ref, inView } = useInView({
    threshold: 0.2,
    rootMargin: "-100px 0px",
  });

  useEffect(() => {
    if (inView) setSectionInView("about");
  }, [inView, setSectionInView]);

  return (
    <section ref={ref} className="pt-24 md:pt-[150px]" id="about">
      <AnimatedTitle
        wordSpace={"mr-[14px]"}
        charSpace={"mr-[0.001em]"}
        className={`uppercase ${syne.className} antialiased text-4xl md:text-5xl xl:text-6xl font-bold opacity-80`}
      >
        I orchestrate seamless cloud infrastructures
      </AnimatedTitle>

      <div className="grid grid-cols-1 lg:grid-cols-[8.5fr_3.5fr] gap-8 mt-6">
        <div className="grid grid-cols-1 antialiased gap-6 text-white/80 text-xl md:text-2xl">
          <AnimatedBody className="leading-[34px] md:leading-[39px]">
            My expertise lies in building and maintaining robust cloud infrastructure and automated deployment pipelines. 
            I specialize in creating scalable, reliable, and secure systems that empower businesses to deliver value 
            faster. From containerization to infrastructure as code, I transform complex deployment processes into 
            streamlined operations.
          </AnimatedBody>
          <AnimatedBody className="leading-[34px] md:leading-[39px]">
            Since diving into DevOps practices in 2019, I&apos;ve continuously evolved my skillset, mastering various cloud 
            platforms and automation tools. I&apos;ve developed a deep understanding of CI/CD practices, monitoring solutions, 
            and security implementations, ensuring systems run efficiently and securely in production environments.
          </AnimatedBody>
          <AnimatedBody className="inline leading-[34px] md:leading-[39px]">
            Every infrastructure challenge presents an opportunity to innovate and implement best practices. I&apos;m passionate 
            about creating maintainable, scalable solutions that help teams deliver software more efficiently. Want to know more? Here&apos;s <br className="hidden md:block" />
            <Link
              className="underline"
              href={
                "https://drive.google.com/file/d/link to your drive uploaded resume"
              }
            >
              my resume
            </Link>
            .
          </AnimatedBody>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <AnimatedTitle
              wordSpace={"mr-[0.5ch]"}
              charSpace={"mr-[0.001em]"}
              className="font-bold antialiased text-xl md:text-2xl mb-2"
            >
              Cloud & Infrastructure
            </AnimatedTitle>
            <AnimatedBody className="text-white/60 text-base md:text-xl leading-8">
              AWS, Azure, Docker, Kubernetes, Terraform, Ansible, Linux, Shell Scripting, Infrastructure as Code (IaC).
            </AnimatedBody>
          </div>
          <div>
            <AnimatedTitle
              wordSpace={"mr-[0.5ch]"}
              charSpace={"mr-[0.001em]"}
              className="font-bold antialiased text-xl md:text-2xl mb-2"
            >
              CI/CD & Automation
            </AnimatedTitle>
            <AnimatedBody className="text-white/60 text-base md:text-xl leading-8">
              Jenkins, GitHub Actions, GitLab CI, ArgoCD, Helm, Python, Bash, Configuration Management.
            </AnimatedBody>
          </div>
          <div>
            <AnimatedTitle
              wordSpace={"mr-[0.5ch]"}
              charSpace={"mr-[0.001em]"}
              className="font-bold antialiased text-xl md:text-2xl mb-2"
            >
              Monitoring & Security
            </AnimatedTitle>
            <AnimatedBody className="text-white/60 text-base md:text-xl leading-8">
              Prometheus, Grafana, ELK Stack, HashiCorp Vault, Security Best Practices, SSL/TLS, IAM.
            </AnimatedBody>
          </div>
        </div>
      </div>
    </section>
  );
}
