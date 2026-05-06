/**
 * Curación visual demo: Wikimedia Commons + Unsplash.
 *
 * Importante: Wikimedia ya no sirve miniaturas `800px-*` arbitrarias; devuelve HTML de error
 * (el navegador muestra ORB / «OpaqueResponseBlocking»). Usar anchos permitidos, p. ej. 960px,
 * y rutas de archivo actualizadas según Commons.
 * Tres URLs son Unsplash (museo / nenúfares / color) porque no había miniatura 960 fiable para esas fichas.
 */

export const ART_COVERS = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/960px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/The_Great_Wave_off_Kanagawa.jpg/960px-The_Great_Wave_off_Kanagawa.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Johannes_Vermeer_%281632-1675%29_-_The_Girl_With_The_Pearl_Earring_%281665%29.jpg/960px-Johannes_Vermeer_%281632-1675%29_-_The_Girl_With_The_Pearl_Earring_%281665%29.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Monet_-_Impression%2C_Sunrise.jpg/960px-Monet_-_Impression%2C_Sunrise.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg/960px-The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Edvard_Munch_-_The_Scream_-_Google_Art_Project.jpg/960px-Edvard_Munch_-_The_Scream_-_Google_Art_Project.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/960px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg',
  'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?auto=format&fit=crop&w=900&q=82',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg/960px-Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=82',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Vincent_Willem_van_Gogh_127.jpg/960px-Vincent_Willem_van_Gogh_127.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/The_Night_Watch_-_HD.jpg/960px-The_Night_Watch_-_HD.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/960px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg',
  'https://images.unsplash.com/photo-1557672172-298e0cd56cb2?auto=format&fit=crop&w=900&q=82',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Edgar_Degas_-_The_Ballet_Class_-_Google_Art_Project.jpg/960px-Edgar_Degas_-_The_Ballet_Class_-_Google_Art_Project.jpg',
  'https://images.unsplash.com/photo-1579783902614-a3fb39279c0b?auto=format&fit=crop&w=900&q=82',
  'https://images.unsplash.com/photo-1541961017774-49add2dab443?auto=format&fit=crop&w=900&q=82',
  'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=82',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=82',
  'https://images.unsplash.com/photo-1575320181286-943ac247993d?auto=format&fit=crop&w=900&q=82',
  'https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&w=900&q=82',
  'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=900&q=82',
  'https://images.unsplash.com/photo-1577720643272-265f09267454?auto=format&fit=crop&w=900&q=82',
  'https://images.unsplash.com/photo-1561214115-f2f134ccb491?auto=format&fit=crop&w=900&q=82',
  'https://images.unsplash.com/photo-1501472319162-efc33d8c0987?auto=format&fit=crop&w=900&q=82',
  'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?auto=format&fit=crop&w=900&q=82',
  'https://images.unsplash.com/photo-1577083555234-d4e37d614b93?auto=format&fit=crop&w=900&q=82',
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=82',
  'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&w=900&q=82',
  'https://images.unsplash.com/photo-1515248137880-45e166b51d30?auto=format&fit=crop&w=900&q=82',
] as const;

export const PORTRAITS = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28cropped%29.jpg/500px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28cropped%29.jpg',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=82',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400&q=82',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400&q=82',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&h=400&q=82',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400&q=82',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=82',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&h=400&q=82',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&h=400&q=82',
  'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&h=400&q=82',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&h=400&q=82',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&h=400&q=82',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&h=400&q=82',
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&h=400&q=82',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&h=400&q=82',
  'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=400&h=400&q=82',
] as const;

const POETIC_TITLES = [
  'Ritmo en óxido y oro',
  'Costura de luz sobre el río',
  'Máquina de recuerdos suaves',
  'Mapa de polvo estelar',
  'Jardín que aprende a hablar',
  'Ecos en la pared blanca',
  'Nube de metal cálido',
  'Piel de acuarela tardía',
  'Sombra que canta bajito',
  'Huella de cristal violeta',
  'Lluvia de signos tranquilos',
  'Puente invisible al mar',
  'Rumor de museo cerrado',
  'Vitrina de tiempo quieto',
  'Paisaje después del trueno',
  'Caballo de papel quemado',
  'Órbita doméstica',
  'Flores para un satélite',
  'Ventana abierta al invierno',
  'Último tren pigmentado',
] as const;

const STUDIO_NAMES = [
  'Carmen Vallejo',
  'Iker Salcedo',
  'Mina Oshiro',
  'León Ferrer',
  'Noa Calder',
  'Hugo Erit',
  'Zahra Mensur',
  'Ren Ito',
  'Elisa Mar',
  'Tomás Vedia',
  'Paula Rens',
  'Marco Hüller',
  'Yara Okonkwo',
  'Sofía Arregui',
  'Diego Pineda',
  'Helena Voss',
  'Andrés Klim',
  'Lucía Faro',
  'Iván Mestre',
  'Nina Corso',
] as const;

const CATS = ['Pintura', 'Escultura', 'Fotografía', 'Digital'] as const;

export function coverAt(indexZeroBased: number): string {
  const n = ART_COVERS.length;
  return ART_COVERS[((indexZeroBased % n) + n) % n];
}

export function portraitAt(i: number): string {
  const n = PORTRAITS.length;
  return PORTRAITS[((i % n) + n) % n];
}

function stableLikes(id: number): number {
  return 320 + ((id * 7919) % 2100);
}

function stableViews(id: number): number {
  return 900 + ((id * 104729) % 9100);
}

export type DemoArtwork = {
  id: number;
  title: string;
  artist: string;
  category: string;
  year: number;
  image: string;
  likes: number;
  views: number;
  slug: string;
  created_at: string;
  description?: string;
};

export function buildDemoGallery(): DemoArtwork[] {
  const items: DemoArtwork[] = [
    {
      id: 1,
      title: 'La noche estrellada',
      artist: 'Vincent van Gogh',
      category: 'Pintura',
      year: 1889,
      image: coverAt(0),
      likes: 1250,
      views: 5400,
      slug: 'noche-estrellada',
      created_at: '2024-01-15',
      description: 'Villa de Saint-Rémy bajo un cielo turbulento de azul y oro.',
    },
    {
      id: 2,
      title: 'Constelación sobre panel',
      artist: 'Nara Okamoto',
      category: 'Digital',
      year: 2024,
      image: coverAt(16),
      likes: 890,
      views: 3200,
      slug: 'obra-digital',
      description: 'Composición lumínica entre pincel vectorial y textura analógica.',
    },
    {
      id: 3,
      title: 'Geometría respiratoria',
      artist: 'Mateo Calvo',
      category: 'Abstracto',
      year: 2023,
      image: coverAt(17),
      likes: 654,
      views: 2100,
      slug: 'abstraccion',
      description: 'Capas translúcidas que dialogan con el espacio en blanco.',
    },
  ];

  for (let i = 0; i < 20; i++) {
    const id = i + 4;
    const slug = `obra-${id}`;
    items.push({
      id,
      title: POETIC_TITLES[i % POETIC_TITLES.length],
      artist: STUDIO_NAMES[i % STUDIO_NAMES.length],
      category: CATS[i % CATS.length],
      year: 2018 + (i % 8),
      image: coverAt(id - 1),
      likes: stableLikes(id),
      views: stableViews(id),
      slug,
      created_at: new Date(2024, i % 12, (i % 27) + 1).toISOString(),
    });
  }

  return items;
}

export function buildDemoFeatured() {
  return [
    {
      id: 1,
      title: 'La noche estrellada',
      artist: 'Vincent van Gogh',
      category: 'Pintura postimpresionista',
      image: coverAt(0),
      likes: 1250,
      slug: 'noche-estrellada',
    },
    {
      id: 2,
      title: 'La gran ola',
      artist: 'Katsushika Hokusai',
      category: 'Grabado japonés',
      image: coverAt(1),
      likes: 2100,
      slug: 'obra-5',
    },
    {
      id: 3,
      title: 'La joven de la perla',
      artist: 'Johannes Vermeer',
      category: 'Óleo barroco',
      image: coverAt(2),
      likes: 980,
      slug: 'obra-6',
    },
    {
      id: 4,
      title: 'Impresión, sol naciente',
      artist: 'Claude Monet',
      category: 'Impresionismo',
      image: coverAt(3),
      likes: 756,
      slug: 'obra-7',
    },
  ];
}

export function buildDemoRooms() {
  return [
    {
      id: 1,
      name: 'Arte contemporáneo 2024',
      description: 'Texturas brutas y color camaleón en salas luminosas.',
      artworkCount: 45,
      creator: 'Museo de Arte Moderno',
      image: coverAt(19),
      theme: 'moderno',
    },
    {
      id: 2,
      name: 'Masters del claroscuro',
      description: 'Del barroco nórdico a la escena española del Siglo de Oro.',
      artworkCount: 32,
      creator: 'Galería Nacional',
      image: coverAt(11),
      theme: 'clásico',
    },
    {
      id: 3,
      name: 'Fotografía urbana viva',
      description: 'Intersecciones, neón y sombras en movimiento.',
      artworkCount: 28,
      creator: 'Colección curada Fragmentos',
      image: coverAt(21),
      theme: 'fotografía',
    },
  ];
}

export type DemoArtist = {
  id: number | string;
  name: string;
  role: string;
  avatar: string;
  artworkCount: number;
  followers: number;
  verified: boolean;
};

export function buildDemoArtists(): DemoArtist[] {
  const roles = ['Pintor', 'Artista Digital', 'Institución', 'Escultor', 'Fotógrafo', 'Crítico y artista'];

  const list: DemoArtist[] = [
    {
      id: 'van-gogh',
      name: 'Vincent van Gogh',
      role: 'Pintor',
      avatar: portraitAt(0),
      artworkCount: 12,
      followers: 1250,
      verified: true,
    },
    {
      id: 2,
      name: 'Nara Okamoto',
      role: roles[1],
      avatar: portraitAt(3),
      artworkCount: 8,
      followers: 890,
      verified: false,
    },
    {
      id: 3,
      name: 'Colección MAM Fragmentos',
      role: roles[2],
      avatar: portraitAt(5),
      artworkCount: 45,
      followers: 3200,
      verified: true,
    },
  ];

  for (let i = 0; i < 12; i++) {
    const aid = i + 4;
    list.push({
      id: aid,
      name: STUDIO_NAMES[(i + 3) % STUDIO_NAMES.length],
      role: roles[(i + 1) % roles.length],
      avatar: portraitAt(aid),
      artworkCount: 5 + ((aid * 17) % 22),
      followers: 140 + ((aid * 131) % 3900),
      verified: i % 3 === 0,
    });
  }

  return list;
}

export function slugToDetailStub(slug: string | undefined) {
  const gallery = buildDemoGallery();
  const found = slug ? gallery.find((x) => x.slug === slug) : undefined;
  const fallback = gallery[0];
  const base = found ?? fallback;
  const k = Math.max(0, (base?.id ?? 1) % ART_COVERS.length);

  const additional = [coverAt(k + 1), coverAt(k + 7)].filter((u) => u !== base.image);

  return {
    image: base.image,
    additionalImages: additional,
    titleHint: base.title,
    artistHint: base.artist,
    yearHint: base.year,
  };
}
