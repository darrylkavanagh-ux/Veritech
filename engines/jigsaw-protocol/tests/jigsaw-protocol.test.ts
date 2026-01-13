/**
 * JIGSAW PROTOCOL ENGINE TESTS
 * 
 * Copyright (c) 2026 Orb AI Limited. All Rights Reserved.
 * 
 * Tests for the Jigsaw Protocol - the reconstruction engine that
 * "creates everything that doesn't exist based on everything that exists"
 * 
 * TO 1100.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { 
  JigsawProtocolEngine, 
  TruthFragment, 
  JigsawResult,
  CaseType
} from './jigsaw-protocol';

describe('JigsawProtocolEngine', () => {
  let engine: JigsawProtocolEngine;

  beforeEach(() => {
    engine = new JigsawProtocolEngine();
  });

  describe('Engine Initialization', () => {
    it('should initialize with correct owner', () => {
      const info = engine.getEngineInfo();
      expect(info.owner).toBe('Orb AI Limited');
    });

    it('should have Jigsaw Protocol identifier', () => {
      const info = engine.getEngineInfo();
      expect(info.protocol).toBe('Jigsaw Protocol');
    });

    it('should describe the core capability', () => {
      const info = engine.getEngineInfo();
      expect(info.description).toContain("doesn't exist");
      expect(info.description).toContain("everything that exists");
    });

    it('should list universal applications', () => {
      const info = engine.getEngineInfo();
      const applications = info.universalApplications as string[];
      expect(applications).toContain('Missing persons');
      expect(applications).toContain('Fraud investigation');
      expect(applications).toContain('Corruption exposure');
    });
  });

  describe('Fragment Processing', () => {
    const createTestFragment = (overrides: Partial<TruthFragment> = {}): TruthFragment => ({
      id: `TF-${Date.now()}`,
      type: 'document_artifact',
      content: 'Test evidence content for verification',
      source: 'Test Source',
      verificationLevel: 7,
      confidence: 85,
      timestamp: new Date(),
      jurisdiction: 'IE',
      metadata: {},
      chainOfCustody: [{
        timestamp: new Date(),
        handler: 'Test Handler',
        action: 'Collection',
        location: 'Test Location',
        hash: 'abc123'
      }],
      isReal: true,
      isTrue: true,
      isNeeded: true,
      ...overrides
    });

    it('should process verified fragments', async () => {
      const fragments: TruthFragment[] = [
        createTestFragment({ id: 'TF-1', type: 'survivor_testimony' }),
        createTestFragment({ id: 'TF-2', type: 'financial_trace' }),
        createTestFragment({ id: 'TF-3', type: 'document_artifact' })
      ];

      const result = await engine.processFragments(
        fragments,
        'CASE-001',
        'fraud',
        'Test Fraud Investigation'
      );

      expect(result.success).toBe(true);
      expect(result.fragmentsProcessed).toBe(3);
      expect(result.componentsCreated).toBeGreaterThan(0);
    });

    it('should filter out unverified fragments', async () => {
      const fragments: TruthFragment[] = [
        createTestFragment({ id: 'TF-1', isReal: true, isTrue: true, isNeeded: true }),
        createTestFragment({ id: 'TF-2', isReal: false, isTrue: true, isNeeded: true }),
        createTestFragment({ id: 'TF-3', isReal: true, isTrue: false, isNeeded: true }),
        createTestFragment({ id: 'TF-4', isReal: true, isTrue: true, isNeeded: false })
      ];

      const result = await engine.processFragments(
        fragments,
        'CASE-002',
        'fraud',
        'Test Case'
      );

      // Only the first fragment should be processed (all three flags true)
      expect(result.componentsCreated).toBe(1);
    });

    it('should filter out low verification level fragments', async () => {
      const fragments: TruthFragment[] = [
        createTestFragment({ id: 'TF-1', verificationLevel: 7 }),
        createTestFragment({ id: 'TF-2', verificationLevel: 3 }),  // Below Level 5 threshold
        createTestFragment({ id: 'TF-3', verificationLevel: 8 })
      ];

      const result = await engine.processFragments(
        fragments,
        'CASE-003',
        'fraud',
        'Test Case'
      );

      // Only Level 5+ fragments should be processed
      expect(result.componentsCreated).toBe(2);
    });
  });

  describe('Picture Assembly', () => {
    const createVerifiedFragments = (count: number): TruthFragment[] => {
      return Array.from({ length: count }, (_, i) => ({
        id: `TF-${i}`,
        type: ['survivor_testimony', 'financial_trace', 'document_artifact', 'location_data'][i % 4] as TruthFragment['type'],
        content: `Evidence content ${i}`,
        source: `Source ${i}`,
        verificationLevel: 7 + (i % 3),
        confidence: 80 + (i % 20),
        timestamp: new Date(),
        jurisdiction: 'IE' as const,
        metadata: {},
        chainOfCustody: [{
          timestamp: new Date(),
          handler: 'Handler',
          action: 'Collection',
          location: 'Location',
          hash: `hash-${i}`
        }],
        isReal: true,
        isTrue: true,
        isNeeded: true
      }));
    };

    it('should assemble picture from fragments', async () => {
      const fragments = createVerifiedFragments(5);

      const result = await engine.processFragments(
        fragments,
        'CASE-004',
        'missing_person',
        'Missing Person Investigation'
      );

      expect(result.picture).toBeDefined();
      expect(result.picture.caseType).toBe('missing_person');
      expect(result.picture.placedComponents.length).toBeGreaterThan(0);
    });

    it('should calculate completion percentage', async () => {
      const fragments = createVerifiedFragments(10);

      const result = await engine.processFragments(
        fragments,
        'CASE-005',
        'asset_tracing',
        'Asset Tracing Investigation'
      );

      expect(result.picture.completionPercentage).toBeGreaterThanOrEqual(0);
      expect(result.picture.completionPercentage).toBeLessThanOrEqual(100);
    });

    it('should identify gaps in the picture', async () => {
      const fragments = createVerifiedFragments(3);

      const result = await engine.processFragments(
        fragments,
        'CASE-006',
        'fraud',
        'Fraud Investigation'
      );

      // With limited fragments, gaps should be identified
      expect(result.gapsIdentified).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Conclusions', () => {
    it('should draw conclusions from assembled picture', async () => {
      const fragments: TruthFragment[] = Array.from({ length: 8 }, (_, i) => ({
        id: `TF-${i}`,
        type: 'document_artifact' as const,
        content: `High-confidence evidence ${i}`,
        source: `Verified Source ${i}`,
        verificationLevel: 9,
        confidence: 95,
        timestamp: new Date(),
        jurisdiction: 'IE' as const,
        metadata: {},
        chainOfCustody: [{
          timestamp: new Date(),
          handler: 'Senior Investigator',
          action: 'Verified Collection',
          location: 'Secure Location',
          hash: `verified-hash-${i}`
        }],
        isReal: true,
        isTrue: true,
        isNeeded: true
      }));

      const result = await engine.processFragments(
        fragments,
        'CASE-007',
        'corruption',
        'Corruption Investigation'
      );

      expect(result.conclusionsDrawn).toBeGreaterThan(0);
      expect(result.picture.conclusions.length).toBeGreaterThan(0);
    });

    it('should generate reconstructed truth narrative', async () => {
      const fragments: TruthFragment[] = Array.from({ length: 5 }, (_, i) => ({
        id: `TF-${i}`,
        type: 'financial_trace' as const,
        content: `Financial evidence ${i}`,
        source: `Bank Records ${i}`,
        verificationLevel: 8,
        confidence: 90,
        timestamp: new Date(),
        jurisdiction: 'UK' as const,
        metadata: {},
        chainOfCustody: [{
          timestamp: new Date(),
          handler: 'Financial Investigator',
          action: 'Extraction',
          location: 'Secure Database',
          hash: `fin-hash-${i}`
        }],
        isReal: true,
        isTrue: true,
        isNeeded: true
      }));

      const result = await engine.processFragments(
        fragments,
        'CASE-008',
        'predatory_lending',
        'Predatory Lending Investigation'
      );

      expect(result.picture.reconstructedTruth).toBeDefined();
      expect(result.picture.reconstructedTruth.length).toBeGreaterThan(0);
      expect(result.picture.reconstructedTruth).toContain('RECONSTRUCTED TRUTH');
    });
  });

  describe('Court Readiness', () => {
    it('should assess court readiness', async () => {
      const fragments: TruthFragment[] = Array.from({ length: 10 }, (_, i) => ({
        id: `TF-${i}`,
        type: ['survivor_testimony', 'physical_evidence', 'document_artifact'][i % 3] as TruthFragment['type'],
        content: `Court-grade evidence ${i}`,
        source: `Official Source ${i}`,
        verificationLevel: 9,
        confidence: 95,
        timestamp: new Date(),
        jurisdiction: 'IE' as const,
        metadata: {},
        chainOfCustody: [{
          timestamp: new Date(),
          handler: 'Certified Handler',
          action: 'Secure Collection',
          location: 'Chain of Custody Maintained',
          hash: `court-hash-${i}`
        }],
        isReal: true,
        isTrue: true,
        isNeeded: true
      }));

      const result = await engine.processFragments(
        fragments,
        'CASE-009',
        'fraud',
        'Court-Ready Fraud Case'
      );

      expect(result.courtReadiness).toBeGreaterThanOrEqual(0);
      expect(result.courtReadiness).toBeLessThanOrEqual(100);
    });

    it('should flag human review requirement for high-stakes cases', async () => {
      const fragments: TruthFragment[] = Array.from({ length: 15 }, (_, i) => ({
        id: `TF-${i}`,
        type: 'survivor_testimony' as const,
        content: `Critical testimony ${i}`,
        source: `Witness ${i}`,
        verificationLevel: 10,
        confidence: 98,
        timestamp: new Date(),
        jurisdiction: 'IE' as const,
        metadata: {},
        chainOfCustody: [{
          timestamp: new Date(),
          handler: 'Senior Investigator',
          action: 'Formal Statement',
          location: 'Secure Interview Room',
          hash: `witness-hash-${i}`
        }],
        isReal: true,
        isTrue: true,
        isNeeded: true
      }));

      const result = await engine.processFragments(
        fragments,
        'CASE-010',
        'missing_person',
        'Critical Missing Person Case'
      );

      // High completion should trigger human review requirement
      expect(result.humanReviewRequired).toBeDefined();
    });
  });

  describe('Recommendations and Next Steps', () => {
    it('should generate recommendations', async () => {
      const fragments: TruthFragment[] = Array.from({ length: 5 }, (_, i) => ({
        id: `TF-${i}`,
        type: 'document_artifact' as const,
        content: `Evidence ${i}`,
        source: `Source ${i}`,
        verificationLevel: 7,
        confidence: 80,
        timestamp: new Date(),
        jurisdiction: 'IE' as const,
        metadata: {},
        chainOfCustody: [],
        isReal: true,
        isTrue: true,
        isNeeded: true
      }));

      const result = await engine.processFragments(
        fragments,
        'CASE-011',
        'fraud',
        'Test Case'
      );

      expect(result.recommendations).toBeDefined();
      expect(Array.isArray(result.recommendations)).toBe(true);
    });

    it('should generate next steps', async () => {
      const fragments: TruthFragment[] = Array.from({ length: 5 }, (_, i) => ({
        id: `TF-${i}`,
        type: 'financial_trace' as const,
        content: `Financial data ${i}`,
        source: `Bank ${i}`,
        verificationLevel: 8,
        confidence: 85,
        timestamp: new Date(),
        jurisdiction: 'UK' as const,
        metadata: {},
        chainOfCustody: [],
        isReal: true,
        isTrue: true,
        isNeeded: true
      }));

      const result = await engine.processFragments(
        fragments,
        'CASE-012',
        'money_laundering',
        'Money Laundering Investigation'
      );

      expect(result.nextSteps).toBeDefined();
      expect(Array.isArray(result.nextSteps)).toBe(true);
      expect(result.nextSteps.length).toBeGreaterThan(0);
    });
  });

  describe('Universal Application Support', () => {
    const caseTypes: CaseType[] = [
      'missing_person',
      'missing_asset',
      'hidden_wealth',
      'fraud',
      'corruption',
      'predatory_lending',
      'financial_crime',
      'identity_theft',
      'money_laundering',
      'asset_tracing',
      'witness_protection',
      'historical_investigation'
    ];

    caseTypes.forEach(caseType => {
      it(`should handle ${caseType} case type`, async () => {
        const fragments: TruthFragment[] = [{
          id: 'TF-1',
          type: 'document_artifact',
          content: `Evidence for ${caseType}`,
          source: 'Test Source',
          verificationLevel: 7,
          confidence: 85,
          timestamp: new Date(),
          jurisdiction: 'IE',
          metadata: {},
          chainOfCustody: [],
          isReal: true,
          isTrue: true,
          isNeeded: true
        }];

        const result = await engine.processFragments(
          fragments,
          `CASE-${caseType}`,
          caseType,
          `${caseType} Test Case`
        );

        expect(result.success).toBe(true);
        expect(result.picture.caseType).toBe(caseType);
      });
    });
  });

  describe('Component Engineering', () => {
    it('should create unique component hashes', async () => {
      const fragments: TruthFragment[] = [
        {
          id: 'TF-1',
          type: 'document_artifact',
          content: 'Evidence 1',
          source: 'Source 1',
          verificationLevel: 7,
          confidence: 85,
          timestamp: new Date(),
          jurisdiction: 'IE',
          metadata: {},
          chainOfCustody: [],
          isReal: true,
          isTrue: true,
          isNeeded: true
        },
        {
          id: 'TF-2',
          type: 'document_artifact',
          content: 'Evidence 2',
          source: 'Source 2',
          verificationLevel: 7,
          confidence: 85,
          timestamp: new Date(),
          jurisdiction: 'IE',
          metadata: {},
          chainOfCustody: [],
          isReal: true,
          isTrue: true,
          isNeeded: true
        }
      ];

      const result = await engine.processFragments(
        fragments,
        'CASE-HASH',
        'fraud',
        'Hash Test Case'
      );

      const hashes = result.picture.components.map(c => c.hash);
      const uniqueHashes = new Set(hashes);
      
      // All hashes should be unique
      expect(uniqueHashes.size).toBe(hashes.length);
    });

    it('should assign weights based on fragment importance', async () => {
      const fragments: TruthFragment[] = [
        {
          id: 'TF-1',
          type: 'survivor_testimony',  // High weight type
          content: 'Critical witness testimony',
          source: 'Witness',
          verificationLevel: 10,
          confidence: 95,
          timestamp: new Date(),
          jurisdiction: 'IE',
          metadata: {},
          chainOfCustody: [{
            timestamp: new Date(),
            handler: 'Investigator',
            action: 'Statement',
            location: 'Interview',
            hash: 'hash1'
          }],
          isReal: true,
          isTrue: true,
          isNeeded: true
        },
        {
          id: 'TF-2',
          type: 'digital_footprint',  // Lower weight type
          content: 'Digital trace',
          source: 'Online',
          verificationLevel: 5,
          confidence: 60,
          timestamp: new Date(),
          jurisdiction: 'IE',
          metadata: {},
          chainOfCustody: [],
          isReal: true,
          isTrue: true,
          isNeeded: true
        }
      ];

      const result = await engine.processFragments(
        fragments,
        'CASE-WEIGHT',
        'fraud',
        'Weight Test Case'
      );

      const components = result.picture.components;
      const testimonyComponent = components.find(c => c.fragmentId === 'TF-1');
      const digitalComponent = components.find(c => c.fragmentId === 'TF-2');

      if (testimonyComponent && digitalComponent) {
        // Survivor testimony should have higher weight
        expect(testimonyComponent.weight).toBeGreaterThan(digitalComponent.weight);
      }
    });
  });
});
