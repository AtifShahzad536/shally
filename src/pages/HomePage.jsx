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
import { WorldTransitionSeam } from "../components/common/WorldTransitionSeam";

export const HomePage = ({ projects, services, testimonials, soundState, settings = {} }) => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Realm 00: The Ancient Cosmic Tree & Genesis */}
      <Hero soundState={soundState} heroData={settings?.hero} />

      {/* Horizon Gate 01 -> Three Disciplines */}
      <WorldTransitionSeam
        realmNumber="01"
        fromRealm="Cosmic Genesis"
        toRealm="Three Disciplines Architecture"
        accentColor="#00E5FF"
      />

      {/* Realm 01: Services Ecosystem */}
      <Services services={services} soundState={soundState} />

      {/* Horizon Gate 02 -> 3D Video Chamber */}
      <WorldTransitionSeam
        realmNumber="02"
        fromRealm="Disciplines"
        toRealm="Spatial Video Chamber // 60FPS"
        accentColor="#A855F7"
      />

      {/* Realm 02: 3D Video Studio Chamber */}
      <VideoWorkspace soundState={soundState} videoData={settings?.videoWorkspace} />

      {/* Horizon Gate 03 -> Viral Social Matrix */}
      <WorldTransitionSeam
        realmNumber="03"
        fromRealm="Video Chamber"
        toRealm="Viral Growth Matrix // 18M+ Reach"
        accentColor="#F472B6"
      />

      {/* Realm 03: Social Media Architecture */}
      <SocialEcosystem soundState={soundState} socialData={settings?.socialEcosystem} />

      {/* Horizon Gate 04 -> Editorial Copywriting Lab */}
      <WorldTransitionSeam
        realmNumber="04"
        fromRealm="Social Matrix"
        toRealm="Editorial Copywriting Lab"
        accentColor="#34D399"
      />

      {/* Realm 04: Content Writing & Narrative Hooks */}
      <ContentWriting soundState={soundState} contentData={settings?.contentWriting} />

      {/* Horizon Gate 05 -> 3D Spatial Project Vault */}
      <WorldTransitionSeam
        realmNumber="05"
        fromRealm="Copywriting Lab"
        toRealm="3D Project Showcase Vault"
        accentColor="#00E5FF"
      />

      {/* Realm 05: Portfolio Cylinder Carousel */}
      <PortfolioSection projects={projects} soundState={soundState} />

      {/* Horizon Gate 06 -> Behind The Creative Vision */}
      <WorldTransitionSeam
        realmNumber="06"
        fromRealm="Project Vault"
        toRealm="Behind The Creative Vision"
        accentColor="#C084FC"
      />

      {/* Realm 06: About & Tech Arsenal */}
      <AboutSection soundState={soundState} aboutData={settings?.about} />

      {/* Horizon Gate 07 -> Client Transmission Echoes */}
      <WorldTransitionSeam
        realmNumber="07"
        fromRealm="Creative Vision"
        toRealm="Client Transmission Echoes"
        accentColor="#F472B6"
      />

      {/* Realm 07: Testimonials */}
      <TestimonialsSection testimonials={testimonials} soundState={soundState} />

      {/* Horizon Gate 08 -> Direct Transmission Portal */}
      <WorldTransitionSeam
        realmNumber="08"
        fromRealm="Client Echoes"
        toRealm="Direct Transmission Portal"
        accentColor="#00E5FF"
      />

      {/* Realm 08: Contact & Inquiries */}
      <ContactSection soundState={soundState} contactData={settings?.contact} email={settings?.email} />

      {/* Universe Terminal Footer */}
      <Footer soundState={soundState} />
    </div>
  );
};
