import React from "react";
import { Hero } from "../components/hero/Hero";
import { Services } from "../components/services/Services";
import { VideoWorkspace } from "../components/video/VideoWorkspace";
import { SocialEcosystem } from "../components/social/SocialEcosystem";
import { ContentWriting } from "../components/content/ContentWriting";
import { PortfolioSection } from "../components/portfolio/PortfolioSection";
import { AboutSection } from "../components/about/AboutSection";
import { TestimonialsSection } from "../components/testimonials/TestimonialsSection";
import { ContactSection } from "../components/contact/ContactSection";
import { Footer } from "../components/footer/Footer";

export const HomePage = ({ projects, services, testimonials, soundState, settings = {} }) => {
  return (
    <>
      <Hero soundState={soundState} heroData={settings?.hero} />
      <Services services={services} soundState={soundState} />
      <VideoWorkspace soundState={soundState} videoData={settings?.videoWorkspace} />
      <SocialEcosystem soundState={soundState} />
      <ContentWriting soundState={soundState} />
      <PortfolioSection projects={projects} soundState={soundState} />
      <AboutSection soundState={soundState} />
      <TestimonialsSection testimonials={testimonials} soundState={soundState} />
      <ContactSection soundState={soundState} />
      <Footer soundState={soundState} />
    </>
  );
};
