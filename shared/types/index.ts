/**
 * Shared Types for Orb AI Limited Platform
 * 
 * Common type definitions used across all engines and platforms
 */

// ============================================================================
// JURISDICTION TYPES
// ============================================================================

export type Jurisdiction = 
  | 'IE'  // Ireland
  | 'UK'  // United Kingdom
  | 'NI'  // Northern Ireland
  | 'SC'  // Scotland
  | 'WA'  // Wales
  | 'EN'  // England
  | 'ES'  // Spain
  | 'EU'; // European Union

export const JURISDICTION_NAMES: Record<Jurisdiction, string> = {
  IE: 'Ireland',
  UK: 'United Kingdom',
  NI: 'Northern Ireland',
  SC: 'Scotland',
  WA: 'Wales',
  EN: 'England',
  ES: 'Spain',
  EU: 'European Union'
};

// ============================================================================
// CASE TYPES
// ============================================================================

export interface Case {
  id: string;
  name: string;
  status: CaseStatus;
  priority: CasePriority;
  verificationLevel: number;
  jurisdiction: Jurisdiction;
  client: Client;
  documents: Document[];
  witnesses: Witness[];
  timeline: TimelineEvent[];
  value?: CaseValue;
  createdAt: Date;
  updatedAt: Date;
}

export type CaseStatus = 
  | 'intake'
  | 'assessment'
  | 'investigation'
  | 'verification'
  | 'legal_prep'
  | 'court_ready'
  | 'active_litigation'
  | 'settled'
  | 'closed';

export type CasePriority = 'standard' | 'high' | 'critical';

export interface CaseValue {
  amount: number;
  currency: 'EUR' | 'GBP' | 'USD';
  type: 'estimated' | 'claimed' | 'verified';
}

// ============================================================================
// CLIENT TYPES
// ============================================================================

export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: Address;
  jurisdiction: Jurisdiction;
  onboardedAt: Date;
  stage: ClientStage;
}

export type ClientStage = 
  | 'inquiry'
  | 'stage1_assessment'
  | 'stage2_full_service'
  | 'active'
  | 'completed';

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  county?: string;
  postcode: string;
  country: string;
}

// ============================================================================
// DOCUMENT TYPES
// ============================================================================

export interface Document {
  id: string;
  filename: string;
  type: DocumentType;
  mimeType: string;
  size: number;
  hash: string;
  verificationLevel: number;
  status: DocumentStatus;
  uploadedAt: Date;
  verifiedAt?: Date;
  metadata: DocumentMetadata;
}

export type DocumentType = 
  | 'loan_agreement'
  | 'mortgage_deed'
  | 'court_filing'
  | 'witness_statement'
  | 'expert_report'
  | 'correspondence'
  | 'financial_statement'
  | 'property_record'
  | 'company_filing'
  | 'other';

export type DocumentStatus = 
  | 'pending'
  | 'reviewing'
  | 'verified'
  | 'rejected'
  | 'requires_info';

export interface DocumentMetadata {
  source: string;
  receivedFrom: string;
  dateOfDocument?: string;
  parties?: string[];
  notes?: string;
}

// ============================================================================
// WITNESS TYPES
// ============================================================================

export interface Witness {
  id: string;
  name: string;
  type: WitnessType;
  status: WitnessStatus;
  affidavitStatus: AffidavitStatus;
  contactInfo: ContactInfo;
  cases: string[]; // Case IDs
  critical: boolean;
  notes?: string;
}

export type WitnessType = 'fact' | 'expert' | 'character';

export type WitnessStatus = 
  | 'identified'
  | 'contacted'
  | 'engaged'
  | 'ready'
  | 'unavailable';

export type AffidavitStatus = 
  | 'not_required'
  | 'drafting'
  | 'review'
  | 'pending_signature'
  | 'signed'
  | 'filed';

export interface ContactInfo {
  email?: string;
  phone?: string;
  address?: Address;
  preferredContact: 'email' | 'phone' | 'post';
}

// ============================================================================
// TIMELINE TYPES
// ============================================================================

export interface TimelineEvent {
  id: string;
  date: Date;
  type: TimelineEventType;
  title: string;
  description: string;
  entities: string[];
  documents?: string[];
  significance: 'low' | 'medium' | 'high';
  source: string;
}

export type TimelineEventType = 
  | 'document_received'
  | 'verification_complete'
  | 'witness_statement'
  | 'court_filing'
  | 'hearing'
  | 'judgment'
  | 'settlement'
  | 'payment'
  | 'correspondence'
  | 'investigation_milestone'
  | 'other';

// ============================================================================
// VERIFICATION TYPES
// ============================================================================

export interface VerificationResult {
  documentId: string;
  level: VerificationLevel;
  verified: boolean;
  findings: VerificationFinding[];
  certificate?: string;
  verifiedAt: Date;
  verifier: string;
}

export type VerificationLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface VerificationFinding {
  type: 'info' | 'warning' | 'critical' | 'verified';
  category: string;
  description: string;
  confidence: number;
}

// ============================================================================
// ACTIVITY TYPES
// ============================================================================

export interface Activity {
  id: string;
  timestamp: Date;
  type: ActivityType;
  action: string;
  caseId?: string;
  documentId?: string;
  userId: string;
  details?: Record<string, any>;
}

export type ActivityType = 
  | 'upload'
  | 'verification'
  | 'witness'
  | 'document'
  | 'complete'
  | 'download'
  | 'communication'
  | 'system';

// ============================================================================
// USER TYPES
// ============================================================================

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: Permission[];
  createdAt: Date;
  lastLoginAt?: Date;
}

export type UserRole = 
  | 'admin'
  | 'investigator'
  | 'verifier'
  | 'legal'
  | 'client'
  | 'viewer';

export type Permission = 
  | 'cases:read'
  | 'cases:write'
  | 'cases:delete'
  | 'documents:read'
  | 'documents:write'
  | 'documents:verify'
  | 'witnesses:read'
  | 'witnesses:write'
  | 'users:manage'
  | 'reports:generate'
  | 'admin:all';

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: ResponseMeta;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface ResponseMeta {
  page?: number;
  perPage?: number;
  total?: number;
  timestamp: Date;
}

// ============================================================================
// PRICING TYPES
// ============================================================================

export interface Pricing {
  stage1: PriceTier;
  stage2: PriceTier;
}

export interface PriceTier {
  eur: number;
  gbp: number;
  description: string;
  includes: string[];
}

export const PRICING: Pricing = {
  stage1: {
    eur: 200,
    gbp: 170,
    description: 'Initial Case Assessment',
    includes: [
      'Document review',
      'Preliminary verification',
      'Case viability assessment',
      'Recommendations report'
    ]
  },
  stage2: {
    eur: 2000,
    gbp: 1700,
    description: 'Full Legal Pack Preparation',
    includes: [
      'Full document verification (Level 10)',
      'Investigation report',
      'Witness coordination',
      'Legal pack for counsel',
      'VeriTech certification'
    ]
  }
};
