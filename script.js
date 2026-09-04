/* ============================================
   ANAS ABDIWAHID HUSSEIN – Portfolio Script
   ============================================ */

/* ── Dark / Light Mode Toggle ── */
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Load saved theme, default to dark to match the modern mockup
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

/* ── Language Switcher & i18n (Only 3: English, Somali, Arabic) ── */
const langConfig = {
  "en": {
    "locale": "en-US",
    "dir": "ltr",
    "typing": [
      "Full-Stack Software Developer 🚀",
      "Creative UI/UX & Multimedia Specialist 🎨",
      "IoT & Arduino Smart Hardware Innovator ⚡",
      "Turning Complex Ideas Into High-Performance Code 💻",
      "Building Scalable, Modern & Smart Digital Systems 🌐"
    ]
  },
  "so": {
    "locale": "so-SO",
    "dir": "ltr",
    "typing": [
      "Full-Stack Software Developer 🚀",
      "Khabiir Sare oo Multimedia & UI/UX Design ah 🎨",
      "Hal-abuure Mashaariicda IoT & Arduino ⚡",
      "U Beddelidda Fikradaha Kood Tayo & Xawaare Sare Leh 💻",
      "Dhisidda Baraha & Nidaamyada Dijitaalka ee Casriga Ah 🌐"
    ]
  },
  "ar": {
    "locale": "ar-SA",
    "dir": "rtl",
    "typing": [
      "مطور برمجيات Full-Stack محترف 🚀",
      "خبير تصميم واجهات UI/UX والوسائط المتعددة 🎨",
      "مبتكر مشاريع إنترنت الأشياء والأردوينو الذكية ⚡",
      "تحويل الأفكار إلى أكواد وأنظمة برمجية عالية الأداء 💻",
      "بناء حلول رقمية وتطبيقات ويب متطورة 🌐"
    ]
  }
};

const translations = {
  "en": {
    "page.title": "Anas Abdiwahid Hussein Warsame | Portfolio",
    "ui.language": "Change language",
    "ui.toggleDark": "Toggle dark mode",
    "ui.openMenu": "Open menu",
    "ui.backToTop": "Back to top",
    "ui.whatsappChat": "WhatsApp chat",
    "ui.notSupported": "Not supported",
    "nav.home": "Home",
    "nav.about": "About Me",
    "nav.portfolio": "Projects",
    "nav.iot": "IoT Projects",
    "nav.services": "Services",
    "nav.certs": "Certificates",
    "nav.cv": "CV",
    "nav.contact": "Contact",
    "nav.cta": "LET'S TALK",
    "hero.tag": "FULL STACK DEVELOPER & INNOVATOR",
    "hero.greetingLine": "Hay! I'm Anas Abdiwahid.",
    "hero.subtitleLine": "FULL STACK DEVELOPER & DESIGNER",
    "hero.p1": "I am a passionate Full Stack Developer and UI/UX Designer dedicated to building high-performance web applications, scalable digital architectures, and visually compelling interfaces.",
    "hero.btnContact": "GET IN TOUCH",
    "about.badge": "ABOUT ME",
    "about.title": "Anas Abdiwahid Hussein Warsame",
    "about.intro": "I am Anas Abdiwahid Hussein Warsame, born on 1 January 2004 in Mogadishu, Somalia. I am a passionate 4th-year Computer Science student at Hormuud University, Software Developer, and Technology Enthusiast specialized in Full-Stack Web Development, IoT & Arduino, and Creative Multimedia solutions.",
    "about.stat1": "Years Experience",
    "about.stat2": "Projects Done",
    "about.stat3": "Happy Clients",
    "about.viewBio": "FULL BIOGRAPHY",
    "portfolio.badge": "MY WORK",
    "portfolio.title": "RECENT PROJECTS",
    "portfolio.desc": "Explore a curated selection of web applications, UI/UX systems, and branding designs crafted with precision.",
    "portfolio.tabSystems": "Systems & Web Apps",
    "portfolio.tabPosters": "Graphic Posters",
    "portfolio.tabVideos": "Videos & Media",
    "iot.badge": "IOT & EMBEDDED HARDWARE",
    "iot.title": "Smart <span class=\"highlight\">IoT & Arduino</span> Systems",
    "iot.desc": "Live video showcases of embedded hardware prototypes, smart sensor integrations, microcontrollers, and automation systems engineered by Anas.",
    "iot.card1.badge": "Smart Sensor System",
    "iot.card1.title": "Automated Obstacle & Distance Sensing",
    "iot.card1.desc": "Real-time embedded microcontroller integration featuring automated ultrasonic distance monitoring, active alerts, and intelligent circuit logic.",
    "iot.card2.badge": "Robotics & Motor Control",
    "iot.card2.title": "Automated Robotic Actuator Unit",
    "iot.card2.desc": "Robotic prototype and automated motion processing using motor drivers, servo actuators, and sensor-driven decision making.",
    "iot.card3.badge": "Connected IoT Monitor",
    "iot.card3.title": "IoT Live Data & Security Module",
    "iot.card3.desc": "Interactive wireless hardware demonstration showing real-time hardware telemetry, trigger events, and circuit debugging.",
    "certs.badge": "OFFICIAL CERTIFICATIONS & HONORS",
    "certs.title": "Verified <span class=\"highlight\">Certificates</span> & Credentials",
    "certs.desc": "Official academic and professional credentials earned by Anas Abdiwahid Hussein across Artificial Intelligence, Prompt Engineering, and Technology Innovation.",
    "certs.yearLabel": "Year Received:",
    "certs.viewPdf": "View / Download PDF",
    "certs.viewCert": "View Certificate",
    "certs.viewAll": "View All Certificates (5)",
    "certs.showLess": "Show Less",
    "certs.verified": "Verified Credential",
    "certs.cert1.title": "Mastering Prompt Engineering",
    "certs.cert1.track": "Artificial Intelligence for Academic Transformation",
    "certs.cert1.issuer": "National Training Week",
    "certs.cert1.date": "August 29, 2026",
    "certs.cert2.title": "AI for Health Awareness & Disease Prevention",
    "certs.cert2.track": "Artificial Intelligence for Academic Transformation",
    "certs.cert2.issuer": "National Training Week",
    "certs.cert2.date": "September 1, 2026",
    "certs.cert3.title": "Navigating AI-Generated Media with AI Tools",
    "certs.cert3.track": "Artificial Intelligence for Academic Transformation",
    "certs.cert3.issuer": "National Training Week",
    "certs.cert3.date": "September 2, 2026",
    "certs.cert4.title": "From Graduation to Employment: AI Career Bridge",
    "certs.cert4.track": "Artificial Intelligence for Academic Transformation",
    "certs.cert4.issuer": "National Training Week",
    "certs.cert4.date": "September 2, 2026",
    "certs.cert5.title": "UNESCO: AI Ethics & Public Sector Capacity",
    "certs.cert5.track": "UNESCO & National Training Week",
    "certs.cert5.issuer": "UNESCO & NTW",
    "certs.cert5.date": "September 2, 2026",
    "services.badge": "SERVICES",
    "services.title": "DESIGN & DEV SERVICES I AM PROVIDING",
    "services.desc": "High quality development and creative design solutions customized to grow your business and digital presence.",
    "services.card1.title": "Full Stack Web Dev",
    "services.card1.desc": "End-to-end custom web applications built with modern frameworks. Scalable, high-speed, and secure backend systems.",
    "services.card2.title": "UI / UX Design",
    "services.card2.desc": "User-centric, clean, and intuitive interfaces with modern aesthetics, interactive prototypes, and frictionless user flows.",
    "services.card3.title": "Logo & Visual Branding",
    "services.card3.desc": "Distinctive brand identities, logos, color palettes, and visual guidelines that effectively communicate your story.",
    "services.card4.title": "Multimedia Production",
    "services.card4.desc": "Dynamic digital graphics, high-impact marketing posters, video editing, and interactive social media assets.",
    "services.card5.title": "IT / IoT Systems",
    "services.card5.desc": "Hardware-software integration, system troubleshooting, server setup, and smart connected automation solutions.",
    "services.card6.title": "Responsive Web Apps",
    "services.card6.desc": "Pixel-perfect layouts optimized for smartphones, tablets, laptops, and 4K desktop screens for flawless cross-device experience.",
    "services.readMore": "Hire for this",
    "collab.badge": "OFFICIAL COLLABORATIONS",
    "collab.title": "REAL PROJECTS & ORGANIZATIONS",
    "cv.badge": "CURRICULUM VITAE",
    "cv.title": "My Official Resume",
    "cv.desc": "Review my complete technical background, university coursework at Hormuud University, professional milestones, and certifications.",
    "cv.list1": "Full Stack Web Architecture (Frontend & Backend)",
    "cv.list2": "UI/UX Prototyping, Wireframing & Brand Guidelines",
    "cv.list3": "Database Design, API Integration & Security",
    "cv.list4": "IT Support, Networking & Embedded Systems",
    "cv.btnDownload": "Download CV (PDF)",
    "cv.btnRequest": "Request Full Bio",
    "contact.badge": "GET IN TOUCH",
    "contact.title": "Let's Create Something Exceptional",
    "contact.desc": "Have an exciting project, freelance inquiry, or job opportunity? Send me a message and I'll respond within 24 hours.",
    "contact.emailLabel": "Email Address",
    "contact.locationLabel": "Location",
    "contact.locationValue": "Mogadishu, Somalia",
    "contact.universityLabel": "University",
    "contact.universityValue": "Hormuud University (4th Year)",
    "contact.form.nameLabel": "Your Name",
    "contact.form.namePlaceholder": "e.g. Ahmed Ali",
    "contact.form.emailLabel": "Your Email",
    "contact.form.emailPlaceholder": "e.g. ahmed@example.com",
    "contact.form.phoneLabel": "Phone Number",
    "contact.form.phonePlaceholder": "e.g. +252 61 XXXXXXX",
    "contact.form.subjectLabel": "Subject",
    "contact.form.subjectPlaceholder": "e.g. Project Proposal / Consultation",
    "contact.form.messageLabel": "Message",
    "contact.form.msgPlaceholder": "Tell me about your project requirements, goals, and timeline...",
    "contact.send": "Send via WhatsApp",
    "contact.sending": "Opening WhatsApp...",
    "contact.success": "Message prepared! Opening WhatsApp...",
    "footer.rights": "All rights reserved.",
    "footer.qrTitle": "Scan WhatsApp QR"
  },
  "so": {
    "page.title": "Anas Abdiwahid Hussein Warsame | Portfolio & Xog Nololeed",
    "ui.language": "Bedel luqadda",
    "ui.toggleDark": "Beddel habeen/maalin",
    "ui.openMenu": "Fur menu",
    "ui.backToTop": "Ku noqo kore",
    "ui.whatsappChat": "Wadahadal WhatsApp",
    "ui.notSupported": "Lama taageero",
    "nav.home": "Bogga Hore",
    "nav.about": "Igu Saabsan",
    "nav.portfolio": "Mashaariicda",
    "nav.iot": "IoT Projects",
    "nav.services": "Adeegyada",
    "nav.certs": "Shahaadooyinka",
    "nav.cv": "CV",
    "nav.contact": "Xiriir",
    "nav.cta": "Wada Hadal",
    "hero.tag": "FULL STACK DEVELOPER & HAL-ABUURE",
    "hero.greetingLine": "SALAAN! WAXAAN AHAY ANAS ABDIWAHID.",
    "hero.subtitleLine": "FULL STACK DEVELOPER & DESIGNER",
    "hero.p1": "Waxaan ahay horumariye Full Stack iyo naqshadeeye UI/UX oo u heellan dhisidda barnaamijyo web oo tayo sare leh, nidaamyo xogeed casri ah, iyo muuqaallo soo jiidasho leh.",
    "hero.btnContact": "ILA SOO XIRIIR",
    "about.badge": "KU SAABSAN ANAS",
    "about.title": "Anas Abdiwahid Hussein Warsame",
    "about.intro": "Waxaan ahay Anas Abdiwahid Hussein Warsame, ku dhashay Muqdisho 1 Janaayo 2004. Waxaan ahay arday sanadka 4-aad ee Computer Science ka dhigta Jaamacadda Hormuud, Horumariye Software, khabiir IoT iyo Multimedia oo dhisaya xalal dijitaal ah oo casri ah.",
    "about.stat1": "Sano Khibrad",
    "about.stat2": "Mashruucyo La Qabtay",
    "about.stat3": "Macaamiil Faraxsan",
    "about.viewBio": "TAARIIKH NOLOLEEDKA BUUXDA",
    "portfolio.badge": "SHAQOOYINKAYGA",
    "portfolio.title": "MASHAARIICDII UGU DAMBEEYAY",
    "portfolio.desc": "Daawo xulasho gaar ah oo ka kooban web apps, nidaamyo UI/UX, iyo naqshado branding oo si heersare ah loo farsameeyay.",
    "portfolio.tabSystems": "Nidaamyada & Web Apps",
    "portfolio.tabPosters": "Boorarka & Naqshadaha",
    "portfolio.tabVideos": "Fiidyowyada & Warbaahinta",
    "iot.badge": "HAL-ABUURKA IOT & HARDWARE",
    "iot.title": "Mashaariicda Casriga Ah ee <span class=\"highlight\">IoT & Arduino</span>",
    "iot.desc": "Daawo muuqaallada mashaariicda dhabta ah ee qalabka IoT, dareemayaasha casriga ah, iyo nidaamyada Arduino ee uu dhisay Anas Abdiwahid.",
    "iot.card1.badge": "Nidaamka Dareemaha Fogaanta",
    "iot.card1.title": "Dareemaha Fogaanta & Digniinta Tooska Ah",
    "iot.card1.desc": "Mashruuc dhab ah oo lagu dhisay dareemaha ultrasonic ee xisaabiya masaafada, si toos ahna digniin ugu bixiya iftiin iyo dhawaaq.",
    "iot.card2.badge": "Xakameynta Matoorrada & Robot-ka",
    "iot.card2.title": "Nidaamka Dhaqdhaqaaqa Matoorrada Casriga Ah",
    "iot.card2.desc": "Nidaam microcontroller ah oo si toos ah u xakameeya matoorrada, jihada, iyo xawaaraha robot-ka iyadoo la adeegsanayo dareemayaal.",
    "iot.card3.badge": "Amniga & Xog-Uuraynta IoT",
    "iot.card3.title": "Qalabka Isku-xiran ee Smart IoT",
    "iot.card3.desc": "Mashruuc tijaabo ah oo muujinaya isku-xirka wareegyada korontada, la socodka xaaladda qalabka, iyo koodhka firmware-ka ee microcontroller-ka.",
    "certs.badge": "SHAHAADOOYINKA RASMIGA AH",
    "certs.title": "Shahaadooyinka & <span class=\"highlight\">Aqoonsiyada Rasmiga Ah</span>",
    "certs.desc": "Shahaadooyin rasmi ah oo uu qaatay Anas Abdiwahid Hussein oo ku saabsan Artificial Intelligence, Prompt Engineering, iyo Horumarinta Tiknoolajiyadda.",
    "certs.yearLabel": "Sanadka:",
    "certs.viewPdf": "Eeg / Soo Deji PDF",
    "certs.viewCert": "Eeg Shahaadada",
    "certs.viewAll": "Eeg Dhammaan Shahaadooyinka (5)",
    "certs.showLess": "Soo Koob",
    "certs.verified": "Shahaado La Xaqiijiyay",
    "certs.cert1.title": "Mastering Prompt Engineering",
    "certs.cert1.track": "Artificial Intelligence for Academic Transformation",
    "certs.cert1.issuer": "National Training Week",
    "certs.cert1.date": "29 Agoosto 2026",
    "certs.cert2.title": "AI for Health Awareness & Disease Prevention",
    "certs.cert2.track": "Artificial Intelligence for Academic Transformation",
    "certs.cert2.issuer": "National Training Week",
    "certs.cert2.date": "01 Sebtembar 2026",
    "certs.cert3.title": "Navigating AI-Generated Media with AI Tools",
    "certs.cert3.track": "Artificial Intelligence for Academic Transformation",
    "certs.cert3.issuer": "National Training Week",
    "certs.cert3.date": "02 Sebtembar 2026",
    "certs.cert4.title": "From Graduation to Employment: AI Career Bridge",
    "certs.cert4.track": "Artificial Intelligence for Academic Transformation",
    "certs.cert4.issuer": "National Training Week",
    "certs.cert4.date": "02 Sebtembar 2026",
    "certs.cert5.title": "UNESCO: AI Ethics & Public Sector Capacity",
    "certs.cert5.track": "UNESCO & National Training Week",
    "certs.cert5.issuer": "UNESCO & NTW",
    "certs.cert5.date": "02 Sebtembar 2026",
    "services.badge": "ADEEGYADA",
    "services.title": "ADEEGYADA NAQSHADDA & HORUMARINTA EE AAN BIXIYO",
    "services.desc": "Xalal tayo sare leh oo ku saabsan horumarinta software-ka iyo naqshadaynta hal-abuurka leh ee kor u qaadaya ganacsigaaga.",
    "services.card1.title": "Full Stack Web Dev",
    "services.card1.desc": "Web apps dhammeystiran oo lagu dhiso frameworks casri ah. Nidaamyo backend oo la miisaami karo, degdeg ah, kana ammaan ah.",
    "services.card2.title": "Naqshadaynta UI / UX",
    "services.card2.desc": "Interfaces nadiif ah oo si fudud loo isticmaali karo, lehna qaab casri ah iyo khibrad isticmaale oo aan carqalad lahayn.",
    "services.card3.title": "Naqshadda Logo & Sumadda",
    "services.card3.desc": "Aqoonsi sumadeed gaar ah, calaamado (logos), midabbo ku habboon, iyo hab-raacyo muuqaal oo sheegaya sheekadaada.",
    "services.card4.title": "Soo Saaridda Multimedia",
    "services.card4.desc": "Naqshado digital oo firfircoon, boorar xayaysiis tayo sare leh, habaynta fiidyowyada, iyo qalabka baraha bulshada.",
    "services.card5.title": "Nidaamyada IT & IoT",
    "services.card5.desc": "Isku xirka hardware-ka iyo software-ka, xalinta cilladaha nidaamka, diyaarinta server-ka, iyo nidaamyada smart automation.",
    "services.card6.title": "Web Apps U Dhigma Shaashadaha",
    "services.card6.desc": "Naqshado ku habboon moobaylada, tablets-ka, laptops-ka, iyo kombuyuutarrada waaweyn oo si toos ah isu waafajiya.",
    "services.readMore": "Ila Soo Xiriir",
    "collab.badge": "MASHAARIICDA DHABTA AH",
    "collab.title": "MASHAARIICDA & HAY'ADAHA",
    "cv.badge": "TAARIIKH NOLOLEED",
    "cv.title": "CV-gayga Rasmiga Ah",
    "cv.desc": "Halkan ka eeg aqoontayda farsamo, waxbarashadayda Jaamacadda Hormuud, horumarka xirfadeed, iyo shahaadooyinkayga.",
    "cv.list1": "Dhismaha Web Full Stack (Frontend & Backend)",
    "cv.list2": "Naqshadaynta UI/UX, Hab-raacyada & Sumadda",
    "cv.list3": "Dhismaha Databases, Isku-xirka API & Amniga",
    "cv.list4": "Taageerada IT, Isku-xirka Shabakadaha & Embedded Systems",
    "cv.btnDownload": "Soo Deji CV (PDF)",
    "cv.btnRequest": "Dalbo CV-ga Buuxa",
    "contact.badge": "ILA SOO XIRIIR",
    "contact.title": "Aan Sameyno Wax Cajiib Ah",
    "contact.desc": "Ma haysaa mashruuc cusub, hawl gaar ah, ama fursad shaqo? Fariin ii soo dir waxaanan kugu soo jawaabayaa 24 saacadood gudahood.",
    "contact.emailLabel": "Cinwaanka Email-ka",
    "contact.locationLabel": "Goobta",
    "contact.locationValue": "Muqdisho, Soomaaliya",
    "contact.universityLabel": "Jaamacadda",
    "contact.universityValue": "Jaamacadda Hormuud (Sanadka 4-aad)",
    "contact.form.nameLabel": "Magacaaga",
    "contact.form.namePlaceholder": "Tusaale: Axmed Cali",
    "contact.form.emailLabel": "Email-kaaga",
    "contact.form.emailPlaceholder": "Tusaale: axmed@example.com",
    "contact.form.phoneLabel": "Taleefanka / WhatsApp",
    "contact.form.phonePlaceholder": "Tusaale: +252 61 XXXXXXX",
    "contact.form.subjectLabel": "Cinwaanka Fariinta",
    "contact.form.subjectPlaceholder": "Tusaale: Mashruuc Cusub / Wada shaqayn",
    "contact.form.messageLabel": "Fariintaada",
    "contact.form.msgPlaceholder": "Iiga faalloo mashruucaaga, hadafyadaada iyo waqtiga aad rabto...",
    "contact.send": "Ku Dir WhatsApp",
    "contact.sending": "WhatsApp ayaa la furayaa...",
    "contact.success": "Fariinta waa la diyaariyay! WhatsApp ayaa kuu furmaya...",
    "footer.rights": "Dhammaan xuquuqda way dhowran yihiin.",
    "footer.qrTitle": "Iskaan Garee WhatsApp QR"
  },
  "ar": {
    "page.title": "أنس عبد الواحد حسين ورسمه | معرض الأعمال والسيرة الذاتية",
    "ui.language": "تغيير اللغة",
    "ui.toggleDark": "تبديل الوضع الليلي",
    "ui.openMenu": "فتح القائمة",
    "ui.backToTop": "العودة للأعلى",
    "ui.whatsappChat": "محادثة واتساب",
    "ui.notSupported": "غير مدعوم",
    "nav.home": "الرئيسية",
    "nav.about": "عني",
    "nav.portfolio": "المشاريع",
    "nav.iot": "مشاريع IoT",
    "nav.services": "الخدمات",
    "nav.certs": "الشهادات",
    "nav.cv": "السيرة الذاتية",
    "nav.contact": "اتصل بي",
    "nav.cta": "تواصل معي",
    "hero.tag": "مطور برمجيات Full-Stack ومبتكر",
    "hero.greetingLine": "مرحباً! أنا أنس عبد الواحد.",
    "hero.subtitleLine": "مطور برمجيات ومصمم محترف",
    "hero.p1": "أنا مطور برمجيات Full Stack ومصمم واجهات UI/UX شغوف بتطوير تطبيقات ويب عالية الأداء وأنظمة رقمية متطورة وتصاميم بصرية استثنائية.",
    "hero.btnContact": "تواصل معي",
    "about.badge": "نبذة عني",
    "about.title": "أنس عبد الواحد حسين ورسمه",
    "about.intro": "أنا أنس عبد الواحد حسين ورسمه، من مواليد 1 يناير 2004 في مقديشو، الصومال. طالب بالسنة الرابعة في كلية علوم الحاسوب بجامعة هرمود، ومطور برمجيات وشغوف بالتقنية ومتخصص في تطوير تطبيقات الويب، وإنترنت الأشياء (IoT)، والوسائط المتعددة.",
    "about.stat1": "سنوات خبرة",
    "about.stat2": "مشاريع منجزة",
    "about.stat3": "عملاء راضون",
    "about.viewBio": "السيرة الذاتية الكاملة",
    "portfolio.badge": "أعمالي",
    "portfolio.title": "أحدث المشاريع",
    "portfolio.desc": "استكشف مجموعة مختارة من تطبيقات الويب، وأنظمة واجهات المستخدم UI/UX، وتصاميم الهوية البصرية المصممة بدقة واحترافية.",
    "portfolio.tabSystems": "الأنظمة وتطبيقات الويب",
    "portfolio.tabPosters": "بوسترات وتصاميم جرافيك",
    "portfolio.tabVideos": "الفيديوهات والوسائط",
    "iot.badge": "ابتكارات إنترنت الأشياء والعتاد",
    "iot.title": "مشاريع تفاعلية في <span class=\"highlight\">IoT والأردوينو</span>",
    "iot.desc": "استعرض عروض الفيديو الحية للأنظمة المدمجة وأجهزة الاستشعار الذكية ومتحكمات الأردوينو المطورة بواسطة أنس عبد الواحد.",
    "iot.card1.badge": "مستشعر المسافة الذكي",
    "iot.card1.title": "نظام استشعار المسافة والتنبيه التلقائي",
    "iot.card1.desc": "عرض عملي لتطبيق مستشعر الموجات فوق الصوتية لحساب المسافات بدقة عالية وتوليد تنبيهات ضوئية وصوتية تلقائية.",
    "iot.card2.badge": "التحكم الآلي بالمحركات",
    "iot.card2.title": "وحدة التحكم بمحركات الروبوتات الذكية",
    "iot.card2.desc": "وحدة تحكم ذكية بالمحركات لإدارة الاتجاه والسرعة والتفاعل المباشر مع مدخلات أجهزة الاستشعار للمركبات الذكية.",
    "iot.card3.badge": "قياسات ومراقبة IoT",
    "iot.card3.title": "نظام العتاد الذكي المتصل للمراقبة",
    "iot.card3.desc": "تصميم دائرة إلكترونية متكاملة لمراقبة حالة الأجهزة ومعالجة الإشارات اللحظية بكفاءة عالية.",
    "certs.badge": "الشهادات والاعتمادات الرسمية",
    "certs.title": "الشهادات <span class=\"highlight\">المعتمدة والإنجازات</span>",
    "certs.desc": "الشهادات الأكاديمية والمهنية الرسمية التي حصل عليها أنس عبد الواحد في مجالات الذكاء الاصطناعي وهندسة الأوامر والابتكار التقني.",
    "certs.yearLabel": "سنة الحصول عليها:",
    "certs.viewPdf": "عرض / تحميل PDF",
    "certs.viewCert": "عرض الشهادة",
    "certs.viewAll": "عرض جميع الشهادات (5)",
    "certs.showLess": "عرض أقل",
    "certs.verified": "شهادة معتمدة وموثقة",
    "certs.cert1.title": "Mastering Prompt Engineering",
    "certs.cert1.track": "الذكاء الاصطناعي للتحول الأكاديمي",
    "certs.cert1.issuer": "أسبوع التدريب الوطني NTW",
    "certs.cert1.date": "29 أغسطس 2026",
    "certs.cert2.title": "AI for Health Awareness & Disease Prevention",
    "certs.cert2.track": "الذكاء الاصطناعي للتوعية الصحية",
    "certs.cert2.issuer": "أسبوع التدريب الوطني NTW",
    "certs.cert2.date": "01 سبتمبر 2026",
    "certs.cert3.title": "Navigating AI-Generated Media with AI Tools",
    "certs.cert3.track": "التعامل مع وسائط الذكاء الاصطناعي",
    "certs.cert3.issuer": "أسبوع التدريب الوطني NTW",
    "certs.cert3.date": "02 سبتمبر 2026",
    "certs.cert4.title": "From Graduation to Employment: AI Career Bridge",
    "certs.cert4.track": "الربط الوظيفي بالذكاء الاصطناعي",
    "certs.cert4.issuer": "أسبوع التدريب الوطني NTW",
    "certs.cert4.date": "02 سبتمبر 2026",
    "certs.cert5.title": "UNESCO: AI Ethics & Public Sector Capacity",
    "certs.cert5.track": "أخلاقيات الذكاء الاصطناعي - اليونسكو",
    "certs.cert5.issuer": "اليونسكو وأسبوع التدريب الوطني",
    "certs.cert5.date": "02 سبتمبر 2026",
    "services.badge": "خدماتي",
    "services.title": "خدمات التصميم والتطوير البرمجي",
    "services.desc": "حلول برمجية وتصميمية متقدمة وعالية الجودة مخصصة لتنمية أعمالك وتعزيز حضورك الرقمي.",
    "services.card1.title": "تطوير تطبيقات الويب Full-Stack",
    "services.card1.desc": "تطوير تطبيقات ويب متكاملة باستخدام أحدث أطر العمل مع أنظمة خلفية آمنة وقابلة للتوسع وسريعة الأداء.",
    "services.card2.title": "تصميم واجهات وتجربة المستخدم UI/UX",
    "services.card2.desc": "واجهات مستخدم نظيفة وبديهية ذات جمالية عصرية ونماذج تفاعلية تضمن تجربة مستخدم سلسة.",
    "services.card3.title": "تصميم الشعارات والهوية البصرية",
    "services.card3.desc": "هويات بصرية متميزة، وشعارات مبتكرة، ولوحات ألوان وأنظمة تصميم تعبر عن علامتك التجارية بوضوح.",
    "services.card4.title": "إنتاج الوسائط المتعددة",
    "services.card4.desc": "تصاميم رقمية ديناميكية، وبوسترات تسويقية احترافية، ومونتاج فيديو وإعلانات مرئية لمنصات التواصل الاجتماعي.",
    "services.card5.title": "أنظمة IT وإنترنت الأشياء IoT",
    "services.card5.desc": "ربط الأجهزة بالبرمجيات (IoT)، وحلول الأردوينو الذكية، وإعداد الخوادم، وصيانة وإدارة الأنظمة والشبكات.",
    "services.card6.title": "تطبيقات ويب متجاوبة بالكامل",
    "services.card6.desc": "تصاميم متوافقة ومتجاوبة بالكامل مع الهواتف الذكية والأجهزة اللوحية والشاشات الكبيرة لتجربة تصفح مثالية.",
    "services.readMore": "اطلب هذه الخدمة",
    "collab.badge": "المشاريع والجهات الرسمية",
    "collab.title": "مشاريع ومنصات رسمية شاركت في بنائها",
    "cv.badge": "السيرة الذاتية",
    "cv.title": "ملف السيرة الذاتية الرسمي",
    "cv.desc": "اطّلع على خلفيتي التقنية الكاملة، ومسيرتي الأكاديمية في جامعة هرمود، وأبرز الإنجازات المهنية والشهادات.",
    "cv.list1": "تطوير وهندسة تطبيقات الويب (Frontend & Backend)",
    "cv.list2": "تصميم واجهات وتجربة المستخدم والنماذج الأولية UI/UX",
    "cv.list3": "تصميم قواعد البيانات والربط البرمجي عبر APIs والحماية",
    "cv.list4": "الدعم الفني للشبكات والأنظمة المدمجة وإنترنت الأشياء",
    "cv.btnDownload": "تحميل السيرة الذاتية (PDF)",
    "cv.btnRequest": "طلب السيرة الذاتية الكاملة",
    "contact.badge": "تواصل معي",
    "contact.title": "لنبتكر شيئاً استثنائياً معاً",
    "contact.desc": "هل لديك مشروع جديد، أو استفسار عن عمل حر، أو فرصة تعاون؟ أرسل لي رسالة وسأرد عليك خلال 24 ساعة.",
    "contact.emailLabel": "البريد الإلكتروني",
    "contact.locationLabel": "الموقع",
    "contact.locationValue": "مقديشو، الصومال",
    "contact.universityLabel": "الجامعة",
    "contact.universityValue": "جامعة هرمود (السنة الرابعة)",
    "contact.form.nameLabel": "الاسم الكامل",
    "contact.form.namePlaceholder": "مثال: أحمد علي",
    "contact.form.emailLabel": "البريد الإلكتروني",
    "contact.form.emailPlaceholder": "مثال: ahmed@example.com",
    "contact.form.phoneLabel": "رقم الهاتف / واتساب",
    "contact.form.phonePlaceholder": "مثال: 61XXXXXXX 252+",
    "contact.form.subjectLabel": "موضوع الرسالة",
    "contact.form.subjectPlaceholder": "مثال: استفسار عن مشروع / تعاون برمجى",
    "contact.form.messageLabel": "نص الرسالة",
    "contact.form.msgPlaceholder": "اكتب تفاصيل مشروعك، أهدافك، والجدول الزمني المطلوب...",
    "contact.send": "إرسال عبر واتساب",
    "contact.sending": "جارٍ فتح واتساب...",
    "contact.success": "تم تجهيز الرسالة! جارٍ التحويل إلى واتساب...",
    "footer.rights": "جميع الحقوق محفوظة.",
    "footer.qrTitle": "امسح رمز QR للواتساب"
  }
};

const langBtn = document.getElementById('langBtn');
const langMenu = document.getElementById('langMenu');
const langLabel = document.getElementById('langLabel');
const langFlag = document.getElementById('langFlag');
const langOptions = document.querySelectorAll('.lang-option');

let savedLang = localStorage.getItem('lang');
if (savedLang !== 'en' && savedLang !== 'so' && savedLang !== 'ar') {
  savedLang = 'en';
  localStorage.setItem('lang', 'en');
}
let currentLang = savedLang;

function t(key) {
  return (translations[currentLang] && translations[currentLang][key]) ||
    (translations.en && translations.en[key]) ||
    key;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = t(el.dataset.i18n);
    if (typeof val === 'string' && val.includes('<') && val.includes('>')) {
      el.innerHTML = val;
    } else {
      el.textContent = val;
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.setAttribute('placeholder', t(el.dataset.i18nPlaceholder));
  });
  document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
    el.setAttribute('aria-label', t(el.dataset.i18nAriaLabel));
  });
  document.title = t('page.title');
  const certsGrid = document.querySelector('.certs-grid');
  const certsToggleText = document.getElementById('certsToggleText');
  if (certsGrid && certsToggleText) {
    certsToggleText.textContent = certsGrid.classList.contains('expanded') ? t('certs.showLess') : t('certs.viewAll');
  }
}

function updateLanguageUI() {
  const option = document.querySelector(`.lang-option[data-lang="${currentLang}"]`);
  if (!option) return;
  if (langLabel) langLabel.textContent = option.dataset.label || currentLang.toUpperCase();
  const optImg = option.querySelector('img');
  if (langFlag) {
    langFlag.src = (optImg && optImg.getAttribute('src')) || option.dataset.flag || '';
  }
}

function getHijriFormatter(locale) {
  const opts = { year: 'numeric', month: 'long', day: 'numeric' };
  const base = locale || 'en-US';
  try {
    return new Intl.DateTimeFormat(`${base}-u-ca-islamic-umalqura`, opts);
  } catch (e) {
    try {
      return new Intl.DateTimeFormat(`${base}-u-ca-islamic`, opts);
    } catch (err) {
      return null;
    }
  }
}

let gregorianFormatter = null;
let timeFormatter = null;
let hijriFormatter = null;

function setDateFormatters() {
  const locale = (langConfig[currentLang] && langConfig[currentLang].locale) || 'en-US';
  gregorianFormatter = new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric' });
  timeFormatter = new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  hijriFormatter = getHijriFormatter(locale);
}

function setLanguage(lang) {
  if (!translations[lang]) lang = 'en';
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem('lang', lang);
  const dir = (langConfig[lang] && langConfig[lang].dir) || 'ltr';
  document.documentElement.setAttribute('data-lang', lang);
  document.documentElement.setAttribute('dir', dir);
  document.documentElement.setAttribute('lang', lang);
  updateLanguageUI();
  applyTranslations();
  setDateFormatters();
  updateFooterDates();
  startHeroTyping();
}

if (langBtn && langMenu) {
  langBtn.addEventListener('click', e => {
    e.stopPropagation();
    langMenu.classList.toggle('open');
    const isOpen = langMenu.classList.contains('open');
    langBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  langOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      langMenu.classList.remove('open');
      langBtn.setAttribute('aria-expanded', 'false');
      setLanguage(opt.dataset.lang);
    });
  });

  document.addEventListener('click', e => {
    if (!langMenu.contains(e.target) && !langBtn.contains(e.target)) {
      langMenu.classList.remove('open');
      langBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ── Navbar scroll ── */
const navbar = document.getElementById('navbar');
const backTop = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
    backTop.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    backTop.classList.remove('visible');
  }
  updateActiveNav();
  revealOnScroll();
});

/* ── Active nav link ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

/* ── Hamburger menu ── */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
  // Add mobile CTA inside nav if not already there
  if (!navLinksEl.querySelector('.nav-cta')) {
    const cta = document.createElement('a');
    cta.href = '#contact';
    cta.className = 'btn btn-primary nav-cta mobile-show';
    cta.dataset.i18n = 'nav.cta';
    cta.textContent = t('nav.cta');
    navLinksEl.appendChild(cta);
  }
});

// Close menu on link click
navLinksEl.addEventListener('click', e => {
  if (e.target.tagName === 'A') navLinksEl.classList.remove('open');
});

/* ── Back to top ── */
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── Skill bars animation (IntersectionObserver) ── */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.style.width = el.dataset.width + '%';
      skillObserver.unobserve(el);
    }
  });
}, { threshold: 0.4 });

skillFills.forEach(fill => skillObserver.observe(fill));

/* ── Counter animation ── */
const statNums = document.querySelectorAll('.stat-num, .stat-count');

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  if (isNaN(target)) return;
  const duration = 1600;
  const step = Math.ceil(target / (duration / 16));
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(timer);
  }, 16);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

statNums.forEach(el => counterObserver.observe(el));

/* ── Category Tab Switcher & 1-Row Animated Slider ── */
(function initCategoryTabSliders() {
  const tabBtns = document.querySelectorAll('.cat-tab-btn');
  const tabPanels = document.querySelectorAll('.category-tab-panel');

  if (!tabBtns.length || !tabPanels.length) return;

  const slideState = {
    'track-systems': 0,
    'track-posters': 0
  };

  function updateSlider(trackId) {
    const track = document.getElementById(trackId);
    if (!track) return;
    const cards = track.querySelectorAll('.project-card-modern');
    if (!cards.length) return;

    const wrapperWidth = track.parentElement ? track.parentElement.offsetWidth : window.innerWidth;
    const firstCardWidth = cards[0].offsetWidth;
    const gap = 22;
    const cardFullWidth = firstCardWidth + gap;

    const visibleCards = Math.max(1, Math.floor((wrapperWidth + gap) / cardFullWidth));
    const maxIndex = Math.max(0, cards.length - visibleCards);

    if (slideState[trackId] > maxIndex) {
      slideState[trackId] = maxIndex;
    }
    if (slideState[trackId] < 0) {
      slideState[trackId] = 0;
    }

    const offset = slideState[trackId] * cardFullWidth;
    track.style.transform = `translateX(-${offset}px)`;
  }

  // Handle Tab Switch
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePanel = document.getElementById(`panel-${targetTab}`);
      if (activePanel) {
        activePanel.classList.add('active');
        const track = activePanel.querySelector('.panel-slider-track');
        if (track) {
          setTimeout(() => updateSlider(track.id), 50);
        }
      }
    });
  });

  // Handle Prev / Next Arrows
  document.querySelectorAll('.panel-arrow').forEach(arrow => {
    arrow.addEventListener('click', () => {
      const trackId = arrow.getAttribute('data-target');
      const dir = arrow.getAttribute('data-dir');
      const track = document.getElementById(trackId);
      if (!track) return;

      const cards = track.querySelectorAll('.project-card-modern');
      const wrapperWidth = track.parentElement ? track.parentElement.offsetWidth : window.innerWidth;
      const firstCardWidth = cards[0] ? cards[0].offsetWidth : 300;
      const gap = 22;
      const cardFullWidth = firstCardWidth + gap;
      const visibleCards = Math.max(1, Math.floor((wrapperWidth + gap) / cardFullWidth));
      const maxIndex = Math.max(0, cards.length - visibleCards);

      if (dir === 'next') {
        slideState[trackId] = slideState[trackId] >= maxIndex ? 0 : slideState[trackId] + 1;
      } else {
        slideState[trackId] = slideState[trackId] <= 0 ? maxIndex : slideState[trackId] - 1;
      }

      updateSlider(trackId);
    });
  });

  // Window resize handler
  window.addEventListener('resize', () => {
    updateSlider('track-systems');
    updateSlider('track-posters');
  });

  // Initialize on load
  setTimeout(() => {
    updateSlider('track-systems');
    updateSlider('track-posters');
  }, 100);
})();

/* ── Contact form with Direct WhatsApp Dispatch & Background Backup ── */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Read input values
    const nameInput = document.getElementById('fname') || contactForm.querySelector('[name="name"]');
    const emailInput = document.getElementById('femail') || contactForm.querySelector('[name="email"]');
    const phoneInput = document.getElementById('fphone') || contactForm.querySelector('[name="phone"]');
    const subjectInput = document.getElementById('fsubject') || contactForm.querySelector('[name="subject"]');
    const msgInput = document.getElementById('fmsg') || contactForm.querySelector('[name="message"]');

    const payload = {
      name: nameInput ? nameInput.value.trim() : '',
      email: emailInput ? emailInput.value.trim() : '',
      phone: phoneInput ? phoneInput.value.trim() : '',
      subject: subjectInput ? subjectInput.value.trim() : 'Portfolio Inquiry',
      message: msgInput ? msgInput.value.trim() : ''
    };

    if (!payload.name || !payload.email || !payload.phone || !payload.message) {
      alert('Please fill in all required fields (Name, Email, Phone Number, Message).');
      return;
    }

    const btn = contactForm.querySelector('button[type="submit"]');
    const btnText = btn.querySelector('span') || btn;
    const originalText = btnText.textContent;

    btnText.textContent = typeof t === 'function' ? t('contact.sending') : 'Opening WhatsApp...';
    btn.disabled = true;

    // Anas WhatsApp Number
    const myWhatsApp = '252616256534';

    // Format WhatsApp message
    const waMessage = 
      `*Salaan sare Anas!* 👋\n\n` +
      `Waxaan fariin kaaga soo diray Portfolio-gaaga:\n\n` +
      `👤 *Magaca:* ${payload.name}\n` +
      `📧 *Email:* ${payload.email}\n` +
      `📱 *Taleefanka:* ${payload.phone}\n` +
      `📌 *Mawduuca:* ${payload.subject}\n\n` +
      `📝 *Fariinta:*\n${payload.message}`;

    const waUrl = `https://wa.me/${myWhatsApp}?text=${encodeURIComponent(waMessage)}`;

    // Show success notification on screen
    if (formSuccess) {
      const successSpan = formSuccess.querySelector('span');
      if (successSpan) {
        successSpan.textContent = typeof t === 'function' ? t('contact.success') : 'Opening WhatsApp...';
      }
      formSuccess.classList.remove('error');
      formSuccess.classList.add('show');
      setTimeout(() => formSuccess.classList.remove('show'), 6000);
    }

    // Try background email submission (non-blocking)
    try {
      fetch('https://formsubmit.co/ajax/anasabdiwahidhussein@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          _subject: '💬 WhatsApp Inquiry from ' + payload.name + ' (' + payload.subject + ')',
          subject: payload.subject,
          message: payload.message,
          _template: 'table',
          _captcha: 'false'
        })
      }).catch(() => {});
    } catch (e) {}

    // Open WhatsApp in new tab / app
    setTimeout(() => {
      window.open(waUrl, '_blank');
      btnText.textContent = originalText;
      btn.disabled = false;
      contactForm.reset();
    }, 350);
  });
}

/* ── Smooth navbar link scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* Footer Date & Time (Gregorian + Hijri) */
const gregorianDateEl = document.getElementById('gregorianDate');
const clockTimeEl = document.getElementById('clockTime');
const hijriDateEl = document.getElementById('hijriDate');
const copyrightYearEl = document.getElementById('copyrightYear');

function updateFooterDates() {
  const now = new Date();
  if (!gregorianFormatter || !timeFormatter) setDateFormatters();
  if (copyrightYearEl) copyrightYearEl.textContent = now.getFullYear();
  if (gregorianDateEl) gregorianDateEl.textContent = gregorianFormatter.format(now);
  if (clockTimeEl) clockTimeEl.textContent = timeFormatter.format(now);
  if (hijriDateEl) {
    hijriDateEl.textContent = hijriFormatter ? hijriFormatter.format(now) : t('ui.notSupported');
  }
}

setInterval(updateFooterDates, 1000);
/* ── Typing animation for hero subtitle (5 sentences, 5s display duration) ── */
let typingTimeout = null;

function startHeroTyping() {
  const targetEl = document.getElementById('heroTypingText') || document.querySelector('.hero-subtitle-line .typing-text') || document.querySelector('.hero-subtitle-line');
  if (!targetEl) return;
  if (typingTimeout) clearTimeout(typingTimeout);

  const phrases = (langConfig[currentLang] && langConfig[currentLang].typing) || [
    'Full-Stack Software Developer 🚀',
    'Creative UI/UX & Multimedia Specialist 🎨',
    'IoT & Arduino Smart Hardware Innovator ⚡',
    'Turning Complex Ideas Into High-Performance Code 💻',
    'Building Scalable, Modern & Smart Digital Systems 🌐'
  ];
  let si = 0, ci = 0, deleting = false;
  let current = phrases[0] || '';

  function type() {
    if (!deleting) {
      ci++;
      targetEl.textContent = current.slice(0, ci);
      if (ci === current.length) {
        deleting = true;
        // Hold for 5 seconds as requested by user ("Oo Animation Ah 5 sec")
        typingTimeout = setTimeout(type, 5000);
        return;
      }
      typingTimeout = setTimeout(type, 45); // typing speed
    } else {
      ci--;
      targetEl.textContent = current.slice(0, ci);
      if (ci === 0) {
        deleting = false;
        si = (si + 1) % phrases.length;
        current = phrases[si] || '';
        typingTimeout = setTimeout(type, 400); // pause before next sentence
        return;
      }
      typingTimeout = setTimeout(type, 22); // deleting speed
    }
  }

  targetEl.textContent = '';
  typingTimeout = setTimeout(type, 300);
}

/* ── Parallax on hero shapes ── */
window.addEventListener('mousemove', e => {
  const { clientX, clientY } = e;
  const cx = clientX / window.innerWidth - 0.5;
  const cy = clientY / window.innerHeight - 0.5;
  document.querySelectorAll('.shape').forEach((sh, i) => {
    const depth = (i + 1) * 14;
    sh.style.transform = `translate(${cx * depth}px, ${cy * depth}px)`;
  });
});

/* ── Cursor glow effect (desktop only) ── */
if (window.innerWidth > 768) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position:fixed; width:300px; height:300px; border-radius:50%;
    background: radial-gradient(circle, rgba(67,97,238,0.08), transparent 70%);
    pointer-events:none; z-index:9999; transform:translate(-50%,-50%);
    transition: left .15s, top .15s;
  `;
  document.body.appendChild(glow);
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

/* ── Certificate Modal Lightbox (View Only) ── */
function openCertModal(imageSrc, title, certId) {
  const backdrop = document.getElementById('certModalBackdrop');
  const imgEl = document.getElementById('certModalImage');
  const titleEl = document.getElementById('certModalTitle');
  const idEl = document.getElementById('certModalIdBadge');

  if (!backdrop || !imgEl) return;

  imgEl.src = imageSrc;
  imgEl.alt = title || 'Certificate Preview';
  if (titleEl) titleEl.textContent = title || 'Certificate View';
  if (idEl) idEl.textContent = 'ID: ' + (certId || 'NTW-2026');

  backdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCertModal() {
  const backdrop = document.getElementById('certModalBackdrop');
  if (backdrop) {
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function closeCertModalOnBackdrop(e) {
  if (e.target && e.target.id === 'certModalBackdrop') {
    closeCertModal();
  }
}

// Close certificate modal on ESC key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' || e.keyCode === 27) {
    closeCertModal();
  }
});

// Protect certificate images from context menu and dragging
document.addEventListener('contextmenu', e => {
  if (e.target && (e.target.classList.contains('cert-img-thumb') || e.target.classList.contains('cert-modal-img') || e.target.closest('.cert-preview-frame'))) {
    e.preventDefault();
    return false;
  }
});

/* ── Toggle All Certificates (Show 2 initially, expand to all 5) ── */
function toggleAllCertificates() {
  const grid = document.querySelector('.certs-grid');
  const btn = document.getElementById('certsToggleBtn');
  const textSpan = document.getElementById('certsToggleText');
  if (!grid || !btn || !textSpan) return;

  const isExpanded = grid.classList.toggle('expanded');
  btn.classList.toggle('active', isExpanded);

  if (isExpanded) {
    textSpan.textContent = t('certs.showLess');
  } else {
    textSpan.textContent = t('certs.viewAll');
    const certSection = document.getElementById('certificates');
    if (certSection) {
      certSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

// Initialize language on load
setLanguage(currentLang);

console.log('%c Anas Abdiwahid Hussein – Portfolio Loaded', 'color:#4361ee;font-weight:bold;font-size:14px');
