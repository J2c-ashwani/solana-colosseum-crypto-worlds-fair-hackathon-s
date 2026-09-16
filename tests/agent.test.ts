import { describe, it, expect } from 'vitest';
import { evaluateProject, ProjectSubmission } from '../src/agent';

describe('Colosseum Hackathon Agent Evaluation', () => {
  it('should accept a high-quality submission meeting all criteria', async () => {
    const submission: ProjectSubmission = {
      name: 'SolanaVN DeFi',
      githubUrl: 'https://github.com/test/solanavn',
      hasReadme: true,
      hasTestSuite: true,
      gtmPlanScore: 90,
      region: 'Hanoi'
    };

    const result = await evaluateProject(submission);
    expect(result.status).toBe('ACCEPTED');
    expect(result.score).toBeGreaterThanOrEqual(80);
  });

  it('should reject a submission missing a valid GitHub repository', async () => {
    const submission: ProjectSubmission = {
      name: 'Incomplete App',
      githubUrl: '',
      hasReadme: false,
      hasTestSuite: false,
      gtmPlanScore: 20,
      region: 'Da Nang'
    };

    const result = await evaluateProject(submission);
    expect(result.status).toBe('REJECTED');
    expect(result.score).toBe(0);
    expect(result.feedback).toContain('Invalid or missing public GitHub repository URL.');
  });

  it('should flag review required for submissions missing test suites', async () => {
    const submission: ProjectSubmission = {
      name: 'Partial App',
      githubUrl: 'https://github.com/test/partial',
      hasReadme: true,
      hasTestSuite: false,
      gtmPlanScore: 60,
      region: 'Vung Tau City'
    };

    const result = await evaluateProject(submission);
    expect(result.status).toBe('REVIEW_REQUIRED');
    expect(result.feedback).toContain('Automated test suite is missing or incomplete.');
  });
});