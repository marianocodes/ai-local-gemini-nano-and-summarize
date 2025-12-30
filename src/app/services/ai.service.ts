import { Injectable } from '@angular/core';

declare const Summarizer: any;
declare const LanguageModel: any;

const schema = {
    "type": "object",
    "required": ["type", "items"],
    "properties": {
        "type": {
            "type": "string",
            "enum": ["bullet_list"],
            "description": "Identifies the content as a bullet list"
        },
        "items": {
            "type": "array",
            "minItems": 1,
            "items": {
                "type": "string",
                "minLength": 1
            },
            "description": "Each entry is one bullet item, without bullet symbols"
        }
    },
    "additionalProperties": false
}

@Injectable({
    providedIn: 'root'
})
export class AiService {

    async generateTlDr(content: string): Promise<string[]> {
        const session = await this.createSummarizerSession();
        const summary = await session.summarize(content, {
            context: 'This article is intended for a tech-savvy audience.',
        });

        session.destroy();

        const lmSession = await this.createLanguageModelSession();
        const result = await lmSession.prompt(summary, { responseConstraint: schema });

        lmSession.destroy();

        const parsed = JSON.parse(result);
        return parsed?.items || [];
    }

    private async createSummarizerSession() {
        return await Summarizer.create({
            type: 'key-points',
            length: 'short',
            expectedInputLanguages: ['en'],
            outputLanguage: 'en',
            expectedContextLanguages: ['en'],
            sharedContext: 'About AI and Agentic AI'
        });
    }

    private async createLanguageModelSession() {
        return await LanguageModel.create({
            initialPrompts: [
                { role: 'system', content: 'Convert this bullets into html. Return only the HTML' }
            ],
        });
    }
}
