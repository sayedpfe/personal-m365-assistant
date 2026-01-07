import * as msal from '@azure/msal-node';
import config from '../config/app.config';

export interface AuthenticationResult {
  accessToken: string;
  expiresOn: Date;
  account: msal.AccountInfo;
}

export class MsalAuthProvider {
  private msalClient: msal.PublicClientApplication;
  private account: msal.AccountInfo | null = null;

  constructor() {
    const msalConfig: msal.Configuration = {
      auth: {
        clientId: config.msGraph.clientId,
        authority: config.msGraph.authority,
      },
      system: {
        loggerOptions: {
          loggerCallback: (level, message, containsPii) => {
            if (containsPii) return;
            if (config.app.logLevel === 'info' || config.app.logLevel === 'debug') {
              console.log(`[MSAL ${level}]: ${message}`);
            }
          },
          piiLoggingEnabled: false,
          logLevel: msal.LogLevel.Info,
        },
      },
    };

    this.msalClient = new msal.PublicClientApplication(msalConfig);
  }

  /**
   * Authenticate using device code flow
   * User will be prompted to visit a URL and enter a code
   */
  async authenticateDeviceCode(): Promise<AuthenticationResult> {
    console.log('\n🔐 Starting Microsoft 365 authentication...\n');

    const deviceCodeRequest: msal.DeviceCodeRequest = {
      deviceCodeCallback: (response) => {
        console.log('┌─────────────────────────────────────────────────────────────┐');
        console.log('│  Please authenticate with your Microsoft 365 account        │');
        console.log('├─────────────────────────────────────────────────────────────┤');
        console.log(`│  1. Open your browser and visit:                           │`);
        console.log(`│     ${response.verificationUri.padEnd(50)}│`);
        console.log(`│                                                             │`);
        console.log(`│  2. Enter this code:                                        │`);
        console.log(`│     ${response.userCode.padEnd(50)}│`);
        console.log(`│                                                             │`);
        console.log(`│  This code expires in ${response.expiresIn} seconds                       │`);
        console.log('└─────────────────────────────────────────────────────────────┘\n');
      },
      scopes: config.msGraph.scopes,
    };

    try {
      const response = await this.msalClient.acquireTokenByDeviceCode(deviceCodeRequest);

      if (!response) {
        throw new Error('No response from authentication');
      }

      this.account = response.account;

      console.log('✅ Authentication successful!');
      console.log(`   Account: ${response.account?.username}\n`);

      return {
        accessToken: response.accessToken,
        expiresOn: response.expiresOn || new Date(Date.now() + 3600000),
        account: response.account!,
      };
    } catch (error) {
      console.error('❌ Authentication failed:', error);
      throw error;
    }
  }

  /**
   * Get access token silently (from cache or refresh)
   */
  async getAccessTokenSilent(): Promise<string | null> {
    if (!this.account) {
      return null;
    }

    const silentRequest: msal.SilentFlowRequest = {
      account: this.account,
      scopes: config.msGraph.scopes,
    };

    try {
      const response = await this.msalClient.acquireTokenSilent(silentRequest);
      return response.accessToken;
    } catch (error) {
      console.log('Silent token acquisition failed, re-authentication needed');
      return null;
    }
  }

  /**
   * Get access token (silent if possible, otherwise prompt for device code)
   */
  async getAccessToken(): Promise<string> {
    // Try silent first
    const silentToken = await this.getAccessTokenSilent();
    if (silentToken) {
      return silentToken;
    }

    // Fall back to device code flow
    const result = await this.authenticateDeviceCode();
    return result.accessToken;
  }

  /**
   * Get current authenticated account
   */
  getAccount(): msal.AccountInfo | null {
    return this.account;
  }

  /**
   * Sign out and clear cache
   */
  async signOut(): Promise<void> {
    if (this.account) {
      await this.msalClient.getTokenCache().removeAccount(this.account);
      this.account = null;
      console.log('✅ Signed out successfully');
    }
  }
}
