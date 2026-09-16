export interface ProjectSubmission {
  name: string;
  githubUrl: string;
  hasReadme: boolean;
  hasTestSuite: boolean;
  gtmPlanScore: number;
  region: 'Hanoi' | 'Da Nang' | 'Ho Chi Minh City' | 'Vung Tau City';
}

export interface EvaluationResult {
  status: 'ACCEPTED' | 'REJECTED' | 'REVIEW_REQUIRED';
  score: number;
  feedback: string[];
}

export async function evaluateProject(submission: ProjectSubmission): Promise<EvaluationResult> {
  const feedback: string[] = [];
  let score = 0;

  if (!submission.githubUrl || !submission.githubUrl.includes('github.com')) {
    return {
      status: 'REJECTED',
      score: 0,
      feedback: ['Invalid or missing public GitHub repository URL.']
    };
  }

  score += 30;

  if (submission.hasReadme) {
    score += 20;
  } else {
    feedback.push('Missing comprehensive README.md documentation.');
  }

  if (submission.hasTestSuite) {
    score += 25;
  } else {
    feedback.push('Automated test suite is missing or incomplete.');
  }

  score += Math.min(25, Math.floor(submission.gtmPlanScore * 0.25));

  let status: 'ACCEPTED' | 'REJECTED' | 'REVIEW_REQUIRED' = 'REVIEW_REQUIRED';
  if (score >= 80) {
    status = 'ACCEPTED';
  } else if (score < 50) {
    status = 'REJECTED';
  }

  feedback.push(`Regional Hub: ${submission.region} verified.`);

  return {
    status,
    score,
    feedback
  };
}