'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import styles from './page.module.css'
import { useLanguage } from '@/contexts/LanguageContext'
import { useContent } from '@/contexts/ContentContext'
import FlatIcon from '@/components/FlatIcon'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const { getContent } = useContent()
  const content = getContent(language)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      setIsMenuOpen(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const getWhatsAppUrl = () => {
    // Format phone number: remove non-numeric characters and replace leading 0 with country code 62
    const phone = content.contact.phone.replace(/\D/g, '')
    const formattedPhone = phone.startsWith('0') ? '62' + phone.substring(1) : phone.startsWith('62') ? phone : '62' + phone
    const message = encodeURIComponent('Hello I am interested to consult')
    return `https://wa.me/${formattedPhone}?text=${message}`
  }

  return (
    <div className={styles.container}>
      {/* Navigation */}
      <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.navContainer}>
          <div className={styles.logo}>MARVEL</div>
          <button 
            className={styles.burgerButton}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={`${styles.burgerLine} ${isMenuOpen ? styles.burgerOpen : ''}`}></span>
            <span className={`${styles.burgerLine} ${isMenuOpen ? styles.burgerOpen : ''}`}></span>
            <span className={`${styles.burgerLine} ${isMenuOpen ? styles.burgerOpen : ''}`}></span>
          </button>
          <div className={`${styles.navRight} ${isMenuOpen ? styles.navOpen : ''}`}>
            <div className={styles.navLinks}>
              <a href="#home" onClick={closeMenu}>{t('nav.home')}</a>
              <a href="#about" onClick={closeMenu}>{t('nav.about')}</a>
              <a href="#services" onClick={closeMenu}>{t('nav.services')}</a>
              <a href="#contact" onClick={closeMenu}>{t('nav.contact')}</a>
            </div>
            <div className={styles.languageSwitcher}>
              <button
                onClick={() => {
                  setLanguage('en')
                  closeMenu()
                }}
                className={language === 'en' ? styles.langActive : styles.langButton}
              >
                EN
              </button>
              <button
                onClick={() => {
                  setLanguage('id')
                  closeMenu()
                }}
                className={language === 'id' ? styles.langActive : styles.langButton}
              >
                ID
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            {content.companyName}
          </h1>
          <p className={styles.heroSubtitle}>
            {content.hero.subtitle}
          </p>
          <p className={styles.heroDescription}>
            {content.hero.description}
          </p>
          <div className={styles.heroButtons}>
            <a href="#contact" className={styles.btnPrimary}>{t('hero.getStarted')}</a>
            <a href="#services" className={styles.btnSecondary}>{t('hero.ourServices')}</a>
          </div>
        </div>
        <div className={styles.heroDecoration}></div>
      </section>

      {/* About Section */}
      <section id="about" className={styles.section}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>{t('about.title')}</h2>
          <div className={styles.aboutContent}>
            <div className={styles.aboutText}>
              <p className={styles.aboutParagraph}>
                {content.about.paragraph1}
              </p>
              <p className={styles.aboutParagraph}>
                {content.about.paragraph2}
              </p>
            </div>
            <div className={styles.aboutStats}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>{content.about.stats.projects}</div>
                <div className={styles.statLabel}>{t('about.projectsCompleted')}</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>{content.about.stats.clients}</div>
                <div className={styles.statLabel}>{t('about.happyClients')}</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>{content.about.stats.years}</div>
                <div className={styles.statLabel}>{t('about.yearsExperience')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={`${styles.section} ${styles.servicesSection}`}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>{content.services.title}</h2>
          <p className={styles.sectionSubtitle}>
            {content.services.subtitle}
          </p>
          <div className={styles.servicesGrid}>
            {content.services.items.map((service: { icon: 'briefcase' | 'cloud' | 'lock' | 'mobile' | 'refresh' | 'tools'; title: string; description: string }, index: number) => (
              <div key={index} className={styles.serviceCard}>
                <FlatIcon type={service.icon} className={styles.serviceIcon} />
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`${styles.section} ${styles.contactSection}`}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>{content.contact.title}</h2>
          <p className={styles.sectionSubtitle}>
            {content.contact.subtitle}
          </p>
          <div className={styles.contactContent}>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <div className={styles.contactIconWrapper}>
                  <FlatIcon type="location" className={styles.contactIcon} />
                </div>
                <div className={styles.contactDetails}>
                  <h4>{t('contact.address')}</h4>
                  <p>{content.contact.address}</p>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactIconWrapper}>
                  <FlatIcon type="email" className={styles.contactIcon} />
                </div>
                <div className={styles.contactDetails}>
                  <h4>{t('contact.email')}</h4>
                  <a href={`mailto:${content.contact.email}`} className={styles.contactLink}>
                    {content.contact.email}
                  </a>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactIconWrapper}>
                  <FlatIcon type="phone" className={styles.contactIcon} />
                </div>
                <div className={styles.contactDetails}>
                  <h4>{t('contact.phone')}</h4>
                  <a href={`tel:${content.contact.phone}`} className={styles.contactLink}>
                    {content.contact.phone}
                  </a>
                </div>
              </div>
            </div>
            <div className={styles.contactActions}>
              <div className={styles.actionCard}>
                <FlatIcon type="chat" className={styles.actionIcon} />
                <h3 className={styles.actionTitle}>Chat with Us</h3>
                <p className={styles.actionDescription}>
                  Get instant response via WhatsApp
                </p>
                <a 
                  href={getWhatsAppUrl()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.whatsappButton}
                >
                  <FlatIcon type="chat" className={styles.whatsappIcon} />
                  <span>Message on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>{content.companyName}</div>
          <p className={styles.footerText}>
            © 2026 {content.companyName}. {t('footer.rights')}
          </p>
        </div>
      </footer>

      {/* Mobichat web widget */}
      <Script id="mobichat-settings" strategy="afterInteractive">
        {`window.mobichatSettings = { app_id: "ww_A29s_dALfYfW1XO3irF_-kvqe-3RdIwX" };`}
      </Script>
      <Script
        src="https://sit-app.mobichat.id/js/mobichat-web-widget.js"
        strategy="lazyOnload"
      />
    </div>
  )
}
