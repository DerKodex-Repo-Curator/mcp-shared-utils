# OutputFilter Integration Guide

## Installation

```bash
npm install ../mcp-shared-utils
```

## Basic Usage

```javascript
const { OutputFilter } = require('mcp-shared-utils');

// In your tool's handler
async function handleExecute(params) {
  const filter = new OutputFilter({
    verbose: params.verbose || false,
    maxLines: params.maxLines || 50,
    maxChars: params.maxChars || 5000
  });
  
  // Execute command
  const output = await executeCommand(params.command);
  
  // Filter output based on command type
  const commandType = detectCommandType(params.command);
  const filtered = filter.filter(output, commandType);
  
  // Return filtered result with metadata
  return {
    success: true,
    ...filtered  // includes 'result' and 'metadata'
  };
}

function detectCommandType(command) {
  if (command.includes('git')) return 'git';
  if (command.includes('cat') || command.includes('less')) return 'file';
  if (command.includes('npm') || command.includes('node')) return 'command';
  return 'generic';
}
```

## Tool Schema Update

Add verbose parameter to your tool schema:

```javascript
{
  name: 'execute',
  description: 'Execute a command',
  inputSchema: {
    type: 'object',
    properties: {
      command: {
        type: 'string',
        description: 'Command to execute'
      },
      verbose: {
        type: 'boolean',
        description: 'Return full output without filtering',
        default: false
      }
    }
  }
}
```

## Example Integration for brain_execute

```javascript
// Before
const output = execSync(command, { encoding: 'utf8' });
return { output };

// After
const { OutputFilter } = require('mcp-shared-utils');

const output = execSync(command, { encoding: 'utf8' });
const filter = new OutputFilter({ verbose: params.verbose });
const filtered = filter.filter(output, 'command');

return {
  ...filtered,
  command,
  success: true
};
```

## Benefits

1. **Automatic truncation** - Prevents context flooding
2. **Type-aware filtering** - Git, JSON, files handled intelligently  
3. **Metadata preservation** - Know what was filtered
4. **Opt-in verbose mode** - Full output when needed
5. **Consistent UX** - Same filtering behavior across all tools
