/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
  section: string; // A - H
  floor: 1 | 3;
  technique: string;
  support?: string;
  dimensions?: string;
  description: string;
  fileUrl?: string;
  fileName?: string;
  timestamp: string;
  priorityId: string; // "AIC-PRI-XXXXXX"
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
