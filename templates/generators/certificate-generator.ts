/**
 * VeriTech Certificate Generator
 * Orb AI Limited
 * 
 * Generates court-ready verification certificates at all levels (1-10)
 */

export interface CertificateData {
  caseId: string;
  clientName: string;
  documentTitle: string;
  verificationLevel: number;
  verifiedBy: string;
  verifierQualifications: string;
  verificationDate: Date;
  findings: string[];
  conclusion: string;
  chainOfCustody: ChainOfCustodyEntry[];
  blockchainRef?: string;
}

export interface ChainOfCustodyEntry {
  timestamp: Date;
  action: string;
  performedBy: string;
  hash: string;
}

export function generateVeritechCertificate(data: CertificateData): string {
  const levelDescriptions: Record<number, string> = {
    1: 'Initial Intake - Document received and logged',
    2: 'Preliminary Review - Basic authenticity checks completed',
    3: 'Source Verification - Origin and provenance confirmed',
    4: 'Content Analysis - Detailed examination completed',
    5: 'Cross-Reference Check - Corroborated against known sources',
    6: 'Expert Review - Specialist analysis completed',
    7: 'Legal Compliance - Regulatory requirements verified',
    8: 'Multi-Source Corroboration - Independent verification obtained',
    9: 'Final Review - Comprehensive audit completed',
    10: 'Court-Ready Certification - Full VeriTech CVK 1100 compliance achieved',
  };

  const certificate = `
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║                    VERITECH VERIFICATION CERTIFICATE                         ║
║                           CVK 1100 PROTOCOL                                  ║
║                                                                              ║
║                         ORB AI LIMITED                                       ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  CERTIFICATE NUMBER: VTC-${data.caseId}-${Date.now().toString(36).toUpperCase()}
║                                                                              ║
║  VERIFICATION LEVEL: ${data.verificationLevel}/10                            ║
║  ${levelDescriptions[data.verificationLevel]}
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  DOCUMENT DETAILS                                                            ║
║  ────────────────                                                            ║
║  Title: ${data.documentTitle}
║  Case Reference: ${data.caseId}
║  Client: ${data.clientName}
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  VERIFICATION DETAILS                                                        ║
║  ────────────────────                                                        ║
║  Verified By: ${data.verifiedBy}
║  Qualifications: ${data.verifierQualifications}
║  Date: ${data.verificationDate.toISOString().split('T')[0]}
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  FINDINGS                                                                    ║
║  ────────                                                                    ║
${data.findings.map(f => `║  • ${f}`).join('\n')}
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  CONCLUSION                                                                  ║
║  ──────────                                                                  ║
║  ${data.conclusion}
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  CHAIN OF CUSTODY                                                            ║
║  ────────────────                                                            ║
${data.chainOfCustody.map(entry => 
`║  ${entry.timestamp.toISOString()} | ${entry.action}
║  By: ${entry.performedBy} | Hash: ${entry.hash.substring(0, 16)}...`
).join('\n')}
║                                                                              ║
${data.blockchainRef ? `╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  BLOCKCHAIN VERIFICATION                                                     ║
║  ───────────────────────                                                     ║
║  Reference: ${data.blockchainRef}
║  This certificate has been immutably recorded on the blockchain.             ║
║                                                                              ║` : ''}
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  LEGAL NOTICE                                                                ║
║  ────────────                                                                ║
║  This certificate is issued by Orb AI Limited under the VeriTech CVK 1100    ║
║  verification protocol. The verification process has been conducted in       ║
║  accordance with applicable laws and regulations. This document is intended  ║
║  for use as evidence in legal proceedings and has been prepared with the     ║
║  understanding that the verifier's primary duty is to the court.             ║
║                                                                              ║
║  The verifier confirms that:                                                 ║
║  1. They are qualified to provide this verification                          ║
║  2. They have no conflict of interest in this matter                         ║
║  3. Their opinion is objective and unbiased                                  ║
║  4. All statements are true to the best of their knowledge                   ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  SIGNATURE                                                                   ║
║  ─────────                                                                   ║
║                                                                              ║
║  _________________________________                                           ║
║  ${data.verifiedBy}
║  ${data.verifierQualifications}
║  Date: ${data.verificationDate.toISOString().split('T')[0]}
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝

© ${new Date().getFullYear()} Orb AI Limited. All rights reserved.
VeriTech® is a registered trademark of Orb AI Limited.
`;

  return certificate;
}

export function generateLevel10Certificate(data: CertificateData): string {
  // Level 10 is the highest level - Court Ready
  const enhancedData = {
    ...data,
    verificationLevel: 10,
  };
  
  return generateVeritechCertificate(enhancedData);
}

export function generateDocumentChecklist(caseType: string): string[] {
  const checklists: Record<string, string[]> = {
    vulture_fund: [
      'Original loan agreement',
      'All correspondence with original lender',
      'Notice of loan sale/assignment',
      'All correspondence with new servicer/owner',
      'Payment history records',
      'Property valuation documents',
      'Court filings (if any)',
      'Witness statements',
      'Bank statements showing payments',
      'Any settlement offers received',
    ],
    debt_recovery: [
      'Original credit agreement',
      'Statement of account',
      'Default notice',
      'All collection letters',
      'Proof of debt ownership',
      'Payment records',
      'Any court documents',
      'Correspondence with creditor',
    ],
    fraud: [
      'All relevant contracts',
      'Financial statements',
      'Bank records',
      'Email correspondence',
      'Witness statements',
      'Company registration documents',
      'Director information',
      'Any police reports',
    ],
    asset_tracing: [
      'Property deeds',
      'Company records',
      'Bank statements',
      'Share certificates',
      'Trust documents',
      'Offshore entity records',
      'Transfer documents',
      'Valuation reports',
    ],
    document_verification: [
      'Document to be verified',
      'Source information',
      'Chain of custody records',
      'Any related documents',
      'Authentication requirements',
    ],
  };

  return checklists[caseType] || checklists.document_verification;
}

export function generateClientEngagementLetter(
  clientName: string,
  caseType: string,
  jurisdiction: string,
  stage: 'stage1' | 'stage2'
): string {
  const stageDetails = {
    stage1: {
      fee: jurisdiction === 'UK' ? '£170' : '€200',
      scope: 'Initial case assessment and document review',
      deliverables: [
        'Preliminary case assessment report',
        'Document checklist',
        'Initial VeriTech analysis (Levels 1-3)',
        'Strategy recommendation',
        'WhatsApp coordination group setup',
      ],
    },
    stage2: {
      fee: jurisdiction === 'UK' ? '£1,700' : '€2,000',
      scope: 'Full VeriTech verification and case preparation',
      deliverables: [
        'Complete VeriTech verification (Levels 1-10)',
        'Court-ready evidence package',
        'Expert witness coordination',
        'Legal pack preparation',
        'Ongoing case management',
      ],
    },
  };

  const details = stageDetails[stage];

  return `
ENGAGEMENT LETTER

Orb AI Limited
Trading as Kavan AI / VeriTech
A Division of Playbook Corporation Limited

Date: ${new Date().toISOString().split('T')[0]}

Dear ${clientName},

RE: ENGAGEMENT FOR ${stage.toUpperCase()} SERVICES - ${caseType.toUpperCase().replace('_', ' ')}

Thank you for instructing Orb AI Limited ("we", "us", "our") to assist you with your matter.

1. SCOPE OF ENGAGEMENT

We have been engaged to provide ${details.scope} in relation to your ${caseType.replace('_', ' ')} matter.

2. SERVICES TO BE PROVIDED

Under this ${stage} engagement, we will provide the following services:

${details.deliverables.map((d, i) => `   ${i + 1}. ${d}`).join('\n')}

3. FEES

The fee for ${stage} services is ${details.fee}, payable in advance.

4. VERITECH VERIFICATION PROTOCOL

All verification work will be conducted using our proprietary VeriTech CVK 1100 protocol, which ensures:
- Court-admissible evidence standards
- Immutable audit trails
- Human-in-the-loop verification at all critical stages
- Compliance with applicable laws and regulations

5. CONFIDENTIALITY

All information provided to us will be treated as strictly confidential and will only be disclosed as necessary for the conduct of your matter or as required by law.

6. DATA PROTECTION

We process personal data in accordance with applicable data protection laws, including GDPR. Our privacy policy is available on request.

7. JURISDICTION

This engagement is governed by the laws of ${jurisdiction === 'IE' ? 'Ireland' : 'England and Wales'}.

8. ACCEPTANCE

Please confirm your acceptance of this engagement by signing below and returning a copy to us, along with payment of the ${stage} fee.

Yours sincerely,

_________________________________
For and on behalf of Orb AI Limited


ACCEPTANCE

I, ${clientName}, confirm that I have read and understood this engagement letter and agree to the terms set out herein.

Signature: _________________________________

Date: _________________________________

`;
}
