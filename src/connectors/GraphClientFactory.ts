import { Client } from '@microsoft/microsoft-graph-client';
import 'isomorphic-fetch';
import { MsalAuthProvider } from '../auth/MsalAuthProvider';

export class GraphClientFactory {
  private authProvider: MsalAuthProvider;
  private graphClient: Client | null = null;

  constructor(authProvider: MsalAuthProvider) {
    this.authProvider = authProvider;
  }

  /**
   * Get or create a Microsoft Graph client
   */
  async getClient(): Promise<Client> {
    if (this.graphClient) {
      return this.graphClient;
    }

    // Create a new client with auth provider
    this.graphClient = Client.init({
      authProvider: async (done) => {
        try {
          const token = await this.authProvider.getAccessToken();
          done(null, token);
        } catch (error) {
          done(error as Error, null);
        }
      },
    });

    return this.graphClient;
  }

  /**
   * Test connection to Microsoft Graph
   */
  async testConnection(): Promise<boolean> {
    try {
      console.log('🔍 Testing Microsoft Graph connection...');

      const client = await this.getClient();
      const me = await client.api('/me').get();

      console.log('✅ Microsoft Graph connection successful!');
      console.log(`   User: ${me.displayName} (${me.mail || me.userPrincipalName})\n`);

      return true;
    } catch (error) {
      console.error('❌ Microsoft Graph connection failed:', error);
      return false;
    }
  }
}
