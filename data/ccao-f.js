ClaudeCertPrep.register({
  id: 'ccao-f',
  code: 'CCAO-F',
  name: 'Claude Certified Associate — Foundations',
  tier: 'Foundations',
  order: 1,
  blurb: 'The non-developer credential. No API and no code: structured prompting, judging whether output is actually right, picking the right model and product feature, configuring Projects, and using AI responsibly at work.',
  audience: 'Professionals who use Claude as a daily working tool — operations, marketing, project management, education, communications, consulting and general knowledge work. No software development or API experience assumed.',
  facts: {
    items: 60, minutes: 120, pass: 720, scaleRange: '100–1,000',
    fee: '$99 USD', validity: '12 months', format: 'Multiple-choice and multiple-response'
  },
  note: 'The heaviest domain is output evaluation, not prompting. This exam cares more about whether you can tell good output from bad than about how you asked for it.',

  domains: [
    {
      id: 'd1', n: 1, weight: 14,
      title: 'Prompting and Task Execution',
      objectives: [
        'Writing prompts that work for business and technical tasks',
        'Breaking a large request into steps that can each be checked',
        'Iterating on a prompt when the first result misses',
        'Adapting your approach to the kind of task — analysis, research, drafting, brainstorming'
      ],
      notes: [
        'Four things carry most prompts: context the model could not otherwise have, a specific task, the constraints that define an acceptable answer, and the format you want back. Missing context is the usual culprit when an answer is fluent but wrong for your situation.',
        'Task decomposition is a named skill on this exam, so treat it as a technique rather than an instinct. "Write the quarterly business review" is one enormous request with no checkpoint. Extract the themes, then draft each section, then tighten for the audience — three steps you can inspect and correct individually.',
        'Iteration means changing a variable, not rephrasing at random. If the result is too long, constrain length. If it is generic, add context. If it is the wrong shape, give an example of the right shape. Keep what worked and change one thing.',
        'Different task types want different prompts. Analysis benefits from the evaluation criteria being stated up front. Research benefits from saying what counts as a credible source and asking for citations. Drafting benefits from audience and tone. Brainstorming benefits from asking for deliberately varied options rather than the first plausible five.'
      ],
      traps: [
        'Restating the same request in different words and calling it iteration.',
        'Asking for a whole deliverable in one turn, then trying to fix it in one turn.'
      ],
      terms: ['context', 'constraints', 'task decomposition', 'iteration', 'output format', 'role framing']
    },
    {
      id: 'd2', n: 2, weight: 21,
      title: 'Output Evaluation and Validation',
      objectives: [
        'Checking output for accuracy and completeness',
        'Spotting hallucinations, internal inconsistencies, and bias',
        'Applying fact-checking and verification techniques',
        'Deciding when human review or extra verification is required',
        'Editing, adapting, and comparing outputs for a specific audience',
        'Curating information and choosing the right output format'
      ],
      notes: [
        'This is the biggest domain, and the reason is simple: in this role the value is not in producing text, it is in knowing whether the text is right, complete, and safe to send. Treat every output as a draft from a capable colleague who cannot always tell you how confident they are.',
        'Fabrications are most dangerous where they look most precise. Citations, statute numbers, dates, statistics, quotations, and named sources are exactly where confident-sounding invention occurs, and exactly where readers stop checking. Verify specifics against an authoritative source rather than asking the model whether it is sure — a model asked to double-check its own claim can just as easily reaffirm it.',
        'Completeness fails more quietly than accuracy. Everything stated is true, but the caveat, the excluded region, or the minority view is missing. Check output against the original requirements, not only against your sense that it reads well.',
        'Set the review bar by consequence, not by how good the draft looks. Anything external, regulated, financial, legal, medical, or irreversible gets human verification regardless of quality. Low-stakes internal drafts do not need the same scrutiny.',
        'Format is part of the answer. A comparison usually wants a table, a decision usually wants a recommendation with reasoning beneath it, and a long reference document usually wants to be an artifact you can revise rather than text buried in a chat.'
      ],
      traps: [
        'Asking "are you sure?" and treating agreement as verification.',
        'Checking the claims that are easy to check and skipping the specific numbers, which is where the risk actually sits.'
      ],
      terms: ['hallucination', 'fact-checking', 'completeness', 'source verification', 'human review threshold', 'artifacts']
    },
    {
      id: 'd3', n: 3, weight: 12,
      title: 'Product and Model Selection',
      objectives: [
        'Choosing among product features — Projects, research mode, chat, artifacts',
        'Telling the Haiku, Sonnet, and Opus tiers apart',
        'Matching the model to the task on cost, speed, and quality',
        'Working within context limits and knowing when to restart, summarise, or persist'
      ],
      notes: [
        'The model tiers trade cost and speed against depth. Haiku is the fast, economical tier for high-volume, well-defined work. Sonnet is the balanced everyday choice. Opus is for genuinely hard reasoning where the extra quality is worth the extra cost and time. Defaulting to the largest model for everything is a named anti-pattern here — matching the tier to the task is the skill being tested.',
        'Projects hold persistent instructions and knowledge across many conversations, which is what you want when the same background applies every time — a client account, a course, a product line. A plain chat is for one-off work. Research mode is for questions that need multiple sources gathered and synthesised. Artifacts are for substantial deliverables you will iterate on.',
        'Context is finite and the practical consequence is drift: in a very long conversation, early instructions compete with a great deal of later material. When a thread has wandered, starting fresh with a clean summary of what matters usually beats pushing on. When the background is needed repeatedly, put it in a Project instead of re-pasting it.'
      ],
      traps: [
        'Reaching for the most capable model on a simple, repetitive task and paying for reasoning the task does not need.',
        'Running a six-week engagement in one endless conversation instead of a Project.'
      ],
      terms: ['Haiku', 'Sonnet', 'Opus', 'Projects', 'artifacts', 'research mode', 'context window']
    },
    {
      id: 'd4', n: 4, weight: 16,
      title: 'Workflow Integration and Solution Design',
      objectives: [
        'Using Claude to analyse requirements and use cases',
        'Supporting research, planning, and process improvement',
        'Assisting solution design, development, and iteration',
        'Integrating Claude into existing workflows to augment or redesign them',
        'Explaining Claude\'s value and its limits to stakeholders'
      ],
      notes: [
        'The strongest candidates for AI assistance are tasks that are high-volume, language-heavy, and tolerant of review. The weakest are tasks where a single unverified error is catastrophic and no review step exists. That filter answers most "should we use AI for this?" questions.',
        'Augmenting an existing workflow usually beats redesigning it on day one. Insert Claude where a specific bottleneck is, keep the existing checks, measure, and only then reshape the process around what worked.',
        'When explaining value to stakeholders, be concrete about the limits in the same breath. Overstating reliability is what produces the backlash six months later. Say what is verified, by whom, and what happens when the model is wrong.'
      ],
      traps: [
        'Removing the human review step at the same time as introducing the model, so you find out about failures from customers.',
        'Pitching time saved without naming who is accountable for output quality.'
      ],
      terms: ['use case selection', 'augmentation', 'bottleneck', 'pilot', 'stakeholder expectations', 'process redesign']
    },
    {
      id: 'd5', n: 5, weight: 12,
      title: 'Configuration and Knowledge Management',
      objectives: [
        'Setting up Projects with instructions and knowledge sources',
        'Managing uploaded knowledge and connectors such as Drive and Gmail',
        'Writing effective system-level instructions',
        'Keeping configurations, knowledge, and instructions current'
      ],
      notes: [
        'Project instructions are standing orders: who you are, who the audience is, what conventions apply, what to avoid. They work best as durable rules rather than a description of today\'s task. Anything true only this week belongs in the message, not the configuration.',
        'Uploaded knowledge and connectors are how you replace pasting. The discipline is curation — a small, current, authoritative set beats a large pile containing three versions of the same policy, because the model cannot tell which one you meant.',
        'Stale knowledge is worse than no knowledge, because it produces confident answers from superseded material. Configurations need an owner and a review rhythm, the same as any other shared resource.'
      ],
      traps: [
        'Uploading the whole shared drive and treating volume as thoroughness.',
        'Leaving last year\'s pricing sheet in a Project alongside this year\'s.'
      ],
      terms: ['Project instructions', 'knowledge source', 'connectors', 'curation', 'version control', 'system-level instruction']
    },
    {
      id: 'd6', n: 6, weight: 15,
      title: 'Governance, Risk, and Responsible Use',
      objectives: [
        'Telling appropriate use cases from inappropriate ones',
        'Applying data sensitivity, regulatory, and privacy considerations',
        'Following organisational AI policy and governance standards',
        'Recognising the ethical implications of how AI is used'
      ],
      notes: [
        'Handle sensitive data by removing it, not by instructing the model to ignore it. Anonymise or redact regulated material — personal identifiers, patient data, salary records, anything under a confidentiality obligation — before it goes anywhere, rather than relying on a prompt to be careful with it.',
        'Decisions that carry legal or material consequence for an individual — hiring, firing, credit, discipline, clinical care — are not places for autonomous AI decision-making. The model can help prepare, summarise, and structure; a qualified human decides and is accountable.',
        'Policy usually exists before the question does. Check whether your organisation already has an approved-tools list, a data classification standard, and a disclosure rule about AI-assisted work, and follow those rather than improvising a personal standard.',
        'Bias deserves attention in evaluative and generative tasks alike: screening language, performance feedback, imagery, and examples all carry assumptions. Reviewing for it is part of the review, not a separate exercise.'
      ],
      traps: [
        'Pasting a client contract into an unapproved tool because the deadline is tight.',
        '"The prompt told it not to store the data" — instructions are not a data control.'
      ],
      terms: ['data classification', 'anonymisation', 'PII', 'human accountability', 'AI policy', 'disclosure', 'bias review']
    },
    {
      id: 'd7', n: 7, weight: 10,
      title: 'Troubleshooting and Optimisation',
      objectives: [
        'Diagnosing and fixing prompts that underperform',
        'Adjusting your approach based on feedback and results',
        'Making workflows more efficient and more effective'
      ],
      notes: [
        'Diagnose before you rewrite. Output that is wrong needs context or correction; output that is off-target needs clearer constraints; output that is the wrong shape needs a format instruction or an example. Rewriting the whole prompt every time means you never learn which change worked.',
        'When a long conversation starts producing worse results, that is often accumulated clutter rather than a bad prompt. A fresh thread carrying a tight summary frequently outperforms another round of correction in the old one.',
        'Optimisation is not only about quality. A task that is done fifty times a week is worth a saved Project, a standard prompt, and a lighter model, even if each individual result improves only slightly.'
      ],
      traps: [
        'Escalating to a bigger model when the real problem is that the prompt never stated the constraint.',
        'Fixing the same recurring prompt by hand every week instead of saving it.'
      ],
      terms: ['diagnosis', 'prompt debugging', 'context reset', 'standardisation', 'feedback loop']
    }
  ],

  questions: [
    {
      id: 'ccao-f-01', domain: 'd1', type: 'single',
      stem: 'An analyst asks for "a summary of the Q3 results for leadership" and receives something accurate but generic, missing the two issues leadership actually cares about. What is the most effective next step?',
      options: [
        'Supply the missing context — who the audience is, which decisions are pending, what happened last quarter — and restate the task',
        'Ask the same question again and pick the better of the two answers',
        'Switch to the most capable model available',
        'Ask for the summary to be twice as long so more detail is included'
      ],
      answer: [0],
      why: 'Generic output is the signature of missing context. The model produced a reasonable summary of what it was given; it had no way to know which issues matter to this audience. Regenerating, upgrading the model, or asking for length all leave the same gap in place.'
    },
    {
      id: 'ccao-f-02', domain: 'd1', type: 'single',
      stem: 'Which request is best handled by decomposing it into several steps rather than asking for it in one turn?',
      options: [
        'Produce a 20-page vendor evaluation covering six vendors across nine criteria with a recommendation',
        'Rewrite this paragraph so it fits in 80 words',
        'Translate this email into Spanish',
        'List ten possible names for an internal newsletter'
      ],
      answer: [0],
      why: 'Decomposition earns its keep when a deliverable has many interdependent parts and no natural checkpoint — you want to inspect the criteria, then each vendor, then the recommendation separately. The other three are single, bounded tasks where splitting adds steps without adding control.'
    },
    {
      id: 'ccao-f-03', domain: 'd1', type: 'single',
      stem: 'A brainstorming prompt keeps returning five safe, near-identical ideas. Which adjustment most directly addresses that?',
      options: [
        'Ask explicitly for options that differ from one another along stated dimensions, including at least one unconventional approach',
        'Ask for twenty ideas instead of five',
        'Raise the stakes by saying the result is very important',
        'Ask the same question in a new conversation'
      ],
      answer: [0],
      why: 'Without an instruction to vary, the model converges on the most typical answers. Naming the dimensions of difference and requiring an outlier changes what is being optimised for. Asking for more ideas usually extends the same cluster.'
    },
    {
      id: 'ccao-f-04', domain: 'd2', type: 'single',
      stem: 'A research summary cites four academic papers with authors, journals, years, and page numbers. Three check out. The fourth has a real author and a real journal, but no paper of that title exists. What does this most likely indicate?',
      options: [
        'A fabricated citation assembled from plausible components, which is why every specific reference needs verification against the source',
        'A temporary indexing gap that will resolve if the same question is asked again',
        'A retracted paper that has been removed from the record',
        'A formatting error in how the citation was rendered'
      ],
      answer: [0],
      why: 'Invented references characteristically recombine genuine authors, journals, and plausible titles, which is exactly what makes them survive a quick glance. Three correct citations say nothing about the fourth. The lesson is that citations are verified individually against the actual source, not spot-checked.'
    },
    {
      id: 'ccao-f-05', domain: 'd2', type: 'multi', select: 2,
      stem: 'Which two outputs should go to a qualified human reviewer before use, regardless of how good the draft looks? (Select 2.)',
      options: [
        'A clause to be inserted into a signed customer contract',
        'Dosage guidance in a document that will be given to patients',
        'A first-draft agenda for an internal team retrospective',
        'A brainstorm of possible names for a new internal Slack channel'
      ],
      answer: [0, 1],
      why: 'The review threshold is set by consequence, not by apparent draft quality. Contractual language creates binding obligations and clinical guidance can cause direct harm, so both require qualified sign-off. Internal agendas and channel names are low-stakes and easily corrected in flight.'
    },
    {
      id: 'ccao-f-06', domain: 'd2', type: 'single',
      stem: 'You are unsure whether a market-size figure in a Claude-generated brief is correct. Which verification approach is sound?',
      options: [
        'Locate the figure in the original published source and confirm it there',
        'Ask Claude whether it is confident in the figure',
        'Ask Claude the same question in a new conversation and accept a matching answer',
        'Ask Claude to cite a source for the figure and accept the citation as confirmation'
      ],
      answer: [0],
      why: 'Verification has to come from outside the system producing the claim. Expressed confidence is not evidence, a repeated answer can repeat the same error, and a supplied citation can itself be fabricated — so the citation is the thing to check, not the proof.'
    },
    {
      id: 'ccao-f-07', domain: 'd2', type: 'single',
      stem: 'A policy summary is factually correct in every statement, but omits an exception that applies to about a fifth of employees. What kind of failure is this?',
      options: [
        'A completeness failure, which is why output is checked against the original requirements rather than only read for plausibility',
        'A hallucination, since the summary misrepresents the policy',
        'A formatting failure, since the exception should have been a separate section',
        'A bias failure, since one group of employees is treated differently'
      ],
      answer: [0],
      why: 'Nothing stated is false, so it is not fabrication. The output is incomplete in a way that changes decisions for a significant group — the failure mode that reads perfectly and is caught only by comparing against the source requirements.'
    },
    {
      id: 'ccao-f-08', domain: 'd2', type: 'single',
      stem: 'You need to present a comparison of four software tools across six attributes to a decision-making committee. Which output format best serves the task?',
      options: [
        'A table with tools as rows and attributes as columns, followed by a short recommendation',
        'Four narrative paragraphs, one per tool',
        'A bulleted list of every attribute value in the order it was discussed',
        'A single paragraph summarising the overall impression of each tool'
      ],
      answer: [0],
      why: 'Comparison across a fixed set of attributes is exactly what a table is for: it makes gaps and differences visible at a glance and forces the same attributes to be addressed for every option. Prose formats make the reader hold six comparisons in their head.'
    },
    {
      id: 'ccao-f-09', domain: 'd3', type: 'single',
      stem: 'A team needs to categorise roughly 4,000 short support messages a day into eight well-defined buckets. Accuracy requirements are moderate and the work is repetitive. Which model tier fits best?',
      options: [
        'The fastest, most economical tier, since the task is high-volume and narrowly defined',
        'The most capable tier, so accuracy is as high as possible',
        'The mid tier, because it is always the safe default',
        'Alternate between tiers so results can be compared continuously'
      ],
      answer: [0],
      why: 'Matching tier to task is the skill here. A well-specified classification at this volume is where the fast, economical tier is designed to be used; paying top-tier rates for it multiplies cost and latency for capability the task does not need. Defaulting to the largest model is a named anti-pattern.'
    },
    {
      id: 'ccao-f-10', domain: 'd3', type: 'single',
      stem: 'A consultant works with the same client for six months and re-pastes the same background — org chart, terminology, style rules — into every new conversation. What should they use instead?',
      options: [
        'A Project holding the standing instructions and the client knowledge, used for all conversations on that account',
        'One very long conversation kept open for the whole engagement',
        'A saved text file pasted at the start of each chat',
        'Research mode, so the background is retrieved each time'
      ],
      answer: [0],
      why: 'Persistent instructions and knowledge shared across many conversations is precisely what Projects are for. A single endless thread accumulates clutter and drifts, a pasted file is the manual work being eliminated, and research mode gathers external sources rather than storing your own.'
    },
    {
      id: 'ccao-f-11', domain: 'd3', type: 'single',
      stem: 'After ninety minutes on one wide-ranging thread, answers start ignoring constraints set earlier and repeating points. What is the best response?',
      options: [
        'Start a fresh conversation carrying a concise summary of the decisions and constraints that still apply',
        'Repeat the constraints more forcefully in the next message',
        'Switch to a more capable model within the same conversation',
        'Ask for shorter answers so less context is consumed'
      ],
      answer: [0],
      why: 'These are symptoms of an overloaded thread where early instructions compete with a great deal of later material. Carrying forward a tight summary keeps what matters and discards the clutter. Restating constraints adds more material to the same crowded context.'
    },
    {
      id: 'ccao-f-12', domain: 'd4', type: 'single',
      stem: 'Which task is the strongest initial candidate for Claude assistance in an operations team?',
      options: [
        'Drafting first-pass responses to a high volume of routine supplier emails, reviewed before sending',
        'Deciding which employees are selected for redundancy',
        'Approving invoice payments above the manual authorisation threshold',
        'Signing off on the final wording of a regulatory filing without review'
      ],
      answer: [0],
      why: 'The best first candidates are high-volume, language-heavy, and reviewed before they take effect. The other three place the model at the point of consequential or irreversible decision-making, where accountability must sit with a qualified human.'
    },
    {
      id: 'ccao-f-13', domain: 'd4', type: 'single',
      stem: 'A manager proposes introducing Claude into the contract review process and simultaneously removing the paralegal check, to capture the full time saving immediately. What is the strongest objection?',
      options: [
        'Removing the verification step at the moment of introduction means errors reach customers before anyone can measure the model\'s reliability',
        'Contract review is a task language models cannot assist with at all',
        'The time saving will be smaller than the manager expects',
        'Paralegals will object to the change'
      ],
      answer: [0],
      why: 'Augment first, measure, then reshape. The review step is what makes early failures visible and correctable; removing it at the same time as introducing the model eliminates the evidence you would need to justify removing it later.'
    },
    {
      id: 'ccao-f-14', domain: 'd4', type: 'multi', select: 2,
      stem: 'You are presenting an AI-assisted reporting workflow to sceptical stakeholders. Which two things should the presentation include? (Select 2.)',
      options: [
        'A clear statement of which outputs are human-verified and by whom',
        'What happens when the model produces something wrong, and who is accountable',
        'A commitment that the system will not make factual errors',
        'A decision to withhold the AI involvement so the work is judged on merit'
      ],
      answer: [0, 1],
      why: 'Credibility comes from being specific about verification and accountability. Promising an error-free system sets up the failure that destroys trust later, and concealing AI involvement is a disclosure problem in its own right and usually a policy breach.'
    },
    {
      id: 'ccao-f-15', domain: 'd5', type: 'single',
      stem: 'Which instruction is most appropriate for a Project\'s standing instructions rather than an individual message?',
      options: [
        'Our audience is hospital procurement officers; use British spelling and avoid vendor marketing language',
        'For this task, focus only on the three items flagged in yesterday\'s meeting',
        'Make this particular draft about 200 words shorter',
        'Ignore the pricing appendix in the document I am about to paste'
      ],
      answer: [0],
      why: 'Standing instructions should be durable rules that apply to every conversation on that account. Audience, spelling convention, and tone qualify. The other three are scoped to one task, and writing them into the configuration silently applies them to unrelated work later.'
    },
    {
      id: 'ccao-f-16', domain: 'd5', type: 'single',
      stem: 'A shared Project contains the current employee handbook, two superseded versions of it, and a draft revision. Users report contradictory answers about leave entitlement. What is the best fix?',
      options: [
        'Remove the superseded and draft versions, keeping only the current authoritative handbook',
        'Add an instruction telling Claude to prefer the newest document',
        'Upload the remaining company policies so there is fuller context',
        'Move the handbooks into a separate Project and link between them'
      ],
      answer: [0],
      why: 'Contradictory sources produce contradictory answers, and the model has no reliable way to know which version you meant. Curation is the control: keep the authoritative copy and remove the rest. Adding more documents or a preference instruction leaves the conflicting material in place.'
    },
    {
      id: 'ccao-f-17', domain: 'd6', type: 'single',
      stem: 'You need help analysing patterns in a spreadsheet of employee performance data containing names, salaries, and medical leave records. Your organisation permits the tool for internal work. What is the appropriate handling?',
      options: [
        'Remove or pseudonymise the identifying and medical fields before uploading, keeping only what the analysis requires',
        'Upload the file as it is and instruct Claude not to retain or reference the personal details',
        'Upload it as it is, since the tool is approved for internal use',
        'Ask a colleague to upload it from their account instead'
      ],
      answer: [0],
      why: 'Minimisation is a control; an instruction is not. Tool approval covers the tool, not every category of data you might put in it, and special-category information such as medical records warrants removal rather than a request to disregard it. Changing whose account is used changes nothing about the data.'
    },
    {
      id: 'ccao-f-18', domain: 'd6', type: 'single',
      stem: 'A hiring manager wants Claude to score and rank 300 applicants and automatically reject the bottom half without review. What is the central problem?',
      options: [
        'A decision with material consequences for individuals is being made autonomously, with no human accountable for the outcome',
        'Three hundred applications is too many to process in one request',
        'Ranking is a task language models cannot perform',
        'The scoring rubric would need to be attached to every application'
      ],
      answer: [0],
      why: 'Employment decisions carry legal and personal consequence, so they belong to an accountable human. Assistance with summarising or structuring applications against stated criteria is reasonable; automated rejection is not, and it also removes the point at which bias in the screening would be caught.'
    },
    {
      id: 'ccao-f-19', domain: 'd6', type: 'single',
      stem: 'Your company has an approved-tools list, a data classification standard, and a rule about disclosing AI-assisted work. A tight deadline tempts a colleague to use an unapproved tool "just this once." What is the correct guidance?',
      options: [
        'Follow the existing policy and use an approved tool, escalating if the deadline genuinely cannot be met within it',
        'Proceed, since a single exception under time pressure carries little risk',
        'Proceed but omit the disclosure, since the work was mostly human-written',
        'Ask the colleague to decide, since they own the deadline'
      ],
      answer: [0],
      why: 'Existing policy is the standard, and deadline pressure is the circumstance it was written for. Where policy genuinely conflicts with a commitment, the escalation is to the people who own the policy, not a private exception that also breaches the disclosure rule.'
    },
    {
      id: 'ccao-f-20', domain: 'd7', type: 'single',
      stem: 'A recurring weekly prompt produces output in the wrong structure roughly half the time — sections in a different order, headings renamed. Which fix is most likely to work?',
      options: [
        'Include an example of the exact structure required, with the headings and their order stated',
        'Move to a more capable model',
        'Ask for the output twice and keep whichever version matches',
        'Add the words "be consistent" to the prompt'
      ],
      answer: [0],
      why: 'Structural variation means the target structure was never pinned down. An explicit example plus named headings in fixed order removes the ambiguity. A stronger model still has to guess at an unspecified structure, and generating twice just doubles the cost of the same uncertainty.'
    },
    {
      id: 'ccao-f-21', domain: 'd7', type: 'single',
      stem: 'A team of twelve each maintains their own version of a client-briefing prompt, and quality varies noticeably between them. What is the best optimisation?',
      options: [
        'Agree one reviewed standard prompt and a shared Project, so everyone starts from the same configuration',
        'Ask each person to refine their own prompt after every use',
        'Move everyone to the most capable model to reduce the variation',
        'Have one person produce all client briefings'
      ],
      answer: [0],
      why: 'Variation between twelve hand-maintained prompts is a standardisation problem. A shared, reviewed configuration raises the floor for everyone and makes improvements benefit the whole team. A bigger model does not make inconsistent instructions consistent, and centralising on one person recreates the bottleneck.'
    },
    {
      id: 'ccao-f-22', domain: 'd7', type: 'single',
      stem: 'Output on a technical topic is consistently too basic for the intended expert audience. Which diagnosis is most likely correct?',
      options: [
        'The prompt never states the audience\'s expertise level, so the model is defaulting to a general reader',
        'The model lacks the necessary knowledge and cannot go deeper',
        'The conversation has exceeded its context limit',
        'The temperature setting is too low'
      ],
      answer: [0],
      why: 'Unspecified audience produces general-reader output by default. Naming the audience and their assumed background is the direct fix. The other explanations describe different symptoms — missing knowledge would show as gaps or errors, not as consistent over-explanation.'
    },
    {
      id: 'ccao-f-23', domain: 'd1', type: 'single',
      stem: 'You need a competitor analysis covering five companies across four dimensions, ending in a recommendation. Which prompting approach gives you the most control over quality?',
      options: [
        'Establish the four dimensions and what counts as evidence first, then work through companies, then draft the recommendation',
        'Ask for the complete analysis in one detailed prompt and edit the result',
        'Ask five separate times, once per company, and staple the answers together',
        'Ask for the recommendation first, then ask for supporting analysis'
      ],
      answer: [0],
      why: 'Decomposition gives you a checkpoint at each stage, so a wrong framing is caught before it contaminates five analyses. Asking for everything at once offers no inspection point, and asking for the conclusion first invites the analysis to be fitted to it.'
    },
    {
      id: 'ccao-f-24', domain: 'd1', type: 'single',
      stem: 'A drafting prompt produces text in the wrong register for the audience — too casual for a board paper. What is the most direct correction?',
      options: [
        'State the audience, their seniority, and the document type, with one example of the register you want',
        'Ask for the text to be rewritten more formally, repeatedly, until it lands',
        'Ask for a longer draft, since formal writing tends to be longer',
        'Move to a more capable model'
      ],
      answer: [0],
      why: 'Register follows from audience and document type, so naming both fixes the cause rather than the symptom. An example pins it down further. Repeated "make it more formal" requests converge slowly and give you no reusable prompt for next time.'
    },
    {
      id: 'ccao-f-25', domain: 'd1', type: 'single',
      stem: 'Which of these prompts is most likely to produce work you can use without heavy editing?',
      options: [
        'Draft a 150-word update for our operations team on the warehouse move, leading with the new date, naming the two risks we discussed, and avoiding any commitment on cost',
        'Write a really good update about the warehouse move',
        'Write a professional and comprehensive communication regarding the upcoming operational transition',
        'Summarise the warehouse move situation'
      ],
      answer: [0],
      why: 'It supplies audience, length, structure, required content, and an explicit prohibition — every one of which is checkable. The others supply adjectives or a bare topic, leaving the model to guess at exactly the decisions that determine whether the output is usable.'
    },
    {
      id: 'ccao-f-26', domain: 'd1', type: 'single',
      stem: 'An analysis task keeps producing conclusions you disagree with, but you cannot fault the reasoning. What is the most useful next prompt?',
      options: [
        'State the evaluation criteria you are actually applying, and ask for the analysis against those',
        'Tell it the conclusion you expected and ask it to justify that instead',
        'Ask the same question several times and take the most common answer',
        'Ask for a longer analysis with more supporting detail'
      ],
      answer: [0],
      why: 'Disagreement with sound reasoning usually means you are applying criteria you never stated. Making them explicit aligns the analysis with what you actually care about. Supplying the desired conclusion turns analysis into rationalisation, which is worse than useless for a decision.'
    },
    {
      id: 'ccao-f-27', domain: 'd1', type: 'multi', select: 2,
      stem: 'Which two elements most reliably improve a weak prompt? (Select 2.)',
      options: [
        'Context the model has no other way of knowing, such as the situation and the audience',
        'Constraints that define what an acceptable answer looks like',
        'Reassurance that the task is important and should be done carefully',
        'A request to think hard before answering'
      ],
      answer: [0, 1],
      why: 'Missing context and undefined constraints are the two causes of most disappointing output. Emphasising importance adds no information the model can act on, and generic exhortations to be careful do not tell it what careful means for this task.'
    },
    {
      id: 'ccao-f-28', domain: 'd2', type: 'single',
      stem: 'A draft report states that a regulation "came into force in March 2023." What is the appropriate verification step before sending it to a client?',
      options: [
        'Check the date against the regulator\'s own published text',
        'Ask Claude to confirm whether the date is accurate',
        'Check whether the surrounding paragraphs are internally consistent',
        'Accept it, since the rest of the report has been accurate'
      ],
      answer: [0],
      why: 'Specific dates attached to regulations are exactly where confident invention occurs and where a reader will stop checking. Verification must come from the authoritative source. Internal consistency and a good track record elsewhere in the document are not evidence about this claim.'
    },
    {
      id: 'ccao-f-29', domain: 'd2', type: 'single',
      stem: 'You ask for a summary of a 40-page report you uploaded. The summary is accurate but omits the section on cost overruns entirely. What should you conclude?',
      options: [
        'Completeness needs checking against the source structure, not just read for plausibility',
        'The model cannot process documents of that length',
        'The summary is acceptable since everything stated is true',
        'The omission indicates the section was irrelevant'
      ],
      answer: [0],
      why: 'Incompleteness reads perfectly, which is what makes it dangerous — nothing in the text signals the gap. Checking the summary against the source\'s own sections catches it. Truth of what is present says nothing about the significance of what is absent.'
    },
    {
      id: 'ccao-f-30', domain: 'd2', type: 'multi', select: 2,
      stem: 'Which two kinds of content in a Claude-generated document warrant the closest verification? (Select 2.)',
      options: [
        'Named sources and citations',
        'Specific statistics and figures',
        'General descriptions of well-known concepts',
        'The document\'s structure and heading order'
      ],
      answer: [0, 1],
      why: 'Fabrication concentrates where output looks most precise, because precision discourages checking. Citations and figures are both. Descriptions of widely known concepts are low-risk, and structure is a formatting choice rather than a factual claim.'
    },
    {
      id: 'ccao-f-31', domain: 'd2', type: 'single',
      stem: 'Two drafts of the same client email are produced. Which comparison approach is most useful?',
      options: [
        'Compare both against the stated requirements — audience, length, required points, tone — rather than against each other',
        'Pick whichever reads more fluently',
        'Ask Claude which of the two is better and use that one',
        'Combine the strongest paragraphs of each into a third version'
      ],
      answer: [0],
      why: 'Comparing drafts against each other selects the better of two possibly unsuitable options, and fluency is a poor proxy for fitness. Judging both against the requirements tells you whether either is actually usable and what is missing if neither is.'
    },
    {
      id: 'ccao-f-32', domain: 'd2', type: 'single',
      stem: 'A researcher notices that a generated literature summary contradicts itself: one paragraph says adoption rose, another says it declined over the same period. What does this indicate?',
      options: [
        'An internal inconsistency that signals the whole summary needs checking against sources, not just the contradictory sentences',
        'A formatting problem that will resolve on regeneration',
        'That both statements are true for different subsets of the data',
        'That the source material itself must be contradictory'
      ],
      answer: [0],
      why: 'A visible contradiction is evidence that at least one claim was not grounded in the sources, which undermines confidence in the claims that happen not to contradict each other. It is a signal to verify the document, not to patch the two sentences.'
    },
    {
      id: 'ccao-f-33', domain: 'd2', type: 'single',
      stem: 'You are adapting a technical analysis for a non-technical executive audience. What is the main risk to watch for?',
      options: [
        'Simplification that quietly removes a caveat the decision actually depends on',
        'The output becoming too short to be credible',
        'The executive noticing that AI was used',
        'Loss of the original document\'s formatting'
      ],
      answer: [0],
      why: 'Adapting for audience means deciding what to drop, and the risk is dropping a qualification that changes the decision rather than merely the detail behind it. Checking that every material caveat survived the simplification is the review step that matters here.'
    },
    {
      id: 'ccao-f-34', domain: 'd2', type: 'single',
      stem: 'Which output belongs in an artifact rather than inline in the chat?',
      options: [
        'A twelve-page policy document you will revise over several sessions',
        'A one-sentence answer to a factual question',
        'A quick clarification about what a term means',
        'A yes-or-no confirmation'
      ],
      answer: [0],
      why: 'Artifacts suit substantial deliverables you will return to and iterate on, where having the document as a distinct object beats scrolling back through a conversation. Short answers gain nothing from the container and are easier to read in place.'
    },
    {
      id: 'ccao-f-35', domain: 'd2', type: 'single',
      stem: 'A colleague says they validated an output by asking Claude to double-check its own answer, and it confirmed. What is the flaw?',
      options: [
        'Self-confirmation is not independent evidence — the same reasoning that produced an error can reaffirm it',
        'Double-checking requires a higher temperature to be effective',
        'The check should have been run in the same conversation to retain context',
        'Nothing is wrong, provided the model expressed high confidence'
      ],
      answer: [0],
      why: 'Verification has to come from outside the system producing the claim. A model asked whether it is sure can restate its error just as fluently, and expressed confidence is a property of the writing rather than evidence about the fact.'
    },
    {
      id: 'ccao-f-36', domain: 'd3', type: 'single',
      stem: 'A task involves comparing two 60-page contracts clause by clause and identifying every material difference. Which model tier is the reasonable default?',
      options: [
        'The most capable tier, since the reasoning is genuinely hard and an error is consequential',
        'The fastest tier, since the task is mechanical comparison',
        'The mid tier, since it is always the balanced choice',
        'Any tier, since model choice does not affect this kind of task'
      ],
      answer: [0],
      why: 'Matching tier to task cuts both ways. Long-document reasoning where a missed difference has legal consequence is exactly where the top tier earns its price, just as routine classification is where it does not.'
    },
    {
      id: 'ccao-f-37', domain: 'd3', type: 'single',
      stem: 'Which situation calls for research mode rather than an ordinary chat?',
      options: [
        'A question that needs current information gathered and reconciled across several external sources',
        'Rewriting a paragraph you have already drafted',
        'Formatting a list you pasted into the conversation',
        'Answering a question about a document you uploaded to the conversation'
      ],
      answer: [0],
      why: 'Research mode exists to gather and synthesise across multiple external sources. Editing, formatting, and answering from a document already in the conversation all have their material to hand, so the extra retrieval adds time without adding information.'
    },
    {
      id: 'ccao-f-38', domain: 'd3', type: 'multi', select: 2,
      stem: 'Which two indicate you should start a fresh conversation rather than continue? (Select 2.)',
      options: [
        'Constraints established early are being ignored in recent responses',
        'The thread has wandered across several unrelated topics and answers are repeating',
        'The conversation has reached twenty messages',
        'You need to ask a follow-up question about the last answer'
      ],
      answer: [0, 1],
      why: 'Drift and repetition are symptoms of a crowded context where early instructions compete with a great deal of later material. Message count alone is not a threshold, and a direct follow-up is precisely the case where continuity is helping you.'
    },
    {
      id: 'ccao-f-39', domain: 'd3', type: 'single',
      stem: 'A team runs a high-volume, well-defined tagging task and also occasional deep strategic analysis. What is the sensible model approach?',
      options: [
        'Use the economical tier for tagging and the capable tier for the analysis, matching each to its task',
        'Standardise on the most capable tier for both, for consistency',
        'Standardise on the fastest tier for both, for cost control',
        'Alternate tiers so results can be compared'
      ],
      answer: [0],
      why: 'Different tasks have genuinely different requirements, and uniform tiering overpays on one side or under-delivers on the other. Consistency of tooling is not a value that outweighs either. Alternating produces inconsistent output for no diagnostic benefit.'
    },
    {
      id: 'ccao-f-40', domain: 'd4', type: 'single',
      stem: 'A department wants to introduce Claude into a monthly reporting process currently taking four days. What is the sound first step?',
      options: [
        'Identify the specific bottleneck within the four days and apply Claude to that step, keeping existing checks',
        'Redesign the entire reporting process around AI before the first run',
        'Replace the process wholesale and measure the outcome after a quarter',
        'Apply Claude to every step simultaneously to maximise the saving'
      ],
      answer: [0],
      why: 'Augmenting a specific bottleneck gives you a measurable result and leaves the existing checks in place to catch early failures. Redesigning first commits to a shape you have no evidence for, and changing everything at once makes attribution impossible.'
    },
    {
      id: 'ccao-f-41', domain: 'd4', type: 'single',
      stem: 'Which task is the weakest candidate for AI assistance?',
      options: [
        'A one-off calculation where a single unverified error would be catastrophic and no review step exists',
        'Drafting routine correspondence that a human reviews before sending',
        'Summarising long internal documents for a team meeting',
        'Generating first-draft options for a naming exercise'
      ],
      answer: [0],
      why: 'The filter is volume, language-heaviness, and reviewability. A one-off, high-consequence, unreviewed task fails all three at once — it is the profile where a single error does maximum damage with nothing in place to catch it.'
    },
    {
      id: 'ccao-f-42', domain: 'd4', type: 'single',
      stem: 'You are asked to build the business case for a Claude-assisted workflow. Which measure is most useful to establish first?',
      options: [
        'What the current process costs and how long it takes, so any improvement can be measured against it',
        'How many people on the team are enthusiastic about AI',
        'Which competitor tools are available on the market',
        'How many prompts the workflow will require'
      ],
      answer: [0],
      why: 'Without a baseline there is nothing to compare against, so the project can be neither justified beforehand nor evaluated afterwards. Enthusiasm, market options, and prompt counts are inputs to how you build it, not evidence that it is worth building.'
    },
    {
      id: 'ccao-f-43', domain: 'd4', type: 'single',
      stem: 'A stakeholder asks whether the new AI-assisted process will "eliminate errors." What is the appropriate answer?',
      options: [
        'Explain what the process does catch, what it does not, and where human verification remains, with the error types named',
        'Confirm that errors will be eliminated, since accuracy testing has been strong',
        'Decline to discuss accuracy, since model behaviour is unpredictable',
        'Redirect to the time savings, which are easier to quantify'
      ],
      answer: [0],
      why: 'Concrete honesty about coverage and limits is what makes the commitment credible and survivable. Promising elimination sets up the failure that destroys trust, and refusing to discuss accuracy or deflecting to time savings leaves the stakeholder unable to make an informed decision.'
    },
    {
      id: 'ccao-f-44', domain: 'd4', type: 'multi', select: 2,
      stem: 'Which two questions matter most when assessing a proposed Claude use case? (Select 2.)',
      options: [
        'What does an error cost, and is there a step that would catch it?',
        'Is the work language-heavy and repeated often enough to be worth systematising?',
        'Is the task one that would impress leadership if automated?',
        'Does the team already have spare capacity to absorb the change?'
      ],
      answer: [0, 1],
      why: 'Error cost with reviewability determines whether the use case is safe, and volume with language-heaviness determines whether it is worth doing. Visibility is not a suitability criterion, and capacity affects timing rather than whether the use case is a good one.'
    },
    {
      id: 'ccao-f-45', domain: 'd4', type: 'single',
      stem: 'A pilot shows Claude drafts save reviewers 30% of their time, but reviewers report spending longer on the drafts they do reject. What does this suggest about the rollout?',
      options: [
        'Measure net effect including rework, since a headline saving can hide a cost concentrated in the failure cases',
        'Abandon the pilot, since any added time indicates failure',
        'Roll out immediately, since the average saving is positive',
        'Remove the review step to capture the full saving'
      ],
      answer: [0],
      why: 'A per-task average can conceal a distribution where a minority of cases cost more than they save. The right response is to measure the net position including rework and to look at what the rejected drafts have in common. Removing review would hide the problem rather than address it.'
    },
    {
      id: 'ccao-f-46', domain: 'd4', type: 'single',
      stem: 'Who should be named as accountable for the quality of AI-assisted output going to a client?',
      options: [
        'The person who reviews and sends it, exactly as with any other work product',
        'The team that configured the Project',
        'Nobody, since the output was machine-generated',
        'The vendor supplying the model'
      ],
      answer: [0],
      why: 'Assistance does not transfer accountability. The person who reviews and releases the work owns it, which is the same standard applied to a junior colleague\'s draft. Leaving accountability unassigned is precisely how unreviewed output reaches clients.'
    },
    {
      id: 'ccao-f-47', domain: 'd5', type: 'single',
      stem: 'A Project\'s instructions run to 2,000 words, much of it describing what the team does. Results are inconsistent. What is the likely problem?',
      options: [
        'Background narrative crowds out the actual operating rules, so the instructions that should govern output are diluted',
        'Project instructions cannot exceed 1,000 words',
        'The instructions should be pasted into each message instead',
        'The knowledge sources are conflicting with the instructions'
      ],
      answer: [0],
      why: 'Instructions should be the rules that change output — audience, conventions, prohibitions, format. Organisational narrative competes with those for attention on every turn. Trimming to enforceable rules usually improves consistency more than any rewording.'
    },
    {
      id: 'ccao-f-48', domain: 'd5', type: 'single',
      stem: 'Which knowledge management practice most improves answer reliability in a shared Project?',
      options: [
        'Keeping a small, current, authoritative set of documents and removing superseded versions',
        'Uploading everything available so nothing is missing',
        'Renaming files with version numbers and keeping all versions',
        'Adding an instruction explaining which documents are current'
      ],
      answer: [0],
      why: 'Conflicting sources produce conflicting answers, and the model has no reliable way to adjudicate between three versions of the same policy. Curation removes the conflict. Version-numbered filenames and a preference instruction both leave the superseded material in place to be retrieved.'
    },
    {
      id: 'ccao-f-49', domain: 'd5', type: 'multi', select: 2,
      stem: 'Which two belong in Project instructions rather than in a message? (Select 2.)',
      options: [
        'Always cite the source document and section when answering policy questions',
        'Write for an audience of frontline supervisors, not senior management',
        'Ignore the appendix in the file I am about to share',
        'Make this version shorter than the last one'
      ],
      answer: [0, 1],
      why: 'Standing instructions should be durable rules applying to every conversation in the Project. A citation convention and a fixed audience qualify. The other two are scoped to a single exchange and would silently distort unrelated work if written into the configuration.'
    },
    {
      id: 'ccao-f-50', domain: 'd5', type: 'single',
      stem: 'Who should own a shared Project\'s configuration and knowledge?',
      options: [
        'A named owner with a review rhythm, since stale configuration produces confident answers from superseded material',
        'Nobody in particular — anyone on the team can update it as needed',
        'The person who created it, with no ongoing obligation',
        'The IT department, regardless of subject matter'
      ],
      answer: [0],
      why: 'A shared configuration is a shared resource, and the failure mode is silent: out-of-date knowledge produces confident, well-formatted, wrong answers. A named owner and a review cadence are what prevent it. Unowned resources drift without anyone noticing.'
    },
    {
      id: 'ccao-f-51', domain: 'd5', type: 'single',
      stem: 'A connector is enabled so Claude can reference files from a shared drive. What is the main thing to verify before relying on it?',
      options: [
        'That the accessible material is current and appropriate for the people using the Project',
        'That the drive contains at least fifty documents for adequate coverage',
        'That the connector refreshes the files every hour',
        'That the files are all in the same format'
      ],
      answer: [0],
      why: 'A connector widens what can be retrieved, which makes currency and appropriateness the governing concerns — stale material and material some Project users should not see are both now reachable. Volume, refresh rate, and format are secondary to whether the content should be there at all.'
    },
    {
      id: 'ccao-f-52', domain: 'd6', type: 'single',
      stem: 'You need to analyse customer complaints containing names, addresses, and account numbers. What is the correct first step?',
      options: [
        'Strip or pseudonymise the identifying fields, keeping only what the analysis requires',
        'Upload as-is and instruct Claude not to reference the personal details',
        'Upload as-is, since the analysis is for internal use only',
        'Summarise the complaints by hand first to avoid uploading anything'
      ],
      answer: [0],
      why: 'Data minimisation is the control, and an instruction is not. Internal purpose does not change the obligation attached to personal data. Doing the whole task by hand forfeits the benefit when removing a few columns would have made it safe.'
    },
    {
      id: 'ccao-f-53', domain: 'd6', type: 'single',
      stem: 'A manager asks Claude to draft performance feedback for eight team members based on notes. What is the appropriate handling?',
      options: [
        'Use it to structure and draft, then review every assessment personally, since the manager remains accountable for the judgement',
        'Send the drafts directly, since they are based on the manager\'s own notes',
        'Refuse, since performance feedback cannot involve AI assistance',
        'Ask Claude to score each person and use the ranking as the outcome'
      ],
      answer: [0],
      why: 'Drafting assistance is legitimate; the evaluative judgement about a person\'s performance is not delegable, because it carries consequence for them and the manager is accountable for it. Sending unreviewed drafts and accepting a generated ranking both hand over that judgement.'
    },
    {
      id: 'ccao-f-54', domain: 'd6', type: 'multi', select: 2,
      stem: 'Which two are genuine data controls rather than expressions of intent? (Select 2.)',
      options: [
        'Removing regulated fields from a file before it is uploaded',
        'Restricting who can access a Project containing sensitive knowledge',
        'Instructing the model not to retain the information it is shown',
        'Adding a confidentiality notice to the top of the prompt'
      ],
      answer: [0, 1],
      why: 'Controls change what is possible; intent changes what is requested. Not sending the data and limiting who can reach it are both enforceable. An instruction about retention and a confidentiality banner are text in a prompt and constrain nothing.'
    },
    {
      id: 'ccao-f-55', domain: 'd6', type: 'single',
      stem: 'A generated candidate screening summary consistently describes applicants from one university more favourably, using warmer language. What is the correct response?',
      options: [
        'Treat it as a bias finding: review the inputs and criteria, and check whether the pattern affected outcomes',
        'Ignore it, since the language is positive rather than negative',
        'Add an instruction to use neutral language and continue',
        'Switch to a different model and rerun the screening'
      ],
      answer: [0],
      why: 'Systematic differential treatment in an evaluative task is a bias finding regardless of whether the language is flattering, because the consequence falls on people. It requires investigation of inputs, criteria and outcomes. Rewording the output or changing model leaves the underlying pattern unexamined.'
    },
    {
      id: 'ccao-f-56', domain: 'd6', type: 'single',
      stem: 'Your organisation requires disclosure when client deliverables are AI-assisted. A colleague argues disclosure is unnecessary because they edited the draft heavily. What is the correct position?',
      options: [
        'The policy applies as written; the extent of editing is not the test it sets',
        'Heavy editing removes the obligation, since the final text is substantially human',
        'Disclosure is a matter of personal judgement in each case',
        'Disclose only if the client asks directly'
      ],
      answer: [0],
      why: 'A disclosure policy sets the threshold, and it is not for individuals to reinterpret it case by case based on how much they changed. If the policy\'s threshold is genuinely unclear, that is a question for whoever owns the policy, not grounds for a private exception.'
    },
    {
      id: 'ccao-f-57', domain: 'd6', type: 'single',
      stem: 'Which use case most clearly requires escalation to a qualified professional rather than reliance on generated output?',
      options: [
        'Interpreting how a specific regulation applies to your company\'s particular circumstances',
        'Drafting an internal explainer about what a regulation covers in general terms',
        'Summarising the structure of a published regulatory document',
        'Building a glossary of terms used in a regulation'
      ],
      answer: [0],
      why: 'Applying law to specific facts is professional judgement carrying liability, which is where a qualified human is required. Explaining, summarising, and glossing published material are informational tasks that support that judgement without substituting for it.'
    },
    {
      id: 'ccao-f-58', domain: 'd7', type: 'single',
      stem: 'A prompt produces good content in a format you cannot use — prose where you need a table. What is the efficient fix?',
      options: [
        'Specify the format explicitly, including the columns and their order, and save the working prompt',
        'Reformat the output by hand each time',
        'Ask for the answer again and hope for a table',
        'Switch to a more capable model'
      ],
      answer: [0],
      why: 'Format is a stated requirement, not something to be hoped for, and specifying the columns removes the ambiguity entirely. Saving the working version converts a one-off fix into a repeatable one, which is the optimisation half of this domain.'
    },
    {
      id: 'ccao-f-59', domain: 'd7', type: 'single',
      stem: 'Output is accurate but consistently misses one requirement that appears midway through a long, dense prompt. What is the most likely fix?',
      options: [
        'Restructure the prompt so requirements are listed distinctly rather than buried in a paragraph',
        'Repeat the entire prompt twice in the same message',
        'Raise the temperature to encourage broader coverage',
        'Split the task across two different models'
      ],
      answer: [0],
      why: 'A requirement buried in dense prose competes with everything around it. Pulling requirements into a distinct, scannable list makes each one addressable and lets you check the output against them one by one. Repetition adds bulk without adding structure.'
    },
    {
      id: 'ccao-f-60', domain: 'd7', type: 'single',
      stem: 'Which diagnostic habit most improves prompting over time?',
      options: [
        'Changing one element at a time and noting which change produced the improvement',
        'Rewriting the whole prompt from scratch whenever output disappoints',
        'Keeping prompts as short as possible in every case',
        'Always starting a new conversation after an unsatisfactory answer'
      ],
      answer: [0],
      why: 'Changing one variable is what turns a fix into knowledge you can reuse. Wholesale rewrites may work but teach you nothing about why, so the next failure starts from zero. Brevity and fresh conversations are sometimes the right move, not general rules.'
    }
  ]
});
