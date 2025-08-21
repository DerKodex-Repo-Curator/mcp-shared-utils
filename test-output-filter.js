const OutputFilter = require('./output-filter.js');
const assert = require('assert');

// Test git output filtering
function testGitFilter() {
  const filter = new OutputFilter({ maxLines: 10 });
  
  const gitOutput = `
commit abc123def456
Author: Test User <test@example.com>
Date: Mon Jul 26 2025

    Fix critical bug

 1234 files changed, 56789 insertions(+), 12345 deletions(-)
 
 src/file1.js | 123 +++
 src/file2.js | 456 ---
 ... (and 1232 more files)
`;

  const result = filter.filter(gitOutput, 'git');
  console.log('Git filter result:', result);
  
  assert(result.metadata.filtered === true);
  assert(result.metadata.gitStats.filesChanged === 1234);
  assert(result.result.includes('1234 files changed'));
}

// Test file filtering with truncation
function testFileFilter() {
  const filter = new OutputFilter({ maxLines: 5 });
  
  const fileContent = Array(100).fill(0).map((_, i) => `Line ${i + 1}`).join('\n');
  
  const result = filter.filter(fileContent, 'file');
  console.log('File filter result:', result);
  
  assert(result.metadata.truncated === true);
  assert(result.metadata.omittedLines === 95);
  assert(result.result.includes('... (95 lines omitted) ...'));
}

// Test JSON filtering
function testJsonFilter() {
  const filter = new OutputFilter({ maxChars: 100 });
  
  const bigJson = JSON.stringify({
    users: Array(1000).fill(0).map((_, i) => ({
      id: i,
      name: `User ${i}`,
      email: `user${i}@example.com`
    }))
  });
  
  const result = filter.filter(bigJson, 'json');
  console.log('JSON filter result:', result);
  
  assert(result.metadata.summarized === true);
}

// Test verbose mode
function testVerboseMode() {
  const filter = new OutputFilter({ verbose: true });
  
  const content = 'a'.repeat(10000);
  const result = filter.filter(content);
  
  assert(result.result === content);
  assert(result.metadata.filtered === false);
}

// Run tests
console.log('Running OutputFilter tests...\n');

try {
  testGitFilter();
  console.log('✓ Git filter test passed\n');
  
  testFileFilter();
  console.log('✓ File filter test passed\n');
  
  testJsonFilter();
  console.log('✓ JSON filter test passed\n');
  
  testVerboseMode();
  console.log('✓ Verbose mode test passed\n');
  
  console.log('All tests passed! 🎉');
} catch (error) {
  console.error('Test failed:', error);
  process.exit(1);
}
