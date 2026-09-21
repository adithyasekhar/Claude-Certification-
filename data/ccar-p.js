ClaudeCertPrep.register({
  id: 'ccar-p',
  code: 'CCAR-P',
  name: 'Claude Certified Architect — Professional',
  tier: 'Professional',
  order: 4,
  blurb: 'The senior tier. Owning a production Claude system end to end: discovery, architecture, enterprise integration, evaluation, governance and compliance, and the stakeholder conversations that surround all of it.',
  audience: 'Mid- to senior-level solution architects, AI/ML engineers, technical leads and senior software engineers. Around three or more years of systems architecture or platform engineering, plus at least six months of production work with Claude or comparable systems.',
  facts: {
    items: 63, minutes: 120, pass: 720, scaleRange: '100–1,000',
    fee: '$175 USD', validity: '12 months', format: 'Multiple-choice and multiple-response'
  },
  note: 'What separates this from Foundations is not harder architecture — it is the three domains Foundations does not have: governance and risk, stakeholder communication and lifecycle, and developer enablement. Together those are 35% of the paper.',

  domains: [
    {
      id: 'd1', n: 1, weight: 17,
      title: 'Solution Design & Architecture',
      objectives: [
        'Turning a business problem into a Claude-based solution',
        'Designing end to end: input, processing, output, feedback',
        'Choosing between workflow, agentic, and augmented-LLM patterns',
        'Designing multi-agent systems and orchestration',
        'Decomposing complex problems',
        'Tying the solution to business value — efficiency, cost, productivity, SLAs'
      ],
      notes: [
        'Start from the business problem and the measure of success, not from the pattern. Many stated AI requirements dissolve on inspection into a data problem, a process problem, or a reporting problem with a language-shaped surface. An architect who can say "this does not need a model" is demonstrating the competence being tested.',
        'The pattern ladder, cheapest and most predictable first: a single augmented call with retrieval or tools; a deterministic workflow of such calls; an agentic stage inside an otherwise deterministic workflow; a full multi-agent system. Move up only when the level below genuinely cannot express the requirement. Every step up costs predictability, debuggability, and money.',
        'End-to-end means the feedback loop is part of the design, not an afterthought. Where do corrections go? How does a human disagreement become a change to the system? Without that loop, the system\'s quality is fixed at launch and drifts from there.',
        'Business value pillars are worth stating explicitly because they change the architecture. A system justified by cost reduction is designed differently from one justified by cycle time or by a response-time SLA — the first tolerates latency to save tokens, the second does the opposite.'
      ],
      traps: [
        'Selecting multi-agent because the problem is important rather than because it is genuinely decomposable and unpredictable.',
        'Designing to a demo path and discovering at handover that nobody defined what happens on the unhappy path.'
      ],
      terms: ['augmented LLM', 'workflow vs agentic', 'orchestration', 'decomposition', 'feedback loop', 'value pillars', 'SLA']
    },
    {
      id: 'd2', n: 2, weight: 13,
      title: 'Claude Models, Prompting & Context Engineering',
      objectives: [
        'Selecting models on explicit trade-offs',
        'Designing system prompts, templates, and guardrails',
        'Applying zero-shot, few-shot, and chain-of-thought techniques',
        'Optimising the context window and token usage',
        'Reusing prompts through caching, modular templates, and skills'
      ],
      notes: [
        'Model selection at this level is a documented trade-off, not a preference. State the axes — quality on your evaluation set, cost per unit of work, latency at the relevant percentile, and the consequence of an error — and choose against them. Tiered routing, where a small model handles the bulk and escalates uncertain cases, is the standard production answer.',
        'Prompts should be modular and versioned, not monolithic per use case. A shared base with composable fragments means a policy change is one edit rather than forty, and it keeps the cacheable prefix stable across surfaces.',
        'Prompt caching is an architectural decision, not a micro-optimisation. Designing the prompt so the large stable portion sits at the front and the variable portion after the breakpoint can change the unit economics of a high-traffic system by an order of magnitude.',
        'Chain-of-thought buys reasoning quality at the cost of output tokens and latency. Apply it where the reasoning is genuinely the difficulty, not uniformly across every call.'
      ],
      traps: [
        'Standardising on the largest model across the estate because it is simplest to explain, and discovering the unit economics at scale.',
        'Copy-pasting one enormous prompt into six services, then trying to roll out a compliance wording change.'
      ],
      terms: ['tiered routing', 'prompt caching', 'modular prompts', 'chain-of-thought', 'guardrails', 'skills', 'context budget']
    },
    {
      id: 'd3', n: 3, weight: 19,
      title: 'Integration',
      objectives: [
        'Spotting capability bloat in tool and agent configuration',
        'Finding security gaps in authentication and authorisation',
        'Justifying accuracy-versus-latency trade-offs',
        'Selecting monitoring and observability strategies at scale',
        'Designing RAG pipelines with appropriate chunking and indexing',
        'Matching retrieval strategy to data shape and query pattern',
        'Choosing between MCP, direct API or CLI, and agent-to-agent integration',
        'Weighing progressive discovery against monolithic context'
      ],
      notes: [
        'The heaviest domain. Most of it is about boundaries: what the model may reach, under whose authority, and how you know what it did.',
        'Authorisation never lives in the model. The model proposes; your systems decide whether this user may perform this action. A tool that inherits a broad service identity is a privilege-escalation path regardless of how carefully the prompt is worded — the user\'s own permissions have to be enforced at the point of execution.',
        'RAG design follows the data and the query pattern. Chunk on semantic boundaries rather than fixed character counts where structure allows, size chunks to the retrieval unit that actually answers a question, and keep enough overlap or metadata that a retrieved fragment is still interpretable. Pure vector search handles paraphrase well and exact identifiers badly; hybrid retrieval with keyword matching fixes precisely that failure. Reranking is what you add when recall is fine but the top results are not the right ones.',
        'Observability for LLM systems needs more than uptime: per-request token counts and cost, latency percentiles, tool-call traces, retrieval hit quality, and output-quality sampling. Averages hide the failures — watch the tail.',
        'Progressive discovery beats loading everything when the surface is large. Let the agent find what it needs when it needs it, rather than paying to carry the whole catalogue on every turn.'
      ],
      traps: [
        'Fixed-size chunking across structured documents, splitting a table from its header and a clause from its condition.',
        'Diagnosing "retrieval is bad" without separating a recall problem from a ranking problem — they have different fixes.'
      ],
      terms: ['RAG', 'chunking strategy', 'hybrid retrieval', 'reranking', 'authorisation boundary', 'observability', 'progressive discovery', 'MCP vs direct API']
    },
    {
      id: 'd4', n: 4, weight: 16,
      title: 'Evaluation, Testing & Optimisation',
      objectives: [
        'Defining metrics for accuracy, latency, cost, safety, and security',
        'Building evaluation datasets and mixed-method test frameworks',
        'Running A/B tests and iterating',
        'Diagnosing prompt failure, hallucination, and model mismatch',
        'Optimising tokens, latency, and cost-performance',
        'Monitoring with logging and observability tooling'
      ],
      notes: [
        'Define the metric before the system exists, or you will end up measuring whatever is easy to measure. A usable evaluation framework layers automated checks on objective properties, model-graded evaluation on subjective ones, and human review on a sampled slice — no single method covers the space.',
        'Evaluation sets must include the hard cases. A set built from typical traffic will report excellent scores while the system fails on exactly the inputs that generate complaints. Seed deliberately from known failures, edge cases, and adversarial inputs.',
        'Diagnose by category. Output that is confidently wrong about facts points at grounding and retrieval. Output that ignores stated constraints points at the prompt. Output that is fine but too slow or too expensive points at model tier and caching. Output that degrades over a long session points at context management.',
        'A/B testing a prompt change needs the same discipline as any other experiment: one variable, a pre-registered metric, and enough volume to distinguish signal from noise.'
      ],
      traps: [
        'Reporting an aggregate accuracy figure with no breakdown by input type, so a segment failing badly is invisible.',
        'Using the model to grade its own output on the dimension it is most likely to be wrong about.'
      ],
      terms: ['evaluation set', 'model-graded eval', 'golden dataset', 'A/B test', 'latency percentile', 'cost per resolution', 'drift monitoring']
    },
    {
      id: 'd5', n: 5, weight: 14,
      title: 'Governance, Safety & Risk Management',
      objectives: [
        'Implementing guardrails and safety controls',
        'Identifying risks, limitations, and failure modes',
        'Applying human-in-the-loop validation',
        'Meeting regulatory obligations such as GDPR, HIPAA, and FedRAMP',
        'Addressing bias, fairness, and transparency'
      ],
      notes: [
        'Guardrails are layered and mostly live outside the model: validate and classify input, constrain what tools can do, validate and classify output, and gate consequential actions behind human confirmation. A guardrail expressed only as a prompt instruction is a preference.',
        'Human-in-the-loop is a design decision with a threshold, not a blanket policy. Decide what triggers review — low confidence, high value, a regulated category, an irreversible action — and make the reviewer\'s job possible by giving them the evidence and the provenance, not just the conclusion.',
        'Regulatory obligations shape architecture concretely: where data may be processed and stored, what must be retained and for how long, what must be deletable on request, who may see what, and what must be logged to prove it. These are not a compliance appendix — they determine the deployment topology.',
        'Transparency means a person affected by an output can find out that AI was involved and on what basis the output was produced. That requires provenance and logging designed in, not reconstructed after a complaint.'
      ],
      traps: [
        'Treating a model refusal as a security control. It is a behaviour, not a boundary.',
        'Designing the human review step with no time budget, so reviewers rubber-stamp under load and the control exists only on paper.'
      ],
      terms: ['layered guardrails', 'human-in-the-loop threshold', 'data residency', 'retention and deletion', 'audit log', 'bias assessment', 'transparency']
    },
    {
      id: 'd6', n: 6, weight: 14,
      title: 'Stakeholder Communication & Lifecycle Management',
      objectives: [
        'Running structured discovery and requirements gathering',
        'Communicating architectural decisions and their trade-offs',
        'Managing feedback loops and expectations, including SLAs',
        'Documenting architecture and giving implementation guidance',
        'Supporting the full lifecycle — discovery, design, handoff, monitoring, iteration'
      ],
      notes: [
        'Discovery is where most AI projects are won or lost. The questions that matter: what decision does this output feed, what does the current process cost, what does an error cost, who is accountable for output quality, and what would make this a success in six months. A project with no agreed success metric cannot be delivered, only abandoned.',
        'Communicating trade-offs is the senior skill. Give the options, the axis each one optimises, what it gives up, and a recommendation with a reason — not a single answer presented as inevitable. Stakeholders who understand why will support the decision when it becomes inconvenient.',
        'SLAs for probabilistic systems have to be written honestly. Commit to what you can control — availability, latency percentiles, throughput, an escalation path, a measured quality threshold on a defined evaluation set — rather than to output correctness in general.',
        'Handoff is a lifecycle phase, not an email. The receiving team needs the architecture, the evaluation set, the failure modes, the runbook, and the monitoring. A system handed over without its evaluation set cannot be safely changed by anyone.'
      ],
      traps: [
        'Promising accuracy as a contractual number without defining the dataset it is measured on.',
        'Reporting only the improvement in a steering update and leaving known limitations for the incident review.'
      ],
      terms: ['structured discovery', 'success metric', 'trade-off communication', 'SLA', 'handoff package', 'runbook', 'expectation management']
    },
    {
      id: 'd7', n: 7, weight: 7,
      title: 'Developer Productivity & Operational Enablement',
      objectives: [
        'Configuring Claude tooling and environments for teams',
        'Improving developer workflows with AI-assisted tooling',
        'Supporting debugging and operational issue resolution'
      ],
      notes: [
        'The smallest domain. Enablement at team scale means shared, versioned configuration rather than each engineer maintaining their own: project memory files committed to the repository, common workflows packaged as commands or skills, and standards enforced by hooks rather than by asking people to remember.',
        'Rollout follows the same shape as any platform change: a pilot team, measured outcomes, documented patterns, then broader adoption. Mandating a tool across an organisation before anyone has established what good use looks like produces inconsistent practice that is then hard to correct.'
      ],
      traps: ['Leaving configuration uncommitted, so every engineer\'s results differ and nobody can reproduce a colleague\'s output.'],
      terms: ['shared configuration', 'committed memory files', 'packaged workflows', 'enablement', 'pilot and rollout']
    }
  ],

  questions: [
    {
      id: 'ccar-p-01', domain: 'd1', type: 'single',
      stem: 'A business asks for "an AI agent to handle supplier onboarding." Discovery reveals a fixed nine-step process with defined validation rules at each step, currently done by hand because three systems do not talk to each other. What is the appropriate architectural response?',
      options: [
        'Build a deterministic workflow with integrations, using model calls only for the genuinely language-heavy steps such as extracting terms from supplier documents',
        'Build a multi-agent system with one agent per system to preserve flexibility',
        'Build a single autonomous agent with tools for all three systems',
        'Decline the work, since the process is a systems-integration problem rather than an AI one'
      ],
      answer: [0],
      why: 'A fixed sequence with defined rules is a workflow, and the actual pain is integration. Model calls earn their place only at the steps where language understanding is the difficulty. Agentic orchestration here buys non-determinism in exchange for nothing, and refusing the work ignores the real value the language steps do add.'
    },
    {
      id: 'ccar-p-02', domain: 'd1', type: 'multi', select: 2,
      stem: 'Which two conditions genuinely justify a multi-agent architecture over a single augmented call or a deterministic workflow? (Select 2.)',
      options: [
        'The number and nature of subtasks cannot be determined until runtime, based on what earlier work discovers',
        'Subtasks require materially different tool sets and instructions, and their intermediate context does not need to be shared',
        'The project is strategically important and highly visible within the organisation',
        'The team wants to demonstrate advanced agentic capability to the client'
      ],
      answer: [0, 1],
      why: 'Multi-agent is justified by genuine runtime unpredictability and by separable work with distinct tooling and disposable intermediate context. Visibility and demonstration value are not architectural properties, and choosing complexity for either reason means paying in predictability, debuggability, and cost for the life of the system.'
    },
    {
      id: 'ccar-p-03', domain: 'd1', type: 'single',
      stem: 'A design review approves an architecture for a claims-triage system. A reviewer notes that nothing in the design says what happens when an adjuster disagrees with a triage decision. Why does this matter architecturally?',
      options: [
        'Without a feedback path, corrections never reach the system, so quality is fixed at launch and drifts as the input distribution changes',
        'Disagreements should be prevented by raising the confidence threshold instead',
        'It matters only for regulatory reporting, not for the architecture',
        'It is a training concern for adjusters rather than a system concern'
      ],
      answer: [0],
      why: 'The feedback loop is part of the end-to-end design. Disagreements are the highest-value signal the system produces — they identify exactly where it is wrong. With nowhere for them to go, that signal is discarded and the system cannot improve or even detect drift.'
    },
    {
      id: 'ccar-p-04', domain: 'd1', type: 'single',
      stem: 'Two proposals address the same document-processing requirement. Proposal A is a chained workflow costing $0.04 per document with predictable latency. Proposal B is an agentic design costing $0.31 per document with variable latency, handling about 6% more edge cases. Annual volume is four million documents. What should the architect do?',
      options: [
        'Present both with the cost and latency implications quantified, and recommend based on what the 6% of edge cases are worth to the business',
        'Recommend Proposal B, because handling more cases is better architecture',
        'Recommend Proposal A, because lower cost is the primary architectural concern',
        'Combine both designs and run them in parallel for every document'
      ],
      answer: [0],
      why: 'The difference is roughly a million dollars a year against 6% more coverage — a business decision that depends on what those edge cases cost when mishandled. The architect\'s job is to make the trade-off legible and recommend with a stated reason, not to assert a preference for coverage or cost in the abstract.'
    },
    {
      id: 'ccar-p-05', domain: 'd2', type: 'single',
      stem: 'An enterprise deployment routes every request, from simple FAQ lookups to complex multi-document analysis, to the most capable model tier for consistency. Costs are four times forecast. What is the best architectural change?',
      options: [
        'Introduce tiered routing, handling well-defined high-volume requests on a smaller model and escalating uncertain or complex ones',
        'Cut the system prompt length to reduce input tokens',
        'Move everything to the smallest model and accept the quality reduction',
        'Impose a monthly spending cap that rejects requests once reached'
      ],
      answer: [0],
      why: 'Uniform top-tier routing pays premium rates for requests that do not need premium capability. Tiered routing with an escalation path preserves quality where it matters and removes the overspend where it does not. A spending cap turns a cost problem into an availability outage.'
    },
    {
      id: 'ccar-p-06', domain: 'd2', type: 'single',
      stem: 'Six services each contain their own copy of a 4,000-token system prompt. A compliance change requires new wording in all of them, and two copies are missed for three weeks. What is the underlying architectural problem?',
      options: [
        'Prompts are not managed as versioned, modular, shared assets, so a single policy change requires six coordinated manual edits',
        'The prompt is too long and should be shortened below 1,000 tokens',
        'Compliance requirements should not be expressed in prompts at all',
        'The services should be merged into a single deployment'
      ],
      answer: [0],
      why: 'Duplicated prompts drift, and the omission was a consequence of that rather than an accident. A shared base with composable fragments, versioned like code, makes a policy change one reviewed edit — and keeps the cacheable prefix consistent across services as a side benefit.'
    },
    {
      id: 'ccar-p-07', domain: 'd2', type: 'single',
      stem: 'A high-traffic assistant sends an identical 12,000-token policy and tool preamble on every request, followed by the user\'s question. What design change most improves unit economics without affecting output?',
      options: [
        'Structure the request so the stable preamble sits before the cache breakpoint and only the question varies after it',
        'Move the user question to the start of the prompt for better recency',
        'Enable streaming so tokens are billed progressively',
        'Split the preamble across several smaller requests'
      ],
      answer: [0],
      why: 'A large, unchanging prefix reused across heavy traffic is exactly the profile caching targets, and reading cached tokens costs a fraction of processing them fresh. Placing variable content first would invalidate the prefix on every request. Streaming changes delivery, not billing.'
    },
    {
      id: 'ccar-p-08', domain: 'd3', type: 'single',
      stem: 'An HR assistant answers policy questions using a tool that queries the HR database with a service account holding read access to all employee records. The prompt instructs the model to only discuss the requesting user\'s own data. Why is this design unsound?',
      options: [
        'Authorisation is enforced in the prompt rather than at execution, so any deviation or injection exposes every employee\'s record',
        'Service accounts cannot be used for database access in production',
        'The tool should return data in a structured format rather than prose',
        'Read access should be replaced by read-write access for completeness'
      ],
      answer: [0],
      why: 'The model is not an authorisation boundary. A broadly privileged service identity combined with a prompt-level restriction means one injected instruction or one misinterpretation separates the system from a full data exposure. Scope the query to the authenticated user and enforce it at execution.'
    },
    {
      id: 'ccar-p-09', domain: 'd3', type: 'single',
      stem: 'A RAG system over technical manuals performs well on conceptual questions but fails on queries containing exact part numbers such as "HX-4471-B". Which change addresses this most directly?',
      options: [
        'Add keyword or lexical matching alongside vector search, since exact identifiers are where pure semantic similarity is weakest',
        'Increase the number of chunks retrieved per query',
        'Switch to a larger model for answer generation',
        'Reduce chunk size so each chunk contains fewer part numbers'
      ],
      answer: [0],
      why: 'Embeddings capture meaning, and an arbitrary identifier carries little semantic signal — near-identical part numbers sit close together in vector space. Hybrid retrieval combines lexical precision with semantic recall. Retrieving more chunks or generating with a better model cannot fix a retrieval step that never surfaced the right passage.'
    },
    {
      id: 'ccar-p-10', domain: 'd3', type: 'single',
      stem: 'A pipeline splits regulatory documents into fixed 500-character chunks. Answers frequently cite conditions without the exception that follows, and table values without the column headings. What is the appropriate fix?',
      options: [
        'Chunk on the documents\' structural boundaries — clause, section, whole table — and carry section metadata with each chunk',
        'Halve the chunk size so more chunks are retrieved per query',
        'Double the number of chunks passed to the model',
        'Switch the embedding model for a higher-dimensional one'
      ],
      answer: [0],
      why: 'Fixed-length splitting cuts through the structures that make the content meaningful, so retrieved fragments are individually true and jointly misleading. Structure-aware chunking with metadata keeps a clause with its exception and a value with its heading. Smaller chunks fragment further; more chunks retrieve more fragments.'
    },
    {
      id: 'ccar-p-11', domain: 'd3', type: 'multi', select: 2,
      stem: 'Which two signals belong in observability for a production Claude system, beyond standard service metrics? (Select 2.)',
      options: [
        'Per-request token counts and cost, aggregated by feature and by customer',
        'Tool-call traces showing which tools were selected, with what arguments and what results',
        'The number of distinct users who opened the application this week',
        'Average response length across all requests'
      ],
      answer: [0, 1],
      why: 'Token and cost attribution is what makes unit economics manageable and catches runaway loops early. Tool traces are what make an agentic failure reconstructable, since the visible symptom usually originates several steps earlier. Active-user counts are product analytics, and average length is a weak proxy that hides the tail where failures live.'
    },
    {
      id: 'ccar-p-12', domain: 'd3', type: 'single',
      stem: 'An agent platform must reach a capability maintained by a separate team, already consumed by three other internal clients, with its own release cadence and access controls. Which integration mechanism fits?',
      options: [
        'An MCP server, giving one implementation with its own versioning, deployment, and authentication across clients',
        'A local function copied into each consuming application',
        'A direct database connection from each agent to the underlying store',
        'A shared prompt template describing the capability for each team to implement'
      ],
      answer: [0],
      why: 'Multiple consumers plus separate ownership and lifecycle is the MCP boundary. Copies diverge, direct database access bypasses the owning team\'s controls entirely, and a description of a capability is not an integration.'
    },
    {
      id: 'ccar-p-13', domain: 'd4', type: 'single',
      stem: 'A contract-analysis system reports 94% accuracy on its evaluation set, but users report frequent errors. The evaluation set was built by sampling 200 random contracts from last year. What is the likely explanation?',
      options: [
        'The set reflects typical traffic and under-represents the unusual and adversarial cases where the system actually fails',
        'Two hundred examples is too small a sample for any meaningful measurement',
        'Accuracy is the wrong metric and should be replaced by latency',
        'The evaluation should be graded by the model rather than by humans'
      ],
      answer: [0],
      why: 'A randomly sampled set measures performance on the easy majority. The failures generating complaints cluster in edge cases, unusual formats, and adversarial inputs that random sampling barely touches. Evaluation sets need deliberate seeding from known failures, not just representative traffic.'
    },
    {
      id: 'ccar-p-14', domain: 'd4', type: 'single',
      stem: 'A system produces fluent answers that are confidently wrong about specific figures found in source documents. Which diagnosis fits best?',
      options: [
        'A grounding and retrieval problem — the model is generating from parametric knowledge because the right passage was not retrieved or was not clearly attributed',
        'A prompt-constraint problem requiring a firmer instruction to be accurate',
        'A model-tier mismatch requiring a more capable model',
        'A context-management problem requiring more aggressive compaction'
      ],
      answer: [0],
      why: 'Confident errors about facts that exist in the sources point at what reached the context, not at model capability or instruction strength. Fix retrieval and attribution so the correct passage is present and identifiable, and require the answer to cite the passage it used.'
    },
    {
      id: 'ccar-p-15', domain: 'd4', type: 'multi', select: 2,
      stem: 'You are designing an evaluation framework for a customer-facing assistant. Which two combinations make it sound? (Select 2.)',
      options: [
        'Automated checks for objectively verifiable properties such as schema validity, required disclosures, and latency',
        'Human review on a sampled slice, weighted towards high-risk and low-confidence outputs',
        'A single overall quality score produced by the same model that generated the output',
        'Customer satisfaction ratings as the sole measure of output quality'
      ],
      answer: [0, 1],
      why: 'A usable framework layers methods: automation covers objective properties cheaply and at full volume, and targeted human review covers judgement where risk is concentrated. Self-grading by the generating model is least reliable precisely where it is most wrong, and satisfaction scores measure experience rather than correctness — users rate confident wrong answers highly.'
    },
    {
      id: 'ccar-p-16', domain: 'd4', type: 'single',
      stem: 'A team wants to test whether a new prompt improves resolution rate. They deploy it to all users on Monday and compare that week against the previous week. What is the main flaw?',
      options: [
        'Week-over-week comparison confounds the prompt change with everything else that differed between the two weeks',
        'Resolution rate cannot be measured for an AI system',
        'One week is too short for any prompt to show an effect',
        'The new prompt should have been tested at a higher temperature'
      ],
      answer: [0],
      why: 'Without a concurrent control, seasonality, traffic mix, incidents, and any other release that week are all bundled into the measured difference. A split test running both variants over the same period on comparable traffic isolates the variable you changed.'
    },
    {
      id: 'ccar-p-17', domain: 'd5', type: 'single',
      stem: 'A healthcare client asks how the system prevents protected health information leaving the approved processing boundary. The team answers that the system prompt instructs the model never to reveal PHI. How should the architect respond?',
      options: [
        'Explain that prompt instructions are not a control, and design enforcement — data minimisation before the call, output filtering, access controls, and audit logging',
        'Confirm the approach, since the instruction is explicit and the model follows instructions reliably',
        'Add the same instruction at the end of the prompt as well, for redundancy',
        'Recommend a more capable model, which follows safety instructions more consistently'
      ],
      answer: [0],
      why: 'Regulated data requires enforceable controls that hold independent of model behaviour. Minimise what is sent, constrain what tools can reach, filter and classify output, restrict access, and log for audit. Repeating an instruction or upgrading the model changes the probability of compliance, and a regulator is not buying a probability.'
    },
    {
      id: 'ccar-p-18', domain: 'd5', type: 'single',
      stem: 'A loan-support system routes any application it scores below a confidence threshold to human review. In practice reviewers handle 400 cases a day each and approve 98% within seconds. What is the governance problem?',
      options: [
        'The review control exists on paper but not in practice, because the workload makes genuine review impossible',
        'The confidence threshold is set too high, producing too many referrals',
        'Human review should be removed, since reviewers agree with the system almost always',
        'The approval rate proves the model is performing well'
      ],
      answer: [0],
      why: 'A control that cannot be exercised is not a control. At that volume and speed, the reviewer is a rubber stamp, and the high agreement rate is evidence of the throughput problem rather than of model quality. Either reduce referral volume so review is feasible or resource it properly — and measure review quality, not just its existence.'
    },
    {
      id: 'ccar-p-19', domain: 'd5', type: 'multi', select: 2,
      stem: 'Which two requirements most directly constrain the deployment topology of a Claude system handling EU personal data? (Select 2.)',
      options: [
        'Where personal data may be processed and stored, and under what transfer conditions',
        'The ability to delete an individual\'s data on request across every store that holds it',
        'The model tier chosen for the highest-volume request type',
        'Whether responses are streamed or returned complete'
      ],
      answer: [0, 1],
      why: 'Residency and transfer rules determine which regions and services the architecture may use, and a deletion obligation determines how logs, caches, vector stores, and backups are designed — both shape topology before any modelling decision. Model tier and response delivery are performance and cost choices with no bearing on those obligations.'
    },
    {
      id: 'ccar-p-20', domain: 'd6', type: 'single',
      stem: 'During discovery for an AI document-review project, which question is most likely to change the architecture?',
      options: [
        'What does a missed error cost, and who is accountable when one reaches a client?',
        'Which model does the organisation prefer to use?',
        'How soon can a prototype be demonstrated to the board?',
        'Which cloud provider holds the existing contract?'
      ],
      answer: [0],
      why: 'The cost of an error and the locus of accountability determine the review threshold, the guardrails, the evaluation bar, and how much autonomy the system gets — the decisions everything else follows from. Model preference, demo timing, and provider contracts are real constraints but shape implementation rather than the shape of the solution.'
    },
    {
      id: 'ccar-p-21', domain: 'd6', type: 'single',
      stem: 'A client wants a contractual SLA of "99% accuracy" for an AI summarisation service. How should the architect respond?',
      options: [
        'Propose commitments that can be measured and controlled — availability, latency percentiles, and a quality threshold on a jointly agreed evaluation set with a defined review process',
        'Accept the 99% figure, since internal testing has exceeded it',
        'Refuse any quality commitment, since model output is probabilistic',
        'Offer 95% instead, as a safer margin on the same undefined measure'
      ],
      answer: [0],
      why: 'A bare accuracy percentage is unenforceable in both directions because it has no agreed definition or dataset. Anchoring quality to a jointly owned evaluation set with a defined review process gives the client a real commitment and the team something it can actually measure. Refusing all quality commitment is not a serviceable position for a production system.'
    },
    {
      id: 'ccar-p-22', domain: 'd6', type: 'single',
      stem: 'A system is being handed from the delivery team to a client operations team. Which item, if omitted, most compromises the client\'s ability to maintain it safely?',
      options: [
        'The evaluation set and the process for running it, since without them no prompt or model change can be validated',
        'The original slide deck from the kickoff workshop',
        'A record of which vendors were considered during selection',
        'The delivery team\'s internal sprint history'
      ],
      answer: [0],
      why: 'Without the evaluation set, any change becomes a guess and the receiving team either freezes the system or degrades it unknowingly. Historical artefacts have value for context but do not affect whether the system can be safely modified after handover.'
    },
    {
      id: 'ccar-p-23', domain: 'd7', type: 'single',
      stem: 'Across a 60-engineer organisation, results from AI-assisted development vary widely and nobody can reproduce a colleague\'s output. Each engineer maintains their own local configuration. What is the appropriate enablement step?',
      options: [
        'Commit shared project configuration to the repository, package common workflows, and enforce standards with hooks rather than convention',
        'Mandate the same model tier for every engineer',
        'Require every engineer to document their personal configuration in the team wiki',
        'Restrict AI-assisted development to a small group of senior engineers'
      ],
      answer: [0],
      why: 'Reproducibility comes from configuration living with the code, where it is versioned, reviewed, and identical for everyone. Documenting sixty divergent setups records the problem rather than fixing it, and restricting access forfeits the benefit instead of standardising it.'
    },
    {
      id: 'ccar-p-24', domain: 'd7', type: 'single',
      stem: 'An organisation plans to mandate AI-assisted development tooling across all teams next quarter, with no prior usage. What is the strongest recommendation?',
      options: [
        'Pilot with a small number of teams, measure outcomes, document the patterns that worked, and then roll out with that guidance',
        'Proceed with the mandate to maximise adoption speed and gather feedback afterwards',
        'Delay indefinitely until the tooling matures further',
        'Make adoption optional and let practice emerge on its own'
      ],
      answer: [0],
      why: 'A pilot establishes what good use looks like in this codebase and this organisation before it is replicated sixty times over. Mandating first produces inconsistent practice that is harder to correct than to establish; indefinite delay and pure voluntarism both forfeit the benefit and leave the same variance unaddressed.'
    },
    {
      id: 'ccar-p-25', domain: 'd1', type: 'single',
      stem: 'A client wants an AI system to "reduce manual effort in claims handling." Discovery shows 70% of the effort is chasing missing documents from customers. What should the architecture address first?',
      options: [
        'The document-chasing loop, since that is where the effort actually sits, even though it is mostly workflow and notification rather than modelling',
        'Claims classification, since that is the most natural language task in the process',
        'A conversational assistant for handlers, since it demonstrates value quickly',
        'Automated claim decisioning, since it removes the most human time per claim'
      ],
      answer: [0],
      why: 'Architecture follows the measured problem, not the most AI-shaped part of it. Optimising a step holding a minority of the effort cannot deliver the stated outcome. Naming that the biggest win is largely non-AI is the senior judgement being tested.'
    },
    {
      id: 'ccar-p-26', domain: 'd1', type: 'single',
      stem: 'Which architecture best fits a requirement where a request may need between one and twenty independent research subtasks, unknown until the request is analysed?',
      options: [
        'Orchestrator-worker, with the orchestrator decomposing at runtime and spawning workers as needed',
        'A fixed parallel fan-out of twenty workers, with unused ones returning empty',
        'A sequential chain of twenty stages, each skipped if not required',
        'A single augmented call with all twenty capabilities as tools'
      ],
      answer: [0],
      why: 'Runtime-variable decomposition is the defining condition for orchestrator-worker. A fixed fan-out wastes capacity and cost on the common small case, and a twenty-stage chain serialises work that is independent by construction.'
    },
    {
      id: 'ccar-p-27', domain: 'd1', type: 'multi', select: 2,
      stem: 'A proposed design routes every request through four sequential model calls. Which two questions should the architect ask before approving it? (Select 2.)',
      options: [
        'Does each stage genuinely consume the previous stage\'s output, or could some run concurrently?',
        'What is the combined latency and cost per request, measured against the SLA and the business case?',
        'Which model tier has the largest context window available?',
        'Can the four stages be given more descriptive names?'
      ],
      answer: [0, 1],
      why: 'Four serial calls multiply both latency and cost, so the architect must confirm the dependencies are real and that the resulting envelope fits the commitment. Context window size and naming do not bear on whether the chain is justified.'
    },
    {
      id: 'ccar-p-28', domain: 'd1', type: 'single',
      stem: 'A system is justified to the board on the basis of a sub-two-second response SLA for customer-facing queries. How should this shape the architecture?',
      options: [
        'Towards fewer sequential model calls, aggressive caching, and a smaller model on the critical path, accepting higher token cost where it buys latency',
        'Towards batch processing, which is the most efficient way to handle volume',
        'Towards a multi-agent design, since parallel agents are inherently faster',
        'Towards the most capable model, since quality determines customer satisfaction'
      ],
      answer: [0],
      why: 'The justifying value pillar drives the trade-off. A latency SLA inverts the usual cost calculus: you spend tokens to save milliseconds. Batch is disqualified outright on an interactive path, and multi-agent adds coordination overhead rather than removing it.'
    },
    {
      id: 'ccar-p-29', domain: 'd1', type: 'single',
      stem: 'A design review asks how the system behaves when the retrieval layer returns nothing relevant. The team has not considered it. Why does this matter most at the architecture stage?',
      options: [
        'The unhappy path determines whether the system fails safely or answers confidently from nothing, and retrofitting that behaviour later is expensive',
        'It only affects the evaluation set, which can be built later',
        'It is an implementation detail for the engineering team',
        'It matters only if the retrieval corpus is small'
      ],
      answer: [0],
      why: 'Failure behaviour is architectural: whether an empty retrieval produces an honest "I do not have this" or a confident fabrication is a design decision with governance and trust consequences. Systems designed only to the demo path discover this in production.'
    },
    {
      id: 'ccar-p-30', domain: 'd1', type: 'single',
      stem: 'Which decomposition approach best suits a complex regulatory-analysis requirement?',
      options: [
        'Split by the distinct judgements required — identify applicable rules, assess each against the facts, then synthesise — so each stage is separately verifiable',
        'Split by document length, processing 10 pages per stage',
        'Split by team ownership, so each department handles its own stage',
        'Avoid splitting, so the model retains full context throughout'
      ],
      answer: [0],
      why: 'Decomposition should follow the structure of the reasoning, because that is what makes each stage independently checkable and correctable. Splitting by page count cuts arbitrarily through arguments, and organisational boundaries are a delivery concern rather than a design principle.'
    },
    {
      id: 'ccar-p-31', domain: 'd1', type: 'single',
      stem: 'An architect is asked to justify why a proposed system uses a deterministic workflow with two model calls rather than an agent. What is the strongest framing?',
      options: [
        'The path is known at design time, so the workflow delivers the same outcome with reproducible behaviour, lower cost, and an auditable execution trace',
        'Agents are an immature technology not suitable for production use',
        'The team lacks the expertise to build an agentic system',
        'Workflows are always preferable to agents regardless of the requirement'
      ],
      answer: [0],
      why: 'The justification is specific to this requirement: nothing is gained by runtime flexibility when the path does not vary, and predictability, cost and auditability are gained by not paying for it. Blanket claims about agents are neither true nor persuasive to a technical stakeholder.'
    },
    {
      id: 'ccar-p-32', domain: 'd2', type: 'single',
      stem: 'A regulated client requires that every model response include a specific disclosure. Where should this be enforced?',
      options: [
        'In the output pipeline, validated after generation, rather than relying on the prompt alone to include it',
        'In the system prompt, stated clearly and repeated at the end',
        'In a few-shot example showing the disclosure in place',
        'In the tool descriptions, so the model is reminded on every call'
      ],
      answer: [0],
      why: 'A compliance requirement that must hold on every response needs a deterministic check that blocks or appends before the response leaves the system. Prompt-level inclusion is highly reliable but not certain, and a regulator does not accept a high probability.'
    },
    {
      id: 'ccar-p-33', domain: 'd2', type: 'single',
      stem: 'Chain-of-thought prompting improves accuracy on a complex reasoning task by 8 points but triples output tokens and doubles latency. Where should it be applied?',
      options: [
        'Selectively, on the request types where the reasoning is genuinely the difficulty, rather than uniformly',
        'Uniformly across all requests, since accuracy is the priority',
        'Nowhere, since the latency cost exceeds any accuracy benefit',
        'Only on requests from the highest-paying customers'
      ],
      answer: [0],
      why: 'Applying an expensive technique where it does no work pays its full cost for none of its benefit. Classifying requests by difficulty and applying it to the hard subset captures most of the accuracy gain for a fraction of the cost and latency.'
    },
    {
      id: 'ccar-p-34', domain: 'd2', type: 'multi', select: 2,
      stem: 'Which two make a prompt architecture maintainable at enterprise scale? (Select 2.)',
      options: [
        'A shared base with composable fragments, so a policy change is one reviewed edit',
        'Version control with review, so prompt changes are deployments rather than edits',
        'One self-contained prompt per use case, so teams can move independently',
        'Storing prompts in the database so they can be changed without a release'
      ],
      answer: [0, 1],
      why: 'Modularity and versioning are what make a change propagate correctly and reversibly across many surfaces. Self-contained per-use-case prompts guarantee drift, and database-stored prompts changeable outside a release remove exactly the review gate that prevents untested behaviour reaching production.'
    },
    {
      id: 'ccar-p-35', domain: 'd2', type: 'single',
      stem: 'An architect must choose a model tier for a system where an error means a customer receives incorrect billing information. What should drive the decision?',
      options: [
        'Measured performance on an evaluation set representing real billing queries, weighed against the cost of an error reaching a customer',
        'The tier the vendor recommends as a general default',
        'The tier already used elsewhere in the organisation, for consistency',
        'The tier with the largest context window'
      ],
      answer: [0],
      why: 'Model selection at this level is a documented trade-off against measured evidence on your own data and the consequence of being wrong. Vendor defaults, internal consistency and context size are all inputs that say nothing about performance on this specific task.'
    },
    {
      id: 'ccar-p-36', domain: 'd2', type: 'single',
      stem: 'A system prompt has grown to 15,000 tokens across six product surfaces sharing it. Latency and cost are both rising. What is the first structural move?',
      options: [
        'Separate the genuinely shared stable core from surface-specific fragments, so each surface loads only what it needs behind a cacheable prefix',
        'Cut the prompt in half by deleting the least-used sections',
        'Move all six surfaces to a faster model tier',
        'Ask each surface team to write their own independent prompt'
      ],
      answer: [0],
      why: 'A shared prompt covering six surfaces makes every surface pay for the other five. Separating the common core from surface fragments reduces per-request tokens while keeping one place to change shared policy — and preserves a stable prefix for caching.'
    },
    {
      id: 'ccar-p-37', domain: 'd3', type: 'single',
      stem: 'A RAG system retrieves the right documents but the answer still misses the key point, which sits in the fourth-ranked chunk while the model focuses on the first. What is the appropriate fix?',
      options: [
        'Add reranking, since recall is adequate but ordering is not',
        'Retrieve more chunks, so the key point is more likely to appear',
        'Reduce chunk size so more chunks fit in context',
        'Switch to a larger generation model'
      ],
      answer: [0],
      why: 'Recall and ranking are different failures with different fixes. The right passage is already being retrieved, so the problem is ordering — reranking addresses it directly. Retrieving more chunks worsens the ranking problem by adding noise around the answer.'
    },
    {
      id: 'ccar-p-38', domain: 'd3', type: 'single',
      stem: 'An enterprise agent needs access to twelve internal systems. Exposing all twelve tool sets at once degrades selection and inflates per-turn cost. What is the architectural response?',
      options: [
        'Progressive discovery — expose a task-oriented entry surface and let the agent load detailed capability only when a task requires it',
        'Expose all twelve but shorten each description to one line',
        'Split into twelve separate agents, each connected to all twelve systems',
        'Increase the context window so all twelve fit comfortably'
      ],
      answer: [0],
      why: 'Carrying every capability on every turn is the monolithic-context strategy, and it fails on both cost and disambiguation as the surface grows. Progressive discovery keeps the working surface proportional to the task. Shorter descriptions make selection worse, not better.'
    },
    {
      id: 'ccar-p-39', domain: 'd3', type: 'multi', select: 2,
      stem: 'Which two authentication and authorisation gaps most commonly appear in agent integrations? (Select 2.)',
      options: [
        'Tools running under a broad service identity rather than the authenticated end user\'s permissions',
        'Consequential actions executed on the model\'s decision alone, with no application-side authorisation check',
        'API keys rotated on a quarterly rather than monthly schedule',
        'Tool results returned as JSON rather than plain text'
      ],
      answer: [0, 1],
      why: 'Both are privilege-escalation paths: a broad service identity means any deviation exposes everything it can reach, and unchecked model-initiated actions make the model an authorisation boundary. Rotation cadence is hygiene, and result format is irrelevant to access control.'
    },
    {
      id: 'ccar-p-40', domain: 'd3', type: 'single',
      stem: 'A support agent must answer within two seconds, but the most accurate retrieval configuration takes four. How should the architect handle this?',
      options: [
        'Quantify the accuracy lost at two seconds, present the trade-off explicitly, and design escalation for the cases the fast path handles poorly',
        'Adopt the accurate configuration and renegotiate the SLA afterwards',
        'Adopt the fast configuration without further analysis, since the SLA is fixed',
        'Run both configurations and return whichever finishes first'
      ],
      answer: [0],
      why: 'Accuracy-latency trade-offs are decisions to be quantified and justified, not resolved by defaulting to either pole. Measuring the cost of the fast path and designing an escalation route for its weak cases gives the business a real choice with the risk named.'
    },
    {
      id: 'ccar-p-41', domain: 'd3', type: 'single',
      stem: 'Retrieval quality is good on recently added documents and poor on older ones. What should the architect investigate first?',
      options: [
        'Whether older documents were chunked or indexed under a different scheme, creating an inconsistent corpus',
        'Whether the generation model has a knowledge cutoff affecting older content',
        'Whether older documents should be deleted to improve averages',
        'Whether the context window is large enough for older documents'
      ],
      answer: [0],
      why: 'A quality split that tracks ingestion date points at a pipeline change — a different chunking strategy, embedding model, or metadata schema applied to one cohort. Model knowledge cutoffs are irrelevant to retrieved content, and deleting the weak cohort discards the data rather than fixing it.'
    },
    {
      id: 'ccar-p-42', domain: 'd3', type: 'single',
      stem: 'Which observability gap would most hinder diagnosing a production incident in an agentic system?',
      options: [
        'No record of which tools were called, with what arguments, in what order',
        'No record of the average response length per endpoint',
        'No record of how many users were active during the incident',
        'No record of which browser the request originated from'
      ],
      answer: [0],
      why: 'Agent failures typically originate several steps before the visible symptom, so without the call trace you cannot reconstruct the path that produced the bad outcome. The other three are product or client telemetry with no bearing on the reasoning chain.'
    },
    {
      id: 'ccar-p-43', domain: 'd3', type: 'single',
      stem: 'Two internal agent systems need to exchange work. Which consideration most favours a defined agent-to-agent integration over one system simply calling the other\'s tools directly?',
      options: [
        'Each system owns its own capabilities, context and authorisation, and the boundary keeps those concerns separate and independently evolvable',
        'Agent-to-agent communication is always faster than direct tool calls',
        'It removes the need for authentication between the systems',
        'It guarantees that neither system can produce an incorrect result'
      ],
      answer: [0],
      why: 'The boundary is about ownership and encapsulation: each side evolves its internals without the other breaking, and each enforces its own authorisation. It adds a hop rather than removing one, and it certainly does not remove the need for authentication or make either side correct.'
    },
    {
      id: 'ccar-p-44', domain: 'd4', type: 'single',
      stem: 'An evaluation framework reports a single aggregate accuracy figure for a system serving four distinct customer segments. What is the main risk?',
      options: [
        'A segment failing badly can be hidden by strong performance elsewhere, so the aggregate stays healthy while a subset of customers is poorly served',
        'Aggregate figures are always statistically invalid',
        'Four segments is too many to evaluate separately',
        'Accuracy is the wrong metric for any AI system'
      ],
      answer: [0],
      why: 'Averages conceal distribution, and a systematically failing segment is exactly the failure that generates complaints while dashboards look fine. Breaking results down by segment, input type and risk tier is what makes the measurement actionable.'
    },
    {
      id: 'ccar-p-45', domain: 'd4', type: 'multi', select: 2,
      stem: 'Which two should be seeded deliberately into an evaluation set? (Select 2.)',
      options: [
        'Inputs that previously caused production failures',
        'Adversarial and malformed inputs the system will encounter in the wild',
        'Additional examples of the most common input type, to reflect real traffic',
        'Synthetic inputs generated by the same model under evaluation'
      ],
      answer: [0, 1],
      why: 'Known failures and adversarial cases are where the system actually breaks, so they must be represented or the evaluation measures only the easy majority. Over-weighting the common case inflates the score, and self-generated inputs inherit the model\'s own blind spots.'
    },
    {
      id: 'ccar-p-46', domain: 'd4', type: 'single',
      stem: 'A system\'s output quality has declined over six months with no code or prompt changes. What is the most likely cause to investigate first?',
      options: [
        'Drift in the input distribution, where real-world requests have moved away from what the system was built and evaluated against',
        'Gradual degradation of the model weights over time',
        'Accumulated log files slowing the inference path',
        'The evaluation set becoming too large to run'
      ],
      answer: [0],
      why: 'With the system unchanged, the change is in what is arriving at it — new request types, new terminology, a shifted customer mix. This is why monitoring input distribution alongside output quality, and refreshing the evaluation set periodically, are part of the lifecycle.'
    },
    {
      id: 'ccar-p-47', domain: 'd4', type: 'single',
      stem: 'Which metric set best reflects the real cost-performance of a customer-facing Claude system?',
      options: [
        'Cost per successfully resolved request, latency at the 95th and 99th percentiles, and quality measured on a defined evaluation set',
        'Total monthly spend and average response time',
        'Tokens consumed per day and number of API calls',
        'Model tier used and context window size'
      ],
      answer: [0],
      why: 'Cost per resolution captures whether spend produces outcomes rather than just activity, and tail latency is where users actually experience failure. Totals and averages hide both the unresolved requests and the slow tail; token counts and configuration are inputs, not performance.'
    },
    {
      id: 'ccar-p-48', domain: 'd4', type: 'single',
      stem: 'An A/B test on a prompt change shows a 3% improvement over 400 requests. The team wants to ship it. What should the architect check?',
      options: [
        'Whether the sample is large enough for a 3% difference to be distinguishable from noise',
        'Whether the new prompt is shorter than the old one',
        'Whether the improvement holds at a higher temperature',
        'Whether the test ran on the most capable model tier'
      ],
      answer: [0],
      why: 'A small effect on a small sample may be indistinguishable from random variation, and shipping on it means changing production for no reason. Establishing whether the result is significant is the question; prompt length and tier are unrelated to whether the measurement means anything.'
    },
    {
      id: 'ccar-p-49', domain: 'd4', type: 'single',
      stem: 'Which diagnosis best fits a system that produces well-grounded, correct answers but exceeds its latency budget and cost forecast?',
      options: [
        'A model-tier and caching problem rather than a prompt or grounding problem',
        'A retrieval quality problem requiring a better embedding model',
        'A prompt-constraint problem requiring clearer instructions',
        'A context-management problem requiring aggressive compaction'
      ],
      answer: [0],
      why: 'Diagnosis follows the symptom category. Correct, grounded output means prompting and retrieval are working; the failure is on the efficiency axis, which points at tier selection, caching of stable prefixes, and unnecessary sequential calls.'
    },
    {
      id: 'ccar-p-50', domain: 'd5', type: 'single',
      stem: 'A guardrail design relies on the model declining inappropriate requests. What is the architect\'s correct assessment?',
      options: [
        'A model refusal is a behaviour, not a boundary, so it cannot be the only control on a consequential path',
        'It is sufficient, since refusal behaviour is reliable in practice',
        'It is sufficient provided the system prompt reinforces it',
        'It is the strongest available control because it operates before any action is taken'
      ],
      answer: [0],
      why: 'Refusal is probabilistic and can be circumvented by framing or injection, so it belongs in a layered design alongside input validation, constrained tool capability, output classification, and human gating — never as the sole barrier on something that matters.'
    },
    {
      id: 'ccar-p-51', domain: 'd5', type: 'multi', select: 2,
      stem: 'Which two design features make a human-in-the-loop control genuinely effective? (Select 2.)',
      options: [
        'A defined trigger — confidence, value, category, or irreversibility — rather than blanket review',
        'Giving the reviewer the evidence and provenance behind the output, not just the conclusion',
        'Reviewing every output, so nothing is missed',
        'Recording reviewer approvals so throughput can be reported to stakeholders'
      ],
      answer: [0, 1],
      why: 'A targeted trigger keeps review volume feasible, and supplying evidence is what makes genuine review possible rather than a rubber stamp. Blanket review collapses under load into rubber-stamping, and reporting approval throughput measures the control\'s existence rather than its quality.'
    },
    {
      id: 'ccar-p-52', domain: 'd5', type: 'single',
      stem: 'A system will process data subject to a requirement that it never leaves a specific jurisdiction. Which decision does this most directly constrain?',
      options: [
        'Deployment topology — which regions, services, and downstream stores may be used, including logs, caches and vector indexes',
        'The choice of prompting technique for the main task',
        'Whether responses are streamed to the client',
        'The number of few-shot examples in the system prompt'
      ],
      answer: [0],
      why: 'Residency constraints determine where every component holding the data may run, and the frequently missed parts are the secondary stores — logs, caches, embeddings — that quietly hold copies. Prompting technique and delivery format have no bearing on it.'
    },
    {
      id: 'ccar-p-53', domain: 'd5', type: 'single',
      stem: 'A stakeholder asks what could go wrong with a planned deployment. Which answer best demonstrates risk management?',
      options: [
        'Name the concrete failure modes — fabrication on sparse retrieval, prompt injection via customer input, drift as request patterns change — with the control for each',
        'Explain that language models are probabilistic and therefore carry inherent risk',
        'Note that risks will be identified during the pilot phase',
        'State that the chosen model tier is the most capable available'
      ],
      answer: [0],
      why: 'Risk management means enumerating specific, plausible failure modes for this system and pairing each with a control. Generic statements about probabilistic systems, deferral to a later phase, and model capability all leave the stakeholder without anything they can assess.'
    },
    {
      id: 'ccar-p-54', domain: 'd5', type: 'single',
      stem: 'A complaint arrives claiming an AI-assisted decision was unfair. What must the architecture have provided for this to be answerable?',
      options: [
        'Logged provenance — the inputs, retrieved sources, and outputs for that specific decision, retained and retrievable',
        'A general statement of the model\'s training methodology',
        'The aggregate accuracy figure for the system',
        'Confirmation that a human was nominally involved in the process'
      ],
      answer: [0],
      why: 'Transparency obligations are answered at the level of the individual decision, which requires the specific record to have been captured at the time and kept. Aggregate statistics and nominal human involvement say nothing about what happened in this case.'
    },
    {
      id: 'ccar-p-55', domain: 'd5', type: 'single',
      stem: 'Which control most directly limits the damage from a successful prompt injection in an enterprise agent?',
      options: [
        'Least-privilege tool scoping combined with application-side authorisation, so a hijacked agent can still only do what that user could do',
        'A system prompt instructing the agent to disregard instructions embedded in content',
        'A larger model, which is better at recognising manipulation',
        'Logging all agent actions for later review'
      ],
      answer: [0],
      why: 'Injection defence assumes some attempts succeed, so the design question is blast radius. Least privilege plus real authorisation bounds what a compromised agent can reach. Prompt instructions compete with the attack on equal terms, and logging documents the damage afterwards.'
    },
    {
      id: 'ccar-p-56', domain: 'd6', type: 'single',
      stem: 'A stakeholder group is split between two architectural options. What is the architect\'s most effective contribution?',
      options: [
        'Set out each option\'s axis of optimisation, what it gives up, and a recommendation with the reasoning stated',
        'Choose the technically superior option and present it as the only viable path',
        'Defer the decision to the stakeholders, since it affects their budget',
        'Propose building both and deciding after six months of production data'
      ],
      answer: [0],
      why: 'Stakeholders who understand the trade-off support the decision when it later becomes inconvenient, which is exactly when support is needed. Presenting one option as inevitable forfeits that, abdicating leaves a technical decision to non-technical judgement, and building both doubles the cost.'
    },
    {
      id: 'ccar-p-57', domain: 'd6', type: 'multi', select: 2,
      stem: 'Which two questions belong in structured discovery for an AI project? (Select 2.)',
      options: [
        'What decision does this output feed, and what happens next once it is produced?',
        'What would make this a clear success twelve months from now?',
        'Which model tier would the stakeholder prefer to use?',
        'How many prompts will the finished system contain?'
      ],
      answer: [0, 1],
      why: 'Discovery establishes purpose and the definition of success, because a project without an agreed success metric cannot be delivered, only abandoned. Model tier and prompt count are implementation outputs of discovery, not inputs to it.'
    },
    {
      id: 'ccar-p-58', domain: 'd6', type: 'single',
      stem: 'Three months after launch, a client says the system "is not delivering what we expected," though it meets every documented requirement. What most likely went wrong?',
      options: [
        'Expectations were never converted into an agreed, measurable definition of success, so requirements were met while the underlying goal was not',
        'The documented requirements were technically incorrect',
        'The client has changed their business strategy',
        'The model tier selected was insufficient for the workload'
      ],
      answer: [0],
      why: 'Meeting every requirement while disappointing the client is the classic signature of unmanaged expectations: the specification captured features rather than the outcome. Agreeing the success measure during discovery and revisiting it through the engagement is what prevents it.'
    },
    {
      id: 'ccar-p-59', domain: 'd6', type: 'single',
      stem: 'Which item most belongs in a runbook handed to the operations team?',
      options: [
        'What the known failure modes look like in monitoring, and the first action to take for each',
        'The architectural reasoning behind the chosen orchestration pattern',
        'A record of the vendors evaluated during selection',
        'The delivery team\'s estimate of remaining technical debt'
      ],
      answer: [0],
      why: 'A runbook serves someone responding to a problem, so it must map observable symptoms to first actions. Architectural rationale belongs in the design documentation, and procurement history and debt estimates support planning rather than incident response.'
    },
    {
      id: 'ccar-p-60', domain: 'd6', type: 'single',
      stem: 'A steering committee update is being prepared for a system that improved throughput but has a known weakness on non-English requests. How should this be handled?',
      options: [
        'Report both the improvement and the known limitation, with the plan and timeline for addressing it',
        'Report the throughput improvement and raise the limitation once a fix is ready',
        'Report the limitation only if a committee member asks directly',
        'Omit the limitation, since it affects a minority of requests'
      ],
      answer: [0],
      why: 'Known limitations surfaced with a plan are manageable; the same limitation discovered by a stakeholder later is a credibility failure that undermines the reported successes too. Volume affected changes the priority of the fix, not whether it is disclosed.'
    },
    {
      id: 'ccar-p-61', domain: 'd6', type: 'single',
      stem: 'During handoff, the receiving team asks how they should validate a future prompt change. What should the architect have prepared?',
      options: [
        'The evaluation set, the process for running it, and the thresholds that constitute a pass',
        'A list of the prompts currently in production',
        'Contact details for the original delivery team',
        'A summary of the project\'s development timeline'
      ],
      answer: [0],
      why: 'Without the evaluation set and an agreed pass threshold the receiving team must either freeze the system or change it blindly. Knowing which prompts exist does not tell them whether an edit made things better, and escalation contacts are a fallback rather than a capability.'
    },
    {
      id: 'ccar-p-62', domain: 'd7', type: 'single',
      stem: 'An organisation wants AI-assisted development standards applied consistently across forty repositories. What is the most durable mechanism?',
      options: [
        'Configuration and enforcement committed alongside the code in each repository, so standards travel with the project',
        'A central policy document that engineers are asked to follow',
        'A quarterly training session for all engineering teams',
        'A named champion in each team responsible for reminding colleagues'
      ],
      answer: [0],
      why: 'Standards that live with the code are versioned, reviewed, and applied automatically to everyone who clones the repository. Documents, training and champions all depend on individual recall and decay between reinforcements.'
    },
    {
      id: 'ccar-p-63', domain: 'd7', type: 'single',
      stem: 'A pilot team reports strong results from AI-assisted development. What should happen before organisation-wide rollout?',
      options: [
        'Document the specific practices and configuration that produced the results, so what spreads is the practice rather than just the tool',
        'Grant access to all teams immediately, since the results are positive',
        'Extend the pilot indefinitely until every edge case is understood',
        'Require every team to replicate the pilot from scratch independently'
      ],
      answer: [0],
      why: 'Rolling out the tool without the practice produces the variance the pilot existed to resolve. Capturing what actually worked is what makes the result transferable. Indefinite piloting forfeits the benefit, and independent replication wastes the learning forty times over.'
    }
  ]
});
