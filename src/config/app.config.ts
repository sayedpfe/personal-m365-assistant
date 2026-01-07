import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

export interface AppConfig {
  azureOpenAI: {
    endpoint: string;
    apiKey: string;
    deployment: string;
    apiVersion: string;
  };
  app: {
    pollingIntervalMinutes: number;
    logLevel: string;
    dataRetentionDays: number;
  };
  msGraph: {
    clientId: string; // Public client ID for device code flow
    authority: string;
    scopes: string[];
  };
}

const config: AppConfig = {
  azureOpenAI: {
    endpoint: process.env.AZURE_OPENAI_ENDPOINT || '',
    apiKey: process.env.AZURE_OPENAI_API_KEY || '',
    deployment: process.env.AZURE_OPENAI_DEPLOYMENT || 'gpt-4o',
    apiVersion: process.env.AZURE_OPENAI_API_VERSION || '2025-01-01-preview',
  },
  app: {
    pollingIntervalMinutes: parseInt(process.env.POLLING_INTERVAL_MINUTES || '15', 10),
    logLevel: process.env.LOG_LEVEL || 'info',
    dataRetentionDays: parseInt(process.env.DATA_RETENTION_DAYS || '90', 10),
  },
  msGraph: {
    // Microsoft's public client ID for device code flow
    // This is a well-known public client ID that doesn't require app registration
    clientId: '04b07795-8ddb-461a-bbee-02f9e1bf7b46', // Azure CLI client ID (public)
    authority: 'https://login.microsoftonline.com/common',
    scopes: [
      'User.Read',
      'Mail.ReadWrite',
      'Calendars.ReadWrite',
      'Tasks.ReadWrite',
      'offline_access',
    ],
  },
};

// Validate required configuration
export function validateConfig(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!config.azureOpenAI.endpoint) {
    errors.push('AZURE_OPENAI_ENDPOINT is not set in .env file');
  }
  if (!config.azureOpenAI.apiKey) {
    errors.push('AZURE_OPENAI_API_KEY is not set in .env file');
  }
  if (!config.azureOpenAI.deployment) {
    errors.push('AZURE_OPENAI_DEPLOYMENT is not set in .env file');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export default config;
