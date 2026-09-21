ClaudeCertPrep.register({
  id: 'ccar-f',
  code: 'CCAR-F',
  name: 'Claude Certified Architect — Foundations',
  tier: 'Foundations',
  order: 3,
  blurb: 'Designing production Claude systems: agentic loops, subagents, tool and MCP boundaries, Claude Code configuration, and what happens when a context window fills mid-task.',
  audience: 'Solution architects and technical practitioners who design Claude-powered agentic systems. No prerequisite exam and no formal experience bar, but the questions assume you have built something real and hit these problems yourself.',
  facts: {
    items: 60, minutes: 120, pass: 720, scaleRange: '100–1,000',
    fee: '$125 USD', validity: '12 months', format: 'Multiple-choice and multiple-response, scenario-led'
  },
  note: 'This is the only one of the four that is explicitly scenario-based. Expect long situational stems rather than definition recall.',

  domains: [
    {
      id: 'd1', n: 1, weight: 27,
      title: 'Agentic Architecture & Orchestration',
      objectives: [
        'How an agentic loop runs and, more importantly, how it terminates',
        'Choosing between single-agent, orchestrator-worker, and parallel patterns',
        'When a subagent earns its own context window, and what to pass into it',
        'Enforcing workflow order and handing off cleanly between stages',
        'Hooks in the Agent SDK for deterministic control around model turns',
        'Decomposing a large task into stages a model can actually finish',
        'Persisting and resuming session state across interruptions'
      ],
      notes: [
        'An agentic loop is just: model decides, tool runs, result returns, model decides again. The architectural question is never whether the loop works — it is what stops it. Every production loop needs a termination condition that does not depend on the model choosing to stop: a maximum iteration count, a budget ceiling, a satisfied success predicate, or an explicit completion tool the model must call. A loop whose only exit is "Claude stops calling tools" will eventually spin.',
        'Reach for a **workflow** when the steps are known in advance and the order is fixed. Reach for an **agent** when the path depends on what is discovered along the way. Most real systems are a workflow with one or two agentic stages inside it, not a single agent trusted with everything. Choosing agentic where a deterministic pipeline would do is the most common over-engineering error on this exam.',
        'A **subagent** buys you a clean context window and a narrow instruction set. That is the whole value proposition. It costs you a round trip, some latency, and the risk that the parent loses detail the child discovered. So a subagent earns its place when the work it does would otherwise flood the parent with tokens it does not need afterwards — searching a large codebase, reading many files to answer one question. Pass it a precise task and the minimum context; get back a summary, not a transcript.',
        '**Orchestrator-worker** suits variable, decomposable work where the orchestrator decides at runtime how many workers to spawn. **Parallel fan-out** suits fixed, independent subtasks. **Sequential chaining** suits work where each stage genuinely needs the previous stage\'s output. Parallelism only helps when the subtasks do not need to see each other — if worker B needs worker A\'s finding, you have a chain, not a fan-out.',
        'Hooks give you deterministic code around a non-deterministic model. Use them for the things you cannot ask the model to remember: blocking a write to a protected path, running a formatter after every edit, logging every tool call for audit. A rule enforced in a hook holds every time; the same rule written in a prompt holds most of the time.',
        'Session state matters because long agentic runs get interrupted. Persist enough to resume — the task, what has been done, what remains — and design stages so that resuming re-enters at a stage boundary rather than mid-thought.'
      ],
      traps: [
        'Adding a subagent to "save context" when the parent needs the detailed output anyway. You pay the round trip and still carry the tokens.',
        'Treating an iteration cap as the primary termination condition. It is the backstop. The primary condition should be a definition of done.'
      ],
      terms: ['agentic loop', 'orchestrator-worker', 'subagent', 'fan-out', 'termination condition', 'hooks', 'session resumption', 'task decomposition']
    },
    {
      id: 'd2', n: 2, weight: 18,
      title: 'Tool Design & MCP Integration',
      objectives: [
        'Writing tool schemas and descriptions a model can select correctly',
        'Returning errors the model can act on rather than errors that end the run',
        'Managing how many tools are in play and steering tool choice',
        'Deciding what belongs in an MCP server versus a local function',
        'Knowing what the built-in tools cover so you do not rebuild them'
      ],
      notes: [
        'A tool description is a prompt, not documentation. The model has never seen your API, only the description. Say what the tool does, when to use it, when not to, and what each parameter means in terms the model can evaluate against a user request. Most "the model picked the wrong tool" bugs are description bugs, not model bugs.',
        'Overlapping tools are the main cause of wrong selection. If two tools could plausibly answer the same request, the model will sometimes pick the wrong one, and no amount of temperature tuning fixes it. Merge them, or make the boundary explicit in both descriptions.',
        'Tool count matters. Every tool definition occupies context on every turn and adds one more thing to disambiguate. A focused set of well-described tools beats an exhaustive catalogue. When a surface genuinely has many capabilities, group them behind fewer, parameterised tools rather than exposing one tool per endpoint.',
        'Errors should teach. `{"error": "failed"}` gives the model nothing and it will retry identically. `{"error": "invalid_date", "message": "start_date must be ISO-8601, received 03/04/25", "retryable": true}` tells the model exactly what to change. Distinguish retryable failures (transient, rate limit) from permanent ones (bad input, no permission), because the right response differs — retry versus reformulate versus escalate to a human.',
        '**MCP** is the right boundary when a capability is shared across clients, owned by another team, or needs its own deployment and auth lifecycle. A one-off function used by a single application does not need a protocol between it and the model. The test is reuse and ownership, not complexity.'
      ],
      traps: [
        'Returning HTTP status codes alone. The model cannot infer intent from a bare 422.',
        'Exposing every endpoint of an internal API as its own tool, then wondering why selection accuracy drops.'
      ],
      terms: ['tool schema', 'tool description', 'tool_choice', 'MCP server', 'structured error', 'retryable', 'capability bloat']
    },
    {
      id: 'd3', n: 3, weight: 20,
      title: 'Claude Code Configuration & Workflows',
      objectives: [
        'How CLAUDE.md files layer, scope, and stay maintainable',
        'Packaging repeatable work as slash commands and skills',
        'Scoping conventions to the paths they actually apply to',
        'Choosing plan mode over direct execution, and when not to',
        'Iterative refinement instead of one enormous instruction',
        'Running Claude Code in CI and other non-interactive settings'
      ],
      notes: [
        '`CLAUDE.md` is memory that loads automatically. Enterprise, user-level, project-level, and directory-level files layer together, with the more specific file taking precedence on conflict. Put durable facts there — build commands, architectural constraints, conventions the team actually enforces — and keep it short. A bloated CLAUDE.md consumes context on every single turn, which is precisely the resource you are trying to protect.',
        'The scoping instinct is the thing being tested. A convention that applies only to the test suite belongs in a file next to the test suite, not in the root file where it is paid for on every unrelated task.',
        'A **slash command** is a parameterised prompt you re-run. A **skill** is a bundle of instructions and supporting files Claude loads when the task calls for it. Both exist so that a workflow you repeat weekly does not have to be re-explained weekly. If you find yourself pasting the same five paragraphs, that is the signal to package it.',
        '**Plan mode** separates deciding from doing. Use it when the change is wide-reaching, when the codebase is unfamiliar, or when a wrong action is expensive to undo — you review the plan, then authorise execution. Skip it for small, well-understood, easily reverted edits, where the review overhead costs more than the mistake would.',
        'Iterative refinement beats one giant prompt for the same reason code review beats one giant commit. Work in verifiable increments: a failing test, then the fix; a small refactor, then run the suite. Each checkpoint constrains the next step and stops errors compounding silently.'
      ],
      traps: [
        'Treating CLAUDE.md as project documentation. It is a context budget line item, not a README.',
        'Assuming plan mode is always the safer choice. On trivial edits it is friction that trains people to skip review everywhere.'
      ],
      terms: ['CLAUDE.md', 'slash command', 'skill', 'plan mode', 'headless mode', 'hierarchy', 'path scoping']
    },
    {
      id: 'd4', n: 4, weight: 20,
      title: 'Prompt Engineering & Structured Output',
      objectives: [
        'System prompts that state explicit, checkable criteria',
        'Few-shot examples chosen for coverage rather than volume',
        'Getting reliable structured output, usually through tool use',
        'Validate-and-retry loops that feed the failure back in',
        'Batch processing for throughput-bound, latency-tolerant work',
        'Multi-pass and multi-instance review for quality-critical output'
      ],
      notes: [
        'Explicit criteria beat adjectives. "Write a professional summary" is unmeasurable; "three sentences, no jargon, lead with the decision, name the owner" is something both the model and your evaluation harness can check. If you cannot write the test for a criterion, the model cannot reliably satisfy it either.',
        'Few-shot examples are most valuable at the boundaries. Three examples covering a typical case, an ambiguous case, and an edge case teach far more than ten examples of the same typical case. Examples also silently set format — if every example is terse, expect terse output, whether you asked for it or not.',
        'For structured output, define the shape as a tool schema and let the model fill it. The schema constrains the model in a way that "reply in JSON" in the prompt does not, and you get validation for free. Asking for JSON in prose and then parsing it with a regex is the pattern to avoid.',
        'A retry loop only helps if the retry differs from the first attempt. Feed the validation error back into the next turn: what failed, what was expected, what was received. Blind retries reproduce the same failure and burn tokens. Cap the retries, then escalate — an unbounded self-correction loop is an outage.',
        'The **Message Batches API** trades latency for cost on large volumes of independent requests. It fits nightly classification, backfills, and evaluation runs. It does not fit anything a user is waiting on, and it does not fit work where request N depends on the result of request N−1.',
        'Multi-pass review works because generating and critiquing are different tasks. A second pass with a fresh instruction to find problems — ideally with the generation context trimmed away — catches things the generating pass was committed to.'
      ],
      traps: [
        'Adding more examples when the real problem is that the examples do not cover the failing case.',
        'Using batch for anything interactive. The cost saving is irrelevant if the user has already left.'
      ],
      terms: ['system prompt', 'few-shot', 'tool-based structured output', 'validation loop', 'Batches API', 'prompt caching', 'self-critique pass']
    },
    {
      id: 'd5', n: 5, weight: 15,
      title: 'Context Management & Reliability',
      objectives: [
        'Keeping a long-running task inside its context budget',
        'Escalating on ambiguity instead of guessing confidently',
        'Stopping errors propagating through a multi-agent system',
        'Exploring a large codebase without degrading context quality',
        'Calibrating confidence and routing to human review',
        'Tracking provenance when synthesising several sources'
      ],
      notes: [
        'Context is a budget, and everything competes for it: system prompt, tool definitions, conversation history, retrieved documents, tool results. The three levers are trimming what you never needed, summarising what is finished, and offloading to storage the model can query on demand. Compaction — replacing a long history with a structured summary of decisions and open threads — is the standard move before a long task runs out of room.',
        'Quality degrades before the window fills. Long, cluttered context makes the relevant detail harder to find, so a task that is technically within limits can still drift. Structure earns its keep here: clear section markers, stale material removed rather than appended around.',
        'On ambiguity, the correct behaviour is usually to ask, not to assume. Design for it explicitly: give the agent a way to raise a question, define what warrants raising one, and make sure the surrounding workflow has somewhere for that question to go. An agent that guesses confidently on an underspecified request is a reliability problem, not a helpfulness win.',
        'In a multi-agent system, an unvalidated wrong answer from one stage becomes the premise of every stage after it. Validate at handoff boundaries. Have workers report confidence and gaps alongside results, and have the orchestrator treat a low-confidence result as a signal to re-run or escalate rather than as fact.',
        'When synthesising multiple sources, keep the link between claim and source through the whole pipeline. Provenance is what lets a human check disputed output, and it is what lets the system tell "two sources agree" apart from "one source quoted twice".'
      ],
      traps: [
        'Summarising context automatically without preserving decisions already made. The agent then re-litigates settled questions.',
        'Reading whole files into context to explore a codebase. Search first, read narrowly, and let a subagent absorb the bulk.'
      ],
      terms: ['context window', 'compaction', 'progressive disclosure', 'escalation path', 'confidence calibration', 'provenance', 'error propagation']
    }
  ],

  questions: [
    {
      id: 'ccar-f-01', domain: 'd1', type: 'single',
      stem: 'A document-processing agent loops: read a record, call an enrichment tool, decide whether more enrichment is needed, repeat. In production it occasionally runs for hours on a single record, calling the same tool with near-identical arguments. The team adds a 25-iteration cap and the incidents stop. What is the remaining architectural weakness?',
      options: [
        'The cap is the only thing defining completion, so the agent still has no notion of when a record is finished — it just gets cut off',
        'Twenty-five iterations is too low and will truncate legitimate long records',
        'The enrichment tool should have been exposed through an MCP server',
        'The loop should run the enrichment calls in parallel to reduce wall-clock time'
      ],
      answer: [0],
      why: 'An iteration cap is a backstop, not a termination condition. It bounds the damage but it does not tell the agent what "done" means, so records still end in an arbitrary state. The fix is an explicit success predicate — required fields populated, or a completion tool the model calls — with the cap kept underneath as a safety net.'
    },
    {
      id: 'ccar-f-02', domain: 'd1', type: 'single',
      stem: 'A support system must, for every ticket: classify it, look up the customer record, draft a reply, and run a policy check on the draft. The four steps always happen, always in that order. An architect proposes an autonomous agent with four tools that decides its own sequence. What is the strongest objection?',
      options: [
        'The order is fixed and known ahead of time, so a deterministic workflow gives the same result with fewer failure modes and lower cost',
        'Four tools is above the practical limit for reliable tool selection',
        'Policy checks cannot be performed by a language model',
        'Autonomous agents cannot call tools in a guaranteed order under any circumstances'
      ],
      answer: [0],
      why: 'Agentic flexibility is worth paying for only when the path is genuinely unknown at design time. Here it is fully known, so an agent adds non-determinism, extra token cost, and a new failure mode — wrong ordering — in exchange for nothing. Individual steps can still use the model; the orchestration should not.'
    },
    {
      id: 'ccar-f-03', domain: 'd1', type: 'multi', select: 2,
      stem: 'Which two situations most clearly justify delegating work to a subagent with its own context window? (Select 2.)',
      options: [
        'Searching a large monorepo to answer one specific question, where only the answer matters afterwards',
        'Reviewing a pull request against six independent checklists whose findings do not depend on one another',
        'A two-step transformation where the second step needs the full untrimmed output of the first',
        'A single tool call whose result the user will read directly'
      ],
      answer: [0, 1],
      why: 'Subagents pay off when bulky intermediate work can be discarded once a conclusion is reached, and when independent subtasks can run in parallel isolation. They are a poor fit when the parent needs the full downstream detail anyway — you pay the round trip and still carry the tokens — or when the work is a single call with no context cost to contain.'
    },
    {
      id: 'ccar-f-04', domain: 'd1', type: 'single',
      stem: 'A code-migration agent must never modify files under `infra/` even when a task seems to require it. The instruction is stated three times in the system prompt, and it is still violated roughly once a week. What is the appropriate fix?',
      options: [
        'Enforce it in a hook that inspects and blocks the write before it executes',
        'Move the instruction to the end of the system prompt, where recency makes it more salient',
        'Lower the temperature so the model follows instructions more literally',
        'Add few-shot examples showing the agent declining to edit infrastructure files'
      ],
      answer: [0],
      why: 'A constraint that must hold every time belongs in deterministic code, not in a prompt. Hooks run around the model turn and can block the action outright, giving a guarantee rather than a strong tendency. Repetition, reordering, and temperature all improve the odds without ever reaching certainty.'
    },
    {
      id: 'ccar-f-05', domain: 'd1', type: 'single',
      stem: 'An orchestrator spawns five workers to research five competitors in parallel, then writes a comparison. Workers occasionally return confident summaries built on pages that did not actually mention the competitor. The final comparison presents these as fact. What change most directly addresses the failure?',
      options: [
        'Require each worker to return its sources and a confidence signal, and have the orchestrator validate before synthesising',
        'Run the five workers sequentially so each can see what the previous one found',
        'Increase each worker\'s context window so it can read more pages',
        'Merge the five workers into one agent handling all competitors'
      ],
      answer: [0],
      why: 'This is error propagation across a handoff boundary. The orchestrator is treating worker output as fact without any means of checking it. Making workers report provenance and confidence gives the orchestrator something to validate against and a basis for re-running weak results. Sequencing removes the parallelism benefit without addressing the missing validation.'
    },
    {
      id: 'ccar-f-06', domain: 'd1', type: 'single',
      stem: 'A nightly agent processes a queue of 400 items in one long-running session. If the process dies at item 250, it currently restarts from item 1. Which design change fixes this most cleanly?',
      options: [
        'Persist progress at item boundaries so a restart resumes at the next unprocessed item',
        'Increase the context window so the whole queue fits in one session',
        'Wrap the whole run in a retry that reruns it up to three times',
        'Split the queue across four parallel agents to reduce total runtime'
      ],
      answer: [0],
      why: 'Resumption needs a durable checkpoint at a stage boundary — which items are done, which remain. Parallelism and retries shorten or repeat the run without making it recoverable, and a larger context window does not survive a process death.'
    },
    {
      id: 'ccar-f-07', domain: 'd1', type: 'single',
      stem: 'Which decomposition is best suited to a chained sequence rather than a parallel fan-out?',
      options: [
        'Extract requirements from a contract, then draft test cases from those requirements',
        'Summarise each of forty customer interviews independently',
        'Translate one announcement into eight languages',
        'Run six unrelated lint rules across the same file'
      ],
      answer: [0],
      why: 'Chaining is required when a stage consumes the previous stage\'s output. The test cases cannot be written before the requirements exist. The other three are independent subtasks over shared or separate inputs, which is exactly where fan-out reduces wall-clock time at no correctness cost.'
    },
    {
      id: 'ccar-f-08', domain: 'd2', type: 'single',
      stem: 'A scheduling assistant has two tools: `find_availability` and `search_calendar`. Both can surface free time. Users report that the assistant frequently picks the slower, less precise one. What is the most effective fix?',
      options: [
        'Rewrite both descriptions so the boundary between them is explicit, or merge them into one parameterised tool',
        'Set `tool_choice` to force `find_availability` on every request',
        'Reorder the tool definitions so the preferred tool appears first',
        'Add a system prompt line naming the preferred tool'
      ],
      answer: [0],
      why: 'Overlapping capability is the root cause. When two descriptions both plausibly match a request, selection becomes a coin flip, and prompt-level nudges only shift the odds. Either make the boundary unambiguous in the descriptions or eliminate it by merging. Forcing tool choice breaks every request that genuinely needs the other tool.'
    },
    {
      id: 'ccar-f-09', domain: 'd2', type: 'multi', select: 2,
      stem: 'A tool rejects a request because the supplied date is malformed. Which two properties make the error response most useful to the model? (Select 2.)',
      options: [
        'It names the offending field and states the expected format alongside what was received',
        'It indicates whether retrying with corrected input could succeed',
        'It returns the raw stack trace so the model can diagnose the cause',
        'It returns HTTP 422 with an empty body, keeping the response small'
      ],
      answer: [0, 1],
      why: 'The model can only correct what the error names. Field, expectation, and actual value give it everything it needs to reformulate. A retryable flag tells it whether to try again, change approach, or escalate. A stack trace floods context with implementation detail, and a bare status code with no body gives it nothing to act on.'
    },
    {
      id: 'ccar-f-10', domain: 'd2', type: 'single',
      stem: 'An internal inventory service has 40 REST endpoints. A team exposes all 40 as individual tools. Selection accuracy is poor and every turn is expensive. What is the best restructuring?',
      options: [
        'Consolidate into a small number of parameterised tools organised around the tasks users actually perform',
        'Keep all 40 but shorten every description to one line to reduce token usage',
        'Move all 40 into an MCP server, which removes the per-turn context cost',
        'Split the 40 tools across five agents with eight tools each'
      ],
      answer: [0],
      why: 'The problem is capability bloat: 40 near-neighbours are hard to disambiguate and every definition is paid for on every turn. Grouping by user task shrinks both the context cost and the decision space. Shortening descriptions makes selection worse, and serving tools over MCP does not remove their definitions from context.'
    },
    {
      id: 'ccar-f-11', domain: 'd2', type: 'single',
      stem: 'Which capability is the strongest candidate for an MCP server rather than a function local to one application?',
      options: [
        'A customer-data lookup that four different internal assistants all need, owned by the data platform team',
        'A string formatter used only inside one agent\'s post-processing step',
        'A calculation that runs entirely on values already present in the conversation',
        'A one-line wrapper around an environment variable read at startup'
      ],
      answer: [0],
      why: 'The MCP boundary is about reuse and ownership. A capability consumed by several clients and maintained by a separate team benefits from its own deployment, versioning, and auth lifecycle. Single-consumer helpers gain nothing from a protocol hop and lose simplicity.'
    },
    {
      id: 'ccar-f-12', domain: 'd2', type: 'single',
      stem: 'A tool description reads, in full: "Gets data from the system." Selection is unreliable. Which rewrite addresses the actual problem?',
      options: [
        'Describe what the tool returns, the situations it is for, the situations it is not for, and the meaning of each parameter',
        'Add the endpoint URL and HTTP method to the description',
        'Rename the tool to `get_data_v2` to distinguish it from similar tools',
        'Move the explanation into the system prompt instead'
      ],
      answer: [0],
      why: 'The description is the only thing the model knows about the tool, so it has to carry purpose, applicability, boundaries, and parameter semantics. Transport details are irrelevant to selection, renaming carries no meaning, and moving the text to the system prompt separates it from the decision point.'
    },
    {
      id: 'ccar-f-13', domain: 'd3', type: 'single',
      stem: 'A monorepo has a root `CLAUDE.md` that has grown to roughly 900 lines, covering conventions for the web app, the data pipeline, and the mobile client. Engineers report degraded results on all three. What is the best remedy?',
      options: [
        'Keep only repo-wide essentials at the root and move each area\'s conventions into a CLAUDE.md within that area',
        'Split the root file into three files and import all three from the root',
        'Move the file to the user level so it is not re-read for each project',
        'Compress it by removing all examples and keeping only rule statements'
      ],
      answer: [0],
      why: 'Memory files load automatically and layer by specificity, so conventions should live at the level where they apply. Scoping each area\'s rules to that area means a mobile task no longer pays for pipeline conventions. Importing all three from the root reproduces the original problem, and user-level placement makes the scope broader, not narrower.'
    },
    {
      id: 'ccar-f-14', domain: 'd3', type: 'single',
      stem: 'A team repeats the same eight-step release-notes process every sprint, pasting the same long instruction block each time. What is the most appropriate way to package it?',
      options: [
        'A custom slash command or skill that captures the process and takes the version as a parameter',
        'Append the eight steps to the root CLAUDE.md so they are always in context',
        'A git hook that injects the instructions into every commit message',
        'A separate repository documenting the process for engineers to consult'
      ],
      answer: [0],
      why: 'A repeated, parameterised workflow is exactly what slash commands and skills exist for: invoked on demand, not carried in context on unrelated work. Putting it in CLAUDE.md charges every task for instructions used once a sprint, and human-readable documentation does not remove the re-explanation.'
    },
    {
      id: 'ccar-f-15', domain: 'd3', type: 'multi', select: 2,
      stem: 'Which two situations most justify using plan mode rather than direct execution? (Select 2.)',
      options: [
        'A refactor expected to touch thirty files across an unfamiliar service',
        'A schema migration on a production database where a wrong step is costly to reverse',
        'Fixing a typo in a single documentation string',
        'Re-running a formatter that has run cleanly a hundred times before'
      ],
      answer: [0, 1],
      why: 'Plan mode is worth its review overhead when blast radius is wide or a mistake is expensive to undo — both of which make inspecting the approach before execution cheaper than correcting after. On trivial, reversible, well-understood changes the overhead exceeds the risk and habituates people into rubber-stamping plans.'
    },
    {
      id: 'ccar-f-16', domain: 'd3', type: 'single',
      stem: 'A CI job runs Claude Code non-interactively to triage failing tests on every pull request. Which property matters most in this setting?',
      options: [
        'Every step it may take is bounded and permitted in advance, since no human is present to approve anything mid-run',
        'It uses the largest available model so triage quality is maximised',
        'It writes its findings into the root CLAUDE.md for future runs',
        'It runs in plan mode so the plan can be reviewed later'
      ],
      answer: [0],
      why: 'Non-interactive execution removes the human checkpoint, so permissions and scope have to be settled before the run starts rather than negotiated during it. Plan mode is meaningless with nobody there to approve, and writing run output into a memory file both pollutes context and makes it grow without bound.'
    },
    {
      id: 'ccar-f-17', domain: 'd3', type: 'single',
      stem: 'Which instruction belongs in a project `CLAUDE.md` rather than in an individual prompt?',
      options: [
        'The project uses pnpm, and tests are run with `pnpm test --run`',
        'For this task only, prioritise reducing bundle size over readability',
        'Explain the change you are about to make before making it, just this once',
        'Focus today on the billing module and ignore everything else'
      ],
      answer: [0],
      why: 'Memory files are for durable facts true across sessions. Build and test commands qualify. Task-scoped priorities and one-off instructions belong in the prompt, because writing them into memory applies them to every future task and quietly distorts unrelated work.'
    },
    {
      id: 'ccar-f-18', domain: 'd4', type: 'single',
      stem: 'A summarisation system\'s prompt asks for output that is "concise and professional." Reviewers reject about a third of outputs, but cannot agree on why. What is the most effective change?',
      options: [
        'Replace the adjectives with checkable criteria — length bound, required opening element, named prohibitions',
        'Raise the model tier so it interprets the adjectives more accurately',
        'Add ten more few-shot examples of acceptable summaries',
        'Lower the temperature to reduce variation between outputs'
      ],
      answer: [0],
      why: 'When reviewers cannot articulate the standard, the model cannot meet it and you cannot evaluate against it. Converting adjectives into checkable criteria aligns the prompt, the reviewers, and any automated evaluation on the same definition. A stronger model or a lower temperature produces more consistent output against an unstated target, not the right one.'
    },
    {
      id: 'ccar-f-19', domain: 'd4', type: 'single',
      stem: 'A pipeline needs each result as a typed object with six required fields for direct insertion into a database. Which approach is most reliable?',
      options: [
        'Define the object as a tool input schema and have the model call that tool',
        'Ask for JSON in the prompt and parse the reply with a regular expression',
        'Ask for Markdown and convert it to JSON in post-processing',
        'Request one field per API call and assemble the object in application code'
      ],
      answer: [0],
      why: 'A tool schema constrains the shape at generation time and gives you validation for free, which prose instructions cannot. Regex parsing of free-form output fails on the first formatting deviation, Markdown adds a lossy conversion, and six separate calls multiply cost and latency while introducing cross-field inconsistency.'
    },
    {
      id: 'ccar-f-20', domain: 'd4', type: 'single',
      stem: 'An extraction step validates its output against a schema and retries on failure. Logs show runs that retry five times with byte-identical invalid output before giving up. What is wrong?',
      options: [
        'The retry resends the original request without including the validation error, so nothing changes between attempts',
        'Five retries is too few for a schema of this complexity',
        'Schema validation should be replaced by a second model call that checks the output',
        'The retries should run in parallel to find a valid output faster'
      ],
      answer: [0],
      why: 'A retry only helps when the second attempt has information the first lacked. Feeding back what failed, what was expected, and what was received turns a repeat into a correction. Without that, more retries and parallel attempts just multiply the same failure.'
    },
    {
      id: 'ccar-f-21', domain: 'd4', type: 'single',
      stem: 'A team must classify 180,000 archived tickets. The results feed a quarterly report, and each ticket is independent. Which approach fits best?',
      options: [
        'Submit them through the Message Batches API and collect results asynchronously',
        'Send them as real-time requests with high concurrency to finish sooner',
        'Chain them so each classification informs the next for consistency',
        'Ask a human to label a sample and classify the rest with keyword rules'
      ],
      answer: [0],
      why: 'High volume, mutual independence, and no user waiting is the exact profile batch processing is designed for, and it is substantially cheaper. Real-time concurrency pays a premium for latency nobody needs, and chaining independent items destroys the parallelism while letting earlier errors bias later ones.'
    },
    {
      id: 'ccar-f-22', domain: 'd4', type: 'multi', select: 2,
      stem: 'A legal-clause generator produces fluent output that occasionally contains subtle factual errors. Which two changes most directly improve reliability? (Select 2.)',
      options: [
        'Add a separate review pass instructed to find and flag problems, run without the generating context',
        'Route flagged or low-confidence output to a qualified human before it reaches the customer',
        'Increase the temperature so the model explores more phrasings',
        'Add more few-shot examples of well-written clauses'
      ],
      answer: [0, 1],
      why: 'Generating and critiquing are different tasks, and a fresh reviewing pass without the generator\'s commitments catches what the first pass talked itself into. In a high-stakes domain that is paired with human review on anything uncertain. Higher temperature increases variance, and more examples of good output do not teach the model to detect subtle errors.'
    },
    {
      id: 'ccar-f-23', domain: 'd5', type: 'single',
      stem: 'A long refactoring session is approaching its context limit. The team wants to continue without losing coherence. Which approach is best?',
      options: [
        'Compact the history into a structured summary that preserves decisions made, work completed, and open threads',
        'Drop the oldest half of the conversation and continue',
        'Restart the session with the original task description only',
        'Keep everything and accept that quality will degrade as the window fills'
      ],
      answer: [0],
      why: 'Compaction keeps what matters — settled decisions, progress, and what remains — while discarding the transcript around it. Truncating by age loses early architectural decisions that still bind later work, and a clean restart forces the agent to rediscover everything and re-litigate settled questions.'
    },
    {
      id: 'ccar-f-24', domain: 'd5', type: 'single',
      stem: 'An internal agent receives: "Update the pricing config for the enterprise tier." Three services have a pricing config and the request does not say which. What is the correct designed behaviour?',
      options: [
        'Recognise the request as underspecified, ask which service is meant, and take no write action until it is answered',
        'Pick the service most recently modified, since that is the likeliest intent',
        'Update all three so no service is left inconsistent',
        'Proceed with the first match and note the assumption in the final summary'
      ],
      answer: [0],
      why: 'A confident guess on an underspecified destructive action is the failure mode to design against. The system needs an explicit escalation path — a way to raise the question and somewhere for it to go. Reporting an assumption after the write has happened surfaces the mistake too late to prevent it.'
    },
    {
      id: 'ccar-f-25', domain: 'd5', type: 'single',
      stem: 'An agent must answer one question about a 200,000-file repository. Which exploration strategy best preserves context quality?',
      options: [
        'Search to narrow candidates, read only the relevant regions, and delegate bulk reading to a subagent that returns a summary',
        'Read every file in dependency order until the answer is found',
        'Load the ten largest files first on the assumption the answer is in core modules',
        'Concatenate the repository into one document and ask the question once'
      ],
      answer: [0],
      why: 'Search-then-read-narrowly keeps the working context small and relevant, and a subagent absorbs bulk reading without the parent carrying the tokens. Exhaustive or size-ordered reading fills the window with material that is mostly irrelevant, which degrades answer quality well before any hard limit is reached.'
    },
    {
      id: 'ccar-f-26', domain: 'd1', type: 'single',
      stem: 'An orchestrator spawns a subagent to research a topic and receives back a 40,000-token transcript of everything the subagent read. The parent then runs out of context two steps later. What was designed wrong?',
      options: [
        'The subagent returned its working material rather than a summary, so the parent absorbed exactly the context the subagent existed to contain',
        'The subagent should have been given a larger context window',
        'The orchestrator should have spawned three subagents instead of one',
        'The research should have been done by the orchestrator directly'
      ],
      answer: [0],
      why: 'The entire value of a subagent is that its bulky intermediate work is discarded when it returns. Handing the transcript back to the parent pays the round-trip cost and keeps the tokens, which is strictly worse than not delegating at all. Return a conclusion, not a transcript.'
    },
    {
      id: 'ccar-f-27', domain: 'd1', type: 'single',
      stem: 'A pipeline has three stages: extract, validate, publish. A bug lets the agent occasionally publish before validating. The system prompt already states the order clearly. What is the durable fix?',
      options: [
        'Enforce the sequence structurally, so publish is only reachable once validate has returned success',
        'Repeat the ordering instruction at the start and the end of the system prompt',
        'Give the publish tool a description that mentions validation is required first',
        'Add a few-shot example showing the correct order'
      ],
      answer: [0],
      why: 'Workflow order that must always hold is a property of the orchestration, not a request to the model. Gating the publish step behind a validation result makes the wrong order unreachable. Prompt repetition and tool descriptions raise compliance without ever guaranteeing it.'
    },
    {
      id: 'ccar-f-28', domain: 'd1', type: 'multi', select: 2,
      stem: 'Which two signals suggest a task has been decomposed too finely? (Select 2.)',
      options: [
        'Each stage spends more tokens re-establishing context than doing work',
        'Stages constantly pass large intermediate artefacts between one another',
        'Individual stages can be tested and corrected in isolation',
        'A failure in one stage can be retried without rerunning the whole pipeline'
      ],
      answer: [0, 1],
      why: 'Over-decomposition shows up as context re-establishment overhead and heavy artefact passing — the coordination costs more than the split saves. Isolated testing and targeted retries are the benefits decomposition is meant to deliver, so they indicate it is working, not that it has gone too far.'
    },
    {
      id: 'ccar-f-29', domain: 'd1', type: 'single',
      stem: 'A research agent runs for twelve minutes and produces a good answer, but the team cannot explain how it got there when a stakeholder asks. What is missing?',
      options: [
        'Per-step tracing of tool calls, arguments, and results, which is what makes an agent run reconstructable',
        'A larger model, which would produce more explainable output',
        'A lower temperature, which would make runs reproducible',
        'A shorter iteration cap, which would reduce the number of steps to explain'
      ],
      answer: [0],
      why: 'Explainability for an agent comes from the trace, not from the final answer. Without logged steps you cannot reconstruct the path, audit it, or debug it when the same run later produces a bad answer. Reducing steps or variance makes the run smaller, not visible.'
    },
    {
      id: 'ccar-f-30', domain: 'd1', type: 'single',
      stem: 'Which of these is the clearest example of work suited to parallel fan-out?',
      options: [
        'Generating a localised variant of the same product description for twelve markets',
        'Drafting a contract, then reviewing that draft, then revising it',
        'Exploring a codebase to find a bug, then fixing it',
        'Gathering requirements, then designing a schema from them'
      ],
      answer: [0],
      why: 'Fan-out requires subtasks that do not depend on one another, and twelve independent localisations qualify exactly. The other three are chains: each stage consumes the previous stage\'s output, so running them in parallel is not merely inefficient but impossible.'
    },
    {
      id: 'ccar-f-31', domain: 'd1', type: 'single',
      stem: 'An agent handling customer refunds has tools for issuing refunds up to any amount. Product wants it autonomous for speed. What is the appropriate architectural control?',
      options: [
        'Bound the agent\'s autonomy by value, handling small refunds automatically and routing larger ones to human approval',
        'Instruct the agent in the system prompt to be conservative with large refunds',
        'Reduce the temperature so refund amounts are more predictable',
        'Log all refunds so large mistakes can be identified afterwards'
      ],
      answer: [0],
      why: 'Autonomy should be scoped to the blast radius of a mistake. A value threshold makes the high-consequence path require a human while keeping the common case fast. Prompt guidance is not a limit, and after-the-fact logging identifies losses rather than preventing them.'
    },
    {
      id: 'ccar-f-32', domain: 'd1', type: 'single',
      stem: 'A multi-agent system uses one orchestrator and six workers. Latency is dominated by the orchestrator waiting on the slowest worker each round. Which change helps most?',
      options: [
        'Let the orchestrator proceed on results as they arrive, rather than blocking until every worker has returned',
        'Add more workers so each has less to do',
        'Move the workers to a more capable model',
        'Reduce the orchestrator\'s context window'
      ],
      answer: [0],
      why: 'When a fan-out blocks on the slowest branch, total latency equals the worst case rather than the average. Consuming results incrementally removes that coupling. Adding workers or upgrading models does not change the fact that the orchestrator is waiting on a barrier.'
    },
    {
      id: 'ccar-f-33', domain: 'd1', type: 'single',
      stem: 'A long-running agent must survive a deployment that restarts the process mid-task. Which state is most important to persist?',
      options: [
        'The task definition, the completed stages, and the outstanding work, recorded at stage boundaries',
        'The full token-by-token conversation history including every tool result',
        'The model version and temperature used for each call',
        'The wall-clock time each step took'
      ],
      answer: [0],
      why: 'Resumption needs enough to re-enter cleanly at a boundary: what was asked, what is done, what remains. Persisting the entire transcript is expensive and reintroduces the context you would rather compact. Timings and parameters are useful telemetry but do not enable recovery.'
    },
    {
      id: 'ccar-f-34', domain: 'd1', type: 'single',
      stem: 'A team replaces a working deterministic workflow with an agentic one because "agents are more flexible." Output quality is unchanged, cost triples, and two incidents occur. What principle was violated?',
      options: [
        'Move up the pattern ladder only when the simpler pattern genuinely cannot express the requirement',
        'Agentic systems should always use the most capable model available',
        'Deterministic workflows cannot call language models',
        'Flexibility should always be preferred over predictability in production'
      ],
      answer: [0],
      why: 'Each step up in architectural complexity costs predictability, debuggability and money, and must be paid for by a requirement the simpler pattern cannot meet. Flexibility that nothing in the requirement asks for is pure cost, and the incidents are the predictability you traded away.'
    },
    {
      id: 'ccar-f-35', domain: 'd2', type: 'single',
      stem: 'A tool takes a `filters` parameter documented only as "an object of filters." The model frequently supplies keys the API rejects. What is the fix?',
      options: [
        'Specify the permitted keys and their value types in the schema, so the shape is constrained rather than guessed',
        'Add a retry that strips unknown keys before calling the API',
        'Instruct the model in the system prompt to only use valid filter keys',
        'Rename the parameter to something more descriptive'
      ],
      answer: [0],
      why: 'An unconstrained object invites invention because the model has nothing to constrain it. Enumerating the permitted keys and types in the schema makes the valid surface explicit at generation time. Stripping keys downstream hides the problem and silently drops intent the user expressed.'
    },
    {
      id: 'ccar-f-36', domain: 'd2', type: 'single',
      stem: 'An MCP server exposes 60 tools. Clients report slow responses and poor tool selection. Which approach addresses both?',
      options: [
        'Expose a smaller task-oriented surface, and let the agent discover detailed capability only when a task requires it',
        'Split the server into six servers with ten tools each, all connected at once',
        'Shorten every tool description to a single sentence',
        'Cache the tool definitions so they cost less to send'
      ],
      answer: [0],
      why: 'Sixty definitions cost context on every turn and create sixty-way disambiguation. Progressive discovery over a task-oriented surface reduces both. Splitting across six servers still connects all sixty, and shortening descriptions worsens selection by removing the information the model uses to choose.'
    },
    {
      id: 'ccar-f-37', domain: 'd2', type: 'multi', select: 2,
      stem: 'Which two behaviours indicate a tool should be split into separate tools? (Select 2.)',
      options: [
        'A `mode` parameter switches it between operations with completely different parameter requirements',
        'Its description has to explain two unrelated purposes before the model can choose correctly',
        'It accepts an optional parameter that most calls omit',
        'It occasionally returns an empty result set'
      ],
      answer: [0, 1],
      why: 'A mode switch that changes which parameters are meaningful is two tools wearing one schema, and a description forced to cover unrelated purposes cannot guide selection for either. An optional parameter and an empty result are ordinary and say nothing about the tool\'s boundaries.'
    },
    {
      id: 'ccar-f-38', domain: 'd2', type: 'single',
      stem: 'A tool call fails because a downstream service is temporarily unavailable. The tool returns `{"error": "service unavailable"}` with no further detail. What should be added?',
      options: [
        'A signal that the failure is transient and retryable, so the agent retries rather than reformulating or abandoning',
        'The internal hostname of the failing service',
        'The full stack trace from the downstream call',
        'A suggestion that the user try again later'
      ],
      answer: [0],
      why: 'Without a retryability signal the agent cannot tell a temporary outage from a permanent rejection, and the correct response differs completely. Internal hostnames and stack traces flood context with detail the model cannot act on and leak implementation information.'
    },
    {
      id: 'ccar-f-39', domain: 'd2', type: 'single',
      stem: 'Which built-in capability should you check for before implementing a custom tool?',
      options: [
        'Anything the platform already provides natively, since a custom reimplementation adds surface area for no capability gain',
        'Nothing — custom tools are always preferable because they can be tuned',
        'Only tools that involve network access',
        'Only tools that return structured data'
      ],
      answer: [0],
      why: 'A reimplementation of an existing built-in adds a definition to the context, a code path to maintain, and another candidate for the model to confuse with its native equivalent, in exchange for nothing. Checking what already exists is the cheapest design decision available.'
    },
    {
      id: 'ccar-f-40', domain: 'd2', type: 'single',
      stem: 'An agent has a `delete_records` tool. Which schema design most reduces the chance of catastrophic misuse?',
      options: [
        'Require explicit record identifiers, with no wildcard or "all" value accepted',
        'Add a note in the description asking the model to be careful',
        'Return a warning in the tool result after the deletion completes',
        'Set the tool to run only at low temperature'
      ],
      answer: [0],
      why: 'Removing the dangerous input from the schema makes the catastrophic call unexpressible, which is stronger than any instruction. A post-hoc warning arrives after the data is gone, and temperature does not govern whether a destructive argument is chosen.'
    },
    {
      id: 'ccar-f-41', domain: 'd3', type: 'single',
      stem: 'Two `CLAUDE.md` files apply to the file being edited: a repository root file saying "prefer named exports" and a file in `legacy/` saying "use default exports here." Which applies inside `legacy/`?',
      options: [
        'The `legacy/` file, because the more specific scope takes precedence on conflict',
        'The root file, because repository-wide conventions always win',
        'Neither, because the conflict makes both ambiguous',
        'Both, applied in the order they were loaded'
      ],
      answer: [0],
      why: 'Memory files layer, and specificity resolves conflicts — a directory-level rule overrides the repository default within its scope. This is exactly why scoping conventions to the directory they govern beats listing exceptions in the root file.'
    },
    {
      id: 'ccar-f-42', domain: 'd3', type: 'single',
      stem: 'An engineer wants Claude Code to always run the linter after editing a TypeScript file, without having to ask each time. What is the right mechanism?',
      options: [
        'A hook that runs the linter automatically after an edit',
        'A line in CLAUDE.md asking it to remember to lint',
        'A slash command the engineer runs after each edit',
        'A few-shot example showing linting after an edit'
      ],
      answer: [0],
      why: 'Something that should happen every time without being asked is automation, not instruction. A hook runs deterministically after the triggering event. A memory-file request relies on the model remembering, and a slash command reintroduces the manual step being eliminated.'
    },
    {
      id: 'ccar-f-43', domain: 'd3', type: 'single',
      stem: 'A CLAUDE.md contains: "The team values clean, readable, well-architected code." What is wrong with it?',
      options: [
        'It states no checkable convention, so it consumes context on every turn without changing any decision',
        'It is too short and should be expanded with examples',
        'It should be in the user-level file rather than the project file',
        'It should be phrased as a direct instruction rather than a statement'
      ],
      answer: [0],
      why: 'Memory-file content is paid for on every turn, so each line must earn its place by changing an outcome. Unfalsifiable values do not. "Use named exports; max 200 lines per module; tests colocated" is the same space spent on something that actually resolves a decision.'
    },
    {
      id: 'ccar-f-44', domain: 'd3', type: 'multi', select: 2,
      stem: 'Which two belong in a project `CLAUDE.md`? (Select 2.)',
      options: [
        'The database migrations are run with `make migrate`, never with the ORM CLI directly',
        'Files under `generated/` are machine-written and must not be edited by hand',
        'This week we are focusing on reducing the p99 latency of the search endpoint',
        'Please explain your reasoning before each change while I get used to this tool'
      ],
      answer: [0, 1],
      why: 'Durable, project-wide facts that apply to every task belong in memory. A sprint focus and a personal preference for verbosity both expire, and writing them into the project file applies them to every future task and to every other engineer.'
    },
    {
      id: 'ccar-f-45', domain: 'd3', type: 'single',
      stem: 'A developer gives Claude Code a single 600-word instruction covering a refactor, a dependency upgrade, and a test rewrite. Results are inconsistent. What is the better approach?',
      options: [
        'Work in verifiable increments, completing and checking one change before starting the next',
        'Move the instruction into CLAUDE.md so it persists across turns',
        'Split the instruction across three parallel sessions on the same repository',
        'Add more detail to the instruction until every case is covered'
      ],
      answer: [0],
      why: 'Three entangled changes in one turn give no checkpoint, so an early mistake silently contaminates the rest. Incremental work with verification between steps constrains each step with the verified result of the last. Parallel sessions on one repository would conflict with each other.'
    },
    {
      id: 'ccar-f-46', domain: 'd3', type: 'single',
      stem: 'A team wants every engineer to get the same behaviour from Claude Code on their shared service. What is the most reliable way to achieve it?',
      options: [
        'Commit the project configuration and memory files to the repository so everyone loads the same context',
        'Document the recommended personal settings in the team wiki',
        'Ask each engineer to copy a configuration file into their home directory',
        'Standardise on a single model tier across the team'
      ],
      answer: [0],
      why: 'Configuration that lives with the code is versioned, reviewed, and identical for everyone who clones it. Wiki documentation and manually copied home-directory files drift immediately, and model tier is only one small input to behaviour.'
    },
    {
      id: 'ccar-f-47', domain: 'd3', type: 'single',
      stem: 'When is skipping plan mode clearly the right call?',
      options: [
        'Renaming a local variable in one function, where the change is trivial and instantly reversible',
        'Migrating authentication across a service you have not worked in before',
        'Changing the schema of a table used by four downstream services',
        'Rewriting the deployment pipeline configuration'
      ],
      answer: [0],
      why: 'Plan mode costs a review cycle, and that cost is only worth paying when the blast radius is wide or a mistake is expensive to undo. On a trivial reversible edit the overhead exceeds the risk, and routinely applying it there trains people to approve plans without reading them.'
    },
    {
      id: 'ccar-f-48', domain: 'd4', type: 'single',
      stem: 'A system prompt says "respond in JSON" and the application parses the reply. Roughly 4% of responses include a brief sentence before the JSON and fail to parse. What is the correct fix?',
      options: [
        'Use a tool schema so the structure is constrained at generation time rather than requested in prose',
        'Add "do not include any preamble" to the prompt and keep parsing',
        'Strip everything before the first `{` before parsing',
        'Retry the request whenever parsing fails'
      ],
      answer: [0],
      why: 'Prose instructions shape behaviour probabilistically, so a small failure rate persists no matter how the instruction is worded. A schema removes the failure mode instead of reducing it. Stripping and retrying are workarounds that leave the underlying unreliability in place.'
    },
    {
      id: 'ccar-f-49', domain: 'd4', type: 'single',
      stem: 'Which set of few-shot examples best teaches a classifier where its decision boundary lies?',
      options: [
        'One clearly positive case, one clearly negative case, and two genuinely borderline cases with the reasoning shown',
        'Eight clearly positive cases, since the model should learn what good looks like',
        'Twenty examples sampled at random from production traffic',
        'One example, to avoid biasing the model towards a particular format'
      ],
      answer: [0],
      why: 'Clear cases are already handled; the failures cluster at the boundary, so that is what examples must demonstrate. Showing how an ambiguous case is resolved teaches the rule. Random production samples mostly reproduce the easy majority.'
    },
    {
      id: 'ccar-f-50', domain: 'd4', type: 'single',
      stem: 'A validate-and-retry loop is capped at three attempts. After three failures, what should the system do?',
      options: [
        'Escalate with the input and the accumulated validation errors, so a human can see what failed and why',
        'Continue retrying until it succeeds, since the request is valid',
        'Return the last invalid output to the caller as a best effort',
        'Silently drop the item and continue to the next'
      ],
      answer: [0],
      why: 'A cap exists to convert an unbounded loop into a handled failure, and the handling is escalation with enough evidence to diagnose it. Unbounded retries are an outage, returning invalid output pushes the failure downstream, and silent drops lose data without anyone noticing.'
    },
    {
      id: 'ccar-f-51', domain: 'd4', type: 'multi', select: 2,
      stem: 'Which two conditions make batch processing the right choice? (Select 2.)',
      options: [
        'The requests are independent of one another',
        'No user is waiting on the result',
        'The results must be consistent with one another',
        'The volume is small but the accuracy requirement is high'
      ],
      answer: [0, 1],
      why: 'Batch trades latency for cost on large volumes of independent work with nobody waiting. Cross-request consistency actually argues against it, since batch items cannot see each other, and low volume means the discount is not worth the added asynchrony.'
    },
    {
      id: 'ccar-f-52', domain: 'd4', type: 'single',
      stem: 'A review pass is asked to critique a draft while the full generation conversation is still in context. It rarely finds problems. Why?',
      options: [
        'The reviewing pass inherits the reasoning that produced the draft, so it tends to confirm rather than challenge it',
        'Review tasks require a more capable model than generation tasks',
        'Critique requires a higher temperature than generation',
        'The draft is too long for a single review pass'
      ],
      answer: [0],
      why: 'Carrying the generation context carries its commitments and justifications, which is exactly what a critic needs to be free of. Running the review on the artefact alone, with a fresh instruction to find faults, is what makes the second pass independent enough to be useful.'
    },
    {
      id: 'ccar-f-53', domain: 'd4', type: 'single',
      stem: 'A system prompt instructs: "Summaries should be appropriately detailed." Reviewers reject summaries as both too long and too short. What is the underlying problem?',
      options: [
        'The criterion is unmeasurable, so neither the model nor the reviewers are working to the same definition',
        'The model is ignoring the system prompt',
        'Summaries should never be generated by a language model',
        'The temperature is too high for consistent length'
      ],
      answer: [0],
      why: 'Contradictory rejections are the signature of an unstated standard. If you cannot write a check for a criterion, you cannot evaluate against it and the model cannot reliably hit it. Replace the adjective with a bound the model and the reviewer can both apply.'
    },
    {
      id: 'ccar-f-54', domain: 'd4', type: 'single',
      stem: 'You need the same 30,000-token policy document in context for every one of 50,000 daily requests. Which technique addresses the cost most directly?',
      options: [
        'Prompt caching, with the document placed in the stable prefix ahead of anything that varies',
        'Batch processing, to reduce the per-request price',
        'A smaller model, to reduce the per-token price',
        'Streaming, so the document is sent incrementally'
      ],
      answer: [0],
      why: 'A large unchanging prefix reused at high volume is precisely what caching targets, and reading cached tokens is far cheaper than processing them afresh. Batch does not apply to interactive traffic, a smaller model changes quality everywhere, and streaming affects delivery rather than cost.'
    },
    {
      id: 'ccar-f-55', domain: 'd5', type: 'single',
      stem: 'A compaction step replaces a long history with a summary, but afterwards the agent reopens architectural questions the team had already settled. What did the summary omit?',
      options: [
        'The decisions already made and the reasons behind them, which constrain all subsequent work',
        'The exact wording of every earlier message',
        'The timestamps of each turn in the conversation',
        'The tool definitions available during the earlier turns'
      ],
      answer: [0],
      why: 'Compaction must preserve what still binds future work: settled decisions, their rationale, and the open threads. A summary that keeps only topics discussed lets the agent relitigate them. Verbatim history is what you are trying to discard.'
    },
    {
      id: 'ccar-f-56', domain: 'd5', type: 'single',
      stem: 'An agent synthesises an answer from five retrieved documents, two of which are copies of the same source. What risk does this create?',
      options: [
        'Apparent corroboration, where one source is mistaken for independent agreement between several',
        'The context window will overflow',
        'The agent will refuse to answer due to duplication',
        'Retrieval latency will double'
      ],
      answer: [0],
      why: 'Without provenance tracking, duplicates read as independent confirmation and inflate confidence in a single claim. Keeping the link between claim and source through the pipeline is what lets the system distinguish genuine agreement from one document counted twice.'
    },
    {
      id: 'ccar-f-57', domain: 'd5', type: 'multi', select: 2,
      stem: 'Which two conditions should trigger escalation to a human rather than an autonomous decision? (Select 2.)',
      options: [
        'The request is ambiguous in a way that changes which irreversible action is taken',
        'The agent\'s confidence in its interpretation is low and the consequence of being wrong is high',
        'The task requires more than five tool calls to complete',
        'The user phrased the request informally'
      ],
      answer: [0, 1],
      why: 'Escalation thresholds are set by consequence and uncertainty together, which is why ambiguity attached to an irreversible action and low confidence on a high-stakes call both qualify. Step count and phrasing style say nothing about either.'
    },
    {
      id: 'ccar-f-58', domain: 'd5', type: 'single',
      stem: 'A worker in a multi-agent system returns "I could not find the pricing data, so I estimated it from comparable products." The orchestrator uses it as fact. What control is missing?',
      options: [
        'Validation at the handoff boundary that treats a flagged estimate differently from a retrieved fact',
        'A larger context window for the orchestrator',
        'More workers, so the task is spread more thinly',
        'A higher temperature on the worker to improve its search'
      ],
      answer: [0],
      why: 'The worker behaved correctly by flagging the substitution; the orchestrator discarded the flag. Handoff boundaries need validation that distinguishes grounded results from estimates and routes the latter to re-run or escalation rather than into the final answer.'
    },
    {
      id: 'ccar-f-59', domain: 'd5', type: 'single',
      stem: 'Output quality degrades noticeably during a long session even though the context window is only 60% full. What best explains this?',
      options: [
        'Relevant detail is harder to locate among accumulated clutter, so quality falls before any hard limit is reached',
        'Context windows always degrade linearly once half full',
        'The model has switched to a smaller variant automatically',
        'Token costs increase as the window fills, reducing quality'
      ],
      answer: [0],
      why: 'The hard limit is where requests fail; usable quality falls well before it as stale, irrelevant material competes with what matters. Structuring context and removing finished material — rather than appending around it — is what keeps a long session coherent.'
    },
    {
      id: 'ccar-f-60', domain: 'd5', type: 'single',
      stem: 'An agent must answer questions about a 900-page manual. Which approach best preserves answer quality?',
      options: [
        'Retrieve only the sections relevant to the question and include their source references in context',
        'Load the entire manual into context for every question',
        'Summarise the manual once and answer all future questions from the summary',
        'Split the manual into fixed 1,000-character chunks and include all of them'
      ],
      answer: [0],
      why: 'Targeted retrieval with provenance keeps context small, relevant, and checkable. Loading everything buries the answer in noise, a single summary discards the detail most questions need, and including every chunk is loading everything with the structure destroyed as well.'
    }
  ]
});
