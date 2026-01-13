/**
 * VeriTech Verification Engine Tests
 * 
 * Owned by Orb AI Limited
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { 
  VerificationEngine, 
  VERIFICATION_LEVELS, 
  CONFIG,
  type VerificationRequest,
  type VerificationLevel
} from '../src/index';

describe('VeriTech Verification Engine', () => {
  let engine: VerificationEngine;

  beforeEach(() => {
    engine = new VerificationEngine();
  });

  describe('Configuration', () => {
    it('should have correct default configuration', () => {
      expect(CONFIG.maxLevel).toBe(10);
      expect(CONFIG.defaultJurisdiction).toBe('IE');
      expect(CONFIG.humanInTheLoop).toBe(true);
      expect(CONFIG.qualityStandard).toBe('CVK1100');
    });

    it('should have all 10 verification levels defined', () => {
      expect(Object.keys(VERIFICATION_LEVELS)).toHaveLength(10);
      for (let i = 1; i <= 10; i++) {
        expect(VERIFICATION_LEVELS[i as VerificationLevel]).toBeDefined();
        expect(VERIFICATION_LEVELS[i as VerificationLevel].name).toBeTruthy();
        expect(VERIFICATION_LEVELS[i as VerificationLevel].description).toBeTruthy();
      }
    });

    it('should enforce human-in-the-loop as mandatory', () => {
      expect(CONFIG.humanInTheLoop).toBe(true);
    });
  });

  describe('Verification Process', () => {
    it('should verify a document to Level 3 (Intake)', async () => {
      const request: VerificationRequest = {
        document: Buffer.from('test document content'),
        targetLevel: 3,
        jurisdiction: 'IE',
        caseId: 'TEST-2026-001'
      };

      const result = await engine.verify(request);

      expect(result.verified).toBe(true);
      expect(result.level).toBe(3);
      expect(result.findings.length).toBeGreaterThan(0);
      expect(result.courtReady).toBe(false);
    });

    it('should verify a document to Level 7 (Forensic)', async () => {
      const request: VerificationRequest = {
        document: Buffer.from('test document content'),
        targetLevel: 7,
        jurisdiction: 'UK',
        caseId: 'TEST-2026-002'
      };

      const result = await engine.verify(request);

      expect(result.verified).toBe(true);
      expect(result.level).toBe(7);
      expect(result.findings.length).toBeGreaterThan(0);
    });

    it('should verify a document to Level 10 (Maximum)', async () => {
      const request: VerificationRequest = {
        document: Buffer.from('test document content'),
        targetLevel: 10,
        jurisdiction: 'IE',
        caseId: 'TEST-2026-003'
      };

      const result = await engine.verify(request);

      expect(result.verified).toBe(true);
      expect(result.level).toBe(10);
      expect(result.courtReady).toBe(true);
      expect(result.certificate).toBeTruthy();
      expect(result.certificate).toContain('VERITECH-CVK1100');
    });

    it('should require human review for Level 8+', async () => {
      const request: VerificationRequest = {
        document: Buffer.from('test document content'),
        targetLevel: 8,
        jurisdiction: 'IE',
        caseId: 'TEST-2026-004'
      };

      const result = await engine.verify(request);

      const humanReviewFinding = result.findings.find(
        f => f.category === 'Human Review'
      );
      expect(humanReviewFinding).toBeDefined();
      expect(humanReviewFinding?.description).toContain('human-in-the-loop mandatory');
    });
  });

  describe('Certificate Generation', () => {
    it('should generate a certificate for Level 10 verified documents', async () => {
      const request: VerificationRequest = {
        document: Buffer.from('test document content'),
        targetLevel: 10,
        jurisdiction: 'IE',
        caseId: 'TEST-2026-005'
      };

      const verificationResult = await engine.verify(request);

      const certificate = await engine.generateCertificate({
        caseId: request.caseId,
        documents: [verificationResult],
        level: 10,
        certifier: 'VeriTech CVK 1100',
        jurisdiction: 'IE'
      });

      expect(certificate).toContain('VERITECH V✓ CERTIFICATION');
      expect(certificate).toContain('LEVEL 10 VERIFIED');
      expect(certificate).toContain(request.caseId);
      expect(certificate).toContain('Orb AI Limited');
    });

    it('should reject certificate generation for non-Level 10', async () => {
      const request: VerificationRequest = {
        document: Buffer.from('test document content'),
        targetLevel: 5,
        jurisdiction: 'IE',
        caseId: 'TEST-2026-006'
      };

      const verificationResult = await engine.verify(request);

      await expect(
        engine.generateCertificate({
          caseId: request.caseId,
          documents: [verificationResult],
          level: 5,
          certifier: 'VeriTech CVK 1100',
          jurisdiction: 'IE'
        })
      ).rejects.toThrow('Certificate generation requires Level 10 verification');
    });
  });

  describe('Jurisdiction Support', () => {
    const jurisdictions = ['IE', 'UK', 'NI', 'SC', 'WA', 'EN', 'ES', 'EU'] as const;

    jurisdictions.forEach(jurisdiction => {
      it(`should support ${jurisdiction} jurisdiction`, async () => {
        const request: VerificationRequest = {
          document: Buffer.from('test document content'),
          targetLevel: 5,
          jurisdiction,
          caseId: `TEST-${jurisdiction}-001`
        };

        const result = await engine.verify(request);
        expect(result.verified).toBe(true);
      });
    });
  });

  describe('Verification Levels', () => {
    it('should have correct phase assignments', () => {
      // Intake phase: Levels 1-3
      expect(VERIFICATION_LEVELS[1].phase).toBe('intake');
      expect(VERIFICATION_LEVELS[2].phase).toBe('intake');
      expect(VERIFICATION_LEVELS[3].phase).toBe('intake');

      // Verify phase: Levels 4-7
      expect(VERIFICATION_LEVELS[4].phase).toBe('verify');
      expect(VERIFICATION_LEVELS[5].phase).toBe('verify');
      expect(VERIFICATION_LEVELS[6].phase).toBe('verify');
      expect(VERIFICATION_LEVELS[7].phase).toBe('verify');

      // Certify phase: Levels 8-10
      expect(VERIFICATION_LEVELS[8].phase).toBe('certify');
      expect(VERIFICATION_LEVELS[9].phase).toBe('certify');
      expect(VERIFICATION_LEVELS[10].phase).toBe('certify');
    });
  });

  describe('Quality Standards', () => {
    it('should include verifier information in results', async () => {
      const request: VerificationRequest = {
        document: Buffer.from('test document content'),
        targetLevel: 5,
        jurisdiction: 'IE',
        caseId: 'TEST-2026-007'
      };

      const result = await engine.verify(request);
      expect(result.verifier).toContain('VeriTech CVK 1100');
    });

    it('should include timestamp in results', async () => {
      const request: VerificationRequest = {
        document: Buffer.from('test document content'),
        targetLevel: 5,
        jurisdiction: 'IE',
        caseId: 'TEST-2026-008'
      };

      const result = await engine.verify(request);
      expect(result.timestamp).toBeInstanceOf(Date);
    });

    it('should generate recommendations', async () => {
      const request: VerificationRequest = {
        document: Buffer.from('test document content'),
        targetLevel: 5,
        jurisdiction: 'IE',
        caseId: 'TEST-2026-009'
      };

      const result = await engine.verify(request);
      expect(result.recommendations).toBeDefined();
      expect(Array.isArray(result.recommendations)).toBe(true);
    });
  });
});
