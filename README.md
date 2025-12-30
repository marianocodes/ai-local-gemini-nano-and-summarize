# Angular AI Local

This project demonstrates how to use the built-in AI capabilities in Google Chrome (Gemini Nano) within an Angular application.

It features a Blog Post page that uses the **Summarizer API** to generate a "TL;DR" summary of the content and the **Prompt API** (Language Model) to format that summary into structured HTML. All of this runs locally in the browser, preserving privacy and reducing latency.

## Prerequisites: Enabling Chrome AI

To run this application and see the AI features in action, you need to use Google Chrome (or Chrome Canary) and enable the following flags:

1.  Open `chrome://flags` in a new tab.
2.  Enable **chrome://flags/#optimization-guide-on-device-model** and **chrome://flags/#prompt-api-for-gemini-nano-multimodal-input**.
3.  Relaunch Chrome.

*Note: These APIs are experimental and may require joining an origin trial or specific browser versions.*

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
