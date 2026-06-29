export interface Book {
  id: string;
  num?: number;
  title: string;
  year: number;
  publisher: string;
  isbn?: string;
  asin?: string;
  pages?: number;
  description: string;
  link?: string;
  type: 'theory' | 'art' | 'science' | 'philosophy' | 'patent';
  doi?: string;
  price?: string;
}

export interface Invention {
  id: string;
  num: number;
  title: string;
  year: number;
  patentNum?: string;
  status: 'registered' | 'deposited' | 'donated';
  description: string;
  details: string;
  googlePatentsLink?: string;
}

export interface Artwork {
  id: string;
  title: string;
  year: number;
  category: string;
  venue: string;
  description: string;
  imageUrl?: string;
  associatedAlbumId?: string;
}

export interface DocumentaryEpisode {
  episodeNum: number;
  title: string;
  year: number;
  topics: string[];
  description: string;
  youtubeUrl?: string;
  wikipediaUrl?: string;
}

export interface SyncLevel {
  level: number;
  titleIt: string;
  titleEn: string;
  descriptionIt: string;
  descriptionEn: string;
  experimentalBriefIt: string;
  experimentalBriefEn: string;
  scientificAnalogIt: string;
  scientificAnalogEn: string;
}

export interface ExhibitionAlbum {
  id: string;
  titleIt: string;
  titleEn: string;
  contentIt: string;
  contentEn: string;
  photosCount?: number;
  link: string;
  tags: string[];
  imagePlaceholder?: string;
}

export interface Exhibition {
  id: string;
  titleIt: string;
  titleEn: string;
  year: number;
  datesIt: string;
  datesEn: string;
  venueIt: string;
  venueEn: string;
  introIt: string;
  introEn: string;
  patronageIt?: string;
  patronageEn?: string;
  designIt?: string;
  designEn?: string;
  photosByIt?: string;
  photosByEn?: string;
  publisherIt?: string;
  publisherEn?: string;
  albums: ExhibitionAlbum[];
  
  // Rich details added for official curation and institutional certification
  hasVerificationBadge?: boolean;
  validationLink?: string;
  validationTitleIt?: string;
  validationTitleEn?: string;
  specialEventIt?: string;
  specialEventEn?: string;
  copyrightNoteIt?: string;
  copyrightNoteEn?: string;
  
  pressTitleIt?: string;
  pressTitleEn?: string;
  pressSubIt?: string;
  pressSubEn?: string;
  pressSourceIt?: string;
  pressSourceEn?: string;
  pressAuthorIt?: string;
  pressAuthorEn?: string;
  pressTextIt?: string;
  pressTextEn?: string;
  
  aicCurationIt?: string;
  aicCurationEn?: string;
  
  manuscriptsTitleIt?: string;
  manuscriptsTitleEn?: string;
  manuscriptsTextIt?: string;
  manuscriptsTextEn?: string;
  
  allestimentoEmphasisIt?: string;
  allestimentoEmphasisEn?: string;
}

export interface MigrationClaim {
  id: string;
  name: string;
  email: string;
  platform: 'NING' | 'Facebook' | 'Instagram' | 'YouTube' | 'Other';
  oldUsername: string;
  followersCount: number;
  status: 'pending' | 'verified' | 'claimed';
  timestamp: string;
}

export interface ArtworkDeposit {
  id: string;
  title: string;
  author: string;
  email: string;
  section: string;
  floor: 1 | 3;
  technique: string;
  support?: string;
  dimensions?: string;
  description: string;
  fileUrl?: string;
  fileName?: string;
  timestamp: string;
  priorityId: string;
  isPaid: boolean;
  rentalPeriodMonths: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export interface CulturalSection {
  id: string;
  title: string;
  category: 'Destro' | 'Sinistro' | 'Benessere';
  description: string;
  subcategories: string[];
}


