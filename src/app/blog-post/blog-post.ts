import { Component, OnInit, signal } from '@angular/core';

declare const Summarizer: any;
declare const LanguageModel: any;

const content = `
    <p>
      In the rapidly evolving world of software development, a new paradigm is emerging: Agentic AI. 
      Unlike traditional coding assistants that simply autocomplete lines of code, Agentic AI possesses 
      the ability to understand high-level goals, break them down into actionable steps, and execute them autonomously.
    </p><br />

    <p>
      Imagine a scenario where you simply tell your AI partner, "Refactor this legacy authentication module to use OAuth 2.0." 
      Instead of just giving you a snippet, the agent analyzes the existing codebase, identifies dependencies, drafts a plan, 
      writes the code, runs the tests, and even handles the migration of user data. This is not science fiction; it is the 
      reality we are building today.
    </p><br />

    <h3>The Shift from Writing to Guiding</h3>
    <p>
      This shift fundamentally changes the role of the developer. We are moving from being the sole authors of code to becoming 
      architects and reviewers. Our focus shifts to defining the "what" and "why," leaving the "how" to our capable AI agents. 
      This allows us to tackle more complex problems and innovate at a speed previously unimagined.
    </p><br />

    <p>
      As we embrace this new era, the synergy between human creativity and machine efficiency will unlock potential that we are 
      only just beginning to understand. Welcome to the future of coding.
    </p>
`

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

@Component({
  selector: 'app-blog-post',
  imports: [],
  templateUrl: './blog-post.html',
  styleUrl: './blog-post.css',
})
export class BlogPost implements OnInit {
  private sessionSummarize?: typeof Summarizer;
  private sessionLanguageModel?: typeof LanguageModel;
  public readonly postContent = content;
  public tltrContent = signal<string[]>([]);

  public async ngOnInit(): Promise<void> {
    this.sessionSummarize = await Summarizer.create({
      type: 'key-points',
      length: 'short',
      expectedInputLanguages: ['en'],
      outputLanguage: 'en',
      expectedContextLanguages: ['en'],
      sharedContext: 'About AI and Agentic AI'
    });

    const summary = await this.sessionSummarize.summarize(content, {
      context: 'This article is intended for a tech-savvy audience.',
    });

    console.log(`Summary result: ${summary}`);

    this.sessionLanguageModel = await LanguageModel.create({
      initialPrompts: [
        { role: 'system', content: 'Convert this bullets into html. Return only the HTML' }
      ],
    });

    const formattedResult = await this.sessionLanguageModel.prompt(summary, { responseConstraint: schema });

    const parsedResult = JSON.parse(formattedResult);

    console.log(`Structured Output. Bullets: ${parsedResult?.items}`);

    this.tltrContent.set(parsedResult?.items || []);
    this.sessionLanguageModel?.destroy()
    this.sessionSummarize?.destroy();
  }
}
