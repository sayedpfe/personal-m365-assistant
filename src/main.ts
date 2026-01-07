import { validateConfig } from './config/app.config';
import { MsalAuthProvider } from './auth/MsalAuthProvider';
import { AzureOpenAIClient } from './ai/AzureOpenAIClient';
import { GraphClientFactory } from './connectors/GraphClientFactory';

/**
 * Main entry point for the Personal M365 Assistant
 * Phase 1: Test authentication and connectivity
 */
async function main() {
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║    Personal Microsoft 365 Assistant - Phase 1 Setup          ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');

  // Step 1: Validate configuration
  console.log('📋 Step 1: Validating configuration...');
  const validation = validateConfig();
  if (!validation.valid) {
    console.error('❌ Configuration validation failed:');
    validation.errors.forEach((error) => console.error(`   - ${error}`));
    process.exit(1);
  }
  console.log('✅ Configuration is valid\n');

  // Step 2: Test Azure OpenAI connection
  console.log('📋 Step 2: Testing Azure OpenAI connection...');
  const aiClient = new AzureOpenAIClient();
  const aiConnected = await aiClient.testConnection();
  if (!aiConnected) {
    console.error('❌ Failed to connect to Azure OpenAI');
    console.error('   Please check your credentials in .env file');
    process.exit(1);
  }

  // Step 3: Authenticate with Microsoft 365
  console.log('📋 Step 3: Authenticating with Microsoft 365...');
  const authProvider = new MsalAuthProvider();
  try {
    await authProvider.authenticateDeviceCode();
  } catch (error) {
    console.error('❌ Failed to authenticate with Microsoft 365');
    console.error('   Error:', error);
    process.exit(1);
  }

  // Step 4: Test Microsoft Graph connection
  console.log('📋 Step 4: Testing Microsoft Graph API connection...');
  const graphFactory = new GraphClientFactory(authProvider);
  const graphConnected = await graphFactory.testConnection();
  if (!graphConnected) {
    console.error('❌ Failed to connect to Microsoft Graph');
    process.exit(1);
  }

  // Success!
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║                    ✅ Phase 1 Complete!                       ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');
  console.log('Next steps:');
  console.log('  • Phase 2: Build Microsoft 365 connectors (Email, Calendar, Tasks)');
  console.log('  • Phase 3: Pattern learning engine');
  console.log('  • Phase 4: AI + Rule engine');
  console.log('  • Phase 5: Desktop GUI\n');

  console.log('Press Ctrl+C to exit...');
}

// Run the application
main().catch((error) => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});
