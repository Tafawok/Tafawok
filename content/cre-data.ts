import {
  Property,
  OwnerContact,
  NavItem,
  CorporateMetric,
  ClientPartner,
  CommercialDiscipline,
  TimelineMilestone,
  CorporateValue,
  HseCharter,
  InvestmentPillar,
  CeoProfile,
  HomepageSettings,
} from "@/types/cre"
import en from "@/locales/en.json"
import ar from "@/locales/ar.json"

export const COMPANY_IDENTITY = {
  name: {
    en: "TAFAWOK Real Estate Investment & Contracting",
    ar: "شركة تفوق للاستثمار العقاري والمقاولات",
  },
  shortName: {
    en: "TAFAWOK CRE",
    ar: "تفوق العقارية",
  },
  tagline: {
    en: "Engineering Commercial Excellence. Investing in Enduring Real Estate Assets.",
    ar: "ريادة الاستثمار العقاري التجاري والمقاولات المتكاملة في الشرق الأوسط.",
  },
  establishedYears: 25,
  heritageDecades: 5,
  headquarters: {
    address: {
      en: "Building 360, Industrial Area, Fifth Settlement, New Cairo, Egypt",
      ar: "مبنى 360 – المنطقة الصناعية – التجمع الخامس – القاهرة الجديدة – مصر",
    },
    googleMapsEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110543.91894223062!2d31.428781446702587!3d30.013583279144865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145822f306637e6f%3A0x6b1070e3eb7d8c47!2sFifth%20Settlement%2C%20New%20Cairo%201%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg",
    googleMapsLink:
      "https://maps.google.com/?q=Fifth+Settlement+New+Cairo+Egypt",
  },
  contact: {
    primaryPhone: "+20 110 042 4829",
    secondaryPhone: "+20 111 383 6660",
    fax: "+20 2 2327 6015",
    email: "info@tafawok.co",
    primaryDomain: "https://tafawok.co/",
  },
}

export const OWNER_DETAILS: OwnerContact = {
  name: {
    en: "TAFAWOK Executive Leadership",
    ar: "القيادة التنفيذية لتفوق",
  },
  role: {
    en: "Commercial Real Estate Stewardship & Management",
    ar: "رعاية وإدارة الأصول العقارية التجارية",
  },
  company: {
    en: "TAFAWOK Real Estate Investment & Contracting Co.",
    ar: "شركة تفوق للاستثمار العقاري والمقاولات",
  },
  experience: {
    en: "25+ Years in Commercial Real Estate, Infrastructure & Regional Megaprojects",
    ar: "أكثر من 25 عاماً في قيادة التطوير العقاري التجاري والبنية التحتية والمشروعات الكبرى",
  },
  phone: "+20 110 042 4829",
  altPhone: "+20 111 383 6660",
  email: "info@tafawok.co",
  whatsapp: "+201100424829",
  headquarters: {
    en: "Executive Office, Building 360, Fifth Settlement, New Cairo",
    ar: "المكتب التنفيذي، مبنى 360، التجمع الخامس، القاهرة الجديدة",
  },
  visionSnippet: {
    en: "At TAFAWOK, we do not merely erect buildings; we create long-term institutional value. Every commercial asset we develop is engineered for superior tenant performance, architectural distinction, and generational investment return across Egypt and the Gulf.",
    ar: "في تفوق، لا نكتفي ببناء الجدران، بل نصنع قيمة مؤسسية مستدامة. كل أصل عقاري تجاري نطوره مصمم لتحقيق أعلى كفاءة للمستأجرين، وتميز معماري رفيع، وعائد استثماري ممتد للأجيال في مصر ودول الخليج العربي.",
  },
}

export const NAV_ITEMS: NavItem[] = [
  {
    key: "home",
    href: "/",
    label: { en: "Home", ar: "الرئيسية" },
  },
  {
    key: "about",
    href: "/about",
    label: { en: "About Us", ar: "من نحن" },
  },
  {
    key: "properties",
    href: "/properties",
    label: { en: "Commercial Assets", ar: "الأصول التجارية" },
    subItems: [
      {
        href: "/properties/fagala-plaza",
        label: { en: "Fagala Plaza", ar: "فجالة بلازا" },
        description: {
          en: "Modernized Wholesale & Retail Stationery Hub in Nasr City",
          ar: "مجمع تجاري حديث لتجارة الأدوات المكتبية والمدرسية بمدينة نصر",
        },
      },
      {
        href: "/properties/mall-chillout-el-shorouk",
        label: { en: "Mall ChillOut El Shorouk", ar: "مول شل أوت الشروق" },
        description: {
          en: "Integrated Commercial Lifestyle Zone, Arcade, Dining & Stationery",
          ar: "وجهة تجارية متكاملة تضم ألعاب أطفال، آركيد، كافيهات، ومكتبات",
        },
      },
      {
        href: "/properties/october-festival-mall",
        label: {
          en: "October Festival Mall",
          ar: "مول أكتوبر فيستيفال",
        },
        description: {
          en: "Commercial & Retail Destination on Gamal Abdel Nasser Axis, Northern Expansions",
          ar: "صرح تجاري متكامل بمحور جمال عبد الناصر، التوسعات الشمالية بـ 6 أكتوبر",
        },
      },
    ],
  },
  {
    key: "ceo",
    href: "/ceo-message",
    label: { en: "CEO Message", ar: "رسالة الرئيس التنفيذي" },
  },
  {
    key: "contact",
    href: "/contact",
    label: { en: "Contact & Inquiries", ar: "اتصل بنا والاستفسارات" },
  },
]

export const CORPORATE_METRICS: CorporateMetric[] = [
  {
    value: 25,
    suffix: "+",
    label: { en: "Years Track Record", ar: "عاماً من الإنجاز والخبرة" },
    description: {
      en: "Continuous multidisciplinary execution in Egypt & GCC",
      ar: "مسيرة مستمرة من الإنجاز في مصر ودول الخليج",
    },
  },
  {
    value: 5,
    suffix: " Decades",
    label: { en: "Gulf Heritage", ar: "عقود من الخبرة الإقليمية" },
    description: {
      en: "Executive leadership rooted in 50 years of Gulf megaprojects",
      ar: "إدارة عليا مستندة إلى 50 عاماً من العمل في مشروعات الخليج الكبرى",
    },
  },
  {
    value: 64500,
    suffix: " m²",
    label: {
      en: "Commercial Portfolio GLA",
      ar: "متر مربع مساحات تأجيرية تجارية",
    },
    description: {
      en: "Prime leasable footprint across destination retail, commercial plazas & lifestyle hubs",
      ar: "مساحات متميزة تشمل البلازا التجارية، والمولات، ومراكز التوريدات بالجملة والتجزئة",
    },
  },
  {
    value: 50,
    suffix: "+",
    label: {
      en: "Core Engineers & Specialists",
      ar: "مهندساً واستشارياً متخصصاً",
    },
    description: {
      en: "Directly sponsored multidisciplinary technical cadre",
      ar: "كادر هندسي وتنفيذي دائم عالي الكفاءة",
    },
  },
]

export const PROPERTIES: Property[] = [
  {
    id: "fagala-plaza",
    slug: "fagala-plaza",
    name: {
      en: "Fagala Plaza",
      ar: "مجمع فجالة بلازا",
    },
    tagline: {
      en: "Modernized Wholesale & Retail Stationery Hub in Nasr City",
      ar: "النسخة العصرية المتطورة لأسواق الفجالة – جملة وقطاعي للأدوات المكتبية والمدرسية بمدينة نصر",
    },
    type: "retail",
    status: "active",
    category: {
      en: "Commercial Retail & Wholesale Plaza",
      ar: "مجمع تجاري وتسوق (جملة وقطاعي)",
    },
    description: {
      en: "Fagala Plaza represents the modern architectural evolution of Cairo's historic El Fagala market. Master-planned as an organized, high-standard commercial promenade, it offers corporate offices, schools, and institutions direct access to stationery and office supplies at bulk wholesale ('gomla') prices, while empowering families and parents to purchase top-quality school supplies at accessible prices far below inflated retail brand-name markups.",
      ar: "يمثل مجمع فجالة بلازا نقلة حضارية وعصرية مبتكرة لأسواق الفجالة التاريخية الشهيرة بالقاهرة. صُمم المجمع كوجهة تجارية راقية ومنظمة تتيح للشركات والمدارس والمؤسسات شراء كافة الأدوات المكتبية والمستلزمات بأسعار الجملة المباشرة، مع تمكين العائلات وأولياء الأمور من توفير مستلزمات المدارس والكتب لأبنائهم بجودة عالية وأسعار اقتصادية عادلة تنافس المتاجر الاستهلاكية ذات الأسعار المضاعفة.",
    },
    fullOverview: {
      en: "Spanning over 16,500 square meters of prime commercial promenade in the heart of Nasr City's 10th District, Fagala Plaza gathers Egypt's most prestigious bookstore and stationery titans—including Bernasos (established 1918), Samir & Aly Outlet, Alyanour, El-Azhary Institution, Galal Trading, and Ashraf Aly Faid. Featuring wide pedestrian walkways, illuminated plazas, central water fountains, dedicated vehicular parking, and heavy logistics loading bays, Fagala Plaza bridges institutional wholesale distribution with an elevated community shopping experience.",
      ar: "يمتد مجمع فجالة بلازا على مساحة تجارية مميزة تزيد عن 16,500 متر مربع في موقع استراتيجي حيوي بالحي العاشر بمدينة نصر، جامعاً تحت سقف واحد كبرى قلاع الأدوات المكتبية والمدرسية في مصر مثل مكتبات برناسو (منذ 1918)، وسمير وعلي أوتلت، ومكتبات اليانور، ومؤسسة الأزهري، ومؤسسة جلال، ومكتبات أشرف علي فايد. يتميز بممشى تجاري مفتوح، ونافورات مائية وإضاءات ديكورية، ومواقف سيارات فسيحة، وأرصفة مخصصة لشحن وتفريغ بضائع الجملة، مما يجعله المقصد التجاري الأول لتوريدات المكاتب والمدارس.",
    },
    mainImage: "/FagalaPlaza/ef0aed6e-0521-483c-886d-cf366d835f71.webp",
    video: {
      src: "/FagalaPlaza/IMG_6803.webm",
      poster: "/FagalaPlaza/IMG_6803.webp",
      title: {
        en: "Fagala Plaza — Architectural Promenade & Commercial Hub Tour",
        ar: "فجالة بلازا – جولة في الممشى التجاري والمجمع المتطور",
      },
    },
    gallery: [
      "/FagalaPlaza/IMG_6803.webm",
      "/FagalaPlaza/d887e3e7-2613-476e-a161-f820ba1edf95.webp",
      "/FagalaPlaza/ef0aed6e-0521-483c-886d-cf366d835f71.webp",
      "/FagalaPlaza/43eee45b-6c76-444b-b9cc-87ce6ac1e50b.webp",
      "/FagalaPlaza/IMG_5860.webp",
      "/FagalaPlaza/IMG_3115.webp",
      "/FagalaPlaza/b45941ad-594d-4c32-90f9-d01932b62797.webp",
      "/FagalaPlaza/8e822bc3-1c5e-4434-93f6-1fcbcf32755e.webp",
      "/FagalaPlaza/IMG_6525.webp",
    ],
    location: {
      address: {
        en: "29WJ+879, 10th District, Nasr City, Cairo Governorate, Egypt",
        ar: "الرمز البريدي 29WJ+879، الحي العاشر، مدينة نصر، محافظة القاهرة، مصر",
      },
      city: { en: "Nasr City, Cairo", ar: "مدينة نصر، القاهرة" },
      country: { en: "Egypt", ar: "مصر" },
      coordinates: { lat: 30.0139, lng: 31.3486 },
      googleMapsEmbedUrl:
        "https://maps.google.com/maps?q=29WJ%2B879%20%D9%85%D8%B1%D9%83%D8%B2%20%D9%81%D8%AC%D8%A7%D9%84%D8%A9%20%D9%85%D8%AF%D9%8A%D9%86%D8%A9%20%D9%86%D8%B5%D8%B1&t=&z=16&ie=UTF8&iwloc=&output=embed",
      googleMapsDirectUrl: "https://maps.app.goo.gl/CQn1vuvLMWFmSq9S7?g_st=iw",
    },
    contact: {
      phone: "+20 110 042 4829",
      altPhone: "+20 114 067 1104",
      email: "info@tafawok.co",
      leasingOffice: {
        en: "Fagala Plaza Leasing & Commercial Directorate — Unit 01",
        ar: "إدارة الحجز والتأجير التجاري بفجالة بلازا – الوحدة 01",
      },
    },
    keyStats: {
      gla: "16,500 m²",
      builtUpArea: "21,800 m²",
      floors: {
        en: "Ground Promenade Plaza + Retail Showrooms",
        ar: "طابق تجاري أرضي وممشى بلازا مفتوح",
      },
      parkingCapacity: {
        en: "420 Vehicles",
        ar: "420 سيارة",
      },
      zoning: {
        en: "Commercial Wholesale, Retail Stationery & F&B Plaza",
        ar: "تجاري تجزئة وجملة، أدوات مكتبية ومطاعم",
      },
    },
    specs: [
      {
        label: { en: "Gross Leasable Area", ar: "المساحة التأجيرية الإجمالية" },
        value: "16,500",
        unit: { en: "m²", ar: "م²" },
      },
      {
        label: { en: "Commercial Showrooms", ar: "إجمالي المحلات والمعارض" },
        value: "72",
        unit: { en: "Units", ar: "وحدة تجارية" },
      },
      {
        label: {
          en: "Pedestrian Concourse Width",
          ar: "عرض ممشى المشاة الرئيسي",
        },
        value: "18",
        unit: { en: "m", ar: "متر" },
      },
      {
        label: { en: "Dedicated Parking Bays", ar: "مواقف السيارات المخصصة" },
        value: "420",
        unit: { en: "Slots", ar: "مكان للسيارات" },
      },
      {
        label: {
          en: "Wholesale Loading Bays",
          ar: "أرصفة تحميل وتفريغ الجملة",
        },
        value: "6",
        unit: { en: "Heavy Bays", ar: "أرصفة شاحنات" },
      },
      {
        label: { en: "Average Daily Footfall", ar: "متوسط الزوار اليومي" },
        value: "15,000+",
        unit: { en: "Visitors", ar: "زائر يومياً" },
      },
    ],
    highlights: [
      {
        en: "Modernized transformation of the legendary El Fagala paper & stationery trade into an upscale, organized commercial plaza",
        ar: "نقلة حضارية متطورة لسوق الفجالة التاريخي في مجمع تجاري مفتوح ومنظم ومجهز بالكامل",
      },
      {
        en: "Direct wholesale ('gomla') pricing access for schools, universities, and corporate office bulk orders",
        ar: "توفير أسعار الجملة المباشرة للمدارس والجامعات والشركات دون وسيط تجاري",
      },
      {
        en: "Affordable back-to-school retail shopping for parents and families without inflated brand-name markups",
        ar: "أسعار اقتصادية في متناول أولياء الأمور والطلاب بديلة للمتاجر الاستهلاكية المرتفعة التكلفة",
      },
      {
        en: "Anchor presence of national bookstore titans: Bernasos (since 1918), Samir & Aly Outlet, Alyanour, and El-Azhary",
        ar: "تواجد كبرى كبرى المكتبات المصرية العريقة: برناسو (منذ 1918)، سمير وعلي، اليانور، والأزهري",
      },
    ],
    stores: [
      {
        id: "fp-samir-aly",
        name: {
          en: "Samir & Aly Outlet",
          ar: "سمير وعلي – أوتلت",
        },
        category: {
          en: "Stationery & School Supplies",
          ar: "أدوات مكتبية ومدرسية",
        },
        floor: {
          en: "Plaza Concourse Unit 08",
          ar: "بهو البلازا – الوحدة 08",
        },
        unitNumber: "PLZ-08",
        status: "open",
        description: {
          en: "Egypt's premier stationery and fine arts retailer providing wholesale outlet pricing on school and office supplies.",
          ar: "الفرع الأوتلت لكبرى سلاسل الأدوات المكتبية والمدرسية والفنية بأسعار مخفضة ومباشرة.",
        },
        phone: "+20 110 042 4829",
      },
      {
        id: "fp-bernasos",
        name: {
          en: "Bernasos Bookstores (Since 1918)",
          ar: "مكتبات برناسو (منذ 1918)",
        },
        category: {
          en: "Books, Luxury Pens & Paper Goods",
          ar: "كتب وأقلام فاخرة وأدوات ورقية",
        },
        floor: {
          en: "Plaza West Concourse Unit 04",
          ar: "الجناح الغربي للبلازا – الوحدة 04",
        },
        unitNumber: "PLZ-04",
        status: "open",
        description: {
          en: "Over a century of heritage in high-grade stationery, international writing instruments, and school materials.",
          ar: "أكثر من قرن من التميز في تجارة وتوزيع الأدوات المكتبية الراقية والكتب والمستلزمات المدرسية.",
        },
      },
      {
        id: "fp-alyanour",
        name: {
          en: "Alyanour Mega Bookstore",
          ar: "مكتبات اليانور – جملة وقطاعي",
        },
        category: {
          en: "Wholesale Books & School Curricula",
          ar: "كتب خارجية وأدوات مدرسية ولعب أطفال",
        },
        floor: {
          en: "Plaza Concourse Units 12-14",
          ar: "بهو البلازا – الوحدات 12-14",
        },
        unitNumber: "PLZ-12",
        status: "open",
        description: {
          en: "Official school curricula books, photocopying, printing, educational toys, and office paper at wholesale rates.",
          ar: "موزع لجميع الكتب الخارجية ومستلزمات الطباعة والتصوير ولعب الأطفال وتوريدات المدارس.",
        },
        phone: "+20 110 192 9992",
      },
      {
        id: "fp-elazhary",
        name: {
          en: "El-Azhary Stationery & Engineering Supplies",
          ar: "مؤسسة الأزهري لتجارة الأدوات الكتابية والمدرسية والهندسية",
        },
        category: {
          en: "Engineering & Office Supplies",
          ar: "أدوات هندسية ومستلزمات مكتبية",
        },
        floor: {
          en: "Plaza Central Pavilion",
          ar: "الجناح الأوسط للبلازا",
        },
        unitNumber: "PLZ-22",
        status: "open",
        description: {
          en: "Bulk distribution of technical drawing instruments, architecture supplies, notebooks, and writing equipment.",
          ar: "توريدات متخصصة في الأدوات الهندسية والمكتبية والكتابية وكشاكيل ومدارس لكافة الفئات.",
        },
      },
      {
        id: "fp-galal",
        name: {
          en: "Galal Import & Stationery Trading",
          ar: "مؤسسة جلال للاستيراد والتجارة",
        },
        category: {
          en: "Imported Paper & Bulk Goods",
          ar: "استيراد وتوزيع الورق والمستلزمات",
        },
        floor: {
          en: "Plaza North Concourse Unit 06",
          ar: "الممشى الشمالي – الوحدة 06",
        },
        unitNumber: "PLZ-06",
        status: "open",
        description: {
          en: "Direct import house for paper products, student bags, notebooks, and commercial printing supplies.",
          ar: "استيراد وتوزيع مباشر لمنتجات الورق والأدوات الكتابية وتجهيزات المدارس والشنط.",
        },
      },
      {
        id: "fp-ashraf-aly",
        name: {
          en: "Ashraf Aly Faid Bookstores",
          ar: "مكتبات أشرف علي فايد",
        },
        category: {
          en: "Educational Supplies & Textbooks",
          ar: "كتب دراسية ومستلزمات تعليمية",
        },
        floor: {
          en: "Plaza Concourse Unit 18",
          ar: "بهو البلازا – الوحدة 18",
        },
        unitNumber: "PLZ-18",
        status: "open",
        description: {
          en: "Specialized supplier of national curricula textbooks, educational reference guides, and student workbooks.",
          ar: "توفير كافة المناهج التعليمية والكتب الخارجية والكتب المدرسية والمذكرات بأسعار تنافسية.",
        },
      },
      {
        id: "fp-belal",
        name: {
          en: "Belal Stationery",
          ar: "مكتبة بلال للأدوات المكتبية والمدرسية",
        },
        category: {
          en: "Retail & Bulk Stationery",
          ar: "مكتبات وأدوات مدرسية",
        },
        floor: {
          en: "Plaza South Promenade Unit 02",
          ar: "الممشى الجنوبي – الوحدة 02",
        },
        unitNumber: "PLZ-02",
        status: "open",
        description: {
          en: "Neighborhood stationery essentials, arts & crafts, student project supplies, and print services.",
          ar: "كافة الاحتياجات المدرسية اليومية ومستلزمات الأنشطة الفنية والمجسمات والطباعة.",
        },
      },
      {
        id: "fp-sea-mar3i",
        name: {
          en: "Sea Mar3i Seafood Restaurant",
          ar: "مطعم سي مرعي للمأكولات البحرية",
        },
        category: {
          en: "Dining & F&B",
          ar: "مطاعم ومأكولات بحرية",
        },
        floor: {
          en: "Plaza Hospitality Corner Units 48-49",
          ar: "ركن المطاعم – الوحدات 48-49",
        },
        unitNumber: "PLZ-48",
        status: "open",
        description: {
          en: "Popular casual seafood dining and fresh fish delicacies serving plaza visitors and wholesale shoppers.",
          ar: "أشهى وجبات الأسماك والمأكولات البحرية الطازجة لرواد ومتبضعي البلازا التجارية.",
        },
      },
    ],
    amenities: [
      {
        en: "Pedestrian-first paved plaza with illuminated water fountain and landscaped seating",
        ar: "ممشى للمشاة مرصوف بالكامل مع نافورة مائية مضاءة واستراحات مظللة",
      },
      {
        en: "Direct wholesale bulk purchase desk and corporate supply coordination office",
        ar: "مكتب مخصص للتوريدات والطلبيات الكبرى للمدارس والشركات بأسعار الجملة",
      },
      {
        en: "Dedicated rear logistics loading docks for delivery trucks and wholesale dispatch",
        ar: "أرصفة خلفية مستقلة للشحن والتفريغ السريع لسيارات النقل والشاحنات",
      },
      {
        en: "Atmospheric architectural LED perimeter lighting throughout walkways and fascias",
        ar: "إضاءات معمارية متطورة (LED) تمتد عبر واجهات المحلات والممشى بالكامل",
      },
      {
        en: "Comprehensive 24/7 security, electronic gates, and parking attendants",
        ar: "حراسة وأمن على مدار الساعة وبوابات إلكترونية ومواقف سيارات منظمة",
      },
    ],
  },
  {
    id: "mall-chillout-el-shorouk",
    slug: "mall-chillout-el-shorouk",
    name: {
      en: "Mall ChillOut El Shorouk",
      ar: "مول شل أوت الشروق",
    },
    tagline: {
      en: "Integrated Commercial Lifestyle Zone, Family Arcade, Dining & Stationery Destination",
      ar: "وجهة تجارية وترفيهية متكاملة – ألعاب أطفال، آركيد، كافيهات، ومجمع مكتبات كبرى بالشروق",
    },
    type: "retail",
    status: "active",
    category: {
      en: "Commercial Lifestyle & Destination Mall",
      ar: "مول تجاري وترفيهي متكامل",
    },
    description: {
      en: "Mall ChillOut El Shorouk is a vibrant, full-scale commercial destination strategically situated on the Cairo-Ismailia Desert Highway. Conceived as an all-inclusive family and lifestyle hub, it integrates anchor supermarket shopping (Seoudi), cutting-edge family entertainment and arcade centers (Z Arcade), safe children's play arenas (Loly Land), specialty coffee shops and dessert lounges (Délice), and specialized stationery and school supply megastores mirroring the wholesale pricing advantages of Fagala Plaza.",
      ar: "يعد مول شل أوت الشروق وجهة تجارية وترفيهية متكاملة تحتل موقعاً استراتيجياً حيوياً على طريق مصر-الإسماعيلية الصحراوي بمدينة الشروق. صُمم المول ليكون ملتقى تجارياً وعائلياً شاملاً، حيث يجمع بين التسوق الاستهلاكي الراقي عبر كبرى سلاسل السوبرماركت (سعودي ماركت)، ومراكز الترفيه والألعاب الإلكترونية الحديثة (Z Arcade)، ومناطق ألعاب الأطفال الآمنة (Loly Land)، والمقاهي المتخصصة ومحلات الحلويات (Délice)، إلى جانب مجمع مكتبات وأدوات مدرسية متطور يوفر مزايا وأسعار الجملة لرواد المول.",
    },
    fullOverview: {
      en: "Master-planned across 26,000 square meters of Gross Leasable Area across multi-level commercial concourses, Mall ChillOut El Shorouk serves as the premier commercial magnet for El Shorouk, Badr, and the surrounding East Cairo developments. The mall offers a complete tenant mix: from daily gourmet grocery and fashion boutiques to wellness studios, beauty lounges, family restaurants, and high-volume school supplies retail. The development features multi-lane vehicular access, expansive customer surface parking, grand pedestrian porticos, and climate-controlled retail boulevards.",
      ar: "صُمم مول شل أوت الشروق على مساحة تأجيرية تزيد عن 26,000 متر مربع موزعة على مساحات تجارية ذكية تلبي احتياجات الكتل السكنية لمدينة الشروق ومدينة بدر ومحاور شرق القاهرة. يقدم المول مزيجاً متوازناً من الأنشطة التجارية؛ بدءاً من سلع السوبرماركت الراقية والمتاجر الرياضية والأزياء، مروراً باستوديوهات اللياقة البدنية والعيادات، وصولاً إلى منطقة ترفيه عائلية واسعة ومجمع مكتبات وتوريدات مدرسية بأسعار منافسة، مع مواقف سيارات فسيحة وبوابات دخول مجهزة.",
    },
    mainImage: "/MallChilloutAlshrouk/IMG_5996.webp",
    gallery: [
      "/MallChilloutAlshrouk/IMG_5996.webp",
      "/MallChilloutAlshrouk/IMG_5918.webp",
      "/MallChilloutAlshrouk/IMG_7209.webp",
      "/MallChilloutAlshrouk/IMG_6143.webp",
      "/MallChilloutAlshrouk/IMG_0748.webp",
      "/MallChilloutAlshrouk/IMG_6882.webp",
      "/MallChilloutAlshrouk/IMG_6885.webp",
      "/MallChilloutAlshrouk/IMG_6880.webp",
      "/MallChilloutAlshrouk/IMG_9239.webp",
      "/MallChilloutAlshrouk/IMG_7490.webp",
    ],
    location: {
      address: {
        en: "5J23+4PC, 21 Cairo - Ismailia Desert Rd, El Shorouk, Cairo Governorate 4923112, Egypt",
        ar: "الرمز البريدي 5J23+4PC، 21 طريق مصر اسماعيلية الصحراوى، الشروق، محافظة القاهرة 4923112، مصر",
      },
      city: { en: "El Shorouk City, Cairo", ar: "مدينة الشروق، القاهرة" },
      country: { en: "Egypt", ar: "مصر" },
      coordinates: { lat: 30.1585, lng: 31.6067 },
      googleMapsEmbedUrl:
        "https://maps.google.com/maps?q=5J23%2B4PC%20%D9%85%D9%88%D9%84%20%D8%B4%D9%84%20%D8%A7%D9%88%D8%AA%20%D8%A7%D9%84%D8%B4%D8%B1%D9%88%D9%82&t=&z=16&ie=UTF8&iwloc=&output=embed",
      googleMapsDirectUrl: "https://maps.app.goo.gl/orJz3L8DPECmMGG38?g_st=iw",
    },
    contact: {
      phone: "+20 110 042 4829",
      altPhone: "+20 111 383 6660",
      email: "info@tafawok.co",
      leasingOffice: {
        en: "Mall ChillOut Leasing & Tenant Directorate — Level 1 Office 12",
        ar: "إدارة التأجير التجاري بمول شل أوت الشروق – الطابق الأول مكتب 12",
      },
    },
    keyStats: {
      gla: "26,000 m²",
      builtUpArea: "34,500 m²",
      floors: {
        en: "Ground + 2 Levels + Outdoor Promenade",
        ar: "أرضي + طابقين + ممشى خارجي ومواقف",
      },
      parkingCapacity: {
        en: "650 Vehicles",
        ar: "650 سيارة",
      },
      zoning: {
        en: "Commercial Retail, Family Entertainment, F&B & Clinics",
        ar: "تجاري تجزئة، ترفيه عائلي، مطاعم وعيادات",
      },
    },
    specs: [
      {
        label: { en: "Gross Leasable Area", ar: "المساحة التأجيرية الإجمالية" },
        value: "26,000",
        unit: { en: "m²", ar: "م²" },
      },
      {
        label: { en: "Total Commercial Units", ar: "إجمالي الوحدات والمحلات" },
        value: "58",
        unit: { en: "Units", ar: "وحدة تجارية" },
      },
      {
        label: {
          en: "Anchor Hypermarket Area",
          ar: "مساحة السوبرماركت الرئيسي (سعودي)",
        },
        value: "4,800",
        unit: { en: "m²", ar: "م²" },
      },
      {
        label: {
          en: "Family Entertainment & Arcade",
          ar: "مساحة الترفيه والآركيد (Z Arcade)",
        },
        value: "3,200",
        unit: { en: "m²", ar: "م²" },
      },
      {
        label: {
          en: "Customer Surface Parking",
          ar: "مواقف سيارات مجهزة للزوار",
        },
        value: "650",
        unit: { en: "Vehicles", ar: "مركبة" },
      },
      {
        label: { en: "Average Monthly Footfall", ar: "متوسط الزوار شهرياً" },
        value: "280,000+",
        unit: { en: "Visitors", ar: "زائر شهرياً" },
      },
    ],
    highlights: [
      {
        en: "Anchor presence of Seoudi Supermarket, generating heavy consistent daily household and gourmet footfall",
        ar: "حضور رئيسي لسلسلة سعودي ماركت يوفر كثافة إقبال يومية مستمرة ومتميزة",
      },
      {
        en: "Complete family entertainment destination: Z Arcade interactive gaming arena & Loly Land safe kids play area",
        ar: "وجهة ترفيهية عائلية متكاملة: صالة زد آركيد للألعاب التفاعلية ومنطقة ألعاب الأطفال لولي لاند",
      },
      {
        en: "Specialized Stationery & Educational Hub: High-capacity bookstore flagships (Alyanour, El-Azhary, Ashraf Ali Faid)",
        ar: "مجمع مكتبات وتوريدات مدرسية وهندسية يضم كبرى الماركات (اليانور، الأزهري، وأشرف علي فايد)",
      },
      {
        en: "Direct highway connectivity on Cairo-Ismailia Desert Road with multi-lane ingress and dedicated parking bays",
        ar: "اتصال مباشر بطريق مصر-الإسماعيلية الصحراوي بمداخل متعددة ومواقف سيارات تتسع لـ 650 سيارة",
      },
    ],
    stores: [
      {
        id: "mc-seoudi",
        name: {
          en: "Seoudi Supermarket",
          ar: "سعودي ماركت – هايبر ماركت رئيسي",
        },
        category: {
          en: "Anchor Gourmet Grocery & Supermarket",
          ar: "سوبرماركت وسلع استهلاكية كبرى",
        },
        floor: {
          en: "Ground Floor East Concourse",
          ar: "الطابق الأرضي – الجناح الشرقي",
        },
        unitNumber: "ANCHOR-01",
        status: "open",
        description: {
          en: "4,800 m² premier supermarket offering gourmet imported products, organic produce, fresh bakery, and butchery.",
          ar: "هايبر ماركت متكامل يقدم أفخر المنتجات الغذائية والمستوردة والمخبوزات الطازجة.",
        },
        phone: "+20 2 19557",
      },
      {
        id: "mc-z-arcade",
        name: {
          en: "Z Arcade Family Entertainment",
          ar: "زد آركيد للألعاب والترفيه التفاعلي",
        },
        category: {
          en: "Arcade & Entertainment",
          ar: "ألعاب إلكترونية وترفيه عائلي",
        },
        floor: {
          en: "Upper Entertainment Concourse",
          ar: "الطابق العلوي – مجمع الألعاب",
        },
        unitNumber: "ENT-01",
        status: "open",
        description: {
          en: "Cutting-edge arcade gaming, street basketball challenges, VR simulators, whack-a-mole, air hockey, and billiards.",
          ar: "أحدث صالات الألعاب الإلكترونية: محاكيات الواقع الافتراضي، تحديات كرة السلة، بلياردو، وألعاب الجوائز.",
        },
      },
      {
        id: "mc-loly-land",
        name: {
          en: "Loly Land Kids Area",
          ar: "لولي لاند لألعاب الأطفال",
        },
        category: {
          en: "Kids Play Area & Parties",
          ar: "ألعاب أطفال وتنظيم احتفالات",
        },
        floor: {
          en: "Family Concourse Level 1",
          ar: "الطابق الأول – ركن العائلات",
        },
        unitNumber: "KID-02",
        status: "open",
        description: {
          en: "Safe padded soft play arena, toddler trampolines, slides, and birthday celebration suites.",
          ar: "منطقة ألعاب حركية ناعمة وآمنة للأطفال، نطاطات، وزحاليق وقاعات مجهزة لأعياد الميلاد.",
        },
      },
      {
        id: "mc-alyanour",
        name: {
          en: "Alyanour Book Store & Stationery",
          ar: "مكتبات اليانور – الشروق",
        },
        category: {
          en: "Stationery & Educational Supplies",
          ar: "مكتبات وأدوات مدرسية ولعب أطفال",
        },
        floor: {
          en: "Commercial Promenade Unit 09",
          ar: "الممشى التجاري – الوحدة 09",
        },
        unitNumber: "RET-09",
        status: "open",
        description: {
          en: "All official school textbooks, curricula, photocopying, school backpacks, stationery, and creative toys at wholesale pricing.",
          ar: "كافة الكتب الخارجية والأدوات المدرسية وتصوير المستندات ولعب الأطفال بأسعار الجملة والتجزئة.",
        },
        phone: "+20 110 192 9991",
      },
      {
        id: "mc-stationery-hub",
        name: {
          en: "Stationery Hub — El-Azhary",
          ar: "مجمع مكتبات الشروق – مؤسسة الأزهري",
        },
        category: {
          en: "Engineering & Office Supplies",
          ar: "أدوات كتابية ومدرسية وهندسية",
        },
        floor: {
          en: "Retail Concourse Level 1",
          ar: "الممشى التجاري – الطابق الأول",
        },
        unitNumber: "RET-15",
        status: "open",
        description: {
          en: "High-grade office stationery, drafting supplies, scientific calculators, notebooks, and student geometry sets.",
          ar: "أدوات ومستلزمات مدرسية وهندسية متطورة، كشاكيل، وأدوات رسم فني ومعماري.",
        },
      },
      {
        id: "mc-ashraf-aly",
        name: {
          en: "34 Ashraf Ali Faid",
          ar: "مكتبات 34 أشرف علي فايد",
        },
        category: {
          en: "Books & Curricula Supplies",
          ar: "كتب ومستلزمات دراسية",
        },
        floor: {
          en: "Ground Floor Promenade",
          ar: "الطابق الأرضي – الممشى الخارجي",
        },
        unitNumber: "RET-04",
        status: "open",
        description: {
          en: "Leading distributor of student textbooks, reference libraries, and comprehensive stationery kits.",
          ar: "موزع رئيسي للكتب المدرسية والمناهج التعليمية والمستلزمات المدرسية المعتمدة.",
        },
      },
      {
        id: "mc-delice",
        name: {
          en: "Délice Coffee & Dessert",
          ar: "ديليس كافيه وحلويات غربية",
        },
        category: {
          en: "Cafes & Specialty Bakeries",
          ar: "مقاهي وحلويات ومخبوزات",
        },
        floor: {
          en: "Outdoor Piazza Terrace",
          ar: "تراس البلازا الخارجي",
        },
        unitNumber: "CAFE-01",
        status: "open",
        description: {
          en: "Artisanal specialty coffee, Belgian waffles, French pastries, and relaxing outdoor seating for families.",
          ar: "قهوة مختصة راقية، حلويات فرنسية ومخبوزات طازجة مع جلسات خارجية عائلية مريحة.",
        },
      },
      {
        id: "mc-thunder",
        name: {
          en: "Thunder Sportswear",
          ar: "ثندر للملابس الرياضية",
        },
        category: {
          en: "Sportswear & Fitness Apparel",
          ar: "ملابس رياضية وأحذية",
        },
        floor: {
          en: "Retail Concourse Level 1",
          ar: "الطابق الأول – ممر المتاجر",
        },
        unitNumber: "RET-21",
        status: "open",
        description: {
          en: "Performance athletic apparel, gym gear, training footwear, and activewear for men and women.",
          ar: "أحدث الملابس الرياضية وأحذية التدريب ومستلزمات اللياقة البدنية والنوادي الرياضية.",
        },
      },
      {
        id: "mc-prana",
        name: {
          en: "Prana Fitness & Dance Studio",
          ar: "استوديو برانا للياقة والتدريب",
        },
        category: {
          en: "Fitness & Wellness",
          ar: "لياقة بدنية ورياضة",
        },
        floor: {
          en: "Mezzanine Level Suite 05",
          ar: "طابق الميزانين – جناح 05",
        },
        unitNumber: "FIT-05",
        status: "open",
        description: {
          en: "Boutique group fitness classes, dance conditioning, yoga, and functional movement coaching.",
          ar: "حصص لياقة بدنية جماعية، يوغا، وتدريب حركي بإشراف مدربين معتمدين.",
        },
      },
      {
        id: "mc-s-nails",
        name: {
          en: "S Nails Station & Beauty",
          ar: "صالون إس نيلز للتجميل",
        },
        category: {
          en: "Personal Care & Beauty",
          ar: "عناية شخصية وتجميل",
        },
        floor: {
          en: "First Floor Beauty Gallery",
          ar: "الطابق الأول – جناح العناية",
        },
        unitNumber: "BEA-03",
        status: "open",
        description: {
          en: "Full-service nail care, manicures, pedicures, and beauty wellness treatments.",
          ar: "خدمات عناية متكاملة بالأظافر والجمال والعناية الشخصية في أجواء مريحة راقية.",
        },
      },
    ],
    amenities: [
      {
        en: "Central chilled-water air conditioning throughout indoor concourses and arcades",
        ar: "تكييف مركزي متطور يغطي كافة الممرات وصالات الألعاب والمحلات",
      },
      {
        en: "Expansive customer surface parking with designated family and accessible bays",
        ar: "مواقف سيارات سطحية واسعة ومظللة مخصصة للعائلات وذوي الاحتياجات الخاصة",
      },
      {
        en: "24/7 on-site property management, cleaning cadre, and full CCTV monitoring",
        ar: "فريق إدارة مرافق وصيانة ونظافة دائم بالموقع مع مراقبة أمنية متواصلة",
      },
      {
        en: "Outdoor landscaped dining terrace with shaded seating and decorative planters",
        ar: "تراس خارجي منسق ومظلل للمقاهي والمطاعم مع مساحات خضراء",
      },
      {
        en: "Comprehensive family conveniences: prayer rooms, baby changing suites, and accessible restrooms",
        ar: "مرافق متكاملة للراحة العائلية تشمل مصليات مجهزة وغرف رعاية أطفال",
      },
    ],
  },
  {
    id: "october-festival-mall",
    slug: "october-festival-mall",
    name: {
      en: "October Festival Mall",
      ar: "مول أكتوبر فيستيفال",
    },
    tagline: {
      en: "Prime Commercial & Retail Destination on Gamal Abdel Nasser Axis, Northern Expansions",
      ar: "الوجهة التجارية والتسويقية الرائدة بمحور جمال عبد الناصر – التوسعات الشمالية، 6 أكتوبر",
    },
    type: "retail",
    status: "active",
    category: {
      en: "Commercial Retail & Quick-Commerce Hub",
      ar: "مجمع تجاري ومتاجر تجزئة وتجارة سريعة",
    },
    description: {
      en: "October Festival Mall is a premier commercial and retail development strategically located on Gamal Abdel Nasser Axis in the high-growth Northern Expansions of 6th of October City. Characterized by striking curved architectural facades, rich natural granite cladding, and wide double-height display frontages, the property hosts leading commercial operations including Noon Minutes (15-minute quick fulfillment depot) and Alyanour Mega Bookstore & Stationery (supplying schools, offices, and retail families at wholesale and retail rates), alongside prime 130 m²+ commercial retail spaces available for lease to major retail and F&B brands.",
      ar: "يعد مول أكتوبر فيستيفال أحد أبرز المشروعات التجارية الراقية لشركة تفوق، بموقع استراتيجي على محور جمال عبد الناصر بمنطقة التوسعات الشمالية بمدينة السادس من أكتوبر. يتميز المول بواجهات معمارية منحنية مكسوة بالجرانيت الطبيعي الفاخر، ومساحات عرض زجاجية مزدوجة الارتفاع، ويستضيف أنشطة تجارية كبرى رائدة مثل مركز التجارة السريعة (نون مينتس Noon Minutes)، ومكتبات اليانور الكبرى للأدوات المكتبية والمدرسية والكتب (جملة وقطاعي)، إلى جانب وحدات ومحلات تجارية راقية بمساحات 130 م² معروضة للتأجير لكبرى العلامات التجارية العالمية والمحلية.",
    },
    fullOverview: {
      en: "Engineered to institutional commercial standards, October Festival Mall commands a prominent position along Gamal Abdel Nasser Axis in the Northern Expansions of 6th of October City. Spanning 22,000 square meters of prime Gross Leasable Area across thoughtfully planned commercial floorplates, the development features high floor-to-ceiling clearances, high-capacity electrical substations, and generous perimeter parking for customer vehicles and rapid delivery fleets. Offering prime retail frontages of 130 m² for prestigious brands, the hub delivers exceptional commercial visibility and operational efficiency in West Cairo's most active urban node.",
      ar: "شُيّد مشروع مول أكتوبر فيستيفال وفق أعلى المعايير الهندسية المؤسسية بموقع استراتيجي على محور جمال عبد الناصر بمنطقة التوسعات الشمالية بمدينة السادس من أكتوبر، على مساحة تأجيرية تبلغ 22,000 متر مربع من المسطحات التجارية المتطورة. صُمم المول بأسقف مرتفعة، وقدرات كهربائية عالية تلبي متطلبات التبريد والتشغيل السريع، ومواقف سيارات محيطية مريحة تخدم حركة الزوار وأساطيل التوصيل السريع. يوفر مساحات تجارية جاهزة بمساحة 130 م² فأكثر للبراندات الكبرى مع واجهات زجاجية واسعة وحركة مرور عالية، مما يجعله وجهة استثمارية وتجارية رائدة في غرب القاهرة.",
    },
    mainImage: "/OctoberMall/IMG_0384.webp",
    gallery: [
      "/OctoberMall/IMG_0384.webp",
      "/OctoberMall/IMG_5293.webp",
      "/OctoberMall/IMG_0378.webp",
      "/OctoberMall/IMG_0381.webp",
      "/OctoberMall/IMG_5294.webp",
    ],
    location: {
      address: {
        en: "Gamal Abdel Nasser Axis, Northern Expansions, 6th of October City, Giza Governorate 3231050, Egypt",
        ar: "محور جمال عبد الناصر، التوسعات الشمالية، مدينة السادس من أكتوبر، محافظة الجيزة 3231050، مصر",
      },
      city: {
        en: "6th of October City, Giza",
        ar: "مدينة السادس من أكتوبر، الجيزة",
      },
      country: { en: "Egypt", ar: "مصر" },
      coordinates: { lat: 29.9868, lng: 30.9325 },
      googleMapsEmbedUrl:
        "https://maps.google.com/maps?q=%D8%A7%D9%83%D8%AA%D9%88%D8%A8%D8%B1%20%D9%81%D9%8A%D8%B3%D8%AA%D9%8A%D9%81%D8%A7%D9%84%20%D8%B3%D9%8A%D8%AA%D9%89%20%D9%85%D8%AD%D9%88%D8%B1%20%D8%AC%D9%85%D8%A7%D9%84%20%D8%B9%D8%A8%D8%AF%20%D8%A7%D9%84%D9%86%D8%A7%D8%B5%D8%B1%20%D8%A7%D9%84%D8%AA%D9%88%D8%B3%D8%B9%D8%A7%D8%AA%20%D8%A7%D9%84%D8%B4%D9%85%D8%A7%D9%84%D9%8A%D8%A9&t=&z=15&ie=UTF8&iwloc=&output=embed",
      googleMapsDirectUrl: "https://maps.app.goo.gl/PBDCaRMpznhAWYic8?g_st=iw",
    },
    contact: {
      phone: "+20 110 042 4829",
      altPhone: "+20 111 383 6660",
      email: "info@tafawok.co",
      leasingOffice: {
        en: "October Festival Mall Leasing Directorate — Unit 101",
        ar: "إدارة التأجير التجاري بمول أكتوبر فيستيفال – الوحدة 101",
      },
    },
    keyStats: {
      gla: "22,000 m²",
      builtUpArea: "28,500 m²",
      floors: {
        en: "Commercial Ground + Mezzanine + First Floor",
        ar: "أرضي تجاري + ميزانين + طابق أول",
      },
      parkingCapacity: {
        en: "380 Vehicles",
        ar: "380 سيارة",
      },
      zoning: {
        en: "Commercial Retail, Quick Commerce & Brand Showrooms",
        ar: "تجاري تجزئة، تجارة سريعة ومعارض براندات",
      },
    },
    specs: [
      {
        label: { en: "Gross Leasable Area", ar: "المساحة التأجيرية الإجمالية" },
        value: "22,000",
        unit: { en: "m²", ar: "م²" },
      },
      {
        label: {
          en: "Standard Flagship Unit",
          ar: "مساحة المحل النموذجي المتاح",
        },
        value: "130",
        unit: { en: "m²", ar: "م²" },
      },
      {
        label: { en: "Clear Ceiling Height", ar: "ارتفاع الأسقف الصافي" },
        value: "4.2",
        unit: { en: "m", ar: "متر" },
      },
      {
        label: {
          en: "Customer Parking Slots",
          ar: "مواقف سيارات الزوار والعملاء",
        },
        value: "380",
        unit: { en: "Slots", ar: "مكان مخصص" },
      },
      {
        label: {
          en: "Fulfillment & Delivery Bays",
          ar: "أرصفة أساطيل التوصيل السريع",
        },
        value: "12",
        unit: { en: "Bays", ar: "أرصفة مجهزة" },
      },
      {
        label: {
          en: "Quick-Commerce Depot",
          ar: "مركز التجارة السريعة (نون مينتس)",
        },
        value: "15",
        unit: { en: "Min Delivery Radius", ar: "دقيقة للتوصيل" },
      },
    ],
    highlights: [
      {
        en: "Prime curved architectural design with premium polished granite cladding and soaring glass display vitrines",
        ar: "تصميم معماري منحني فاخر بواجهات جرانيت طبيعي وواجهات زجاجية مزدوجة الارتفاع",
      },
      {
        en: "High-traffic commercial frontage offering 130 m² flagship spaces tailored for leading domestic & international brands",
        ar: "واجهة تجارية ذات كثافة مرورية عالية توفر مساحات 130 م² مجهزة للبراندات الكبرى",
      },
      {
        en: "Active operational anchor: Noon Minutes rapid 15-minute fulfillment depot driving continuous logistical and customer footfall",
        ar: "تشغيل نشط لمركز نون مينتس (Noon Minutes) للتوصيل فائق السرعة خلال 15 دقيقة",
      },
      {
        en: "Alyanour Mega Bookstore & Stationery center providing bulk educational, school, and office supplies at wholesale prices",
        ar: "صرح مكتبات اليانور الضخم لتجارة الأدوات المكتبية والمدرسية والكتب بالجملة والقطاعي",
      },
    ],
    stores: [
      {
        id: "oct-noon",
        name: {
          en: "Noon Minutes Rapid Fulfillment Hub",
          ar: "نون مينتس – مركز التوصيل السريع 15 دقيقة",
        },
        category: {
          en: "Quick Commerce & Instant Logistics",
          ar: "تجارة إلكترونية سريعة ولوجستيات",
        },
        floor: {
          en: "Ground Logistics Frontage Unit 03",
          ar: "الطابق الأرضي – الواجهة اللوجستية وحدة 03",
        },
        unitNumber: "NOON-03",
        status: "open",
        description: {
          en: "Automated quick-commerce fulfillment depot powering 15-minute instant grocery, essentials, and electronics delivery across 6th of October City.",
          ar: "مركز تلبية وتوصيل فوري يخدم مدينة السادس من أكتوبر لتوصيل السلع والطلبات خلال 15 دقيقة.",
        },
      },
      {
        id: "oct-alyanour",
        name: {
          en: "Alyanour Mega Stationery & Educational Center",
          ar: "مكتبات اليانور – مول أكتوبر فيستيفال",
        },
        category: {
          en: "Wholesale & Retail Stationery, Books & Toys",
          ar: "كتب خارجية وأدوات مدرسية ولعب أطفال (جملة وقطاعي)",
        },
        floor: {
          en: "Ground Commercial Galleria Units 01-02",
          ar: "الطابق الأرضي – البهو التجاري وحدات 01-02",
        },
        unitNumber: "OCT-01",
        status: "open",
        description: {
          en: "Expansive multi-section bookstore offering bulk office procurement, school curricula, foreign textbooks, educational toys, and printing at wholesale and retail rates.",
          ar: "معرض ضخم لبيع وتوريد الكتب الخارجية والأدوات المكتبية والمدرسية والطباعة ولعب الأطفال بأسعار الجملة والقطاعي.",
        },
        phone: "+20 110 192 9991",
      },
      {
        id: "oct-flagship-130",
        name: {
          en: "Prime 130 m² Flagship Commercial Retail Showroom",
          ar: "محل تجاري متميز 130 م² للإيجار للبراندات الكبرى",
        },
        category: {
          en: "Commercial Retail / Fashion / F&B",
          ar: "مساحة تجارية حرة لكبرى العلامات",
        },
        floor: {
          en: "Ground Promenade Prime Corner",
          ar: "الطابق الأرضي – الواجهة الركنية الرئيسية",
        },
        unitNumber: "OCT-130",
        status: "leased",
        description: {
          en: "130 m² high-visibility glass-fronted commercial store featuring heavy foot traffic, dedicated customer parking, and high exposure for major retail brands.",
          ar: "محل تجاري بمساحة 130 م² بواجهة زجاجية عريضة، حركة مرور مرتفعة، ومواقف سيارات متاحة – مخصص للبراندات الكبرى والشهيرة.",
        },
        phone: "+20 110 042 4829",
      },
      {
        id: "oct-express-dispatch",
        name: {
          en: "October Express Courier & Trade Services",
          ar: "مركز خدمات الشحن والتجارة السريعة",
        },
        category: {
          en: "Courier, Postal & Business Services",
          ar: "خدمات الشحن والبريد السريع",
        },
        floor: {
          en: "First Floor Suite 104",
          ar: "الطابق الأول – جناح 104",
        },
        unitNumber: "OCT-104",
        status: "open",
        description: {
          en: "Express parcel delivery hub, business correspondence center, and fulfillment services for commercial tenants.",
          ar: "خدمات شحن الطرود والبريد السريع والتوزيع الداخلي لخدمة المتاجر والمستأجرين والمواطنين.",
        },
      },
    ],
    amenities: [
      {
        en: "Prominent curved architectural frontage cladded in high-grade natural polished granite",
        ar: "واجهة معمارية منحنية فخمة من الجرانيت الطبيعي المصقول مع زجاج بانورامي",
      },
      {
        en: "Dedicated vehicle parking zone directly flanking the commercial display concourses",
        ar: "مواقف سيارات مخصصة تقع مباشرة أمام الممشى والمعارض التجارية",
      },
      {
        en: "High-capacity loading docks with automated access control for delivery and logistics fleets",
        ar: "أرصفة تحميل وتفريغ متطورة تدعم أساطيل التجارة السريعة والسيارات اللوجستية",
      },
      {
        en: "Round-the-clock 24/7 security patrol, electronic surveillance, and professional property management",
        ar: "حراسة أمنية متكاملة 24 ساعة، كاميرات مراقبة، وفريق إدارة مرافق وصيانة مباشر من تفوق",
      },
      {
        en: "Three-phase high-voltage power distribution and standby generator provisions for uninterrupted retail operations",
        ar: "تغذية كهربائية ثلاثية الأطوار مع جاهزية المولدات لضمان استمرارية الأعمال والمتاجر",
      },
    ],
  },
]

export const CLIENT_PARTNERS: ClientPartner[] = [
  { name: "Saudi Aramco", category: "energy", country: "KSA" },
  { name: "ADNOC", category: "energy", country: "UAE" },
  { name: "Bechtel Corporation", category: "epc", country: "USA / Global" },
  { name: "Petrofac", category: "epc", country: "UK / Global" },
  { name: "Samsung Engineering", category: "epc", country: "South Korea" },
  {
    name: "Grand Hypermarket",
    category: "commercial",
    country: "GCC / Regional",
  },
  { name: "KNPC", category: "energy", country: "Kuwait" },
  { name: "KOC", category: "energy", country: "Kuwait" },
  { name: "Technip", category: "epc", country: "France / Global" },
  { name: "CCC", category: "epc", country: "Middle East" },
  { name: "Petrojet", category: "epc", country: "Egypt" },
  { name: "KITZ Valves", category: "manufacturer", country: "Japan" },
]

export const COMMERCIAL_DISCIPLINES: CommercialDiscipline[] = [
  {
    id: "office-developments",
    title: {
      en: "Prime Office Developments & Corporate Hubs",
      ar: "مجمعات المكاتب الإدارية ومقرات الشركات",
    },
    tagline: {
      en: "Grade-A Workspaces Engineered for Enterprise Longevity",
      ar: "بيئات عمل مؤسسية من الفئة (A) مصممة لاستدامة الأعمال",
    },
    description: {
      en: "Design, development, and asset management of state-of-the-art office towers and corporate campuses with advanced MEP, BMS automation, and high-density floorplates.",
      ar: "تطوير وإدارة أبراج ومجمعات إدارية متكاملة بأحدث الأنظمة الكهروميكانيكية، وأنظمة التحكم الذكية، ومساحات مفتوحة مرنة تلبي متطلبات كبرى الشركات العالمية.",
    },
    keyMetric: {
      value: "18,500 m²",
      label: { en: "Flagship GLA", ar: "مساحة تأجيرية إدارية" },
    },
    features: [
      {
        en: "LEED Gold compliance standards",
        ar: "معايير تصميم معتمدة مطابقة لـ LEED",
      },
      {
        en: "High-speed optical fiber backbone",
        ar: "بنية تحتية للألياف الضوئية فائقة السرعة",
      },
      {
        en: "100% generator power redundancy",
        ar: "تغطية كهربائية احتياطية كاملة 100%",
      },
    ],
    iconName: "building-2",
  },
  {
    id: "retail-destinations",
    title: {
      en: "Destination Retail Hubs & Lifestyle Centers",
      ar: "المراكز التجارية والوجهات التسويقية الإقليمية",
    },
    tagline: {
      en: "High-Footfall Commercial Malls with Anchor Magnetism",
      ar: "مولات تجارية عالية الكثافة تستقطب كبرى العلامات الاستهلاكية",
    },
    description: {
      en: "Purpose-built shopping destinations anchored by international hypermarkets, high-fashion avenues, entertainment arcades, and landscaped alfresco dining concourses.",
      ar: "وجهات تسوق استراتيجية تضم سلاسل الهايبر ماركت الكبرى، ومتاجر الأزياء، ومراكز الترفيه العائلي، وتراسات المطاعم المفتوحة لضمان أعلى حركة للمشاة.",
    },
    keyMetric: {
      value: "350,000+",
      label: { en: "Monthly Visitors", ar: "متوسط الزوار شهرياً" },
    },
    features: [
      {
        en: "Multinational hypermarket anchors",
        ar: "عقود إيجار مع كبرى سلاسل الهايبر ماركت",
      },
      {
        en: "Family entertainment & safe play zones",
        ar: "مناطق ترفيه عائلية ومساحات ألعاب للأطفال",
      },
      {
        en: "Dedicated multi-bay loading docks",
        ar: "أرصفة تفريغ بضائع شاحنات هيدروليكية",
      },
    ],
    iconName: "shopping-bag",
  },
  {
    id: "logistics-parks",
    title: {
      en: "Strategic Logistics Parks & Commercial Showrooms",
      ar: "المجمعات اللوجستية والمعارض التجارية المتطورة",
    },
    tagline: {
      en: "Heavy Industrial Capacity Integrated with Direct Trade",
      ar: "بنية تحتية صناعية ثقيلة مدمجة مع واجهات تجارية مباشرة",
    },
    description: {
      en: "Column-free industrial warehousing, highway-frontage equipment showrooms, and technical dispatch centers built with high floor loading capacities and automated logistics infrastructure.",
      ar: "مستودعات خالية من الأعمدة الداخلية، ومعارض تجارية بواجهات مباشرة على المحاور السريعة، ومراكز فحص واعتماد تلبي احتياجات قطاعات المقاولات والطاقة.",
    },
    keyMetric: {
      value: "7.5 Tons/m²",
      label: { en: "Floor Loading Capacity", ar: "قوة تحمل الأرضيات" },
    },
    features: [
      {
        en: "11.5m clear vertical storage height",
        ar: "ارتفاع تخزين داخلي صافي 11.5 متر",
      },
      {
        en: "NFPA-13 compliant fire suppression",
        ar: "أنظمة إطفاء حريق أوتوماتيكية معتمدة",
      },
      {
        en: "100-ton electronic weighbridge access",
        ar: "ميزان بسكول إلكتروني للشاحنات حتى 100 طن",
      },
    ],
    iconName: "warehouse",
  },
  {
    id: "turnkey-epc",
    title: {
      en: "Turnkey EPC Execution & High-Spec Fit-Out",
      ar: "المقاولات العامة وتسليم المفتاح والتشطيبات المتخصصة",
    },
    tagline: {
      en: "Precision Engineering from Foundation to Commissioning",
      ar: "هندسة دقيقة من وضع الأساسات حتى التشغيل الفعلي والتسليم",
    },
    description: {
      en: "End-to-end turnkey general contracting, precision MEP execution, and high-end tenant fit-outs executed by TAFAWOK's directly sponsored 50+ engineers and specialized regional workforce.",
      ar: "تنفيذ متكامل لأعمال المقاولات الكبرى، والأعمال الكهروميكانيكية الدقيقة، والتشطيبات الفاخرة للشركات عبر كادرنا الهندسي الدائم المكون من 50+ مهندساً واستشارياً.",
    },
    keyMetric: {
      value: "25+ Years",
      label: { en: "Execution Experience", ar: "سنوات من التنفيذ المتواصل" },
    },
    features: [
      {
        en: "Rigorous Zero-Harm HSE policy",
        ar: "سياسة سلامة وصحة مهنية صارمة (صفر حوادث)",
      },
      {
        en: "In-house MEP & infrastructure specialists",
        ar: "فريق هندسي كهروميكانيكي وبنية تحتية دائم",
      },
      {
        en: "Tier-1 industrial procurement access",
        ar: "توريدات مباشرة من كبرى المصانع العالمية",
      },
    ],
    iconName: "hard-hat",
  },
]

export const UI_DICTIONARY = {
  nav: {
    home: { en: en.nav.home, ar: ar.nav.home },
    about: { en: en.nav.about, ar: ar.nav.about },
    properties: { en: en.nav.properties, ar: ar.nav.properties },
    ceo: { en: en.nav.ceo, ar: ar.nav.ceo },
    contact: { en: en.nav.contact, ar: ar.nav.contact },
    inquireNow: { en: en.nav.inquireNow, ar: ar.nav.inquireNow },
    switchLang: { en: en.nav.switchLang, ar: ar.nav.switchLang },
  },
  home: {
    heroBadge: { en: en.home.heroBadge, ar: ar.home.heroBadge },
    heroTitle: { en: en.home.heroTitle, ar: ar.home.heroTitle },
    heroSubtitle: { en: en.home.heroSubtitle, ar: ar.home.heroSubtitle },
    exploreAssets: { en: en.home.exploreAssets, ar: ar.home.exploreAssets },
    reachOwner: { en: en.home.reachOwner, ar: ar.home.reachOwner },
    metricsTitle: { en: en.home.metricsTitle, ar: ar.home.metricsTitle },
    metricsSubtitle: {
      en: en.home.metricsSubtitle,
      ar: ar.home.metricsSubtitle,
    },
    portfolioTitle: { en: en.home.portfolioTitle, ar: ar.home.portfolioTitle },
    portfolioSubtitle: {
      en: en.home.portfolioSubtitle,
      ar: ar.home.portfolioSubtitle,
    },
    viewPropertyDetails: {
      en: en.home.viewPropertyDetails,
      ar: ar.home.viewPropertyDetails,
    },
    disciplinesBadge: {
      en: en.home.disciplinesBadge,
      ar: ar.home.disciplinesBadge,
    },
    disciplinesTitle: {
      en: en.home.disciplinesTitle,
      ar: ar.home.disciplinesTitle,
    },
    disciplinesSubtitle: {
      en: en.home.disciplinesSubtitle,
      ar: ar.home.disciplinesSubtitle,
    },
    ceoSectionBadge: {
      en: en.home.ceoSectionBadge,
      ar: ar.home.ceoSectionBadge,
    },
    ceoSectionTitle: {
      en: en.home.ceoSectionTitle,
      ar: ar.home.ceoSectionTitle,
    },
    ceoReadFull: { en: en.home.ceoReadFull, ar: ar.home.ceoReadFull },
    clientsBadge: { en: en.home.clientsBadge, ar: ar.home.clientsBadge },
    clientsTitle: { en: en.home.clientsTitle, ar: ar.home.clientsTitle },
    clientsSubtitle: {
      en: en.home.clientsSubtitle,
      ar: ar.home.clientsSubtitle,
    },
    homeCtaBadge: { en: en.home.homeCtaBadge, ar: ar.home.homeCtaBadge },
    homeCtaTitle: { en: en.home.homeCtaTitle, ar: ar.home.homeCtaTitle },
    homeCtaSubtitle: {
      en: en.home.homeCtaSubtitle,
      ar: ar.home.homeCtaSubtitle,
    },
    inquireAssetBtn: {
      en: en.home.inquireAssetBtn,
      ar: ar.home.inquireAssetBtn,
    },
    viewAllAssetsBtn: {
      en: en.home.viewAllAssetsBtn,
      ar: ar.home.viewAllAssetsBtn,
    },
  },
  propertyCard: {
    glaLabel: { en: en.propertyCard.glaLabel, ar: ar.propertyCard.glaLabel },
    locationLabel: {
      en: en.propertyCard.locationLabel,
      ar: ar.propertyCard.locationLabel,
    },
    floorsLabel: {
      en: en.propertyCard.floorsLabel,
      ar: ar.propertyCard.floorsLabel,
    },
    buaLabel: {
      en: en.propertyCard.buaLabel,
      ar: ar.propertyCard.buaLabel,
    },
    parkingLabel: {
      en: en.propertyCard.parkingLabel,
      ar: ar.propertyCard.parkingLabel,
    },
    viewFullAsset: {
      en: en.propertyCard.viewFullAsset,
      ar: ar.propertyCard.viewFullAsset,
    },
  },
  propertyDetail: {
    backToAll: {
      en: en.propertyDetail.backToAll,
      ar: ar.propertyDetail.backToAll,
    },
    specsTitle: {
      en: en.propertyDetail.specsTitle,
      ar: ar.propertyDetail.specsTitle,
    },
    galleryTitle: {
      en: en.propertyDetail.galleryTitle,
      ar: ar.propertyDetail.galleryTitle,
    },
    storesTitle: {
      en: en.propertyDetail.storesTitle,
      ar: ar.propertyDetail.storesTitle,
    },
    mapTitle: {
      en: en.propertyDetail.mapTitle,
      ar: ar.propertyDetail.mapTitle,
    },
    getDirections: {
      en: en.propertyDetail.getDirections,
      ar: ar.propertyDetail.getDirections,
    },
    leasingContactTitle: {
      en: en.propertyDetail.leasingContactTitle,
      ar: ar.propertyDetail.leasingContactTitle,
    },
    leasingContactSubtitle: {
      en: en.propertyDetail.leasingContactSubtitle,
      ar: ar.propertyDetail.leasingContactSubtitle,
    },
    callNow: { en: en.propertyDetail.callNow, ar: ar.propertyDetail.callNow },
    emailNow: {
      en: en.propertyDetail.emailNow,
      ar: ar.propertyDetail.emailNow,
    },
    viewDirectoryItem: {
      en: en.propertyDetail.viewDirectoryItem,
      ar: ar.propertyDetail.viewDirectoryItem,
    },
    unit: { en: en.propertyDetail.unit, ar: ar.propertyDetail.unit },
    floor: { en: en.propertyDetail.floor, ar: ar.propertyDetail.floor },
  },
  owner: {
    title: { en: en.owner.title, ar: ar.owner.title },
    reachOwnerTitle: {
      en: en.owner.reachOwnerTitle,
      ar: ar.owner.reachOwnerTitle,
    },
    reachOwnerDesc: {
      en: en.owner.reachOwnerDesc,
      ar: ar.owner.reachOwnerDesc,
    },
    directPhone: { en: en.owner.directPhone, ar: ar.owner.directPhone },
    secondaryPhone: {
      en: en.owner.secondaryPhone,
      ar: ar.owner.secondaryPhone,
    },
    directEmail: { en: en.owner.directEmail, ar: ar.owner.directEmail },
    whatsappChat: { en: en.owner.whatsappChat, ar: ar.owner.whatsappChat },
    headquartersAddress: {
      en: en.owner.headquartersAddress,
      ar: ar.owner.headquartersAddress,
    },
  },
  contactForm: {
    title: { en: en.contactForm.title, ar: ar.contactForm.title },
    subtitle: { en: en.contactForm.subtitle, ar: ar.contactForm.subtitle },
    nameLabel: { en: en.contactForm.nameLabel, ar: ar.contactForm.nameLabel },
    namePlaceholder: {
      en: en.contactForm.namePlaceholder,
      ar: ar.contactForm.namePlaceholder,
    },
    emailLabel: {
      en: en.contactForm.emailLabel,
      ar: ar.contactForm.emailLabel,
    },
    emailPlaceholder: {
      en: en.contactForm.emailPlaceholder,
      ar: ar.contactForm.emailPlaceholder,
    },
    phoneLabel: {
      en: en.contactForm.phoneLabel,
      ar: ar.contactForm.phoneLabel,
    },
    phonePlaceholder: {
      en: en.contactForm.phonePlaceholder,
      ar: ar.contactForm.phonePlaceholder,
    },
    propertyLabel: {
      en: en.contactForm.propertyLabel,
      ar: ar.contactForm.propertyLabel,
    },
    anyProperty: {
      en: en.contactForm.anyProperty,
      ar: ar.contactForm.anyProperty,
    },
    inquiryTypeLabel: {
      en: en.contactForm.inquiryTypeLabel,
      ar: ar.contactForm.inquiryTypeLabel,
    },
    inquiryTypes: {
      leasing: {
        en: en.contactForm.inquiryTypes.leasing,
        ar: ar.contactForm.inquiryTypes.leasing,
      },
      investment: {
        en: en.contactForm.inquiryTypes.investment,
        ar: ar.contactForm.inquiryTypes.investment,
      },
      turnkey: {
        en: en.contactForm.inquiryTypes.turnkey,
        ar: ar.contactForm.inquiryTypes.turnkey,
      },
      general: {
        en: en.contactForm.inquiryTypes.general,
        ar: ar.contactForm.inquiryTypes.general,
      },
    },
    messageLabel: {
      en: en.contactForm.messageLabel,
      ar: ar.contactForm.messageLabel,
    },
    messagePlaceholder: {
      en: en.contactForm.messagePlaceholder,
      ar: ar.contactForm.messagePlaceholder,
    },
    submitBtn: {
      en: en.contactForm.submitBtn,
      ar: ar.contactForm.submitBtn,
    },
    submittingBtn: {
      en: en.contactForm.submittingBtn,
      ar: ar.contactForm.submittingBtn,
    },
    successMessage: {
      en: en.contactForm.successMessage,
      ar: ar.contactForm.successMessage,
    },
    errorMessage: {
      en: en.contactForm.errorMessage,
      ar: ar.contactForm.errorMessage,
    },
  },
  footer: {
    corporateDesc: {
      en: en.footer.corporateDesc,
      ar: ar.footer.corporateDesc,
    },
    propertiesNav: {
      en: en.footer.propertiesNav,
      ar: ar.footer.propertiesNav,
    },
    quickLinks: { en: en.footer.quickLinks, ar: ar.footer.quickLinks },
    ownerDirect: { en: en.footer.ownerDirect, ar: ar.footer.ownerDirect },
    copyright: { en: en.footer.copyright, ar: ar.footer.copyright },
    licenseNote: { en: en.footer.licenseNote, ar: ar.footer.licenseNote },
  },
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return PROPERTIES.find((p) => p.slug === slug)
}

export function getAllPropertySlugs(): string[] {
  return PROPERTIES.map((p) => p.slug)
}

export const CORPORATE_TIMELINE: TimelineMilestone[] = [
  {
    year: "1970s – 1990s",
    title: {
      en: "Gulf Engineering Heritage & Regional Infrastructure",
      ar: "إرث هندسي متجذر في خمسة عقود من مشروعات الخليج",
    },
    badge: {
      en: "Regional Foundation",
      ar: "الجذور الإقليمية",
    },
    description: {
      en: "Executive leadership and core management accumulated five decades of continuous on-site execution in the Arabian Gulf, delivering critical petrochemical plants, high-pressure pipelines, and mega water storage infrastructure across Kuwait, Saudi Arabia, and the UAE.",
      ar: "تراكمت خبرات الإدارة العليا عبر خمسة عقود متصلة من التنفيذ الميداني في منطقة الخليج العربي، شملت إنجاز محطات بتروكيماويات، وخطوط أنابيب ضغط عالي، ومشروعات مائية كبرى في الكويت والمملكة العربية السعودية والإمارات.",
    },
    highlights: [
      {
        en: "440 Million Imperial Gallon strategic fresh-water storage reservoirs in Kuwait",
        ar: "إنشاء 8 خزانات استراتيجية للمياه بسعة 440 مليون جالون إمبراطوري بالكويت",
      },
      {
        en: "Major procurement alliances with Saudi Aramco, ADNOC, and KNPC",
        ar: "شراكات توريدات كبرى مع أرامكو السعودية وأدنوك ونفط الكويت",
      },
      {
        en: "Direct engineering management of 132 KV substations and power switchyards",
        ar: "إدارة هندسية متكاملة لمحطات التحويل الكهربائي 132 ك.ف وأنظمة SCADA",
      },
    ],
    scopeCategory: "heritage",
  },
  {
    year: "2000",
    title: {
      en: "Founding of TAFAWOK in Egypt",
      ar: "تأسيس شركة تفوق في مصر",
    },
    badge: {
      en: "Cairo Incorporation",
      ar: "انطلاق العمل في مصر",
    },
    description: {
      en: "TAFAWOK Real Estate Investment and Contracting was officially established in Cairo by a distinguished cadre of Gulf-veteran Egyptian engineers to cater to Egypt's rapidly expanding commercial real estate and urban development boom.",
      ar: "تأسست شركة تفوق للاستثمار العقاري والمقاولات في القاهرة بكادر هندسي مصري رفيع المستوى من أصحاب الخبرات الطويلة في الخليج، لتلبية الطلب المتسارع على التطوير التجاري والمشروعات الإنشائية الكبرى في مصر.",
    },
    highlights: [
      {
        en: "Establishment of Cairo corporate headquarters at Building 360",
        ar: "تأسيس المقر الرئيسي للشركة بمبنى 360 بالقاهرة الجديدة",
      },
      {
        en: "Directly sponsored permanent technical cadre of 50+ core engineers",
        ar: "كادر هندسي وفني دائم يتجاوز 50 مهندساً واستشارياً متخصصاً",
      },
      {
        en: "First-tier commercial contracting and real estate investment licensure",
        ar: "حيازة تراخيص المقاولات والاستثمار العقاري التجاري من الفئة الأولى",
      },
    ],
    scopeCategory: "heritage",
  },
  {
    year: "2010 – 2015",
    title: {
      en: "Strategic Megaprojects & National Healthcare Wings",
      ar: "تنفيذ المشروعات القومية والتجهيزات التخصصية",
    },
    badge: {
      en: "Turnkey EPC Leadership",
      ar: "ريادة المقاولات المتكاملة",
    },
    description: {
      en: "Executed mission-critical institutional projects across healthcare and government infrastructure, highlighted by the complete MEP and structural expansion of Kuwait Ministry of Health's Adan Hospital and nationwide video conferencing networks.",
      ar: "تنفيذ مشروعات كبرى للقطاعين الحكومي والصحي، تصدرها التوسعة الشاملة لمستشفى العدان لصالح وزارة الصحة الكويتية، وشبكة الفيديو كونفرانس القومية للهيئة العامة للأبنية التعليمية بمصر.",
    },
    highlights: [
      {
        en: "Cleanroom HEPA filtration and medical gas piping for surgery theaters",
        ar: "أنظمة تكييف متطورة بغرف العمليات وشبكات الغازات الطبية بمستشفى العدان",
      },
      {
        en: "National video conferencing ICT backbone across all Egyptian governorates",
        ar: "بنية اتصالات وفيديو كونفرانس رقمية غطت محافظات جمهورية مصر العربية",
      },
      {
        en: "Sole regional agency for Achech Europe industrial valves and certified piping",
        ar: "الوكيل الحصري لمحابس أشك الأوروبية وتوريدات الأنابيب المعتمدة دولياً",
      },
    ],
    scopeCategory: "infrastructure",
  },
  {
    year: "2018 – 2021",
    title: {
      en: "Strategic Transition to Commercial Real Estate Assets",
      ar: "التحول الاستراتيجي نحو امتلاك وتطوير الأصول التجارية",
    },
    badge: {
      en: "CRE Developer Transformation",
      ar: "التحول لمطور عقاري تجاري",
    },
    description: {
      en: "Leveraging 25 years of engineering mastery, TAFAWOK pivoted decisively into commercial real estate development — acquiring strategic land in New Cairo and regional hubs to master-plan high-yield office parks and retail destinations.",
      ar: "استثماراً لربع قرن من الريادة الإنشائية، عززت تفوق حضورها كمطور عقاري تجاري متكامل عبر حيازة أراضٍ استراتيجية بالتجمع الخامس والمحاور الإقليمية لبناء مجمعات إدارية وتجارية ذات عوائد استثمارية مستدامة.",
    },
    highlights: [
      {
        en: "Groundbreaking and construction of Building 360 Business Park in New Cairo",
        ar: "بدء تشييد مجمع مبنى 360 الإداري الفاخر بالتجمع الخامس",
      },
      {
        en: "Architectural planning for Tafawok Retail Center with European-style promenade",
        ar: "التخطيط المعماري لمركز تفوق التجاري بممشى ومطاعم مفتوحة",
      },
      {
        en: "Full integration of LEED Gold design criteria and energy-efficient BMS",
        ar: "تطبيق معايير LEED الذهبية وأنظمة إدارة المباني الذكية (BMS)",
      },
    ],
    scopeCategory: "commercial",
  },
  {
    year: "2022 – 2025",
    title: {
      en: "Portfolio Maturity & 77,500 m² Commercial Footprint",
      ar: "اكتمال محفظة الأصول التجارية بمساحة 77,500 م²",
    },
    badge: {
      en: "Triple Landmark Portfolio",
      ar: "تشغيل 3 أصول رائدة",
    },
    description: {
      en: "Successfully brought into full operation three landmark commercial developments totaling 77,500 m² of leasable area, housing tier-1 banking institutions, anchor hypermarkets, engineering consultancies, and logistics operators.",
      ar: "التشغيل الناجح والكامل لثلاثة مجمعات تجارية كبرى بإجمالي مساحة تأجيرية تبلغ 77,500 م²، تضم فروع بنوك رئيسية، وهايبر ماركت إقليمي، وشركات هندسية ومراكز لوجستية كبرى.",
    },
    highlights: [
      {
        en: "Building 360 reaching near-100% Grade-A executive office tenancy",
        ar: "تحقيق نسبة إشغال قياسية لمكاتب الشركات العالمية بمبنى 360",
      },
      {
        en: "Anchor agreement with Grand Hypermarket at Tafawok Retail Center",
        ar: "افتتاح الفرع الإقليمي الأكبر لجراند هايبر ماركت بمول تفوق",
      },
      {
        en: "Activation of 35,000 m² industrial showroom and trade complex at Logistics Park",
        ar: "تشغيل مجمع تفوق اللوجستي والتجاري بقوة تحمل أرضيات 7.5 طن/م²",
      },
    ],
    scopeCategory: "commercial",
  },
  {
    year: "2026 & Beyond",
    title: {
      en: "Next-Gen Sustainable CRE & Institutional Alliances",
      ar: "الجيل الجديد من العقارات المستدامة والشراكات المؤسسية",
    },
    badge: {
      en: "Future Horizon",
      ar: "آفاق المستقبل",
    },
    description: {
      en: "Expanding TAFAWOK's commercial holdings through solar micro-grid integration, smart asset telemetry, and tailored joint ventures with regional sovereign and private wealth partners seeking physical, tangible real estate yield.",
      ar: "مواصلة التوسع في الأصول التجارية المتطورة عبر دمج محطات الطاقة الشمسية، والأنظمة الذكية، وإبرام شراكات استثمارية مع كبرى المؤسسات والمستثمرين الباحثين عن عوائد حقيقية آمنة في أصول عقارية ملموسة.",
    },
    highlights: [
      {
        en: "Deployment of rooftop solar arrays providing auxiliary clean power",
        ar: "توليد الطاقة النظيفة من محطات شمسية على أسطح المجمعات التجارية",
      },
      {
        en: "Direct owner accessibility model removing leasing friction for prime tenants",
        ar: "نموذج التواصل المباشر مع المالك لتسهيل تعاقدات كبار المستأجرين",
      },
      {
        en: "Continuous adherence to Zero-Harm safety standards across all facilities",
        ar: "الالتزام الدائم بميثاق السلامة (صفر حوادث) في كافة المنشآت",
      },
    ],
    scopeCategory: "expansion",
  },
]

export const CORPORATE_VALUES: CorporateValue[] = [
  {
    id: "teamwork",
    number: "01",
    title: { en: "Teamwork", ar: "العمل الجماعي" },
    tagline: {
      en: "Harmonized multidisciplinary engineering execution",
      ar: "تناغم الكفاءات الهندسية والتنفيذية المتكاملة",
    },
    description: {
      en: "Cross-functional collaboration between structural engineers, MEP specialists, project managers, and on-site craftsmen to deliver flawless commercial developments.",
      ar: "تكامل وتناغم كامل بين مهندسي الإنشاءات والكهروميكانيك وإدارة المشروعات والفرق الميدانية لضمان دقة التنفيذ وتسليم الأصول التجارية بأعلى جودة.",
    },
    iconName: "users",
  },
  {
    id: "honesty",
    number: "02",
    title: { en: "Honesty & Integrity", ar: "النزاهة والأمانة المهنية" },
    tagline: {
      en: "Ethical foundation across all commercial partnerships",
      ar: "أساس أخلاقي راسخ في كافة المعاملات والشراكات",
    },
    description: {
      en: "Maintaining straightforward, principled interactions with tenants, co-investors, regulatory authorities, and supply chain partners with zero ambiguity.",
      ar: "التعامل بصدق ووضوح تام مع المستأجرين، والمستثمرين، والجهات الرقابية، وموردي المواد الصناعية دون أي مواربة أو التباس.",
    },
    iconName: "shield-check",
  },
  {
    id: "transparency",
    number: "03",
    title: { en: "Transparency", ar: "الشفافية المطلقة" },
    tagline: {
      en: "Open operational communication & verifiable data",
      ar: "وضوح تشغيلي وبيانات هندسية معلنة ودقيقة",
    },
    description: {
      en: "Complete visibility into architectural specifications, leasable area calculations, maintenance schedules, and commercial contract terms.",
      ar: "إتاحة كافة المواصفات الإنشائية، وحسابات المساحات التأجيرية الدقيقة، وجداول الصيانة، وبنود العقود التجارية بوضوح ومسؤولية كاملة.",
    },
    iconName: "eye",
  },
  {
    id: "credibility",
    number: "04",
    title: { en: "Credibility", ar: "المصداقية والوفاء بالعهود" },
    tagline: {
      en: "Delivering precisely what is promised without compromise",
      ar: "تسليم ما وعدنا به تماماً وبأعلى درجات الانضباط",
    },
    description: {
      en: "Honoring every structural guarantee, technical parameter, and handover timeline agreed upon with clients and institutional tenants.",
      ar: "الالتزام التام بكافة التعهدات الإنشائية، والمعايير الفنية، ومواعيد التسليم المتفق عليها مع العملاء والشركاء التجاريين.",
    },
    iconName: "award",
  },
  {
    id: "responsibility",
    number: "05",
    title: {
      en: "Institutional Responsibility",
      ar: "المسؤولية المؤسسية والمجتمعية",
    },
    tagline: {
      en: "Total ownership of safety, structural integrity & environment",
      ar: "تحمل المسؤولية الكاملة عن السلامة والبيئة والمجتمع",
    },
    description: {
      en: "Assuming deep accountability for occupant safety, occupational health, carbon reduction, and the enduring civic impact of our commercial hubs.",
      ar: "تحمل كامل المسؤولية عن سلامة رواد مجمعاتنا، وصحة العاملين، وتقليل الأثر البيئي، وتقديم أصول تفخر بها المجتمعات العمرانية.",
    },
    iconName: "landmark",
  },
  {
    id: "commitment",
    number: "06",
    title: { en: "Relentless Commitment", ar: "الالتزام الراسخ والمستمر" },
    tagline: {
      en: "End-to-end dedication throughout the asset lifecycle",
      ar: "تفانٍ مستمر عبر كافة مراحل دورة حياة الأصل العقاري",
    },
    description: {
      en: "Unwavering stewardship from initial foundation pouring through ongoing facility management, tenant relations, and multi-decade asset upkeep.",
      ar: "استمرار الرعاية والالتزام من وضع الأساسات الخرسانية إلى الإدارة اليومية للمرافق، وعلاقات المستأجرين، والصيانة الدورية المستدامة.",
    },
    iconName: "compass",
  },
  {
    id: "hard-work",
    number: "07",
    title: {
      en: "Engineering Rigor & Hard Work",
      ar: "الاجتهاد والانضباط الهندسي",
    },
    tagline: {
      en: "Disciplined hands-on execution on every job site",
      ar: "عمل ميداني دؤوب وانضباط هندسي صارم في كل موقع",
    },
    description: {
      en: "Hands-on engineering scrutiny, rigorous on-site quality controls, and proactive problem-solving to ensure our buildings perform flawlessly under all conditions.",
      ar: "إشراف هندسي ميداني مباشر، وفحوصات جودة صارمة، وتفانٍ في مواجهة التحديات لضمان أداء المبنى بأعلى كفاءة في أصعب الظروف التشغيلية.",
    },
    iconName: "hard-hat",
  },
]

export const HSE_CHARTER: HseCharter = {
  policyStatement: {
    en: "TAFAWOK aims to achieve the highest standards of Health, Safety and Environment by incorporating the principles of sustainable improvement throughout its business activities. Every employee shares in the commitment to eliminate unsafe acts and conditions by thinking safely and acting safely at all times.",
    ar: "تهدف شركة تفوق إلى تحقيق أعلى معايير الصحة والسلامة المهنية والبيئة من خلال ترسيخ مبادئ التحسين المستمر في جميع أنشطتها وأعمالها. ويشارك كل فرد في مؤسستنا في الالتزام بالقضاء على الممارسات غير الآمنة والظروف الخطرة عبر التفكير الآمن والعمل الواعي في كل الأوقات.",
  },
  signatory: {
    name: { en: "TAFAWOK Executive Leadership", ar: "القيادة التنفيذية لتفوق" },
    role: {
      en: "Corporate HSE & Quality Stewardship",
      ar: "إدارة الجودة والسلامة والصحة المهنية",
    },
  },
  principles: [
    {
      id: "zero-harm",
      title: {
        en: "Zero Accidents Target",
        ar: "مستهدف صفر حوادث مهنية",
      },
      description: {
        en: "Striving for an accident-free workplace across all commercial properties and construction sites by adhering strictly to national regulations and international OSHA standards.",
        ar: "العمل الدائم على توفير بيئة عمل خالية تماماً من الحوادث والإصابات في كافة الأصول والمواقع بالالتزام التام باللوائح المحلية ومعايير OSHA الدولية.",
      },
      standardCode: "OSHA Compliant",
    },
    {
      id: "hazard-id",
      title: {
        en: "Systematic Hazard Identification & JSA",
        ar: "تحديد المخاطر وتحليل سلامة العمل (JSA)",
      },
      description: {
        en: "Proactively identifying, assessing, and mitigating risks prior to every high-load or complex task through systematic Job Safety Analysis and site risk registers.",
        ar: "فحص وتقييم المخاطر مسبقاً قبل تنفيذ أي أعمال إنشائية أو تشغيلية من خلال إعداد بطاقات تحليل سلامة العمل (JSA) والمتابعة الميدانية الدقيقة.",
      },
      standardCode: "ISO 45001",
    },
    {
      id: "environmental",
      title: {
        en: "Environmental Preservation & Waste Control",
        ar: "حماية البيئة والحد من المخلفات",
      },
      description: {
        en: "Preventing environmental contamination, minimizing site construction waste, integrating solar power, and safeguarding natural resources across all facilities.",
        ar: "منع التلوث البيئي، وتقليل مخلفات البناء، واستخدام محطات الطاقة النظيفة، وترشيد استهلاك الموارد الطبيعية في كافة المنشآت.",
      },
      standardCode: "ISO 14001",
    },
    {
      id: "mock-drills",
      title: {
        en: "Mandatory Emergency Drills & Training",
        ar: "محاكاة الطوارئ والتدريب المستمر",
      },
      description: {
        en: "Conducting regular emergency mock evacuation drills and continuous competency training so that personnel and tenants respond swiftly and decisively in contingencies.",
        ar: "إجراء تدريبات إخلاء وهمية دورية وتدريب الكوادر البشرية على خطط الطوارئ لضمان استجابة سريعة وآمنة عند أي طارئ.",
      },
      standardCode: "Emergency Response",
    },
    {
      id: "incident-prevention",
      title: {
        en: "Root-Cause Incident Prevention",
        ar: "التحقيق الجذري ومنع تكرار الحوادث",
      },
      description: {
        en: "Analyzing all near-misses and minor incidents through structured root-cause analysis to implement corrective safeguards before issues can escalate.",
        ar: "التحقيق الشامل في أي حادث عرضي أو وشيك للوصول إلى الأسباب الجذرية ووضع حلول وقائية هندسية تمنع تكرارها نهائياً.",
      },
      standardCode: "Continuous Improvement",
    },
    {
      id: "universal-responsibility",
      title: {
        en: "Universal Safety Responsibility",
        ar: "المسؤولية المشتركة وثقافة السلامة",
      },
      description: {
        en: "Fostering an inclusive culture where every team member has the absolute authority and obligation to halt any unsafe work without reprisal.",
        ar: "ترسيخ ثقافة السلامة التي تمنح كل عامل ومهندس الصلاحية الكاملة لإيقاف أي عمل غير آمن فوراً لضمان سلامة الجميع.",
      },
      standardCode: "Safety Culture",
    },
  ],
  standards: [
    {
      name: "Quality Management",
      code: "ISO 9001:2015",
      description: {
        en: "Certified institutional quality management across construction, procurement, and asset administration.",
        ar: "نظام إدارة الجودة المعتمد دولياً في عمليات المقاولات والتوريدات وإدارة الأصول العقارية.",
      },
    },
    {
      name: "Occupational Health & Safety",
      code: "ISO 45001:2018",
      description: {
        en: "International benchmark for on-site occupational safety, hazard mitigation, and worker protection.",
        ar: "المعيار العالمي لإدارة الصحة والسلامة المهنية وحماية العاملين ورواد المنشآت.",
      },
    },
    {
      name: "Environmental Stewardship",
      code: "ISO 14001:2015",
      description: {
        en: "Certified environmental management ensuring sustainable waste minimization and resource efficiency.",
        ar: "معايير الإدارة البيئية المعتمدة لتقليل الانبعاثات وإدارة المخلفات وترشيد استهلاك الطاقة.",
      },
    },
    {
      name: "Fire Protection Standards",
      code: "NFPA-13 / NFPA-72",
      description: {
        en: "National Fire Protection Association compliance across commercial sprinkler grids and early warning systems.",
        ar: "مطابقة تامة للمواصفات الدولية لمكافحة الحرائق وشبكات المرشات التلقائية والإنذار المبكر.",
      },
    },
  ],
}

export const CRE_INVESTMENT_THESIS: InvestmentPillar[] = [
  {
    id: "arterial-location",
    number: "01",
    title: {
      en: "Strategic Arterial Connectivity",
      ar: "الموقع الاستراتيجي والاتصال بالمحاور الحيوية",
    },
    tagline: {
      en: "Prime nodes with zero compromise on accessibility",
      ar: "مواقع حيوية تضمن سهولة الوصول التام دون عوائق",
    },
    description: {
      en: "TAFAWOK exclusively selects commercial land situated on primary regional transport corridors and high-volume interchanges, ensuring corporate tenants and retail visitors benefit from frictionless connectivity.",
      ar: "تختار تفوق بعناية فائقة أراضيها التجارية على المحاور الإقليمية السريعة والتقاطعات الرئيسية لضمان سهولة وانسيابية وصول الموظفين ورواد الأعمال والمتسوقين.",
    },
    metric: {
      value: "100%",
      label: {
        en: "Arterial Highway Access",
        ar: "اتصال مباشر بالمحاور الرئيسية",
      },
    },
  },
  {
    id: "engineered-longevity",
    number: "02",
    title: {
      en: "Engineering Over-Specification & Longevity",
      ar: "المتانة الإنشائية والوفرة الكهروميكانيكية",
    },
    tagline: {
      en: "Built to institutional EPC standards, not speculative minimums",
      ar: "مبانٍ مشيدة بمعايير المقاولات الكبرى لا بالحدود الدنيا للمضاربة",
    },
    description: {
      en: "We over-engineer our commercial assets with N+1 backup power generators, VRF/HEPA central climate systems, heavy floor loads (up to 7.5 tons/m²), and optical fiber backbones to guarantee 100% tenant operational uptime.",
      ar: "نرفع المواصفات الفنية لمجمعاتنا لتشمل مولدات طاقة احتياطية N+1، وتكييفات مركزية موفرة للطاقة، وأرضيات فائقة التحمل حتى 7.5 طن/م² لضمان استمرارية تشغيل بنسبة 100%.",
    },
    metric: {
      value: "100%",
      label: {
        en: "Power & MEP Redundancy",
        ar: "تغطية كهربائية وهندسية احتياطية",
      },
    },
  },
  {
    id: "tenant-magnetism",
    number: "03",
    title: {
      en: "Tenant Magnetism & Anchor Tenancy",
      ar: "مغناطيسية جذب المستأجرين والشركاء الرئيسيين",
    },
    tagline: {
      en: "Master-planned ecosystems that foster high footfall & synergy",
      ar: "بيئات عمل وتسوق متكاملة تحقق أعلى معدلات الإقبال والتناغم",
    },
    description: {
      en: "By securing Tier-1 institutional anchors—from Grand Hypermarket to leading national banks—we build self-reinforcing commercial environments that sustain high occupancy, tenant profitability, and long-term lease retention.",
      ar: "من خلال استقطاب كبرى المؤسسات المصرفية وسلاسل الهايبر ماركت العالمية، نصنع بيئة تجارية ذات تدفق زوار مستمر تضمن ربحية المستأجرين واستقرار عقود الإيجار طويلة الأجل.",
    },
    metric: {
      value: "95%+",
      label: {
        en: "Target Commercial Occupancy",
        ar: "نسبة الإشغال التجاري المستهدفة",
      },
    },
  },
  {
    id: "generational-equity",
    number: "04",
    title: {
      en: "Generational Equity vs Speculation",
      ar: "بناء أصول حقيقية للأجيال بدلاً من المضاربة",
    },
    tagline: {
      en: "Long-term ownership alignment with continuous stewardship",
      ar: "علاقة استثمارية طويلة المدى قائمة على الرعاية المستمرة للأصل",
    },
    description: {
      en: "TAFAWOK develops as a permanent asset owner and operator, not a rapid-turnover broker. Our capital is directly aligned with the structural health, continuous maintenance, and compounding capital appreciation of every development.",
      ar: "تطور تفوق أصولها كمالك ومشغل دائم وليس كمسوق عابر. رؤوس أموالنا مستثمرة مباشرة في جودة المنشآت وصيانتها المستمرة، مما يضمن تعاظم قيمتها الرأسمالية عبر الأجيال.",
    },
    metric: {
      value: "25+ Yrs",
      label: {
        en: "Long-Term Stewardship Horizon",
        ar: "أفق الرعاية الاستثمارية المستدامة",
      },
    },
  },
]

export const CEO_PROFILE: CeoProfile = {
  name: {
    en: "TAFAWOK Executive Leadership",
    ar: "القيادة التنفيذية لتفوق",
  },
  role: {
    en: "Commercial Real Estate Stewardship & Development",
    ar: "رعاية وتطوير الأصول العقارية التجارية",
  },
  company: {
    en: "TAFAWOK Real Estate Investment & Contracting Company",
    ar: "شركة تفوق للاستثمار العقاري والمقاولات",
  },
  education: {
    en: "Institutional Engineering Cadre & Regional Megaprojects Directorate",
    ar: "كادر هندسي مؤسسي متخصص في الإشراف على المشروعات الإقليمية الكبرى",
  },
  experienceYears: 25,
  regionalHeritageDecades: 5,
  formalAddress: {
    salutation: {
      en: "Honorable Partners, Valued Tenants, and Prospective Investors,",
      ar: "شركاءنا الكرام، مستأجرينا الأعزاء، والمستثمرين الأفاضل،",
    },
    opening: {
      en: "Our clients are our major asset, their satisfaction is our main objective.",
      ar: "عملاؤنا هم أصلنا الأكبر، ورضاهم هو غايتنا الأولى.",
    },
    paragraphs: [
      {
        en: "TAFAWOK was established with a clear, unwavering vision: to actively participate in the development and economic booming of Egypt by delivering professional, enduring, and high-quality commercial real estate assets.",
        ar: "تأسست شركة تفوق برؤية واضحة وراسخة: المشاركة الفعالة في النهضة التنموية والعمرانية التي تشهدها مصر، عبر تقديم أصول عقارية تجارية وهندسية متكاملة تتميز بأعلى درجات الاحترافية والاستدامة.",
      },
      {
        en: "Rooted in five decades of core executive heritage in the Arabian Gulf, we brought home the rigorous standards of multinational oil, gas, and heavy infrastructure engineering. When we develop a commercial business park, a retail mall, or a trade complex, we do not view it merely as concrete and glass. We view it as an operational platform for business longevity, enterprise growth, and generational wealth creation.",
        ar: "انطلاقاً من خمسة عقود من الخبرة التنفيذية المتواصلة في الخليج العربي، نقلنا إلى مصر المعايير الصارمة المعمول بها في كبرى مشروعات الطاقة والبنية التحتية العالمية. وحينما نطور مجمعاً إدارياً أو مركزاً تجارياً أو منطقة لوجستية، فإننا لا ننظر إليها كخرسانة ومبانٍ، بل نراها منصة حيوية لنمو الأعمال، وازدهار الشركات، وصناعة قيمة استثمارية حقيقية تمتد للأجيال.",
      },
      {
        en: "We take immense pride in our directly sponsored workforce of more than 50 specialized engineers and technical personnel. Unlike developers who subcontract their responsibilities away, TAFAWOK maintains direct executive command over structural execution, precision MEP systems, safety protocols, and daily facility operations.",
        ar: "نعتز كثيراً بكادرنا الهندسي والفني الدائم الذي يتجاوز 50 مهندساً واستشارياً متخصصاً. وخلافاً للعديد من المطورين، تحتفظ تفوق بإشراف هندسي وتنفيذي مباشر على كافة تفاصيل الإنشاءات، والأنظمة الكهروميكانيكية، ومعايير السلامة، والإدارة اليومية للمرافق.",
      },
      {
        en: "In an era of rapid market speculation, our pledge remains steadfast: absolute credibility, physical engineering integrity, and an open executive door. TAFAWOK's executive team and direct communications desk are accessible to every major partner and prospective tenant who shares our belief in building enduring value.",
        ar: "وفي عصر تتسارع فيه المضاربات العقارية، يبقى عهدنا ثابتاً لا يتزعزع: مصداقية مطلقة، متانة إنشائية فائقة، وأبواب تنفيذية مفتوحة دائماً. وتضع شركة تفوق قنوات اتصالها المباشرة ومكاتبها التنفيذية في خدمة كل شريك ومستأجر يشاركنا الإيمان بصناعة القيمة الحقيقية المستدامة.",
      },
    ],
    closing: {
      en: "We welcome you to explore TAFAWOK's commercial developments and join us in shaping the architectural and commercial future of Egypt.",
      ar: "يسعدنا ويشرفنا دائماً الترحيب بكم في مجمعات تفوق التجارية، لنبني معاً مستقبلاً تجارياً ومعمارياً متميزاً في مصر.",
    },
  },
  strategicDoctrine: {
    title: {
      en: "Three Pillars of Executive Leadership",
      ar: "الركائز الثلاث للقيادة التنفيذية",
    },
    subtitle: {
      en: "The operational philosophy governing every commercial decision at TAFAWOK",
      ar: "الفلسفة التشغيلية التي تحكم كل قرار استثماري وهندسي في شركة تفوق",
    },
    pillars: [
      {
        number: "01",
        title: {
          en: "Tangible Asset Value Over Paper Speculation",
          ar: "القيمة الملموسة للأصل بدلاً من المضاربة الورقية",
        },
        description: {
          en: "Commercial real estate must be backed by real tenant footfall, heavy structural specifications, and sustainable rental cash flow, never illusory marketing hype.",
          ar: "العقارات التجارية يجب أن تقوم على حركة فعلية للزوار، ومواصفات إنشائية فائقة، وتدفقات نقدية تأجيرية مستدامة، بعيداً عن الوعود التسويقية غير الواقعية.",
        },
      },
      {
        number: "02",
        title: {
          en: "In-House Engineering Cadre & Direct Oversight",
          ar: "كادر هندسي دائم ورقابة تنفيذية مباشرة",
        },
        description: {
          en: "Directly employing our core technical specialists ensures zero compromise on MEP quality, LEED standards, structural safety, or handover timelines.",
          ar: "الاعتماد على فريقنا الهندسي الدائم يضمن الالتزام الصارم بجودة الأعمال الكهروميكانيكية، ومعايير السلامة، ودقة مواعيد التسليم دون تهاون.",
        },
      },
      {
        number: "03",
        title: {
          en: "Open Executive Door: Direct Corporate Accountability",
          ar: "الباب التنفيذي المفتوح: مسؤولية قيادية مباشرة",
        },
        description: {
          en: "Corporate red tape has no place at TAFAWOK. Major tenants, anchor partners, and institutional investors communicate directly with TAFAWOK Executive Leadership to ensure decisive decisions and steadfast execution.",
          ar: "لا مكان للبيروقراطية في تفوق. كبار المستأجرين والشركاء الاستثماريين يتواصلون مباشرة مع القيادة التنفيذية لتفوق لضمان سرعة القرار وثبات الالتزام التنفيذي.",
        },
      },
    ],
  },
  careerMilestones: [
    {
      period: "1990s",
      role: {
        en: "Project Director & Infrastructure Specialist",
        ar: "مدير مشروعات وخبير بنية تحتية",
      },
      scope: {
        en: "Arabian Gulf Mega-Infrastructure (Kuwait, KSA, UAE)",
        ar: "مشروعات البنية التحتية الكبرى بالخليج العربي (الكويت، السعودية، الإمارات)",
      },
      highlight: {
        en: "Led civil and piping execution for strategic fresh-water reservoir complexes and petrochemical installations.",
        ar: "قيادة الأعمال المدنية وتوريدات الأنابيب لمجمعات خزانات المياه الاستراتيجية ومنشآت البتروكيماويات.",
      },
    },
    {
      period: "2000",
      role: {
        en: "Founding & Strategic Direction",
        ar: "التأسيس والتوجه الاستراتيجي",
      },
      scope: {
        en: "TAFAWOK Real Estate Investment & Contracting (Cairo, Egypt)",
        ar: "شركة تفوق للاستثمار العقاري والمقاولات (القاهرة، مصر)",
      },
      highlight: {
        en: "Established the enterprise in Cairo, building an elite 50+ engineer team and securing Tier-1 contracting credentials.",
        ar: "تأسيس الشركة بالقاهرة وبناء فريق هندسي نخبوي والحصول على تصنيف المقاولات والاستثمار من الفئة الأولى.",
      },
    },
    {
      period: "2012",
      role: {
        en: "Executive Lead — Institutional EPC Contracts",
        ar: "القيادة التنفيذية لمقاولات المشروعات القومية",
      },
      scope: {
        en: "Kuwait MOH Adan Hospital & Egypt GAEB National Video Network",
        ar: "توسعة مستشفى العدان بالكويت وشبكة الفيديو كونفرانس القومية بمصر",
      },
      highlight: {
        en: "Supervised high-precision medical cleanroom HVAC and nationwide ICT infrastructure handovers.",
        ar: "الإشراف المباشر على تجهيز المستشفيات التخصصية وبنية الاتصالات القومية المتطورة.",
      },
    },
    {
      period: "2018 – Present",
      role: {
        en: "Master Developer & Commercial Real Estate Steward",
        ar: "المطور الرئيسي وراعي الأصول العقارية التجارية",
      },
      scope: {
        en: "64,500 m² Prime Commercial Portfolio (Nasr City, El Shorouk & 6th of October)",
        ar: "محفظة الأصول التجارية بمساحة 64,500 م² (مدينة نصر، الشروق، و6 أكتوبر)",
      },
      highlight: {
        en: "Spearheading development and management of Fagala Plaza, Mall ChillOut El Shorouk, and October Festival Mall.",
        ar: "قيادة تطوير وتشغيل مجمع فجالة بلازا بمدينة نصر، ومول شل أوت الشروق، ومول أكتوبر فيستيفال.",
      },
    },
  ],
  directReach: OWNER_DETAILS,
}

export const DEFAULT_HOMEPAGE_SETTINGS: HomepageSettings = {
  hero: {
    headline: {
      en: "Commercial Real Estate Developed for Generational Permanence",
      ar: "أصول تجارية مطورة للبقاء والنمو عبر الأجيال",
    },
    subheadline: {
      en: "Institutional CRE developer and turnkey engineering contractor. Delivering prime office developments, destination retail hubs, and critical infrastructure across Egypt with 25+ years of uncompromised execution.",
      ar: "مطور رائد للمشروعات التجارية الكبرى ومقاولات تسليم المفتاح. نبتكر ونشيد مجمعات المكاتب الذكية، والمراكز التجارية المتكاملة، والبنية التحتية الحيوية في مصر بسجل حافل يمتد لأكثر من 25 عاماً من الريادة الهندسية.",
    },
    ctaText: {
      en: "Explore Commercial Portfolio",
      ar: "استكشف محفظة المشروعات",
    },
    credentials: [
      {
        label: {
          en: "3 Flagship Commercial Assets",
          ar: "3 أصول تجارية كبرى مملوكة",
        },
        iconName: "Building2",
      },
      {
        label: {
          en: "25+ Years Proven Track Record",
          ar: "سجل إنجاز يمتد لـ 25+ عاماً",
        },
        iconName: "ShieldCheck",
      },
      {
        label: {
          en: "64,500+ m² Commercial GLA",
          ar: "مساحات تأجير تفوق 64,500 م²",
        },
        iconName: "TrendingUp",
      },
    ],
  },
  showcase: {
    sectionTitle: {
      en: "Commercial Architecture at Institutional Scale",
      ar: "مساحات تجارية بحجم طموحك المؤسسي",
    },
    sectionSubtitle: {
      en: "Scroll down to expand the stage and explore Mall Chillout Alshrouk in New Cairo / Al Shrouk",
      ar: "مرر لفتح المشهد المعماري بالكامل واكتشاف تفاصيل صرح مول تشيل أوت الشروق في الشروق / القاهرة الجديدة",
    },
    imageUrl: "/MallChilloutAlshrouk/IMG_5918.webp",
    propertySlug: "mall-chillout-el-shorouk",
    badge: {
      en: "Suez Road, New Cairo / Al Shrouk",
      ar: "طريق السويس، القاهرة الجديدة / الشروق",
    },
    title: {
      en: "Mall Chillout Alshrouk",
      ar: "مول تشيل أوت الشروق",
    },
    description: {
      en: "Premier commercial and retail destination on the Suez Road artery. 24,000 m² GLA engineered for high footfall, tier-1 retail brands, and integrated business services.",
      ar: "وجهة تجارية وترفيهية متكاملة على شريان طريق السويس الحيوي. مساحة تأجيرية تبلغ 24,000 م² مجهزة لاستقطاب كبرى العلامات العالمية والخدمات المؤسسية بأعلى كثافة إقبال.",
    },
    stats: {
      gla: {
        label: { en: "GLA", ar: "المساحة التأجيرية" },
        value: "24,000 m²",
      },
      bua: {
        label: { en: "BUA", ar: "المساحة الإجمالية" },
        value: "38,500 m²",
      },
      parking: {
        label: { en: "Parking Capacity", ar: "مواقف السيارات" },
        value: "450+ Vehicles",
      },
    },
    ctaText: {
      en: "View Property Details",
      ar: "استعراض تفاصيل الصرح",
    },
  },
}
