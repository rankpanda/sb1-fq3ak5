import { KeywordData } from '../components/semrush/types';

const WEBHOOK_URL = 'https://hook.integrator.boost.space/0w7dejdvm21p78a4lf4wdjkfi8dlvk25';
const RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 1000; // 1 second

export class WebhookError extends Error {
  constructor(message: string, public statusCode?: number, public originalError?: unknown) {
    super(message);
    this.name = 'WebhookError';
  }
}

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const webhookService = {
  async sendKeywordData(keywords: KeywordData[]): Promise<boolean> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= RETRY_ATTEMPTS; attempt++) {
      try {
        // Format the data according to the required structure
        const payload = {
          Keywords: keywords.map(kw => ({
            'Keyword Target': kw.keyword,
            'Volume': kw.volume,
            'KD': kw.difficulty
          }))
        };

        const response = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new WebhookError(
            `Server responded with ${response.status}: ${response.statusText}`,
            response.status
          );
        }

        return true;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error occurred');
        
        if (attempt < RETRY_ATTEMPTS) {
          await delay(RETRY_DELAY * attempt);
          continue;
        }
      }
    }

    throw new WebhookError(
      `Failed to send data to webhook after ${RETRY_ATTEMPTS} attempts`,
      lastError instanceof WebhookError ? lastError.statusCode : undefined,
      lastError
    );
  }
};