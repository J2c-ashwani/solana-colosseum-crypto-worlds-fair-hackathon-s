import { evaluateProject, ProjectSubmission } from './agent';

async function main() {
  console.log('Initializing Superteam Vietnam Colosseum Agent...');
  
  const sampleSubmission: ProjectSubmission = {
    name: 'Anvils Protocol',
    githubUrl: 'https://github.com/superteam-vietnam/sample-project',
    hasReadme: true,
    hasTestSuite: true,
    gtmPlanScore: 85,
    region: 'Ho Chi Minh City'
  };

  try {
    const evaluation = await evaluateProject(sampleSubmission);
    console.log('Evaluation Result:', JSON.stringify(evaluation, null, 2));
  } catch (error) {
    console.error('Evaluation failed:', error);
    process.exit(1);
  }
}

main();