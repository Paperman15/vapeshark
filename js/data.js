/* ==========================================================================
   VAPE SHARK — данные магазина и каталога
   Контакты — в SITE, категории — в CATEGORIES, товары — в PRODUCTS.
   Ассортимент и цены — из списка магазина; при изменениях правьте только PRODUCTS.
   ========================================================================== */

const SITE = {
  name: 'Vape Shark',
  tagline: 'Вейп-шоп в Тюмени',
  city: 'Тюмень',
  address: 'ул. Восстания, 13',
  addressFull: 'г. Тюмень, ул. Восстания, 13, 1 этаж',
  hours: 'Ежедневно с 10:00 до 21:00',
  phone: '+7 (961) 201-77-23',
  phoneRaw: '+79612017723',
  phoneHref: 'tel:+79612017723',
  whatsapp: 'https://wa.me/79612017723',
  telegram: '', // например 'https://t.me/vapeshark72' — кнопка появится автоматически
  vk: 'https://vk.com/vapeshark72',
  vkClub: 'https://vk.ru/club217717728',
  mapLink: 'https://yandex.ru/maps/?text=%D0%A2%D1%8E%D0%BC%D0%B5%D0%BD%D1%8C%2C%20%D1%83%D0%BB%D0%B8%D1%86%D0%B0%20%D0%92%D0%BE%D1%81%D1%81%D1%82%D0%B0%D0%BD%D0%B8%D1%8F%2C%2013',
  mapEmbed: 'https://yandex.ru/map-widget/v1/?text=%D0%A2%D1%8E%D0%BC%D0%B5%D0%BD%D1%8C%2C%20%D1%83%D0%BB%D0%B8%D1%86%D0%B0%20%D0%92%D0%BE%D1%81%D1%81%D1%82%D0%B0%D0%BD%D0%B8%D1%8F%2C%2013&z=16'
};

const CATEGORIES = [
  {
    id: 'disposable',
    name: 'Одноразки',
    full: 'Одноразовые устройства',
    art: 'assets/art/disposable.svg',
    short: 'Готово к работе из коробки: зарядил — и парь.'
  },
  {
    id: 'pod',
    name: 'POD-системы',
    full: 'POD-системы и стартовые комплекты',
    art: 'assets/art/pod.svg',
    short: 'Стартовые комплекты с картриджами под смену.'
  },
  {
    id: 'liquid',
    name: 'Жидкости',
    full: 'Жидкости',
    art: 'assets/art/liquid.svg',
    short: 'Соль 20 мг и классика в больших флаконах.'
  },
  {
    id: 'coil',
    name: 'Картриджи и испарители',
    full: 'Картриджи и испарители',
    art: 'assets/art/coil.svg',
    short: 'Расходники к XROS, Pasito, Aegis и другим.'
  },
  {
    id: 'pouch',
    name: 'Паучи',
    full: 'Никотиновые паучи',
    art: 'assets/art/pouch.svg',
    short: 'Бестабачные саше: FAFF, KASTA, Loop.'
  }
];

const PRODUCTS = [
  /* ==================== POD-СИСТЕМЫ ==================== */
  {
    id: 'geekvape-aegis-hero-5-red',
    art: 'assets/art/pod-mod.svg',
    brand: 'GEEK VAPE',
    name: 'Aegis Hero 5',
    category: 'pod',
    price: 3800,
    badges: [],
    meta: 'стартовый комплект · красный',
    desc: 'Стартовый комплект Geek Vape Aegis Hero 5 в красном цвете. Расходники Geek Vape есть в разделе «Картриджи и испарители». Наличие и комплектацию уточняйте в WhatsApp.',
    specs: [
      ['Тип', 'стартовый комплект (POD-система)'],
      ['Цвет', 'красный'],
      ['Бренд', 'Geek Vape']
    ],
    tags: ['pod', 'стартовый комплект', 'aegis', 'geek vape', 'красный']
  },
  {
    id: 'vaporesso-xros-5-mini-blue',
    brand: 'VAPORESSO',
    name: 'XROS 5 Mini',
    category: 'pod',
    price: 3000,
    badges: [],
    meta: 'стартовый комплект · Flowing Blue',
    desc: 'Стартовый комплект Vaporesso XROS 5 Mini в расцветке Flowing Blue. Картриджи XROS — в разделе расходников. Наличие и комплектацию уточняйте в WhatsApp.',
    specs: [
      ['Тип', 'стартовый комплект (POD-система)'],
      ['Цвет', 'Flowing Blue'],
      ['Бренд', 'Vaporesso']
    ],
    tags: ['pod', 'xros', 'стартовый комплект', 'vaporesso', 'синий']
  },
  {
    id: 'vaporesso-xros-4-mini-pink',
    brand: 'VAPORESSO',
    name: 'XROS 4 Mini',
    category: 'pod',
    price: 2700,
    badges: [],
    meta: 'стартовый комплект · Ice Pink',
    desc: 'Стартовый комплект Vaporesso XROS 4 Mini в расцветке Ice Pink. Картриджи XROS — в разделе расходников. Наличие и комплектацию уточняйте в WhatsApp.',
    specs: [
      ['Тип', 'стартовый комплект (POD-система)'],
      ['Цвет', 'Ice Pink'],
      ['Бренд', 'Vaporesso']
    ],
    tags: ['pod', 'xros', 'стартовый комплект', 'vaporesso', 'розовый']
  },
  {
    id: 'vaporesso-xros-5-black-leather',
    art: 'assets/art/pod-mod.svg',
    brand: 'VAPORESSO',
    name: 'XROS 5',
    category: 'pod',
    price: 3500,
    badges: [],
    meta: 'стартовый комплект · Black Leather',
    desc: 'Стартовый комплект Vaporesso XROS 5 в расцветке Black Leather. Картриджи XROS — в разделе расходников. Наличие и комплектацию уточняйте в WhatsApp.',
    specs: [
      ['Тип', 'стартовый комплект (POD-система)'],
      ['Цвет', 'Black Leather'],
      ['Бренд', 'Vaporesso']
    ],
    tags: ['pod', 'xros', 'стартовый комплект', 'vaporesso', 'чёрный']
  },
  {
    id: 'vaporesso-xros-6-mini-titanium',
    brand: 'VAPORESSO',
    name: 'XROS 6 Mini',
    category: 'pod',
    price: 3200,
    badges: [],
    meta: 'стартовый комплект · Titanium Black',
    desc: 'Стартовый комплект Vaporesso XROS 6 Mini в расцветке Titanium Black. Картриджи XROS — в разделе расходников. Наличие и комплектацию уточняйте в WhatsApp.',
    specs: [
      ['Тип', 'стартовый комплект (POD-система)'],
      ['Цвет', 'Titanium Black'],
      ['Бренд', 'Vaporesso']
    ],
    tags: ['pod', 'xros', 'стартовый комплект', 'vaporesso', 'титан']
  },
  {
    id: 'vaporesso-xros-6-cosmic',
    art: 'assets/art/pod-mod.svg',
    brand: 'VAPORESSO',
    name: 'XROS 6',
    category: 'pod',
    price: 3700,
    badges: [],
    meta: 'стартовый комплект · Cosmic Black',
    desc: 'Стартовый комплект Vaporesso XROS 6 в расцветке Cosmic Black. Картриджи XROS — в разделе расходников. Наличие и комплектацию уточняйте в WhatsApp.',
    specs: [
      ['Тип', 'стартовый комплект (POD-система)'],
      ['Цвет', 'Cosmic Black'],
      ['Бренд', 'Vaporesso']
    ],
    tags: ['pod', 'xros', 'стартовый комплект', 'vaporesso', 'чёрный']
  },
  {
    id: 'smoant-pasito-2-carbon',
    art: 'assets/art/pod-mod.svg',
    brand: 'SMOANT',
    name: 'Pasito II 2500 мА·ч',
    category: 'pod',
    price: 3800,
    badges: [],
    meta: 'стартовый комплект · Carbon Fiber',
    desc: 'Стартовый комплект Smoant Pasito II с аккумулятором 2500 мА·ч в расцветке Carbon Fiber. Испарители K-серии и P-серии — в разделе расходников. Наличие уточняйте в WhatsApp.',
    specs: [
      ['Тип', 'стартовый комплект (POD-система)'],
      ['Аккумулятор', '2500 мА·ч'],
      ['Цвет', 'Carbon Fiber'],
      ['Бренд', 'Smoant']
    ],
    tags: ['pod', 'pasito', 'стартовый комплект', 'smoant', 'карбон', '2500']
  },

  /* ==================== ОДНОРАЗКИ ==================== */
  {
    id: 'lost-mary-bm-16000',
    brand: 'LOST MARY',
    name: 'BM 16000',
    category: 'disposable',
    price: 2200,
    badges: [],
    meta: '16 000 затяжек · виноград-клюква',
    desc: 'Одноразовое устройство LOST MARY BM 16000 со вкусом виноград-клюква. Не требует заправки и обслуживания — готово к работе из коробки.',
    specs: [
      ['Тип', 'одноразовое устройство'],
      ['Ресурс', 'до 16 000 затяжек'],
      ['Вкус', 'виноград-клюква']
    ],
    tags: ['одноразка', 'lost mary', 'виноград', 'клюква', '16000']
  },
  {
    id: 'waka-sopro-extra-20000',
    brand: 'WAKA',
    name: 'Sopro Extra 20000',
    category: 'disposable',
    price: 2400,
    badges: [],
    meta: '20 000 затяжек · арбуз-малина',
    desc: 'Одноразовое устройство WAKA Sopro Extra 20000 со вкусом арбуз-малина. Не требует заправки и обслуживания.',
    specs: [
      ['Тип', 'одноразовое устройство'],
      ['Ресурс', 'до 20 000 затяжек'],
      ['Вкус', 'арбуз-малина']
    ],
    tags: ['одноразка', 'waka', 'арбуз', 'малина', '20000']
  },
  {
    id: 'puffmi-dura-v2-9000',
    brand: 'PUFFMI',
    name: 'Dura V2 9000',
    category: 'disposable',
    price: 2000,
    badges: [],
    meta: '9 000 затяжек · мята',
    desc: 'Одноразовое устройство PuffMi Dura V2 9000 со вкусом мяты. Не требует заправки и обслуживания.',
    specs: [
      ['Тип', 'одноразовое устройство'],
      ['Ресурс', 'до 9 000 затяжек'],
      ['Вкус', 'мята']
    ],
    tags: ['одноразка', 'puffmi', 'мята', '9000']
  },
  {
    id: 'vozol-gear-power-20000',
    brand: 'VOZOL',
    name: 'Gear Power 20000',
    category: 'disposable',
    price: 2000,
    badges: [],
    meta: '20 000 затяжек · двойное яблоко лёд',
    desc: 'Одноразовое устройство VOZOL Gear Power 20000 со вкусом двойное яблоко лёд. Не требует заправки и обслуживания.',
    specs: [
      ['Тип', 'одноразовое устройство'],
      ['Ресурс', 'до 20 000 затяжек'],
      ['Вкус', 'двойное яблоко, лёд']
    ],
    tags: ['одноразка', 'vozol', 'яблоко', 'лёд', '20000']
  },

  /* ==================== КАРТРИДЖИ И ИСПАРИТЕЛИ ==================== */
  {
    id: 'vaporesso-xros-pod-06-2ml',
    brand: 'VAPORESSO',
    name: 'Картридж XROS 0,6 Ом, 2 мл',
    category: 'coil',
    price: 380,
    badges: [],
    meta: 'картридж · 0,6 Ом · 2 мл',
    desc: 'Сменный картридж для POD-систем Vaporesso XROS. Сопротивление 0,6 Ом, объём 2 мл. Продаётся поштучно.',
    specs: [
      ['Тип', 'картридж'],
      ['Совместимость', 'Vaporesso XROS'],
      ['Сопротивление', '0,6 Ом'],
      ['Объём', '2 мл'],
      ['Упаковка', '1 шт']
    ],
    tags: ['картридж', 'xros', 'vaporesso', '0,6', '2 мл']
  },
  {
    id: 'vaporesso-xros-pod-06-3ml',
    brand: 'VAPORESSO',
    name: 'Картридж XROS 0,6 Ом, 3 мл',
    category: 'coil',
    price: 380,
    badges: [],
    meta: 'картридж · 0,6 Ом · 3 мл',
    desc: 'Сменный картридж для POD-систем Vaporesso XROS. Сопротивление 0,6 Ом, увеличенный объём 3 мл. Продаётся поштучно.',
    specs: [
      ['Тип', 'картридж'],
      ['Совместимость', 'Vaporesso XROS'],
      ['Сопротивление', '0,6 Ом'],
      ['Объём', '3 мл'],
      ['Упаковка', '1 шт']
    ],
    tags: ['картридж', 'xros', 'vaporesso', '0,6', '3 мл']
  },
  {
    id: 'vaporesso-xros-pro-pod-04',
    brand: 'VAPORESSO',
    name: 'Картридж XROS PRO 0,4 Ом',
    category: 'coil',
    price: 380,
    badges: [],
    meta: 'картридж · 0,4 Ом',
    desc: 'Сменный картридж для Vaporesso XROS PRO. Сопротивление 0,4 Ом. Продаётся поштучно.',
    specs: [
      ['Тип', 'картридж'],
      ['Совместимость', 'Vaporesso XROS PRO'],
      ['Сопротивление', '0,4 Ом'],
      ['Упаковка', '1 шт']
    ],
    tags: ['картридж', 'xros pro', 'vaporesso', '0,4']
  },
  {
    id: 'smoant-santi-s4',
    brand: 'SMOANT',
    name: 'Испаритель Santi S-4, 0,35 Ом',
    category: 'coil',
    price: 300,
    badges: [],
    meta: 'испаритель · 0,35 Ом',
    desc: 'Сменный испаритель Smoant Santi S-4, сопротивление 0,35 Ом. Продаётся поштучно.',
    specs: [
      ['Тип', 'испаритель'],
      ['Совместимость', 'Smoant Santi'],
      ['Сопротивление', '0,35 Ом'],
      ['Упаковка', '1 шт']
    ],
    tags: ['испаритель', 'santi', 'smoant', '0,35']
  },
  {
    id: 'smoant-santi-s5',
    brand: 'SMOANT',
    name: 'Испаритель Santi S-5, 0,55 Ом',
    category: 'coil',
    price: 300,
    badges: [],
    meta: 'испаритель · 0,55 Ом',
    desc: 'Сменный испаритель Smoant Santi S-5, сопротивление 0,55 Ом. Продаётся поштучно.',
    specs: [
      ['Тип', 'испаритель'],
      ['Совместимость', 'Smoant Santi'],
      ['Сопротивление', '0,55 Ом'],
      ['Упаковка', '1 шт']
    ],
    tags: ['испаритель', 'santi', 'smoant', '0,55']
  },
  {
    id: 'smoant-santi-s7',
    brand: 'SMOANT',
    name: 'Испаритель Santi S-7 DTL, 0,3 Ом',
    category: 'coil',
    price: 300,
    badges: [],
    meta: 'испаритель · DTL · 0,3 Ом',
    desc: 'Сменный испаритель Smoant Santi S-7 для кальянной тяги (DTL), сопротивление 0,3 Ом. Продаётся поштучно.',
    specs: [
      ['Тип', 'испаритель'],
      ['Совместимость', 'Smoant Santi'],
      ['Сопротивление', '0,3 Ом'],
      ['Тип тяги', 'DTL'],
      ['Упаковка', '1 шт']
    ],
    tags: ['испаритель', 'santi', 'smoant', 'dtl', '0,3']
  },
  {
    id: 'voopoo-vmate-top-fill-07',
    brand: 'VOOPOO',
    name: 'Картридж Vmate Top Fill, 0,7 Ом',
    category: 'coil',
    price: 440,
    badges: [],
    meta: 'картридж · 0,7 Ом · верхняя заправка',
    desc: 'Сменный картридж VOOPOO Vmate Top Fill с верхней заправкой, сопротивление 0,7 Ом. Продаётся поштучно.',
    specs: [
      ['Тип', 'картридж'],
      ['Совместимость', 'VOOPOO Vmate'],
      ['Сопротивление', '0,7 Ом'],
      ['Заправка', 'верхняя'],
      ['Упаковка', '1 шт']
    ],
    tags: ['картридж', 'vmate', 'voopoo', '0,7', 'top fill']
  },
  {
    id: 'brusko-minican-4-pod',
    brand: 'BRUSKO',
    name: 'Картридж Minican 4, 0,8 Ом (серый)',
    category: 'coil',
    price: 470,
    badges: [],
    meta: 'картридж · 3 мл · 0,8 Ом · 1 шт/уп',
    desc: 'Сменный картридж для Brusko Minican 4, объём 3 мл, сопротивление 0,8 Ом, серый. Цена за упаковку — 1 шт.',
    specs: [
      ['Тип', 'картридж'],
      ['Совместимость', 'Brusko Minican 4'],
      ['Сопротивление', '0,8 Ом'],
      ['Объём', '3 мл'],
      ['Цвет', 'серый'],
      ['Упаковка', '1 шт']
    ],
    tags: ['картридж', 'minican', 'brusko', '0,8', '3 мл']
  },
  {
    id: 'geekvape-b-series-03',
    brand: 'GEEK VAPE',
    name: 'Испаритель B Series (Boost), 0,3 Ом',
    category: 'coil',
    price: 380,
    badges: [],
    meta: 'испаритель · B Series · 0,3 Ом',
    desc: 'Сменный испаритель Geek Vape B Series (BOOST Version), сопротивление 0,3 Ом. Продаётся поштучно.',
    specs: [
      ['Тип', 'испаритель'],
      ['Серия', 'B Series (BOOST Version)'],
      ['Сопротивление', '0,3 Ом'],
      ['Упаковка', '1 шт']
    ],
    tags: ['испаритель', 'b series', 'boost', 'geek vape', '0,3']
  },
  {
    id: 'geekvape-b-series-04',
    brand: 'GEEK VAPE',
    name: 'Испаритель B Series (Boost), 0,4 Ом',
    category: 'coil',
    price: 380,
    badges: [],
    meta: 'испаритель · B Series · 0,4 Ом',
    desc: 'Сменный испаритель Geek Vape B Series (BOOST Version), сопротивление 0,4 Ом. Продаётся поштучно.',
    specs: [
      ['Тип', 'испаритель'],
      ['Серия', 'B Series (BOOST Version)'],
      ['Сопротивление', '0,4 Ом'],
      ['Упаковка', '1 шт']
    ],
    tags: ['испаритель', 'b series', 'boost', 'geek vape', '0,4']
  },
  {
    id: 'geekvape-b-series-02',
    brand: 'GEEK VAPE',
    name: 'Испаритель B Series (Boost), 0,2 Ом',
    category: 'coil',
    price: 380,
    badges: [],
    meta: 'испаритель · B Series · 0,2 Ом',
    desc: 'Сменный испаритель Geek Vape B Series (BOOST Version), сопротивление 0,2 Ом. Продаётся поштучно.',
    specs: [
      ['Тип', 'испаритель'],
      ['Серия', 'B Series (BOOST Version)'],
      ['Сопротивление', '0,2 Ом'],
      ['Упаковка', '1 шт']
    ],
    tags: ['испаритель', 'b series', 'boost', 'geek vape', '0,2']
  },
  {
    id: 'geekvape-aegis-boost-06',
    brand: 'GEEK VAPE',
    name: 'Испаритель Aegis Boost, 0,6 Ом',
    category: 'coil',
    price: 380,
    badges: [],
    meta: 'испаритель · Aegis Boost · 0,6 Ом',
    desc: 'Сменный испаритель для Geek Vape Aegis Boost, сопротивление 0,6 Ом. Продаётся поштучно.',
    specs: [
      ['Тип', 'испаритель'],
      ['Совместимость', 'Geek Vape Aegis Boost'],
      ['Сопротивление', '0,6 Ом'],
      ['Упаковка', '1 шт']
    ],
    tags: ['испаритель', 'aegis boost', 'geek vape', '0,6']
  },
  {
    id: 'smoant-pasito-mini-p2',
    brand: 'SMOANT',
    name: 'Испаритель Pasito Mini P-2, 0,8 Ом',
    category: 'coil',
    price: 280,
    badges: [],
    meta: 'испаритель · 0,8 Ом · 3 шт/уп',
    desc: 'Сменный испаритель Smoant Pasito Mini P-2, сопротивление 0,8 Ом. Цена за упаковку — 3 шт.',
    specs: [
      ['Тип', 'испаритель'],
      ['Совместимость', 'Smoant Pasito Mini'],
      ['Сопротивление', '0,8 Ом'],
      ['Упаковка', '3 шт']
    ],
    tags: ['испаритель', 'pasito mini', 'smoant', '0,8']
  },
  {
    id: 'smoant-pasito-mini-p1',
    brand: 'SMOANT',
    name: 'Испаритель Pasito Mini P-1, 0,6 Ом',
    category: 'coil',
    price: 280,
    badges: [],
    meta: 'испаритель · 0,6 Ом · 3 шт/уп',
    desc: 'Сменный испаритель Smoant Pasito Mini P-1, сопротивление 0,6 Ом. Цена за упаковку — 3 шт.',
    specs: [
      ['Тип', 'испаритель'],
      ['Совместимость', 'Smoant Pasito Mini'],
      ['Сопротивление', '0,6 Ом'],
      ['Упаковка', '3 шт']
    ],
    tags: ['испаритель', 'pasito mini', 'smoant', '0,6']
  },
  {
    id: 'smoant-pasito-mini-p3',
    brand: 'SMOANT',
    name: 'Испаритель Pasito Mini P-3, 1,0 Ом',
    category: 'coil',
    price: 280,
    badges: [],
    meta: 'испаритель · 1,0 Ом · 3 шт/уп',
    desc: 'Сменный испаритель Smoant Pasito Mini P-3, сопротивление 1,0 Ом. Цена за упаковку — 3 шт.',
    specs: [
      ['Тип', 'испаритель'],
      ['Совместимость', 'Smoant Pasito Mini'],
      ['Сопротивление', '1,0 Ом'],
      ['Упаковка', '3 шт']
    ],
    tags: ['испаритель', 'pasito mini', 'smoant', '1,0']
  },
  {
    id: 'smoant-knight-k1-015',
    brand: 'SMOANT',
    name: 'Испаритель Knight / Pasito II K-1 Mesh, 0,15 Ом',
    category: 'coil',
    price: 360,
    badges: [],
    meta: 'испаритель · Mesh · 0,15 Ом',
    desc: 'Сменный Mesh-испаритель K-1 для Smoant Knight и Smoant Pasito II, сопротивление 0,15 Ом. Продаётся поштучно.',
    specs: [
      ['Тип', 'испаритель'],
      ['Совместимость', 'Smoant Knight, Smoant Pasito II'],
      ['Сопротивление', '0,15 Ом'],
      ['Исполнение', 'Mesh'],
      ['Упаковка', '1 шт']
    ],
    tags: ['испаритель', 'knight', 'pasito', 'mesh', 'smoant', '0,15']
  },
  {
    id: 'smoant-knight-k1-03',
    brand: 'SMOANT',
    name: 'Испаритель Knight / Pasito II K-1 Mesh, 0,3 Ом',
    category: 'coil',
    price: 360,
    badges: [],
    meta: 'испаритель · Mesh · 0,3 Ом',
    desc: 'Сменный Mesh-испаритель K-1 для Smoant Knight и Smoant Pasito II, сопротивление 0,3 Ом. Продаётся поштучно.',
    specs: [
      ['Тип', 'испаритель'],
      ['Совместимость', 'Smoant Knight, Smoant Pasito II'],
      ['Сопротивление', '0,3 Ом'],
      ['Исполнение', 'Mesh'],
      ['Упаковка', '1 шт']
    ],
    tags: ['испаритель', 'knight', 'pasito', 'mesh', 'smoant', '0,3']
  },
  {
    id: 'smoant-knight-k2-04',
    brand: 'SMOANT',
    name: 'Испаритель Knight / Pasito II K-2 Mesh, 0,4 Ом',
    category: 'coil',
    price: 360,
    badges: [],
    meta: 'испаритель · Mesh · 0,4 Ом',
    desc: 'Сменный Mesh-испаритель K-2 для Smoant Knight и Smoant Pasito II, сопротивление 0,4 Ом. Продаётся поштучно.',
    specs: [
      ['Тип', 'испаритель'],
      ['Совместимость', 'Smoant Knight, Smoant Pasito II'],
      ['Сопротивление', '0,4 Ом'],
      ['Исполнение', 'Mesh'],
      ['Упаковка', '1 шт']
    ],
    tags: ['испаритель', 'knight', 'pasito', 'mesh', 'smoant', '0,4']
  },
  {
    id: 'smoant-knight-k3-06',
    brand: 'SMOANT',
    name: 'Испаритель Knight / Pasito II K-3 Mesh, 0,6 Ом',
    category: 'coil',
    price: 360,
    badges: [],
    meta: 'испаритель · Mesh · 0,6 Ом',
    desc: 'Сменный Mesh-испаритель K-3 для Smoant Knight и Smoant Pasito II, сопротивление 0,6 Ом. Продаётся поштучно.',
    specs: [
      ['Тип', 'испаритель'],
      ['Совместимость', 'Smoant Knight, Smoant Pasito II'],
      ['Сопротивление', '0,6 Ом'],
      ['Исполнение', 'Mesh'],
      ['Упаковка', '1 шт']
    ],
    tags: ['испаритель', 'knight', 'pasito', 'mesh', 'smoant', '0,6']
  },

  /* ==================== ЖИДКОСТИ: СОЛЬ 30 МЛ ==================== */
  {
    id: 'bryzgi-salt-ananas-grapefruit',
    brand: 'BRYZGI',
    name: 'Salt Light — Ананас грейпфрут',
    category: 'liquid',
    price: 650,
    badges: [],
    meta: '30 мл · солевая · LIGHT',
    desc: 'Солевая жидкость BRYZGI Salt Light, 30 мл. Вкус: ананас и грейпфрут. Для POD-систем.',
    specs: [
      ['Объём', '30 мл'],
      ['Тип', 'солевая'],
      ['Линейка', 'LIGHT'],
      ['Вкус', 'ананас, грейпфрут']
    ],
    tags: ['жидкость', 'соль', 'bryzgi', 'ананас', 'грейпфрут', '30 мл']
  },
  {
    id: 'catswill-salt-pear-lime-mint',
    brand: 'CATSWILL',
    name: 'Salt — Груша лайм мята',
    category: 'liquid',
    price: 700,
    badges: [],
    meta: '30 мл · 20 мг · солевая',
    desc: 'Солевая жидкость Catswill Salt, 30 мл, крепость 20 мг/мл. Вкус: груша, лайм и мята.',
    specs: [
      ['Объём', '30 мл'],
      ['Никотин', '20 мг/мл'],
      ['Тип', 'солевая'],
      ['Вкус', 'груша, лайм, мята']
    ],
    tags: ['жидкость', 'соль', 'catswill', 'груша', 'лайм', 'мята', '30 мл']
  },
  {
    id: 'duall-extra-blueberry-watermelon',
    brand: 'DUALL',
    name: 'Extra — Черника арбуз',
    category: 'liquid',
    price: 600,
    badges: [],
    meta: '30 мл · 20 мг · Hard',
    desc: 'Солевая жидкость Duall Extra, 30 мл, 20 мг/мл, линейка Hard. Вкус: черника и арбуз.',
    specs: [
      ['Объём', '30 мл'],
      ['Никотин', '20 мг/мл'],
      ['Тип', 'солевая'],
      ['Линейка', 'Hard'],
      ['Вкус', 'черника, арбуз']
    ],
    tags: ['жидкость', 'соль', 'duall', 'черника', 'арбуз', '30 мл']
  },
  {
    id: 'hotspot-fuel-pepper-mint',
    brand: 'HOTSPOT',
    name: 'Fuel — Перечная мята',
    category: 'liquid',
    price: 650,
    badges: [],
    meta: '30 мл · 20 мг · солевая',
    desc: 'Солевая жидкость Hotspot Fuel, 30 мл, 20 мг/мл. Вкус: перечная мята.',
    specs: [
      ['Объём', '30 мл'],
      ['Никотин', '20 мг/мл'],
      ['Тип', 'солевая'],
      ['Вкус', 'перечная мята']
    ],
    tags: ['жидкость', 'соль', 'hotspot', 'мята', '30 мл']
  },
  {
    id: 'ice-paradise-melon-holy',
    brand: 'ICE PARADISE',
    name: 'Melon Holy',
    category: 'liquid',
    price: 720,
    badges: [],
    meta: '30 мл · 20 мг · солевая',
    desc: 'Солевая жидкость Ice Paradise Melon Holy, 30 мл, 20 мг/мл. Вкус: дыня с холодком.',
    specs: [
      ['Объём', '30 мл'],
      ['Никотин', '20 мг/мл'],
      ['Тип', 'солевая'],
      ['Вкус', 'дыня']
    ],
    tags: ['жидкость', 'соль', 'ice paradise', 'дыня', '30 мл']
  },
  {
    id: 'milk-paradise-high-tide',
    brand: 'MILK PARADISE',
    name: 'High Tide',
    category: 'liquid',
    price: 720,
    badges: [],
    meta: '30 мл · 20 мг · солевая',
    desc: 'Солевая жидкость Milk Paradise High Tide, 30 мл, 20 мг/мл.',
    specs: [
      ['Объём', '30 мл'],
      ['Никотин', '20 мг/мл'],
      ['Тип', 'солевая']
    ],
    tags: ['жидкость', 'соль', 'milk paradise', '30 мл']
  },
  {
    id: 'narcoz-grapefruit-smoothie',
    brand: 'NARCOZ',
    name: 'Грейпфрутовый смузи',
    category: 'liquid',
    price: 650,
    badges: [],
    meta: '30 мл · 20 мг · солевая',
    desc: 'Солевая жидкость NARCOZ, 30 мл, 20 мг/мл. Вкус: грейпфрутовый смузи.',
    specs: [
      ['Объём', '30 мл'],
      ['Никотин', '20 мг/мл'],
      ['Тип', 'солевая'],
      ['Вкус', 'грейпфрутовый смузи']
    ],
    tags: ['жидкость', 'соль', 'narcoz', 'грейпфрут', '30 мл']
  },
  {
    id: 'podonki-v1v2-gum-apricot',
    brand: 'PODONKI',
    name: 'V1/V2 New — Жвачка абрикос',
    category: 'liquid',
    price: 700,
    badges: [],
    meta: 'солевая · жвачка абрикос',
    desc: 'Солевая жидкость PODONKI V1/V2 New. Вкус: жвачка и абрикос. Объём и крепость уточняйте в WhatsApp.',
    specs: [
      ['Тип', 'солевая'],
      ['Вкус', 'жвачка, абрикос']
    ],
    tags: ['жидкость', 'соль', 'podonki', 'абрикос', 'жвачка']
  },
  {
    id: 'rick-morty-russia-energy-pineapple',
    brand: 'RICK AND MORTY',
    name: 'Russia — Энергетик ананас',
    category: 'liquid',
    price: 700,
    badges: [],
    meta: '30 мл · 20 мг · Hard',
    desc: 'Солевая жидкость Rick and Morty Russia, 30 мл, 20 мг/мл, линейка Hard. Вкус: энергетик с ананасом.',
    specs: [
      ['Объём', '30 мл'],
      ['Никотин', '20 мг/мл'],
      ['Тип', 'солевая'],
      ['Линейка', 'Hard'],
      ['Вкус', 'энергетик, ананас']
    ],
    tags: ['жидкость', 'соль', 'rick and morty', 'энергетик', 'ананас', '30 мл']
  },
  {
    id: 'skala-strong-grape-ice',
    brand: 'SKALA',
    name: 'Strong — Виноград со льдом',
    category: 'liquid',
    price: 600,
    badges: [],
    meta: '30 мл · 20 мг · солевая',
    desc: 'Солевая жидкость SKALA, 30 мл, крепость 20 мг/мл (strong). Вкус: виноград со льдом.',
    specs: [
      ['Объём', '30 мл'],
      ['Никотин', '20 мг/мл'],
      ['Тип', 'солевая'],
      ['Вкус', 'виноград, лёд']
    ],
    tags: ['жидкость', 'соль', 'skala', 'виноград', 'лёд', '30 мл']
  },
  {
    id: 'trava-energy-m150-ice',
    brand: 'TRAVA',
    name: 'Energy M150 — лёд',
    category: 'liquid',
    price: 650,
    badges: [],
    meta: '30 мл · 20 мг · солевая',
    desc: 'Солевая жидкость TRAVA, 30 мл, 20 мг/мл. Вкус: энергетик M150 со льдом.',
    specs: [
      ['Объём', '30 мл'],
      ['Никотин', '20 мг/мл'],
      ['Тип', 'солевая'],
      ['Вкус', 'энергетик M150, лёд']
    ],
    tags: ['жидкость', 'соль', 'trava', 'энергетик', 'лёд', '30 мл']
  },
  {
    id: 'greh-samoubiytsa-nectarine-melon',
    brand: 'ГРЕХ & САМОУБИЙЦА',
    name: 'Salt — Нектарин дыня',
    category: 'liquid',
    price: 750,
    badges: [],
    meta: '30 мл · Hard · солевая',
    desc: 'Солевая жидкость «Грех & Самоубийца», 30 мл, линейка Hard. Вкус: нектарин и дыня.',
    specs: [
      ['Объём', '30 мл'],
      ['Тип', 'солевая'],
      ['Линейка', 'Hard'],
      ['Вкус', 'нектарин, дыня']
    ],
    tags: ['жидкость', 'соль', 'грех', 'самоубийца', 'нектарин', 'дыня', '30 мл']
  },
  {
    id: 'podonki-isterika-passion-fruit',
    brand: 'PODONKI',
    name: 'Isterika — Juicy Passion Fruit',
    category: 'liquid',
    price: 650,
    badges: [],
    meta: 'солевая · маракуйя',
    desc: 'Солевая жидкость Podonki & Isterika. Вкус: сочная маракуйя. Объём и крепость уточняйте в WhatsApp.',
    specs: [
      ['Тип', 'солевая'],
      ['Вкус', 'маракуйя']
    ],
    tags: ['жидкость', 'соль', 'podonki', 'isterika', 'маракуйя']
  },
  {
    id: 'podonki-anarhiya-raspberry-lychee',
    brand: 'PODONKI',
    name: 'Анархия — Малина личи',
    category: 'liquid',
    price: 700,
    badges: [],
    meta: 'солевая · малина личи',
    desc: 'Солевая жидкость Podonki & Анархия. Вкус: малина и личи. Объём и крепость уточняйте в WhatsApp.',
    specs: [
      ['Тип', 'солевая'],
      ['Вкус', 'малина, личи']
    ],
    tags: ['жидкость', 'соль', 'podonki', 'анархия', 'малина', 'личи']
  },
  {
    id: 'rick-morty-bad-trip-pomegranate-currant',
    brand: 'RICK AND MORTY',
    name: 'Bad Trip — Гранат смородина',
    category: 'liquid',
    price: 700,
    badges: [],
    meta: '30 мл · 20 мг · солевая',
    desc: 'Солевая жидкость Rick and Morty Bad Trip, 30 мл, 20 мг/мл. Вкус: гранат и чёрная смородина.',
    specs: [
      ['Объём', '30 мл'],
      ['Никотин', '20 мг/мл'],
      ['Тип', 'солевая'],
      ['Вкус', 'гранат, смородина']
    ],
    tags: ['жидкость', 'соль', 'rick and morty', 'гранат', 'смородина', '30 мл']
  },
  {
    id: 'zlaya-monashka-hard70-strawberry-gum',
    brand: 'ЗЛАЯ МОНАШКА',
    name: 'Hard 70 — Жвачка земляника',
    category: 'liquid',
    price: 750,
    badges: [],
    meta: '70 мг · Hard · солевая',
    desc: 'Солевая жидкость «Злая Монашка» Hard, крепость 70 мг/мл. Вкус: жвачка и земляника. Высокая крепость — для опытных пользователей.',
    specs: [
      ['Никотин', '70 мг/мл'],
      ['Тип', 'солевая'],
      ['Линейка', 'Hard'],
      ['Вкус', 'жвачка, земляника']
    ],
    tags: ['жидкость', 'соль', 'злая монашка', 'земляника', 'жвачка', '70 мг']
  },
  {
    id: 'duall-individual-banana-icecream',
    brand: 'DUALL',
    name: 'Individual — Банановое мороженое',
    category: 'liquid',
    price: 600,
    badges: [],
    meta: '30 мл · 20 мг · Hard',
    desc: 'Солевая жидкость Duall Individual, 30 мл, 20 мг/мл, линейка Hard. Вкус: банановое мороженое.',
    specs: [
      ['Объём', '30 мл'],
      ['Никотин', '20 мг/мл'],
      ['Тип', 'солевая'],
      ['Линейка', 'Hard'],
      ['Вкус', 'банановое мороженое']
    ],
    tags: ['жидкость', 'соль', 'duall', 'банан', 'мороженое', '30 мл']
  },

  /* ==================== ЖИДКОСТИ: 100 МЛ, 3 МГ ==================== */
  {
    id: 'indosour-orange-pineapple',
    brand: 'INDOSOUR',
    name: 'Апельсин ананас',
    category: 'liquid',
    price: 700,
    badges: [],
    meta: '100 мл · 3 мг',
    desc: 'Классическая жидкость IndoSour, 100 мл, 3 мг/мл. Вкус: апельсин и ананас.',
    specs: [
      ['Объём', '100 мл'],
      ['Никотин', '3 мг/мл'],
      ['Тип', 'классическая'],
      ['Вкус', 'апельсин, ананас']
    ],
    tags: ['жидкость', 'indosour', 'апельсин', 'ананас', '100 мл', '3 мг']
  },
  {
    id: 'indosour-watermelon',
    brand: 'INDOSOUR',
    name: 'Арбуз',
    category: 'liquid',
    price: 700,
    badges: [],
    meta: '100 мл · 3 мг',
    desc: 'Классическая жидкость IndoSour, 100 мл, 3 мг/мл. Вкус: арбуз.',
    specs: [
      ['Объём', '100 мл'],
      ['Никотин', '3 мг/мл'],
      ['Тип', 'классическая'],
      ['Вкус', 'арбуз']
    ],
    tags: ['жидкость', 'indosour', 'арбуз', '100 мл', '3 мг']
  },
  {
    id: 'indosour-grape-blueberry',
    brand: 'INDOSOUR',
    name: 'Виноград черника',
    category: 'liquid',
    price: 700,
    badges: [],
    meta: '100 мл · 3 мг',
    desc: 'Классическая жидкость IndoSour, 100 мл, 3 мг/мл. Вкус: виноград и черника.',
    specs: [
      ['Объём', '100 мл'],
      ['Никотин', '3 мг/мл'],
      ['Тип', 'классическая'],
      ['Вкус', 'виноград, черника']
    ],
    tags: ['жидкость', 'indosour', 'виноград', 'черника', '100 мл', '3 мг']
  },
  {
    id: 'indosour-cherry-lemon',
    brand: 'INDOSOUR',
    name: 'Вишня лимон',
    category: 'liquid',
    price: 700,
    badges: [],
    meta: '100 мл · 3 мг',
    desc: 'Классическая жидкость IndoSour, 100 мл, 3 мг/мл. Вкус: вишня и лимон.',
    specs: [
      ['Объём', '100 мл'],
      ['Никотин', '3 мг/мл'],
      ['Тип', 'классическая'],
      ['Вкус', 'вишня, лимон']
    ],
    tags: ['жидкость', 'indosour', 'вишня', 'лимон', '100 мл', '3 мг']
  },
  {
    id: 'indosour-kiwi-strawberry',
    brand: 'INDOSOUR',
    name: 'Киви клубника',
    category: 'liquid',
    price: 700,
    badges: [],
    meta: '100 мл · 3 мг',
    desc: 'Классическая жидкость IndoSour, 100 мл, 3 мг/мл. Вкус: киви и клубника.',
    specs: [
      ['Объём', '100 мл'],
      ['Никотин', '3 мг/мл'],
      ['Тип', 'классическая'],
      ['Вкус', 'киви, клубника']
    ],
    tags: ['жидкость', 'indosour', 'киви', 'клубника', '100 мл', '3 мг']
  },
  {
    id: 'indosour-cranberry-blackberry',
    brand: 'INDOSOUR',
    name: 'Клюква ежевика',
    category: 'liquid',
    price: 700,
    badges: [],
    meta: '100 мл · 3 мг',
    desc: 'Классическая жидкость IndoSour, 100 мл, 3 мг/мл. Вкус: клюква и ежевика.',
    specs: [
      ['Объём', '100 мл'],
      ['Никотин', '3 мг/мл'],
      ['Тип', 'классическая'],
      ['Вкус', 'клюква, ежевика']
    ],
    tags: ['жидкость', 'indosour', 'клюква', 'ежевика', '100 мл', '3 мг']
  },
  {
    id: 'indosour-raspberry-apple',
    brand: 'INDOSOUR',
    name: 'Малина яблоко',
    category: 'liquid',
    price: 700,
    badges: [],
    meta: '100 мл · 3 мг',
    desc: 'Классическая жидкость IndoSour, 100 мл, 3 мг/мл. Вкус: малина и яблоко.',
    specs: [
      ['Объём', '100 мл'],
      ['Никотин', '3 мг/мл'],
      ['Тип', 'классическая'],
      ['Вкус', 'малина, яблоко']
    ],
    tags: ['жидкость', 'indosour', 'малина', 'яблоко', '100 мл', '3 мг']
  },
  {
    id: 'indosour-mandarin-mango',
    brand: 'INDOSOUR',
    name: 'Мандарин манго',
    category: 'liquid',
    price: 700,
    badges: [],
    meta: '100 мл · 3 мг',
    desc: 'Классическая жидкость IndoSour, 100 мл, 3 мг/мл. Вкус: мандарин и манго.',
    specs: [
      ['Объём', '100 мл'],
      ['Никотин', '3 мг/мл'],
      ['Тип', 'классическая'],
      ['Вкус', 'мандарин, манго']
    ],
    tags: ['жидкость', 'indosour', 'мандарин', 'манго', '100 мл', '3 мг']
  },
  {
    id: 'indosour-passion-fruit-blue-raspberry',
    brand: 'INDOSOUR',
    name: 'Маракуйя голубая малина',
    category: 'liquid',
    price: 700,
    badges: [],
    meta: '100 мл · 3 мг',
    desc: 'Классическая жидкость IndoSour, 100 мл, 3 мг/мл. Вкус: маракуйя и голубая малина.',
    specs: [
      ['Объём', '100 мл'],
      ['Никотин', '3 мг/мл'],
      ['Тип', 'классическая'],
      ['Вкус', 'маракуйя, голубая малина']
    ],
    tags: ['жидкость', 'indosour', 'маракуйя', 'малина', '100 мл', '3 мг']
  },
  {
    id: 'indosour-blackcurrant',
    brand: 'INDOSOUR',
    name: 'Чёрная смородина',
    category: 'liquid',
    price: 700,
    badges: [],
    meta: '100 мл · 3 мг',
    desc: 'Классическая жидкость IndoSour, 100 мл, 3 мг/мл. Вкус: чёрная смородина.',
    specs: [
      ['Объём', '100 мл'],
      ['Никотин', '3 мг/мл'],
      ['Тип', 'классическая'],
      ['Вкус', 'чёрная смородина']
    ],
    tags: ['жидкость', 'indosour', 'смородина', '100 мл', '3 мг']
  },
  {
    id: 'hungry-caramel-popcorn',
    brand: 'HUNGRY',
    name: 'Caramel Popcorn, 100 мл',
    category: 'liquid',
    price: 550,
    badges: [],
    meta: '100 мл · 3 мг',
    desc: 'Классическая жидкость HUNGRY, 100 мл, 3 мг/мл. Вкус: карамельный попкорн.',
    specs: [
      ['Объём', '100 мл'],
      ['Никотин', '3 мг/мл'],
      ['Тип', 'классическая'],
      ['Вкус', 'карамельный попкорн']
    ],
    tags: ['жидкость', 'hungry', 'карамель', 'попкорн', '100 мл', '3 мг']
  },
  {
    id: 'hungry-coffee-toffee',
    brand: 'HUNGRY',
    name: 'Coffee Toffee, 100 мл',
    category: 'liquid',
    price: 550,
    badges: [],
    meta: '100 мл · 3 мг',
    desc: 'Классическая жидкость HUNGRY, 100 мл, 3 мг/мл. Вкус: кофе и ирис.',
    specs: [
      ['Объём', '100 мл'],
      ['Никотин', '3 мг/мл'],
      ['Тип', 'классическая'],
      ['Вкус', 'кофе, ирис']
    ],
    tags: ['жидкость', 'hungry', 'кофе', 'ирис', '100 мл', '3 мг']
  },
  {
    id: 'hungry-milk-cookie',
    brand: 'HUNGRY',
    name: 'Milk Cookie, 100 мл',
    category: 'liquid',
    price: 550,
    badges: [],
    meta: '100 мл · 3 мг',
    desc: 'Классическая жидкость HUNGRY, 100 мл, 3 мг/мл. Вкус: молоко и печенье.',
    specs: [
      ['Объём', '100 мл'],
      ['Никотин', '3 мг/мл'],
      ['Тип', 'классическая'],
      ['Вкус', 'молоко, печенье']
    ],
    tags: ['жидкость', 'hungry', 'молоко', 'печенье', '100 мл', '3 мг']
  },

  /* ==================== НИКОТИНОВЫЕ ПАУЧИ ==================== */
  {
    id: 'faff-melon',
    brand: 'FAFF',
    name: 'Дыня',
    category: 'pouch',
    price: 550,
    badges: [],
    meta: 'никотиновые паучи · дыня',
    desc: 'Никотиновые паучи FAFF со вкусом дыни. Бестабачное саше. Продажа только с 18 лет.',
    specs: [
      ['Тип', 'никотиновые паучи'],
      ['Вкус', 'дыня']
    ],
    tags: ['паучи', 'faff', 'дыня']
  },
  {
    id: 'loop-watermelon',
    brand: 'LOOP',
    name: 'Арбуз',
    category: 'pouch',
    price: 380,
    badges: [],
    meta: 'никотиновые пластинки · арбуз',
    desc: 'Никотиновые пластинки Loop со вкусом арбуза. Продажа только с 18 лет.',
    specs: [
      ['Тип', 'никотиновые пластинки'],
      ['Вкус', 'арбуз']
    ],
    tags: ['паучи', 'loop', 'пластинки', 'арбуз']
  },
  {
    id: 'kasta-banana',
    brand: 'KASTA',
    name: 'Банан',
    category: 'pouch',
    price: 550,
    badges: [],
    meta: 'никотиновые паучи · банан',
    desc: 'Никотиновые паучи KASTA со вкусом банана. Бестабачное саше. Продажа только с 18 лет.',
    specs: [
      ['Тип', 'никотиновые паучи'],
      ['Вкус', 'банан']
    ],
    tags: ['паучи', 'kasta', 'банан']
  }
];
