/* ============================================
   ANAS ABDIWAHID HUSSEIN – Portfolio Script
   ============================================ */

/* ── Dark / Light Mode Toggle ── */
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* ── Language Switcher & i18n ── */
const langConfig = {
  en: { locale: 'en-US', dir: 'ltr', typing: ['& Multimedia', '& Web Design', '& IT Projects', '& Branding'] },
  so: { locale: 'so-SO', dir: 'ltr', typing: ['& Multimedia', '& Naqshad Web', '& Mashaariic IT', '& Branding'] },
  ar: { locale: 'ar-SA', dir: 'rtl', typing: ['ووسائط متعددة', 'وتصميم ويب', 'ومشاريع تقنية', 'وهوية'] },
  fr: { locale: 'fr-FR', dir: 'ltr', typing: ['& Multimédia', '& Design Web', '& Projets IT', '& Branding'] },
  es: { locale: 'es-ES', dir: 'ltr', typing: ['& Multimedia', '& Diseño Web', '& Proyectos TI', '& Branding'] },
  tr: { locale: 'tr-TR', dir: 'ltr', typing: ['& Multimedya', '& Web Tasarım', '& IT Projeleri', '& Marka'] },
  zh: { locale: 'zh-CN', dir: 'ltr', typing: ['与多媒体', '与网页设计', '与IT项目', '与品牌设计'] },
  hi: { locale: 'hi-IN', dir: 'ltr', typing: ['और मल्टीमीडिया', 'और वेब डिज़ाइन', 'और IT प्रोजेक्ट्स', 'और ब्रांडिंग'] }
};

const translations = {
  en: {
    'page.title': 'Anas Abdiwahid -- Portfolio',
    'ui.language': 'Change language',
    'ui.toggleDark': 'Toggle dark mode',
    'ui.openMenu': 'Open menu',
    'ui.backToTop': 'Back to top',
    'ui.whatsappChat': 'WhatsApp chat',
    'ui.notSupported': 'Not supported',

    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.cv': 'CV',
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.education': 'Education',
    'nav.contact': 'Contact',
    'nav.cta': "Let's Talk",

    'hero.greeting': 'Hi I am',
    'hero.line1': 'Full Stack',
    'hero.line2': '& Multimedia',
    'hero.line3': 'Developer',
    'hero.badge': '20K+ Happy Clients',
    'hero.nameLabel': 'Name:',
    'hero.nameValue': 'Anas Abdiwahid Hussein',
    'hero.professionLabel': 'Profession:',
    'hero.professionValue': 'Full Stack Developer & Multimedia Specialist',
    'hero.p1': 'I am a passionate Full Stack Developer and Multimedia Specialist with a strong interest in building modern digital solutions. I work across both frontend and backend development, creating efficient, scalable, and user-friendly applications.',
    'hero.p2': 'My expertise includes designing and developing web applications, crafting visual identities, and producing creative multimedia content. I combine technical skills with creativity to deliver solutions that are both functional and visually compelling.',
    'hero.subtitleSkills': 'Core Skills & Areas of Expertise',
    'hero.skill1': 'Full Stack Web Development (Frontend & Backend)',
    'hero.skill2': 'Web Application Design & Development',
    'hero.skill3': 'Logo Design & Visual Branding',
    'hero.skill4': 'Multimedia & Creative Digital Projects',
    'hero.skill5': 'IT / OIT Projects',
    'hero.p3': 'I have a strong focus on clean design, performance, and user experience. I enjoy solving problems, learning new technologies, and continuously improving my skills in both development and digital media.',
    'hero.subtitleEducation': 'Education',
    'hero.p4': 'I am currently a university student at Hormuud University, where I am expanding my knowledge in Information Technology and related fields.',
    'hero.subtitleObjective': 'Professional Objective',
    'hero.p5': 'My goal is to grow as a highly skilled developer and creative professional, contributing to innovative technology projects and impactful digital experiences.',
    'hero.btnContact': 'Contact Me',
    'hero.btnPortfolio': 'Portfolio',
    'hero.location': 'Somalia',

    'about.subtitle': 'Who I Am',
    'about.title': 'About Me',
    'about.intro': 'Passionate Full Stack Developer & Multimedia Specialist with a creative approach to crafting intuitive and engaging digital experiences.',
    'about.skill1': 'Full Stack Development',
    'about.skill2': 'Web Application Design',
    'about.skill3': 'Logo & Visual Branding',
    'about.skill4': 'Multimedia & Creative Projects',
    'about.stat1': 'Years Experience',
    'about.stat2': 'Projects Done',
    'about.stat3': 'Happy Clients',

    'cv.subtitle': 'Curriculum Vitae',
    'cv.title': 'My CV',
    'cv.desc': 'Here is a quick overview of my CV, so you can easily see my education, experience, and most important skills at a glance.',
    'cv.list1': 'Full Stack Development (Frontend & Backend)',
    'cv.list2': 'Multimedia & Creative Digital Projects',
    'cv.list3': 'Web Application Design & Branding',
    'cv.list4': 'IT / OIT Projects & System Support',
    'cv.btnDownload': 'Download CV',
    'cv.btnRequest': 'Request Full CV',
    'cv.preview': 'CV Preview',
    'cv.notePrefix': 'Please replace',
    'cv.noteSuffix': 'with the official image of your CV.',

    'services.subtitle': 'What I Offer',
    'services.title': 'My Design Services',
    'services.desc': 'Crafting visually engaging interfaces that are both intuitive and user-centered, ensuring a seamless experience.',
    'services.card1.title': 'Full Stack Dev',
    'services.card1.desc': 'End-to-end web applications built with modern frameworks. Scalable, fast, and maintainable code.',
    'services.card2.title': 'Web Application Design',
    'services.card2.desc': 'User-centered designs that are visually engaging and functionally seamless. My approach always puts UX first.',
    'services.card3.title': 'Logo & Branding',
    'services.card3.desc': 'Distinctive visual identities and brand systems that communicate your story with clarity and style.',
    'services.card4.title': 'Multimedia Projects',
    'services.card4.desc': 'Creative digital content production including graphic design, video, and interactive digital media.',
    'services.card5.title': 'IT / OIT Projects',
    'services.card5.desc': 'Infrastructure setup, system administration, and IT project management with a focus on reliability.',
    'services.card6.title': 'Responsive Design',
    'services.card6.desc': 'Pixel-perfect, mobile-first designs that look great on every screen size and device type.',
    'services.readMore': 'Read more',

    'portfolio.subtitle': 'My Work',
    'portfolio.title': 'My Portfolio',
    'portfolio.desc': 'Explore a collection of my tech projects, each crafted to deliver seamless, user-centered experiences.',
    'portfolio.filter.all': 'All',
    'portfolio.filter.fullstack': 'Full Stack',
    'portfolio.filter.design': 'Web Design',
    'portfolio.filter.branding': 'Branding',
    'portfolio.filter.multimedia': 'Multimedia',
    'portfolio.tag.fullstack': 'Full Stack',
    'portfolio.tag.design': 'Web Design',
    'portfolio.tag.branding': 'Branding',
    'portfolio.tag.multimedia': 'Multimedia',
    'portfolio.item1.title': 'Restaurant Management System',
    'portfolio.item1.desc': '4 SEASON – Full stack web app with admin dashboard, cashier & menu management.',
    'portfolio.item1.label': '4 SEASON Restaurant System',
    'portfolio.item2.title': 'Suuq Furan Marketplace',
    'portfolio.item2.desc': 'Full-featured online marketplace with Admin, Shop & Customer roles using PHP & MySQL.',
    'portfolio.item2.label': 'Suuq Furan Marketplace',
    'portfolio.item3.title': 'Admin Dashboard UI',
    'portfolio.item3.desc': 'Clean and modern admin interface with data visualization and management tools.',
    'portfolio.item3.label': 'Admin Dashboard UI',
    'portfolio.item4.title': 'Brand Poster Design',
    'portfolio.item4.desc': 'Creative poster and visual branding design combining typography and strong visual identity.',
    'portfolio.item4.label': 'Brand Poster Design',
    'portfolio.item5.title': 'Video Editing Project',
    'portfolio.item5.desc': 'Professional video editing and post-production work showcasing multimedia skills.',
    'portfolio.item5.label': 'Video Editing Project',
    'portfolio.videoBadge': 'Video',

    'education.subtitle': 'My Educations',
    'education.title': 'Education & Journey',
    'education.item1.date': 'Oct 7, 2023 – Present',
    'education.item1.title': 'Faculty of Computer Science',
    'education.item1.school': 'Hormuud University',
    'education.item1.desc': 'Started university on Oct 7, 2023 in the Faculty of Computer Science at Hormuud University.',
    'education.item2.date': '2014 – 2023',
    'education.item2.title': 'School Sahal',
    'education.item2.school': 'Primary & Secondary Education',
    'education.item2.desc': 'Started school in 2014 and completed School Sahal in 2023.',
    'education.item3.date': '2021 – 2022',
    'education.item3.title': 'Multimedia & Design Fundamentals',
    'education.item3.school': 'Creative Learning',
    'education.item3.desc': 'Explored graphic design, visual branding, logo design, and multimedia production, building a foundation in creative digital work.',

    'objective.title': 'Professional Objective',
    'objective.desc': 'My goal is to grow as a highly skilled developer and creative professional, contributing to innovative technology projects and impactful digital experiences. I am committed to continuous improvement and delivering excellence in every project.',
    'objective.btn': "Let's Work Together",

    'contact.subtitle': 'Get In Touch',
    'contact.title': 'Contact Me',
    'contact.desc': "Have a project in mind? Let's talk and create something amazing together.",
    'contact.emailLabel': 'Email',
    'contact.locationLabel': 'Location',
    'contact.locationValue': 'Mogadishu, Somalia',
    'contact.universityLabel': 'University',
    'contact.universityValue': 'Hormuud University',
    'contact.form.nameLabel': 'Full Name',
    'contact.form.namePlaceholder': 'Your name',
    'contact.form.emailLabel': 'Email',
    'contact.form.emailPlaceholder': 'your@email.com',
    'contact.form.subjectLabel': 'Subject',
    'contact.form.subjectPlaceholder': 'Project idea / Inquiry',
    'contact.form.messageLabel': 'Message',
    'contact.form.messagePlaceholder': 'Tell me about your project...',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.success': "Message sent! I'll get back to you soon.",

    'footer.tagline': 'Full Stack Developer & Multimedia Specialist',
    'footer.rights': 'All rights reserved.',
    'footer.designed': 'Designed & Developed with',
    'footer.hijriLabel': 'Hijri:',
    'footer.qrTitle': 'Scan My QR Code',
    'footer.qrNotePrefix': 'Replace',
    'footer.qrNoteSuffix': 'with your real QR image.'
  },
  so: {
    'page.title': 'Anas Abdiwahid -- Portfolio',
    'ui.language': 'Bedel luqadda',
    'ui.toggleDark': 'Beddel habeen/maalin',
    'ui.openMenu': 'Fur menu',
    'ui.backToTop': 'Ku noqo kore',
    'ui.whatsappChat': 'Wadahadal WhatsApp',
    'ui.notSupported': 'Lama taageero',

    'nav.home': 'Bogga Hore',
    'nav.about': 'Iga Xog Ogaal',
    'nav.cv': 'CV',
    'nav.services': 'Adeegyada',
    'nav.portfolio': 'Shaqooyinka',
    'nav.education': 'Waxbarasho',
    'nav.contact': 'Xiriir',
    'nav.cta': 'Aan Wada Hadalno',

    'hero.greeting': 'Salaan, waxaan ahay',
    'hero.line1': 'Full Stack',
    'hero.line2': '& Multimedia',
    'hero.line3': 'Horumariye',
    'hero.badge': '20K+ Macaamiil Faraxsan',
    'hero.nameLabel': 'Magac:',
    'hero.nameValue': 'Anas Abdiwahid Hussein',
    'hero.professionLabel': 'Xirfad:',
    'hero.professionValue': 'Horumariye Full Stack & Khabiir Multimedia',
    'hero.p1': 'Waxaan ahay horumariye Full Stack iyo khabiir Multimedia oo xiise weyn u leh dhisidda xalal dijitaal casri ah. Waxaan ka shaqeeyaa frontend iyo backend labadaba, anigoo dhisaya apps hufan, la miisaami karo, oo user‑friendly ah.',
    'hero.p2': 'Khibraddaydu waxay ka kooban tahay naqshadeynta iyo horumarinta web apps, samaynta aqoonsi muuqaal, iyo soo saarista content multimedia. Waxaan isku daraa xirfad farsamo iyo hal‑abuur si aan u bixiyo xalal shaqeynaya oo muuqaal ahaan qurux badan.',
    'hero.subtitleSkills': 'Xirfadaha Muhiimka ah & Khibradaha',
    'hero.skill1': 'Horumarinta Web Full Stack (Frontend & Backend)',
    'hero.skill2': 'Naqshadeynta & Horumarinta Web App',
    'hero.skill3': 'Naqshadeynta Logo & Sumad Muuqaal',
    'hero.skill4': 'Multimedia & Mashaariic Hal‑abuur Dijitaal',
    'hero.skill5': 'Mashaariic IT / OIT',
    'hero.p3': 'Waxaan diiradda saaraa naqshad nadiif ah, waxqabad, iyo khibradda isticmaalaha. Waxaan ku raaxeystaa xalinta dhibaatooyinka, barashada teknoolojiyada cusub, iyo horumarinta joogtada ah ee xirfadahayga.',
    'hero.subtitleEducation': 'Waxbarasho',
    'hero.p4': 'Hadda waxaan ahay arday jaamacadeed oo ka tirsan Jaamacadda Hormuud, halkaas oo aan ku ballaariyo aqoontayda Teknolojiyadda Macluumaadka iyo qaybaha kale.',
    'hero.subtitleObjective': 'Ujeeddo Xirfadeed',
    'hero.p5': 'Ujeeddadaydu waa inaan noqdo horumariye iyo hal‑abuur xirfad leh, anigoo ka qayb qaadanaya mashaariic teknooloji casri ah iyo khibrado dijitaal oo saameyn leh.',
    'hero.btnContact': 'La Xiriir',
    'hero.btnPortfolio': 'Shaqooyinka',
    'hero.location': 'Soomaaliya',

    'about.subtitle': 'Yaan Ahay',
    'about.title': 'Iga Xog Ogaal',
    'about.intro': 'Horumariye Full Stack & Khabiir Multimedia oo leh hal‑abuur iyo xiise ku aaddan sameynta waayo‑aragnimo dijitaal oo fudud oo soo jiidasho leh.',
    'about.skill1': 'Horumarinta Full Stack',
    'about.skill2': 'Naqshadeynta Web App',
    'about.skill3': 'Logo & Sumad Muuqaal',
    'about.skill4': 'Multimedia & Mashaariic Hal‑abuur',
    'about.stat1': 'Sano Khibrad',
    'about.stat2': 'Mashruucyo La Qabtay',
    'about.stat3': 'Macaamiil Faraxsan',

    'cv.subtitle': 'Taariikh Nololeed',
    'cv.title': 'CV-kayga',
    'cv.desc': 'Halkan waxaa ku yaal dulmar kooban oo CV‑gayga ah si aad u aragto waxbarashadayda, khibradayda, iyo xirfadaha muhiimka ah.',
    'cv.list1': 'Horumarinta Full Stack (Frontend & Backend)',
    'cv.list2': 'Multimedia & Mashaariic Hal‑abuur Dijitaal',
    'cv.list3': 'Naqshadeynta Web App & Branding',
    'cv.list4': 'Mashaariic IT / OIT & Taageero Nidaam',
    'cv.btnDownload': 'Soo Deji CV',
    'cv.btnRequest': 'Dalbo CV-ga Buuxa',
    'cv.preview': 'Hordhac CV',
    'cv.notePrefix': 'Fadlan ku beddel',
    'cv.noteSuffix': 'sawirka rasmiga ah ee CV-gaaga.',

    'services.subtitle': 'Waxaan Bixiyaa',
    'services.title': 'Adeegyadayda Naqshadeynta',
    'services.desc': 'Waxaan sameeyaa interfaces muuqaal ahaan soo jiidasho leh oo user‑centered ah, si loo helo khibrad sahlan oo qurux badan.',
    'services.card1.title': 'Full Stack Dev',
    'services.card1.desc': 'Web apps dhammeystiran oo lagu dhiso frameworks casri ah. Kood la miisaami karo, degdeg ah, lana maamuli karo.',
    'services.card2.title': 'Naqshadeynta Web App',
    'services.card2.desc': 'Naqshado user‑centered ah oo muuqaal ahaan soo jiidasho leh kana shaqeeya si fudud. Habkaygu UX ayuu mudnaanta siiyaa.',
    'services.card3.title': 'Logo & Branding',
    'services.card3.desc': 'Aqoonsi muuqaal gaar ah iyo brand system cad oo qurux badan.',
    'services.card4.title': 'Mashaariic Multimedia',
    'services.card4.desc': 'Soo saarid content dijitaal hal‑abuur leh sida graphic design, video, iyo media isdhexgal.',
    'services.card5.title': 'Mashaariic IT / OIT',
    'services.card5.desc': 'Setup kaabayaasha, maamulka nidaamyada, iyo maamulka mashaariic IT oo lagu kalsoonaan karo.',
    'services.card6.title': 'Naqshad Responsive',
    'services.card6.desc': 'Naqshado mobile‑first ah oo u shaqeeya dhammaan qalabka iyo shaashadaha.',
    'services.readMore': 'Faahfaahin',

    'portfolio.subtitle': 'Shaqooyinkayga',
    'portfolio.title': 'Portfolio-gayga',
    'portfolio.desc': 'Daawo uruurinta mashaariicdayda tech, mid kastaa u sameysan si uu u bixiyo khibrad sahlan oo user‑centered.',
    'portfolio.filter.all': 'Dhammaan',
    'portfolio.filter.fullstack': 'Full Stack',
    'portfolio.filter.design': 'Naqshad Web',
    'portfolio.filter.branding': 'Branding',
    'portfolio.filter.multimedia': 'Multimedia',
    'portfolio.tag.fullstack': 'Full Stack',
    'portfolio.tag.design': 'Naqshad Web',
    'portfolio.tag.branding': 'Branding',
    'portfolio.tag.multimedia': 'Multimedia',
    'portfolio.item1.title': 'Nidaamka Maamulka Maqaayadda',
    'portfolio.item1.desc': '4 SEASON – Web app Full Stack ah oo leh admin dashboard, cashier, iyo maamulka menu.',
    'portfolio.item1.label': 'Nidaamka Maqaayadda 4 SEASON',
    'portfolio.item2.title': 'Suuq Furan Marketplace',
    'portfolio.item2.desc': 'Suuq online oo dhameystiran oo leh roles Admin, Shop, iyo Customer, laguna dhisay PHP & MySQL.',
    'portfolio.item2.label': 'Suuq Furan Marketplace',
    'portfolio.item3.title': 'UI Dashboard-ka Admin',
    'portfolio.item3.desc': 'Interface admin nadiif ah oo casri ah, leh data visualization iyo tools maamul.',
    'portfolio.item3.label': 'UI Dashboard-ka Admin',
    'portfolio.item4.title': 'Naqshadda Poster-ka Brand',
    'portfolio.item4.desc': 'Poster hal‑abuur leh iyo naqshad branding muuqaal adag leh oo isku dara typography iyo identity.',
    'portfolio.item4.label': 'Naqshadda Poster-ka Brand',
    'portfolio.item5.title': 'Mashruuca Tafatirka Video',
    'portfolio.item5.desc': 'Tafatir video xirfad leh iyo post‑production oo muujinaya xirfadaha multimedia.',
    'portfolio.item5.label': 'Mashruuca Tafatirka Video',
    'portfolio.videoBadge': 'Fiidiyow',

    'education.subtitle': 'Waxbarashadayda',
    'education.title': 'Waxbarasho & Safar',
    'education.item1.date': '7 Oktobar 2023 – Hadda',
    'education.item1.title': 'Kulliyadda Sayniska Kombiyuutarka',
    'education.item1.school': 'Jaamacadda Hormuud',
    'education.item1.desc': 'Jaamacadda waxaan bilaabay 7 Oktobar 2023, Kulliyadda Sayniska Kombiyuutarka ee Jaamacadda Hormuud.',
    'education.item2.date': '2014 – 2023',
    'education.item2.title': 'Dugsiga Sahal',
    'education.item2.school': 'Waxbarashada Hoose & Sare',
    'education.item2.desc': 'Waxaan dugsiga bilaabay 2014, waxaana dhammeeyay Dugsiga Sahal 2023.',
    'education.item3.date': '2021 – 2022',
    'education.item3.title': 'Asaasiga Multimedia & Naqshadeynta',
    'education.item3.school': 'Barasho Hal‑abuur',
    'education.item3.desc': 'Waxaan baadhay graphic design, visual branding, logo design, iyo multimedia production, anigoo dhisay saldhig adag oo shaqo dijitaal hal‑abuur leh.',

    'objective.title': 'Ujeeddo Xirfadeed',
    'objective.desc': 'Ujeeddadaydu waa inaan noqdo horumariye iyo hal‑abuur xirfad leh, anigoo ka qayb qaadanaya mashaariic teknooloji casri ah iyo khibrado dijitaal oo saameyn leh. Waxaan ku dadaalaa horumar joogto ah iyo tayo sare.',
    'objective.btn': 'Aan Wada Shaqeyno',

    'contact.subtitle': 'La Soo Xiriir',
    'contact.title': 'Ila Soo Xiriir',
    'contact.desc': 'Ma leedahay fikrad mashruuc? Aan wada hadalno oo wax cajiib ah aan sameyno.',
    'contact.emailLabel': 'Email',
    'contact.locationLabel': 'Goobta',
    'contact.locationValue': 'Muqdisho, Soomaaliya',
    'contact.universityLabel': 'Jaamacad',
    'contact.universityValue': 'Jaamacadda Hormuud',
    'contact.form.nameLabel': 'Magaca oo Dhan',
    'contact.form.namePlaceholder': 'Magacaaga',
    'contact.form.emailLabel': 'Email',
    'contact.form.emailPlaceholder': 'emailkaaga@tusaale.com',
    'contact.form.subjectLabel': 'Mawduuca',
    'contact.form.subjectPlaceholder': "Fikradda mashruuca / Su'aal",
    'contact.form.messageLabel': 'Fariin',
    'contact.form.messagePlaceholder': 'Ii sheeg mashruucaaga...',
    'contact.send': 'Dir Fariin',
    'contact.sending': 'Diraya...',
    'contact.success': 'Fariin waa la diray! Waan ku soo laaban doonaa dhawaan.',

    'footer.tagline': 'Horumariye Full Stack & Khabiir Multimedia',
    'footer.rights': 'Dhammaan xuquuqda way xifdisan yihiin.',
    'footer.designed': 'Naqshadeeyay & Horumariyay',
    'footer.hijriLabel': 'Hijri:',
    'footer.qrTitle': 'Soo Scan QR Code-kayga',
    'footer.qrNotePrefix': 'Ku beddel',
    'footer.qrNoteSuffix': 'sawirka QR-gaaga rasmiga ah.'
  },
  ar: {
    'page.title': 'أنس عبدالواحد -- ملف الأعمال',
    'ui.language': 'تغيير اللغة',
    'ui.toggleDark': 'تبديل الوضع الداكن',
    'ui.openMenu': 'فتح القائمة',
    'ui.backToTop': 'العودة للأعلى',
    'ui.whatsappChat': 'دردشة واتساب',
    'ui.notSupported': 'غير مدعوم',

    'nav.home': 'الرئيسية',
    'nav.about': 'من أنا',
    'nav.cv': 'السيرة',
    'nav.services': 'الخدمات',
    'nav.portfolio': 'أعمالي',
    'nav.education': 'التعليم',
    'nav.contact': 'تواصل',
    'nav.cta': 'لنتحدث',

    'hero.greeting': 'مرحبًا أنا',
    'hero.line1': 'Full Stack',
    'hero.line2': 'ووسائط متعددة',
    'hero.line3': 'مطور',
    'hero.badge': '20K+ عملاء سعداء',
    'hero.nameLabel': 'الاسم:',
    'hero.nameValue': 'Anas Abdiwahid Hussein',
    'hero.professionLabel': 'المهنة:',
    'hero.professionValue': 'مطور Full Stack وأخصائي وسائط متعددة',
    'hero.p1': 'أنا مطور Full Stack وأخصائي وسائط متعددة شغوف ببناء حلول رقمية حديثة. أعمل على الواجهة الأمامية والخلفية لبناء تطبيقات فعالة وقابلة للتوسع وسهلة الاستخدام.',
    'hero.p2': 'تشمل خبرتي تصميم وتطوير تطبيقات الويب، وبناء الهوية البصرية، وإنتاج محتوى وسائط متعددة إبداعي. أمزج بين المهارات التقنية والإبداع لتقديم حلول عملية وجذابة.',
    'hero.subtitleSkills': 'المهارات الأساسية ومجالات الخبرة',
    'hero.skill1': 'تطوير ويب Full Stack (واجهة أمامية وخلفية)',
    'hero.skill2': 'تصميم وتطوير تطبيقات الويب',
    'hero.skill3': 'تصميم الشعارات والهوية البصرية',
    'hero.skill4': 'مشاريع الوسائط المتعددة والإبداع الرقمي',
    'hero.skill5': 'مشاريع IT / OIT',
    'hero.p3': 'أركز على التصميم النظيف والأداء وتجربة المستخدم. أستمتع بحل المشكلات وتعلم التقنيات الجديدة وتحسين مهاراتي باستمرار.',
    'hero.subtitleEducation': 'التعليم',
    'hero.p4': 'أنا حاليًا طالب جامعي في جامعة هرمود، حيث أوسع معرفتي في تقنية المعلومات والمجالات ذات الصلة.',
    'hero.subtitleObjective': 'الهدف المهني',
    'hero.p5': 'هدفي أن أتطور كمطور محترف ومبدع، وأن أساهم في مشاريع تقنية مبتكرة وتجارب رقمية مؤثرة.',
    'hero.btnContact': 'تواصل معي',
    'hero.btnPortfolio': 'الأعمال',
    'hero.location': 'الصومال',

    'about.subtitle': 'من أنا',
    'about.title': 'نبذة عني',
    'about.intro': 'مطور Full Stack وأخصائي وسائط متعددة بمنهج إبداعي لصناعة تجارب رقمية سلسة وجذابة.',
    'about.skill1': 'تطوير Full Stack',
    'about.skill2': 'تصميم تطبيقات الويب',
    'about.skill3': 'الشعارات والهوية البصرية',
    'about.skill4': 'مشاريع الوسائط المتعددة والإبداع',
    'about.stat1': 'سنوات خبرة',
    'about.stat2': 'مشاريع منجزة',
    'about.stat3': 'عملاء سعداء',

    'cv.subtitle': 'السيرة الذاتية',
    'cv.title': 'السيرة',
    'cv.desc': 'هذا ملخص سريع لسيرتي الذاتية لتتعرف على تعليمي وخبرتي وأهم مهاراتي بسهولة.',
    'cv.list1': 'تطوير Full Stack (واجهة أمامية وخلفية)',
    'cv.list2': 'مشاريع وسائط متعددة وإبداع رقمي',
    'cv.list3': 'تصميم تطبيقات الويب والهوية',
    'cv.list4': 'مشاريع IT / OIT ودعم الأنظمة',
    'cv.btnDownload': 'تحميل السيرة',
    'cv.btnRequest': 'طلب السيرة الكاملة',
    'cv.preview': 'معاينة السيرة',
    'cv.notePrefix': 'يرجى استبدال',
    'cv.noteSuffix': 'بصورة سيرتك الذاتية الرسمية.',

    'services.subtitle': 'ما أقدمه',
    'services.title': 'خدماتي',
    'services.desc': 'أصمم واجهات جذابة بصريًا ومتمحورة حول المستخدم لضمان تجربة سلسة.',
    'services.card1.title': 'تطوير Full Stack',
    'services.card1.desc': 'تطبيقات ويب شاملة مبنية بأطر حديثة. كود سريع وقابل للتوسع وسهل الصيانة.',
    'services.card2.title': 'تصميم تطبيقات الويب',
    'services.card2.desc': 'تصاميم متمحورة حول المستخدم وجذابة بصريًا وسلسة وظيفيًا.',
    'services.card3.title': 'الشعار والهوية',
    'services.card3.desc': 'هويات بصرية مميزة وأنظمة علامة تجارية توصل رسالتك بوضوح.',
    'services.card4.title': 'مشاريع الوسائط المتعددة',
    'services.card4.desc': 'إنتاج محتوى رقمي إبداعي يشمل التصميم الجرافيكي والفيديو والوسائط التفاعلية.',
    'services.card5.title': 'مشاريع IT / OIT',
    'services.card5.desc': 'إعداد البنية التحتية وإدارة الأنظمة ومشاريع تقنية موثوقة.',
    'services.card6.title': 'تصميم متجاوب',
    'services.card6.desc': 'تصاميم دقيقة تبدأ بالموبايل وتعمل على جميع الشاشات والأجهزة.',
    'services.readMore': 'اقرأ المزيد',

    'portfolio.subtitle': 'أعمالي',
    'portfolio.title': 'معرض الأعمال',
    'portfolio.desc': 'استعرض مجموعة من مشاريعي التقنية المصممة لتقديم تجربة مستخدم سلسة.',
    'portfolio.filter.all': 'الكل',
    'portfolio.filter.fullstack': 'Full Stack',
    'portfolio.filter.design': 'تصميم ويب',
    'portfolio.filter.branding': 'هوية',
    'portfolio.filter.multimedia': 'وسائط متعددة',
    'portfolio.tag.fullstack': 'Full Stack',
    'portfolio.tag.design': 'تصميم ويب',
    'portfolio.tag.branding': 'هوية',
    'portfolio.tag.multimedia': 'وسائط متعددة',
    'portfolio.item1.title': 'نظام إدارة المطعم',
    'portfolio.item1.desc': '4 SEASON – تطبيق ويب Full Stack مع لوحة تحكم وإدارة الكاشير والقائمة.',
    'portfolio.item1.label': 'نظام مطعم 4 SEASON',
    'portfolio.item2.title': 'Suuq Furan Marketplace',
    'portfolio.item2.desc': 'سوق إلكتروني متكامل بأدوار Admin وShop وCustomer باستخدام PHP وMySQL.',
    'portfolio.item2.label': 'Suuq Furan Marketplace',
    'portfolio.item3.title': 'واجهة لوحة تحكم المشرف',
    'portfolio.item3.desc': 'واجهة إدارية حديثة ونظيفة مع أدوات إدارة وتصوير بيانات.',
    'portfolio.item3.label': 'واجهة لوحة تحكم المشرف',
    'portfolio.item4.title': 'تصميم ملصق العلامة',
    'portfolio.item4.desc': 'ملصق إبداعي وهوية بصرية قوية تجمع بين الطباعة والهوية.',
    'portfolio.item4.label': 'تصميم ملصق العلامة',
    'portfolio.item5.title': 'مشروع مونتاج فيديو',
    'portfolio.item5.desc': 'مونتاج فيديو احترافي وأعمال ما بعد الإنتاج لإبراز مهارات الوسائط المتعددة.',
    'portfolio.item5.label': 'مشروع مونتاج فيديو',
    'portfolio.videoBadge': 'فيديو',

    'education.subtitle': 'تعليمي',
    'education.title': 'التعليم والمسار',
    'education.item1.date': '7 أكتوبر 2023 – الآن',
    'education.item1.title': 'كلية علوم الحاسوب',
    'education.item1.school': 'جامعة هرمود',
    'education.item1.desc': 'بدأت الجامعة في 7 أكتوبر 2023 في كلية علوم الحاسوب بجامعة هرمود.',
    'education.item2.date': '2014 – 2023',
    'education.item2.title': 'مدرسة سهل',
    'education.item2.school': 'التعليم الابتدائي والثانوي',
    'education.item2.desc': 'بدأت المدرسة عام 2014 وأنهيت مدرسة سهل عام 2023.',
    'education.item3.date': '2021 – 2022',
    'education.item3.title': 'أساسيات الوسائط المتعددة والتصميم',
    'education.item3.school': 'تعلم إبداعي',
    'education.item3.desc': 'استكشفت التصميم الجرافيكي والهوية البصرية وتصميم الشعارات وإنتاج الوسائط المتعددة لبناء أساس قوي.',

    'objective.title': 'الهدف المهني',
    'objective.desc': 'هدفي أن أتطور كمطور محترف ومبدع، وأن أساهم في مشاريع تقنية مبتكرة وتجارب رقمية مؤثرة مع التزام دائم بالجودة والتحسين المستمر.',
    'objective.btn': 'لنعمل معًا',

    'contact.subtitle': 'تواصل معي',
    'contact.title': 'اتصل بي',
    'contact.desc': 'هل لديك مشروع؟ لنتحدث ونبني شيئًا رائعًا معًا.',
    'contact.emailLabel': 'البريد الإلكتروني',
    'contact.locationLabel': 'الموقع',
    'contact.locationValue': 'مقديشو، الصومال',
    'contact.universityLabel': 'الجامعة',
    'contact.universityValue': 'جامعة هرمود',
    'contact.form.nameLabel': 'الاسم الكامل',
    'contact.form.namePlaceholder': 'اسمك',
    'contact.form.emailLabel': 'البريد الإلكتروني',
    'contact.form.emailPlaceholder': 'your@email.com',
    'contact.form.subjectLabel': 'الموضوع',
    'contact.form.subjectPlaceholder': 'فكرة المشروع / استفسار',
    'contact.form.messageLabel': 'الرسالة',
    'contact.form.messagePlaceholder': 'حدثني عن مشروعك...',
    'contact.send': 'إرسال الرسالة',
    'contact.sending': 'جارٍ الإرسال...',
    'contact.success': 'تم إرسال الرسالة! سأعود إليك قريبًا.',

    'footer.tagline': 'مطور Full Stack وأخصائي وسائط متعددة',
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.designed': 'تم التصميم والتطوير',
    'footer.hijriLabel': 'هجري:',
    'footer.qrTitle': 'امسح رمز QR الخاص بي',
    'footer.qrNotePrefix': 'استبدل',
    'footer.qrNoteSuffix': 'بصورتك الحقيقية لرمز QR.'
  },
  fr: {
    'page.title': 'Anas Abdiwahid -- Portfolio',
    'ui.language': 'Changer de langue',
    'ui.toggleDark': 'Basculer le mode sombre',
    'ui.openMenu': 'Ouvrir le menu',
    'ui.backToTop': 'Retour en haut',
    'ui.whatsappChat': 'Discussion WhatsApp',
    'ui.notSupported': 'Non pris en charge',

    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.cv': 'CV',
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.education': 'Éducation',
    'nav.contact': 'Contact',
    'nav.cta': 'Discutons',

    'hero.greeting': 'Bonjour, je suis',
    'hero.line1': 'Full Stack',
    'hero.line2': '& Multimédia',
    'hero.line3': 'Développeur',
    'hero.badge': '20K+ Clients satisfaits',
    'hero.nameLabel': 'Nom :',
    'hero.nameValue': 'Anas Abdiwahid Hussein',
    'hero.professionLabel': 'Profession :',
    'hero.professionValue': 'Développeur Full Stack & Spécialiste Multimédia',
    'hero.p1': 'Je suis un développeur Full Stack et spécialiste multimédia passionné par la création de solutions numériques modernes. Je travaille sur le frontend et le backend pour créer des applications efficaces, évolutives et conviviales.',
    'hero.p2': "Mon expertise inclut la conception et le développement d'applications web, la création d'identités visuelles et la production de contenus multimédias créatifs. Je combine compétences techniques et créativité pour livrer des solutions fonctionnelles et attrayantes.",
    'hero.subtitleSkills': "Compétences clés & domaines d'expertise",
    'hero.skill1': 'Développement Web Full Stack (Frontend & Backend)',
    'hero.skill2': "Conception & développement d'applications web",
    'hero.skill3': 'Conception de logo & identité visuelle',
    'hero.skill4': 'Multimédia & projets numériques créatifs',
    'hero.skill5': 'Projets IT / OIT',
    'hero.p3': "Je me concentre sur un design propre, la performance et l'expérience utilisateur. J'aime résoudre des problèmes, apprendre de nouvelles technologies et améliorer continuellement mes compétences.",
    'hero.subtitleEducation': 'Éducation',
    'hero.p4': "Je suis actuellement étudiant à l'Université Hormuud, où j'approfondis mes connaissances en technologie de l'information et domaines connexes.",
    'hero.subtitleObjective': 'Objectif professionnel',
    'hero.p5': "Mon objectif est de devenir un développeur hautement qualifié et un créatif, en contribuant à des projets technologiques innovants et à des expériences numériques impactantes.",
    'hero.btnContact': 'Me contacter',
    'hero.btnPortfolio': 'Portfolio',
    'hero.location': 'Somalie',

    'about.subtitle': 'Qui je suis',
    'about.title': 'À propos',
    'about.intro': 'Développeur Full Stack & spécialiste multimédia avec une approche créative pour créer des expériences numériques intuitives et engageantes.',
    'about.skill1': 'Développement Full Stack',
    'about.skill2': "Conception d'applications web",
    'about.skill3': 'Logo & identité visuelle',
    'about.skill4': 'Multimédia & projets créatifs',
    'about.stat1': "Années d'expérience",
    'about.stat2': 'Projets réalisés',
    'about.stat3': 'Clients satisfaits',

    'cv.subtitle': 'Curriculum Vitae',
    'cv.title': 'Mon CV',
    'cv.desc': 'Voici un aperçu rapide de mon CV, afin de voir facilement ma formation, mon expérience et mes compétences clés.',
    'cv.list1': 'Développement Full Stack (Frontend & Backend)',
    'cv.list2': 'Multimédia & projets numériques créatifs',
    'cv.list3': "Conception d'applications web & branding",
    'cv.list4': 'Projets IT / OIT & support système',
    'cv.btnDownload': 'Télécharger le CV',
    'cv.btnRequest': 'Demander le CV complet',
    'cv.preview': 'Aperçu du CV',
    'cv.notePrefix': 'Veuillez remplacer',
    'cv.noteSuffix': "par l'image officielle de votre CV.",

    'services.subtitle': "Ce que j'offre",
    'services.title': 'Mes services',
    'services.desc': "Je conçois des interfaces visuellement attractives et centrées utilisateur pour une expérience fluide.",
    'services.card1.title': 'Dev Full Stack',
    'services.card1.desc': 'Applications web de bout en bout construites avec des frameworks modernes. Code évolutif, rapide et maintenable.',
    'services.card2.title': "Conception d'applications web",
    'services.card2.desc': 'Designs centrés utilisateur, visuellement engageants et fonctionnellement fluides.',
    'services.card3.title': 'Logo & branding',
    'services.card3.desc': 'Identités visuelles distinctives et systèmes de marque clairs.',
    'services.card4.title': 'Projets multimédia',
    'services.card4.desc': 'Production de contenu numérique créatif incluant design graphique, vidéo et médias interactifs.',
    'services.card5.title': 'Projets IT / OIT',
    'services.card5.desc': "Mise en place d'infrastructure, administration système et gestion de projets IT.",
    'services.card6.title': 'Design responsive',
    'services.card6.desc': 'Designs mobile‑first impeccables sur toutes les tailles d’écran.',
    'services.readMore': 'En savoir plus',

    'portfolio.subtitle': 'Mes réalisations',
    'portfolio.title': 'Mon portfolio',
    'portfolio.desc': 'Découvrez une sélection de mes projets tech conçus pour offrir une expérience fluide et centrée utilisateur.',
    'portfolio.filter.all': 'Tous',
    'portfolio.filter.fullstack': 'Full Stack',
    'portfolio.filter.design': 'Design Web',
    'portfolio.filter.branding': 'Branding',
    'portfolio.filter.multimedia': 'Multimédia',
    'portfolio.tag.fullstack': 'Full Stack',
    'portfolio.tag.design': 'Design Web',
    'portfolio.tag.branding': 'Branding',
    'portfolio.tag.multimedia': 'Multimédia',
    'portfolio.item1.title': 'Système de gestion de restaurant',
    'portfolio.item1.desc': "4 SEASON – application web Full Stack avec tableau de bord admin, caisse et gestion du menu.",
    'portfolio.item1.label': 'Système de restaurant 4 SEASON',
    'portfolio.item2.title': 'Marketplace Suuq Furan',
    'portfolio.item2.desc': 'Marketplace en ligne complète avec rôles Admin, Boutique et Client utilisant PHP & MySQL.',
    'portfolio.item2.label': 'Marketplace Suuq Furan',
    'portfolio.item3.title': 'UI du tableau de bord admin',
    'portfolio.item3.desc': 'Interface admin moderne et épurée avec visualisation de données et outils de gestion.',
    'portfolio.item3.label': 'UI du tableau de bord admin',
    'portfolio.item4.title': "Design d'affiche de marque",
    'portfolio.item4.desc': 'Affiche créative et branding visuel combinant typographie et identité forte.',
    'portfolio.item4.label': "Design d'affiche de marque",
    'portfolio.item5.title': 'Projet de montage vidéo',
    'portfolio.item5.desc': 'Montage vidéo professionnel et post‑production mettant en valeur les compétences multimédias.',
    'portfolio.item5.label': 'Projet de montage vidéo',
    'portfolio.videoBadge': 'Vidéo',

    'education.subtitle': 'Mes études',
    'education.title': 'Éducation & parcours',
    'education.item1.date': '7 octobre 2023 – Présent',
    'education.item1.title': "Faculté d'informatique",
    'education.item1.school': 'Université Hormuud',
    'education.item1.desc': "J'ai commencé l'université le 7 octobre 2023 à la Faculté d'informatique de l'Université Hormuud.",
    'education.item2.date': '2014 – 2023',
    'education.item2.title': 'École Sahal',
    'education.item2.school': 'Enseignement primaire et secondaire',
    'education.item2.desc': "J'ai commencé l'école en 2014 et terminé l'École Sahal en 2023.",
    'education.item3.date': '2021 – 2022',
    'education.item3.title': 'Fondamentaux du multimédia et du design',
    'education.item3.school': 'Apprentissage créatif',
    'education.item3.desc': 'Exploration du design graphique, branding visuel, logo et production multimédia pour bâtir une base solide.',

    'objective.title': 'Objectif professionnel',
    'objective.desc': "Mon objectif est d'évoluer comme développeur hautement qualifié et créatif, en contribuant à des projets innovants et des expériences numériques impactantes.",
    'objective.btn': 'Travaillons ensemble',

    'contact.subtitle': 'Prenons contact',
    'contact.title': 'Contactez-moi',
    'contact.desc': 'Vous avez un projet en tête ? Parlons‑en et créons quelque chose de génial.',
    'contact.emailLabel': 'Email',
    'contact.locationLabel': 'Localisation',
    'contact.locationValue': 'Mogadiscio, Somalie',
    'contact.universityLabel': 'Université',
    'contact.universityValue': 'Université Hormuud',
    'contact.form.nameLabel': 'Nom complet',
    'contact.form.namePlaceholder': 'Votre nom',
    'contact.form.emailLabel': 'Email',
    'contact.form.emailPlaceholder': 'votre@email.com',
    'contact.form.subjectLabel': 'Sujet',
    'contact.form.subjectPlaceholder': 'Idée de projet / Demande',
    'contact.form.messageLabel': 'Message',
    'contact.form.messagePlaceholder': 'Parlez-moi de votre projet...',
    'contact.send': 'Envoyer le message',
    'contact.sending': 'Envoi...',
    'contact.success': 'Message envoyé ! Je vous répondrai bientôt.',

    'footer.tagline': 'Développeur Full Stack & Spécialiste Multimédia',
    'footer.rights': 'Tous droits réservés.',
    'footer.designed': 'Conçu & développé avec',
    'footer.hijriLabel': 'Hégire :',
    'footer.qrTitle': 'Scannez mon QR Code',
    'footer.qrNotePrefix': 'Remplacez',
    'footer.qrNoteSuffix': 'par votre véritable image QR.'
  },
  es: {
    'page.title': 'Anas Abdiwahid -- Portafolio',
    'ui.language': 'Cambiar idioma',
    'ui.toggleDark': 'Cambiar modo oscuro',
    'ui.openMenu': 'Abrir menú',
    'ui.backToTop': 'Volver arriba',
    'ui.whatsappChat': 'Chat de WhatsApp',
    'ui.notSupported': 'No compatible',

    'nav.home': 'Inicio',
    'nav.about': 'Sobre mí',
    'nav.cv': 'CV',
    'nav.services': 'Servicios',
    'nav.portfolio': 'Portafolio',
    'nav.education': 'Educación',
    'nav.contact': 'Contacto',
    'nav.cta': 'Hablemos',

    'hero.greeting': 'Hola, soy',
    'hero.line1': 'Full Stack',
    'hero.line2': '& Multimedia',
    'hero.line3': 'Desarrollador',
    'hero.badge': '20K+ Clientes felices',
    'hero.nameLabel': 'Nombre:',
    'hero.nameValue': 'Anas Abdiwahid Hussein',
    'hero.professionLabel': 'Profesión:',
    'hero.professionValue': 'Desarrollador Full Stack & Especialista Multimedia',
    'hero.p1': 'Soy un desarrollador Full Stack y especialista multimedia apasionado por crear soluciones digitales modernas. Trabajo en frontend y backend para construir aplicaciones eficientes, escalables y fáciles de usar.',
    'hero.p2': 'Mi experiencia incluye diseñar y desarrollar aplicaciones web, crear identidades visuales y producir contenido multimedia creativo. Combino habilidades técnicas y creatividad para entregar soluciones funcionales y atractivas.',
    'hero.subtitleSkills': 'Habilidades clave y áreas de experiencia',
    'hero.skill1': 'Desarrollo web Full Stack (Frontend & Backend)',
    'hero.skill2': 'Diseño y desarrollo de aplicaciones web',
    'hero.skill3': 'Diseño de logo y branding visual',
    'hero.skill4': 'Multimedia y proyectos digitales creativos',
    'hero.skill5': 'Proyectos IT / OIT',
    'hero.p3': 'Me enfoco en diseño limpio, rendimiento y experiencia de usuario. Disfruto resolver problemas, aprender nuevas tecnologías y mejorar mis habilidades continuamente.',
    'hero.subtitleEducation': 'Educación',
    'hero.p4': 'Actualmente soy estudiante universitario en la Universidad Hormuud, donde amplío mis conocimientos en Tecnología de la Información y áreas relacionadas.',
    'hero.subtitleObjective': 'Objetivo profesional',
    'hero.p5': 'Mi objetivo es crecer como desarrollador y profesional creativo altamente capacitado, contribuyendo a proyectos tecnológicos innovadores y experiencias digitales impactantes.',
    'hero.btnContact': 'Contáctame',
    'hero.btnPortfolio': 'Portafolio',
    'hero.location': 'Somalia',

    'about.subtitle': 'Quién soy',
    'about.title': 'Sobre mí',
    'about.intro': 'Desarrollador Full Stack y especialista multimedia con un enfoque creativo para crear experiencias digitales intuitivas y atractivas.',
    'about.skill1': 'Desarrollo Full Stack',
    'about.skill2': 'Diseño de aplicaciones web',
    'about.skill3': 'Logo y branding visual',
    'about.skill4': 'Multimedia y proyectos creativos',
    'about.stat1': 'Años de experiencia',
    'about.stat2': 'Proyectos realizados',
    'about.stat3': 'Clientes felices',

    'cv.subtitle': 'Currículum Vitae',
    'cv.title': 'Mi CV',
    'cv.desc': 'Aquí tienes un resumen rápido de mi CV para ver mi educación, experiencia y habilidades principales de un vistazo.',
    'cv.list1': 'Desarrollo Full Stack (Frontend & Backend)',
    'cv.list2': 'Multimedia y proyectos digitales creativos',
    'cv.list3': 'Diseño de aplicaciones web y branding',
    'cv.list4': 'Proyectos IT / OIT y soporte de sistemas',
    'cv.btnDownload': 'Descargar CV',
    'cv.btnRequest': 'Solicitar CV completo',
    'cv.preview': 'Vista previa del CV',
    'cv.notePrefix': 'Reemplaza',
    'cv.noteSuffix': 'por la imagen oficial de tu CV.',

    'services.subtitle': 'Lo que ofrezco',
    'services.title': 'Mis servicios',
    'services.desc': 'Creo interfaces visualmente atractivas y centradas en el usuario para una experiencia fluida.',
    'services.card1.title': 'Dev Full Stack',
    'services.card1.desc': 'Aplicaciones web de extremo a extremo con frameworks modernos. Código escalable, rápido y mantenible.',
    'services.card2.title': 'Diseño de aplicaciones web',
    'services.card2.desc': 'Diseños centrados en el usuario, atractivos y funcionales. Mi enfoque siempre prioriza UX.',
    'services.card3.title': 'Logo y branding',
    'services.card3.desc': 'Identidades visuales distintivas y sistemas de marca claros.',
    'services.card4.title': 'Proyectos multimedia',
    'services.card4.desc': 'Producción de contenido digital creativo incluyendo diseño gráfico, video y medios interactivos.',
    'services.card5.title': 'Proyectos IT / OIT',
    'services.card5.desc': 'Configuración de infraestructura, administración de sistemas y gestión de proyectos IT.',
    'services.card6.title': 'Diseño responsive',
    'services.card6.desc': 'Diseños mobile‑first perfectos para todos los tamaños de pantalla y dispositivos.',
    'services.readMore': 'Leer más',

    'portfolio.subtitle': 'Mi trabajo',
    'portfolio.title': 'Mi portafolio',
    'portfolio.desc': 'Explora una colección de mis proyectos tecnológicos, creados para ofrecer una experiencia fluida y centrada en el usuario.',
    'portfolio.filter.all': 'Todos',
    'portfolio.filter.fullstack': 'Full Stack',
    'portfolio.filter.design': 'Diseño Web',
    'portfolio.filter.branding': 'Branding',
    'portfolio.filter.multimedia': 'Multimedia',
    'portfolio.tag.fullstack': 'Full Stack',
    'portfolio.tag.design': 'Diseño Web',
    'portfolio.tag.branding': 'Branding',
    'portfolio.tag.multimedia': 'Multimedia',
    'portfolio.item1.title': 'Sistema de gestión de restaurante',
    'portfolio.item1.desc': '4 SEASON – app web Full Stack con panel admin, caja y gestión de menú.',
    'portfolio.item1.label': 'Sistema de restaurante 4 SEASON',
    'portfolio.item2.title': 'Marketplace Suuq Furan',
    'portfolio.item2.desc': 'Marketplace en línea completo con roles Admin, Shop y Customer usando PHP y MySQL.',
    'portfolio.item2.label': 'Marketplace Suuq Furan',
    'portfolio.item3.title': 'UI de panel admin',
    'portfolio.item3.desc': 'Interfaz admin limpia y moderna con visualización de datos y herramientas de gestión.',
    'portfolio.item3.label': 'UI de panel admin',
    'portfolio.item4.title': 'Diseño de póster de marca',
    'portfolio.item4.desc': 'Póster creativo y branding visual combinando tipografía e identidad sólida.',
    'portfolio.item4.label': 'Diseño de póster de marca',
    'portfolio.item5.title': 'Proyecto de edición de video',
    'portfolio.item5.desc': 'Edición de video profesional y postproducción mostrando habilidades multimedia.',
    'portfolio.item5.label': 'Proyecto de edición de video',
    'portfolio.videoBadge': 'Video',

    'education.subtitle': 'Mis estudios',
    'education.title': 'Educación y trayectoria',
    'education.item1.date': '7 de octubre de 2023 – Presente',
    'education.item1.title': 'Facultad de Ciencias de la Computación',
    'education.item1.school': 'Universidad Hormuud',
    'education.item1.desc': 'Comencé la universidad el 7 de octubre de 2023 en la Facultad de Ciencias de la Computación de la Universidad Hormuud.',
    'education.item2.date': '2014 – 2023',
    'education.item2.title': 'Escuela Sahal',
    'education.item2.school': 'Educación primaria y secundaria',
    'education.item2.desc': 'Comencé la escuela en 2014 y terminé la Escuela Sahal en 2023.',
    'education.item3.date': '2021 – 2022',
    'education.item3.title': 'Fundamentos de multimedia y diseño',
    'education.item3.school': 'Aprendizaje creativo',
    'education.item3.desc': 'Exploré diseño gráfico, branding visual, diseño de logos y producción multimedia.',

    'objective.title': 'Objetivo profesional',
    'objective.desc': 'Mi objetivo es crecer como desarrollador altamente capacitado y profesional creativo, contribuyendo a proyectos tecnológicos innovadores y experiencias digitales impactantes.',
    'objective.btn': 'Trabajemos juntos',

    'contact.subtitle': 'Ponte en contacto',
    'contact.title': 'Contáctame',
    'contact.desc': '¿Tienes un proyecto en mente? Hablemos y creemos algo increíble juntos.',
    'contact.emailLabel': 'Email',
    'contact.locationLabel': 'Ubicación',
    'contact.locationValue': 'Mogadiscio, Somalia',
    'contact.universityLabel': 'Universidad',
    'contact.universityValue': 'Universidad Hormuud',
    'contact.form.nameLabel': 'Nombre completo',
    'contact.form.namePlaceholder': 'Tu nombre',
    'contact.form.emailLabel': 'Email',
    'contact.form.emailPlaceholder': 'tu@email.com',
    'contact.form.subjectLabel': 'Asunto',
    'contact.form.subjectPlaceholder': 'Idea de proyecto / Consulta',
    'contact.form.messageLabel': 'Mensaje',
    'contact.form.messagePlaceholder': 'Cuéntame sobre tu proyecto...',
    'contact.send': 'Enviar mensaje',
    'contact.sending': 'Enviando...',
    'contact.success': '¡Mensaje enviado! Te responderé pronto.',

    'footer.tagline': 'Desarrollador Full Stack & Especialista Multimedia',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.designed': 'Diseñado y desarrollado con',
    'footer.hijriLabel': 'Hégira:',
    'footer.qrTitle': 'Escanea mi código QR',
    'footer.qrNotePrefix': 'Reemplaza',
    'footer.qrNoteSuffix': 'con tu imagen real de QR.'
  },
  tr: {
    'page.title': 'Anas Abdiwahid -- Portföy',
    'ui.language': 'Dili değiştir',
    'ui.toggleDark': 'Karanlık modu değiştir',
    'ui.openMenu': 'Menüyü aç',
    'ui.backToTop': 'Yukarı çık',
    'ui.whatsappChat': 'WhatsApp sohbeti',
    'ui.notSupported': 'Desteklenmiyor',

    'nav.home': 'Ana Sayfa',
    'nav.about': 'Hakkımda',
    'nav.cv': 'CV',
    'nav.services': 'Hizmetler',
    'nav.portfolio': 'Portföy',
    'nav.education': 'Eğitim',
    'nav.contact': 'İletişim',
    'nav.cta': 'Konuşalım',

    'hero.greeting': 'Merhaba, ben',
    'hero.line1': 'Full Stack',
    'hero.line2': '& Multimedya',
    'hero.line3': 'Geliştirici',
    'hero.badge': '20K+ Mutlu Müşteri',
    'hero.nameLabel': 'Ad:',
    'hero.nameValue': 'Anas Abdiwahid Hussein',
    'hero.professionLabel': 'Meslek:',
    'hero.professionValue': 'Full Stack Geliştirici & Multimedya Uzmanı',
    'hero.p1': 'Modern dijital çözümler üretmeye tutkulu bir Full Stack geliştirici ve multimedya uzmanıyım. Hem frontend hem backend tarafında çalışarak verimli, ölçeklenebilir ve kullanıcı dostu uygulamalar geliştiriyorum.',
    'hero.p2': 'Uzmanlığım web uygulaması tasarımı ve geliştirme, görsel kimlik oluşturma ve yaratıcı multimedya içerik üretimini kapsar. Teknik becerilerimi yaratıcılıkla birleştiriyorum.',
    'hero.subtitleSkills': 'Temel Yetkinlikler ve Uzmanlık Alanları',
    'hero.skill1': 'Full Stack Web Geliştirme (Frontend & Backend)',
    'hero.skill2': 'Web Uygulaması Tasarımı ve Geliştirme',
    'hero.skill3': 'Logo Tasarımı ve Görsel Kimlik',
    'hero.skill4': 'Multimedya ve Yaratıcı Dijital Projeler',
    'hero.skill5': 'IT / OIT Projeleri',
    'hero.p3': 'Temiz tasarım, performans ve kullanıcı deneyimine odaklanırım. Sorun çözmeyi, yeni teknolojiler öğrenmeyi ve becerilerimi sürekli geliştirmeyi severim.',
    'hero.subtitleEducation': 'Eğitim',
    'hero.p4': 'Şu anda Hormuud Üniversitesi’nde öğrenciyim ve Bilgi Teknolojileri alanında bilgimi geliştiriyorum.',
    'hero.subtitleObjective': 'Profesyonel Hedef',
    'hero.p5': 'Hedefim, yüksek nitelikli bir geliştirici ve yaratıcı profesyonel olarak büyümek ve yenilikçi teknoloji projelerine katkı sağlamaktır.',
    'hero.btnContact': 'İletişime Geç',
    'hero.btnPortfolio': 'Portföy',
    'hero.location': 'Somali',

    'about.subtitle': 'Ben Kimim',
    'about.title': 'Hakkımda',
    'about.intro': 'Sezgisel ve etkileyici dijital deneyimler üretmek için yaratıcı bir yaklaşıma sahip Full Stack geliştirici ve multimedya uzmanı.',
    'about.skill1': 'Full Stack Geliştirme',
    'about.skill2': 'Web Uygulaması Tasarımı',
    'about.skill3': 'Logo ve Görsel Kimlik',
    'about.skill4': 'Multimedya ve Yaratıcı Projeler',
    'about.stat1': 'Yıl Deneyim',
    'about.stat2': 'Tamamlanan Proje',
    'about.stat3': 'Mutlu Müşteri',

    'cv.subtitle': 'Özgeçmiş',
    'cv.title': 'CV',
    'cv.desc': 'CV’min kısa bir özetini burada görebilir, eğitim ve deneyimlerime hızlıca ulaşabilirsiniz.',
    'cv.list1': 'Full Stack Geliştirme (Frontend & Backend)',
    'cv.list2': 'Multimedya ve Yaratıcı Dijital Projeler',
    'cv.list3': 'Web Uygulaması Tasarımı ve Branding',
    'cv.list4': 'IT / OIT Projeleri ve Sistem Desteği',
    'cv.btnDownload': 'CV İndir',
    'cv.btnRequest': 'Tam CV Talep Et',
    'cv.preview': 'CV Önizleme',
    'cv.notePrefix': 'Lütfen',
    'cv.noteSuffix': 'yerine resmi CV görselinizi ekleyin.',

    'services.subtitle': 'Sunduklarım',
    'services.title': 'Hizmetlerim',
    'services.desc': 'Kullanıcı odaklı ve görsel olarak etkileyici arayüzler tasarlıyorum.',
    'services.card1.title': 'Full Stack Dev',
    'services.card1.desc': 'Modern frameworklerle uçtan uca web uygulamaları. Ölçeklenebilir, hızlı ve bakımı kolay.',
    'services.card2.title': 'Web Uygulaması Tasarımı',
    'services.card2.desc': 'Görsel olarak çekici ve işlevsel, kullanıcı odaklı tasarımlar.',
    'services.card3.title': 'Logo ve Branding',
    'services.card3.desc': 'Hikayenizi netlikle anlatan özgün görsel kimlikler.',
    'services.card4.title': 'Multimedya Projeleri',
    'services.card4.desc': 'Grafik tasarım, video ve etkileşimli medya dahil yaratıcı dijital içerik üretimi.',
    'services.card5.title': 'IT / OIT Projeleri',
    'services.card5.desc': 'Altyapı kurulumu, sistem yönetimi ve güvenilir IT proje yönetimi.',
    'services.card6.title': 'Responsive Tasarım',
    'services.card6.desc': 'Tüm cihazlarda mükemmel görünen mobile‑first tasarımlar.',
    'services.readMore': 'Daha fazla',

    'portfolio.subtitle': 'Çalışmalarım',
    'portfolio.title': 'Portföyüm',
    'portfolio.desc': 'Sorunsuz ve kullanıcı odaklı deneyimler sunan projelerimden bir seçki.',
    'portfolio.filter.all': 'Tümü',
    'portfolio.filter.fullstack': 'Full Stack',
    'portfolio.filter.design': 'Web Tasarım',
    'portfolio.filter.branding': 'Branding',
    'portfolio.filter.multimedia': 'Multimedya',
    'portfolio.tag.fullstack': 'Full Stack',
    'portfolio.tag.design': 'Web Tasarım',
    'portfolio.tag.branding': 'Branding',
    'portfolio.tag.multimedia': 'Multimedya',
    'portfolio.item1.title': 'Restoran Yönetim Sistemi',
    'portfolio.item1.desc': '4 SEASON – Admin paneli, kasa ve menü yönetimi olan Full Stack web uygulaması.',
    'portfolio.item1.label': '4 SEASON Restoran Sistemi',
    'portfolio.item2.title': 'Suuq Furan Marketplace',
    'portfolio.item2.desc': 'PHP ve MySQL ile Admin, Shop ve Customer rolleri olan tam özellikli pazar yeri.',
    'portfolio.item2.label': 'Suuq Furan Marketplace',
    'portfolio.item3.title': 'Admin Dashboard UI',
    'portfolio.item3.desc': 'Veri görselleştirme ve yönetim araçlarıyla modern admin arayüzü.',
    'portfolio.item3.label': 'Admin Dashboard UI',
    'portfolio.item4.title': 'Marka Poster Tasarımı',
    'portfolio.item4.desc': 'Tipografi ve güçlü kimliği birleştiren yaratıcı poster tasarımı.',
    'portfolio.item4.label': 'Marka Poster Tasarımı',
    'portfolio.item5.title': 'Video Kurgu Projesi',
    'portfolio.item5.desc': 'Multimedya becerilerini gösteren profesyonel video kurgu ve post‑prodüksiyon.',
    'portfolio.item5.label': 'Video Kurgu Projesi',
    'portfolio.videoBadge': 'Video',

    'education.subtitle': 'Eğitimim',
    'education.title': 'Eğitim ve Yolculuk',
    'education.item1.date': '7 Ekim 2023 – Günümüz',
    'education.item1.title': 'Bilgisayar Bilimleri Fakültesi',
    'education.item1.school': 'Hormuud Üniversitesi',
    'education.item1.desc': "7 Ekim 2023'te Hormuud Üniversitesi Bilgisayar Bilimleri Fakültesi'nde üniversiteye başladım.",
    'education.item2.date': '2014 – 2023',
    'education.item2.title': 'Sahal Okulu',
    'education.item2.school': 'İlk ve Ortaöğretim',
    'education.item2.desc': "2014'te okula başladım ve 2023'te Sahal Okulu'nu bitirdim.",
    'education.item3.date': '2021 – 2022',
    'education.item3.title': 'Multimedya ve Tasarım Temelleri',
    'education.item3.school': 'Yaratıcı Öğrenme',
    'education.item3.desc': 'Grafik tasarım, görsel kimlik, logo tasarımı ve multimedya üretimini keşfettim.',

    'objective.title': 'Profesyonel Hedef',
    'objective.desc': 'Hedefim, yüksek nitelikli bir geliştirici ve yaratıcı profesyonel olarak büyümek ve yenilikçi projelere katkı sağlamaktır.',
    'objective.btn': 'Birlikte Çalışalım',

    'contact.subtitle': 'İletişime Geç',
    'contact.title': 'Bana Ulaşın',
    'contact.desc': 'Aklınızda bir proje mi var? Konuşalım ve harika bir şey üretelim.',
    'contact.emailLabel': 'E‑posta',
    'contact.locationLabel': 'Konum',
    'contact.locationValue': 'Mogadişu, Somali',
    'contact.universityLabel': 'Üniversite',
    'contact.universityValue': 'Hormuud Üniversitesi',
    'contact.form.nameLabel': 'Ad Soyad',
    'contact.form.namePlaceholder': 'Adınız',
    'contact.form.emailLabel': 'E‑posta',
    'contact.form.emailPlaceholder': 'email@ornek.com',
    'contact.form.subjectLabel': 'Konu',
    'contact.form.subjectPlaceholder': 'Proje fikri / Soru',
    'contact.form.messageLabel': 'Mesaj',
    'contact.form.messagePlaceholder': 'Projenizi anlatın...',
    'contact.send': 'Mesaj Gönder',
    'contact.sending': 'Gönderiliyor...',
    'contact.success': 'Mesaj gönderildi! Yakında dönüş yapacağım.',

    'footer.tagline': 'Full Stack Geliştirici & Multimedya Uzmanı',
    'footer.rights': 'Tüm hakları saklıdır.',
    'footer.designed': 'Tasarlandı & geliştirildi',
    'footer.hijriLabel': 'Hicri:',
    'footer.qrTitle': 'QR Kodumu Tara',
    'footer.qrNotePrefix': 'Lütfen',
    'footer.qrNoteSuffix': 'yerine gerçek QR görselinizi koyun.'
  },
  zh: {
    'page.title': 'Anas Abdiwahid -- 作品集',
    'ui.language': '切换语言',
    'ui.toggleDark': '切换深色模式',
    'ui.openMenu': '打开菜单',
    'ui.backToTop': '返回顶部',
    'ui.whatsappChat': 'WhatsApp 聊天',
    'ui.notSupported': '不支持',

    'nav.home': '首页',
    'nav.about': '关于我',
    'nav.cv': '简历',
    'nav.services': '服务',
    'nav.portfolio': '作品集',
    'nav.education': '教育',
    'nav.contact': '联系',
    'nav.cta': '聊聊吧',

    'hero.greeting': '你好，我是',
    'hero.line1': 'Full Stack',
    'hero.line2': '与多媒体',
    'hero.line3': '开发者',
    'hero.badge': '20K+ 满意客户',
    'hero.nameLabel': '姓名：',
    'hero.nameValue': 'Anas Abdiwahid Hussein',
    'hero.professionLabel': '职业：',
    'hero.professionValue': '全栈开发者 & 多媒体专家',
    'hero.p1': '我是一名热衷于打造现代数字解决方案的全栈开发者和多媒体专家。我同时负责前端和后端开发，构建高效、可扩展且易用的应用。',
    'hero.p2': '我的专长包括 Web 应用设计与开发、视觉识别设计以及创意多媒体内容制作。我将技术与创意结合，提供兼具功能性与美观的解决方案。',
    'hero.subtitleSkills': '核心技能与专业领域',
    'hero.skill1': '全栈 Web 开发（前端 & 后端）',
    'hero.skill2': 'Web 应用设计与开发',
    'hero.skill3': 'Logo 设计与视觉品牌',
    'hero.skill4': '多媒体与创意数字项目',
    'hero.skill5': 'IT / OIT 项目',
    'hero.p3': '我专注于整洁的设计、性能和用户体验，喜欢解决问题、学习新技术并不断提升技能。',
    'hero.subtitleEducation': '教育',
    'hero.p4': '目前我在 Hormuud 大学就读，持续拓展信息技术及相关领域的知识。',
    'hero.subtitleObjective': '职业目标',
    'hero.p5': '我的目标是成为高水平的开发者与创意专业人士，参与创新技术项目和有影响力的数字体验。',
    'hero.btnContact': '联系我',
    'hero.btnPortfolio': '作品集',
    'hero.location': '索马里',

    'about.subtitle': '我是谁',
    'about.title': '关于我',
    'about.intro': '充满热情的全栈开发者与多媒体专家，擅长以创意方式打造直观且有吸引力的数字体验。',
    'about.skill1': '全栈开发',
    'about.skill2': 'Web 应用设计',
    'about.skill3': 'Logo 与视觉品牌',
    'about.skill4': '多媒体与创意项目',
    'about.stat1': '年经验',
    'about.stat2': '完成项目',
    'about.stat3': '满意客户',

    'cv.subtitle': '个人简历',
    'cv.title': '我的简历',
    'cv.desc': '这是我的简历概览，便于快速了解我的教育背景、经验和核心技能。',
    'cv.list1': '全栈开发（前端 & 后端）',
    'cv.list2': '多媒体与创意数字项目',
    'cv.list3': 'Web 应用设计与品牌',
    'cv.list4': 'IT / OIT 项目与系统支持',
    'cv.btnDownload': '下载简历',
    'cv.btnRequest': '索取完整简历',
    'cv.preview': '简历预览',
    'cv.notePrefix': '请替换',
    'cv.noteSuffix': '为你的正式简历图片。',

    'services.subtitle': '我提供什么',
    'services.title': '我的服务',
    'services.desc': '打造视觉上吸引且以用户为中心的界面，确保流畅体验。',
    'services.card1.title': '全栈开发',
    'services.card1.desc': '使用现代框架构建端到端 Web 应用，可扩展、快速且易维护。',
    'services.card2.title': 'Web 应用设计',
    'services.card2.desc': '以用户为中心、视觉吸引且功能流畅的设计。',
    'services.card3.title': 'Logo 与品牌',
    'services.card3.desc': '清晰表达品牌故事的独特视觉识别系统。',
    'services.card4.title': '多媒体项目',
    'services.card4.desc': '包含平面设计、视频与互动媒体的创意数字内容制作。',
    'services.card5.title': 'IT / OIT 项目',
    'services.card5.desc': '基础设施搭建、系统管理与 IT 项目管理，注重可靠性。',
    'services.card6.title': '响应式设计',
    'services.card6.desc': '移动优先、在各种屏幕上都完美呈现。',
    'services.readMore': '了解更多',

    'portfolio.subtitle': '我的作品',
    'portfolio.title': '作品集',
    'portfolio.desc': '探索我的技术项目集合，每个项目都专注于流畅且以用户为中心的体验。',
    'portfolio.filter.all': '全部',
    'portfolio.filter.fullstack': 'Full Stack',
    'portfolio.filter.design': '网页设计',
    'portfolio.filter.branding': '品牌',
    'portfolio.filter.multimedia': '多媒体',
    'portfolio.tag.fullstack': 'Full Stack',
    'portfolio.tag.design': '网页设计',
    'portfolio.tag.branding': '品牌',
    'portfolio.tag.multimedia': '多媒体',
    'portfolio.item1.title': '餐厅管理系统',
    'portfolio.item1.desc': '4 SEASON – 含后台管理、收银与菜单管理的全栈 Web 应用。',
    'portfolio.item1.label': '4 SEASON 餐厅系统',
    'portfolio.item2.title': 'Suuq Furan Marketplace',
    'portfolio.item2.desc': '使用 PHP & MySQL 的完整在线市场，包含 Admin、Shop 与 Customer 角色。',
    'portfolio.item2.label': 'Suuq Furan Marketplace',
    'portfolio.item3.title': '管理员仪表盘 UI',
    'portfolio.item3.desc': '简洁现代的管理界面，包含数据可视化与管理工具。',
    'portfolio.item3.label': '管理员仪表盘 UI',
    'portfolio.item4.title': '品牌海报设计',
    'portfolio.item4.desc': '结合排版与强视觉识别的创意品牌海报设计。',
    'portfolio.item4.label': '品牌海报设计',
    'portfolio.item5.title': '视频剪辑项目',
    'portfolio.item5.desc': '专业视频剪辑与后期制作，展示多媒体技能。',
    'portfolio.item5.label': '视频剪辑项目',
    'portfolio.videoBadge': '视频',

    'education.subtitle': '我的教育',
    'education.title': '教育与历程',
    'education.item1.date': '2023年10月7日 – 至今',
    'education.item1.title': '计算机科学学院',
    'education.item1.school': '霍尔穆德大学',
    'education.item1.desc': '我于2023年10月7日入读霍尔穆德大学计算机科学学院。',
    'education.item2.date': '2014 – 2023',
    'education.item2.title': '萨哈尔学校',
    'education.item2.school': '小学与中学教育',
    'education.item2.desc': '2014年开始上学，并于2023年完成萨哈尔学校的学业。',
    'education.item3.date': '2021 – 2022',
    'education.item3.title': '多媒体与设计基础',
    'education.item3.school': '创意学习',
    'education.item3.desc': '探索平面设计、视觉品牌、Logo 设计与多媒体制作。',

    'objective.title': '职业目标',
    'objective.desc': '我的目标是成长为高水平开发者与创意专业人士，参与创新技术项目和有影响力的数字体验。',
    'objective.btn': '一起合作',

    'contact.subtitle': '保持联系',
    'contact.title': '联系我',
    'contact.desc': '有项目想法吗？让我们交流并创造精彩作品。',
    'contact.emailLabel': '邮箱',
    'contact.locationLabel': '地点',
    'contact.locationValue': '摩加迪沙，索马里',
    'contact.universityLabel': '大学',
    'contact.universityValue': 'Hormuud 大学',
    'contact.form.nameLabel': '姓名',
    'contact.form.namePlaceholder': '你的名字',
    'contact.form.emailLabel': '邮箱',
    'contact.form.emailPlaceholder': 'your@email.com',
    'contact.form.subjectLabel': '主题',
    'contact.form.subjectPlaceholder': '项目想法 / 咨询',
    'contact.form.messageLabel': '消息',
    'contact.form.messagePlaceholder': '介绍一下你的项目...',
    'contact.send': '发送消息',
    'contact.sending': '发送中...',
    'contact.success': '消息已发送！我会尽快回复你。',

    'footer.tagline': '全栈开发者 & 多媒体专家',
    'footer.rights': '版权所有。',
    'footer.designed': '设计与开发',
    'footer.hijriLabel': '回历：',
    'footer.qrTitle': '扫描我的二维码',
    'footer.qrNotePrefix': '请替换',
    'footer.qrNoteSuffix': '为你的真实二维码图片。'
  },
  hi: {
    'page.title': 'Anas Abdiwahid -- पोर्टफोलियो',
    'ui.language': 'भाषा बदलें',
    'ui.toggleDark': 'डार्क मोड बदलें',
    'ui.openMenu': 'मेनू खोलें',
    'ui.backToTop': 'ऊपर जाएँ',
    'ui.whatsappChat': 'WhatsApp चैट',
    'ui.notSupported': 'समर्थित नहीं है',

    'nav.home': 'होम',
    'nav.about': 'मेरे बारे में',
    'nav.cv': 'सीवी',
    'nav.services': 'सेवाएँ',
    'nav.portfolio': 'पोर्टफोलियो',
    'nav.education': 'शिक्षा',
    'nav.contact': 'संपर्क',
    'nav.cta': 'चलो बात करें',

    'hero.greeting': 'नमस्ते, मैं',
    'hero.line1': 'Full Stack',
    'hero.line2': 'और मल्टीमीडिया',
    'hero.line3': 'डेवलपर',
    'hero.badge': '20K+ खुश ग्राहक',
    'hero.nameLabel': 'नाम:',
    'hero.nameValue': 'Anas Abdiwahid Hussein',
    'hero.professionLabel': 'पेशा:',
    'hero.professionValue': 'फुल स्टैक डेवलपर & मल्टीमीडिया स्पेशलिस्ट',
    'hero.p1': 'मैं आधुनिक डिजिटल समाधान बनाने के लिए उत्साही फुल स्टैक डेवलपर और मल्टीमीडिया स्पेशलिस्ट हूँ। मैं फ्रंटएंड और बैकएंड दोनों पर काम करता हूँ, जिससे तेज़ और उपयोगकर्ता‑अनुकूल एप्लिकेशन बनते हैं।',
    'hero.p2': 'मेरी विशेषज्ञता में वेब एप्लिकेशन डिजाइन व डेवलपमेंट, विजुअल आइडेंटिटी और क्रिएटिव मल्टीमीडिया कंटेंट शामिल हैं।',
    'hero.subtitleSkills': 'मुख्य कौशल और विशेषज्ञता',
    'hero.skill1': 'फुल स्टैक वेब डेवलपमेंट (Frontend & Backend)',
    'hero.skill2': 'वेब एप्लिकेशन डिजाइन व डेवलपमेंट',
    'hero.skill3': 'लोगो डिजाइन और विजुअल ब्रांडिंग',
    'hero.skill4': 'मल्टीमीडिया और क्रिएटिव डिजिटल प्रोजेक्ट्स',
    'hero.skill5': 'IT / OIT प्रोजेक्ट्स',
    'hero.p3': 'मैं क्लीन डिजाइन, परफॉर्मेंस और यूज़र एक्सपीरियंस पर फोकस करता हूँ। नई तकनीकें सीखना और समस्याएँ हल करना पसंद है।',
    'hero.subtitleEducation': 'शिक्षा',
    'hero.p4': 'मैं वर्तमान में Hormuud University में अध्ययन कर रहा हूँ और सूचना प्रौद्योगिकी में ज्ञान बढ़ा रहा हूँ।',
    'hero.subtitleObjective': 'पेशेवर लक्ष्य',
    'hero.p5': 'मेरा लक्ष्य एक कुशल डेवलपर और क्रिएटिव प्रोफेशनल बनना है जो नवाचार वाले प्रोजेक्ट्स में योगदान दे।',
    'hero.btnContact': 'संपर्क करें',
    'hero.btnPortfolio': 'पोर्टफोलियो',
    'hero.location': 'सोमालिया',

    'about.subtitle': 'मैं कौन हूँ',
    'about.title': 'मेरे बारे में',
    'about.intro': 'इंट्यूटिव और आकर्षक डिजिटल अनुभव बनाने के लिए क्रिएटिव अप्रोच वाला फुल स्टैक डेवलपर और मल्टीमीडिया स्पेशलिस्ट।',
    'about.skill1': 'फुल स्टैक डेवलपमेंट',
    'about.skill2': 'वेब एप्लिकेशन डिजाइन',
    'about.skill3': 'लोगो और विजुअल ब्रांडिंग',
    'about.skill4': 'मल्टीमीडिया और क्रिएटिव प्रोजेक्ट्स',
    'about.stat1': 'साल का अनुभव',
    'about.stat2': 'किए गए प्रोजेक्ट्स',
    'about.stat3': 'खुश ग्राहक',

    'cv.subtitle': 'जीवन-वृत्त',
    'cv.title': 'मेरा सीवी',
    'cv.desc': 'यह मेरे सीवी का त्वरित अवलोकन है जिससे आप मेरी शिक्षा, अनुभव और प्रमुख कौशल देख सकते हैं।',
    'cv.list1': 'फुल स्टैक डेवलपमेंट (Frontend & Backend)',
    'cv.list2': 'मल्टीमीडिया और क्रिएटिव डिजिटल प्रोजेक्ट्स',
    'cv.list3': 'वेब एप्लिकेशन डिजाइन और ब्रांडिंग',
    'cv.list4': 'IT / OIT प्रोजेक्ट्स और सिस्टम सपोर्ट',
    'cv.btnDownload': 'सीवी डाउनलोड करें',
    'cv.btnRequest': 'पूरा सीवी माँगें',
    'cv.preview': 'सीवी प्रीव्यू',
    'cv.notePrefix': 'कृपया',
    'cv.noteSuffix': 'को अपने वास्तविक सीवी इमेज से बदलें।',

    'services.subtitle': 'मैं क्या पेश करता हूँ',
    'services.title': 'मेरी सेवाएँ',
    'services.desc': 'दृश्य रूप से आकर्षक और यूज़र‑सेंट्रिक इंटरफेस तैयार करता हूँ।',
    'services.card1.title': 'फुल स्टैक देव',
    'services.card1.desc': 'आधुनिक फ्रेमवर्क के साथ एंड‑टू‑एंड वेब एप्लिकेशन। स्केलेबल, तेज और मेंटेनेबल कोड।',
    'services.card2.title': 'वेब एप्लिकेशन डिजाइन',
    'services.card2.desc': 'यूज़र‑सेंट्रिक डिजाइन जो आकर्षक और उपयोग में सहज हों।',
    'services.card3.title': 'लोगो और ब्रांडिंग',
    'services.card3.desc': 'विशिष्ट विज़ुअल आइडेंटिटी और ब्रांड सिस्टम।',
    'services.card4.title': 'मल्टीमीडिया प्रोजेक्ट्स',
    'services.card4.desc': 'ग्राफिक डिजाइन, वीडियो और इंटरएक्टिव मीडिया सहित क्रिएटिव कंटेंट।',
    'services.card5.title': 'IT / OIT प्रोजेक्ट्स',
    'services.card5.desc': 'इन्फ्रास्ट्रक्चर सेटअप, सिस्टम एडमिन और IT प्रोजेक्ट मैनेजमेंट।',
    'services.card6.title': 'रिस्पॉन्सिव डिजाइन',
    'services.card6.desc': 'हर स्क्रीन और डिवाइस पर परफेक्ट दिखने वाला mobile‑first डिजाइन।',
    'services.readMore': 'और पढ़ें',

    'portfolio.subtitle': 'मेरा काम',
    'portfolio.title': 'मेरा पोर्टफोलियो',
    'portfolio.desc': 'मेरे टेक प्रोजेक्ट्स का संग्रह देखें, जो सहज और यूज़र‑सेंट्रिक अनुभव देते हैं।',
    'portfolio.filter.all': 'सभी',
    'portfolio.filter.fullstack': 'Full Stack',
    'portfolio.filter.design': 'वेब डिजाइन',
    'portfolio.filter.branding': 'ब्रांडिंग',
    'portfolio.filter.multimedia': 'मल्टीमीडिया',
    'portfolio.tag.fullstack': 'Full Stack',
    'portfolio.tag.design': 'वेब डिजाइन',
    'portfolio.tag.branding': 'ब्रांडिंग',
    'portfolio.tag.multimedia': 'मल्टीमीडिया',
    'portfolio.item1.title': 'रेस्टोरेंट मैनेजमेंट सिस्टम',
    'portfolio.item1.desc': '4 SEASON – एडमिन डैशबोर्ड, कैशियर और मेन्यू मैनेजमेंट के साथ Full Stack वेब ऐप।',
    'portfolio.item1.label': '4 SEASON रेस्टोरेंट सिस्टम',
    'portfolio.item2.title': 'Suuq Furan Marketplace',
    'portfolio.item2.desc': 'PHP और MySQL के साथ Admin, Shop और Customer रोल्स वाला ऑनलाइन मार्केटप्लेस।',
    'portfolio.item2.label': 'Suuq Furan Marketplace',
    'portfolio.item3.title': 'एडमिन डैशबोर्ड UI',
    'portfolio.item3.desc': 'डेटा विज़ुअलाइज़ेशन और मैनेजमेंट टूल्स के साथ साफ‑सुथरा इंटरफेस।',
    'portfolio.item3.label': 'एडमिन डैशबोर्ड UI',
    'portfolio.item4.title': 'ब्रांड पोस्टर डिजाइन',
    'portfolio.item4.desc': 'टाइपोग्राफी और मजबूत विज़ुअल आइडेंटिटी के साथ क्रिएटिव पोस्टर डिजाइन।',
    'portfolio.item4.label': 'ब्रांड पोस्टर डिजाइन',
    'portfolio.item5.title': 'वीडियो एडिटिंग प्रोजेक्ट',
    'portfolio.item5.desc': 'मल्टीमीडिया कौशल दर्शाने वाला प्रोफेशनल वीडियो एडिटिंग और पोस्ट‑प्रोडक्शन।',
    'portfolio.item5.label': 'वीडियो एडिटिंग प्रोजेक्ट',
    'portfolio.videoBadge': 'वीडियो',

    'education.subtitle': 'मेरी शिक्षा',
    'education.title': 'शिक्षा और यात्रा',
    'education.item1.date': '7 अक्टूबर 2023 – वर्तमान',
    'education.item1.title': 'कंप्यूटर साइंस संकाय',
    'education.item1.school': 'होरमूद विश्वविद्यालय',
    'education.item1.desc': 'मैंने 7 अक्टूबर 2023 को होरमूद विश्वविद्यालय के कंप्यूटर साइंस संकाय में विश्वविद्यालय की पढ़ाई शुरू की।',
    'education.item2.date': '2014 – 2023',
    'education.item2.title': 'साहल स्कूल',
    'education.item2.school': 'प्राथमिक और माध्यमिक शिक्षा',
    'education.item2.desc': 'मैंने 2014 में स्कूल शुरू किया और 2023 में साहल स्कूल पूरा किया।',
    'education.item3.date': '2021 – 2022',
    'education.item3.title': 'मल्टीमीडिया और डिजाइन की मूल बातें',
    'education.item3.school': 'क्रिएटिव लर्निंग',
    'education.item3.desc': 'ग्राफिक डिजाइन, विज़ुअल ब्रांडिंग, लोगो डिजाइन और मल्टीमीडिया प्रोडक्शन का अध्ययन किया।',

    'objective.title': 'पेशेवर लक्ष्य',
    'objective.desc': 'मेरा लक्ष्य एक उच्च‑कुशल डेवलपर और क्रिएटिव प्रोफेशनल बनना है जो नवाचार वाले तकनीकी प्रोजेक्ट्स में योगदान दे।',
    'objective.btn': 'साथ काम करें',

    'contact.subtitle': 'संपर्क में रहें',
    'contact.title': 'संपर्क करें',
    'contact.desc': 'कोई प्रोजेक्ट आइडिया है? चलिए बात करते हैं और कुछ शानदार बनाते हैं।',
    'contact.emailLabel': 'ईमेल',
    'contact.locationLabel': 'स्थान',
    'contact.locationValue': 'मोगादिशु, सोमालिया',
    'contact.universityLabel': 'विश्वविद्यालय',
    'contact.universityValue': 'Hormuud University',
    'contact.form.nameLabel': 'पूरा नाम',
    'contact.form.namePlaceholder': 'आपका नाम',
    'contact.form.emailLabel': 'ईमेल',
    'contact.form.emailPlaceholder': 'your@email.com',
    'contact.form.subjectLabel': 'विषय',
    'contact.form.subjectPlaceholder': 'प्रोजेक्ट आइडिया / प्रश्न',
    'contact.form.messageLabel': 'संदेश',
    'contact.form.messagePlaceholder': 'अपने प्रोजेक्ट के बारे में बताएं...',
    'contact.send': 'संदेश भेजें',
    'contact.sending': 'भेजा जा रहा है...',
    'contact.success': 'संदेश भेज दिया गया! मैं जल्दी जवाब दूंगा।',

    'footer.tagline': 'फुल स्टैक डेवलपर & मल्टीमीडिया स्पेशलिस्ट',
    'footer.rights': 'सभी अधिकार सुरक्षित।',
    'footer.designed': 'डिज़ाइन और डेवलप किया गया',
    'footer.hijriLabel': 'हिजरी:',
    'footer.qrTitle': 'मेरा QR कोड स्कैन करें',
    'footer.qrNotePrefix': 'कृपया',
    'footer.qrNoteSuffix': 'को अपने वास्तविक QR इमेज से बदलें।'
  }
};

const langBtn = document.getElementById('langBtn');
const langMenu = document.getElementById('langMenu');
const langLabel = document.getElementById('langLabel');
const langFlag = document.getElementById('langFlag');
const langOptions = document.querySelectorAll('.lang-option');
let currentLang = localStorage.getItem('lang') || 'en';

function t(key) {
  return (translations[currentLang] && translations[currentLang][key]) ||
    (translations.en && translations.en[key]) ||
    key;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.setAttribute('placeholder', t(el.dataset.i18nPlaceholder));
  });
  document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
    el.setAttribute('aria-label', t(el.dataset.i18nAriaLabel));
  });
  document.title = t('page.title');
}

function updateLanguageUI() {
  const option = document.querySelector(`.lang-option[data-lang="${currentLang}"]`);
  if (!option) return;
  if (langLabel) langLabel.textContent = option.dataset.label || currentLang.toUpperCase();
  if (langFlag) langFlag.src = option.dataset.flag || '';
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
const statNums = document.querySelectorAll('.stat-num');

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
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
}, { threshold: 0.5 });

statNums.forEach(el => counterObserver.observe(el));

/* ── Scroll reveal ── */
const reveals = document.querySelectorAll('.reveal, .service-card, .portfolio-item, .contact-card, .timeline-card, .stat-card');

// add reveal class to elements that should animate in
[...document.querySelectorAll(
  '.service-card, .portfolio-item, .contact-card, .stat-card, .about-content, .hero-text, .hero-image'
)].forEach(el => el.classList.add('reveal'));

function revealOnScroll() {
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) el.classList.add('visible');
  });
}

// Initial check
setTimeout(revealOnScroll, 100);

/* ── Portfolio filter ── */
const filterTabs = document.querySelectorAll('.filter-tab');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.dataset.filter;
    portfolioItems.forEach(item => {
      const cat = item.dataset.cat;
      if (filter === 'all' || cat === filter) {
        item.style.display = 'block';
        setTimeout(() => item.style.opacity = '1', 10);
      } else {
        item.style.opacity = '0';
        setTimeout(() => item.style.display = 'none', 350);
      }
    });
  });
});

/* ── Contact form ── */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  const btnText = btn.querySelector('span') || btn;
  btnText.textContent = t('contact.sending');
  btn.disabled = true;

  setTimeout(() => {
    btnText.textContent = t('contact.send');
    btn.disabled = false;
    formSuccess.classList.add('show');
    contactForm.reset();
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1200);
});

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
/* ── Typing animation for hero subtitle ── */
const line2El = document.querySelector('.hero-title .line2');
let typingTimeout = null;

function startHeroTyping() {
  if (!line2El) return;
  if (typingTimeout) clearTimeout(typingTimeout);

  const phrases = (langConfig[currentLang] && langConfig[currentLang].typing) || [t('hero.line2')];
  let si = 0, ci = 0, deleting = false;
  let current = phrases[0] || '';

  function type() {
    if (!deleting) {
      line2El.textContent = current.slice(0, ++ci);
      if (ci === current.length) {
        deleting = true;
        typingTimeout = setTimeout(type, 1800);
        return;
      }
    } else {
      line2El.textContent = current.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        si = (si + 1) % phrases.length;
        current = phrases[si] || '';
      }
    }
    typingTimeout = setTimeout(type, deleting ? 60 : 120);
  }

  typingTimeout = setTimeout(type, 600);
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

// Initialize language on load
setLanguage(currentLang);

console.log('%c Anas Abdiwahid Hussein – Portfolio Loaded', 'color:#4361ee;font-weight:bold;font-size:14px');
