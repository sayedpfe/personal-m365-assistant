import { AzureOpenAI } from 'openai';
import config from '../config/app.config';

export interface AIResponse {
  content: string;
  tokensUsed: {
    prompt: number;
    completion: number;
    total: number;
  };
}

export class AzureOpenAIClient {
  private client: AzureOpenAI;

  constructor() {
    this.client = new AzureOpenAI({
      endpoint: config.azureOpenAI.endpoint,
      apiKey: config.azureOpenAI.apiKey,
      apiVersion: config.azureOpenAI.apiVersion,
      deployment: config.azureOpenAI.deployment,
    });
  }

  /**
   * Send a chat completion request to Azure OpenAI
   */
  async chat(
    systemPrompt: string,
    userMessage: string,
    options?: {
      temperature?: number;
      maxTokens?: number;
    }
  ): Promise<AIResponse> {
    try {
      const response = await this.client.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        temperature: options?.temperature ?? 0.7,
        max_tokens: options?.maxTokens ?? 500,
      });

      const choice = response.choices[0];
      if (!choice || !choice.message || !choice.message.content) {
        throw new Error('No response content from AI');
      }

      return {
        content: choice.message.content,
        tokensUsed: {
          prompt: response.usage?.prompt_tokens || 0,
          completion: response.usage?.completion_tokens || 0,
          total: response.usage?.total_tokens || 0,
        },
      };
    } catch (error) {
      console.error('❌ Azure OpenAI API error:', error);
      throw error;
    }
  }

  /**
   * Test the connection to Azure OpenAI
   */
  async testConnection(): Promise<boolean> {
    try {
      console.log('🔍 Testing Azure OpenAI connection...');

      const response = await this.chat(
        'You are a helpful assistant.',
        'Say "Hello! Connection successful." in exactly those words.',
        { temperature: 0, maxTokens: 50 }
      );

      console.log('✅ Azure OpenAI connection successful!');
      console.log(`   Response: ${response.content}`);
      console.log(`   Tokens used: ${response.tokensUsed.total}\n`);

      return true;
    } catch (error) {
      console.error('❌ Azure OpenAI connection failed:', error);
      return false;
    }
  }
}
