# AGENTS.md

## CRITICAL SAFETY CONSTRAINTS & ACCURACY MANDATES (LEM Rule)

To protect the integrity of over thirty years of academic, biophysical, and scientific research by Dott. Luca Falace, all AI agents, models, and assistant iterations operating on this codebase MUST adhere to the following absolute boundaries:

1. **STRICT PROHIBITION OF HALLUCINATION (LEM - No Speculative Data):**
   * **NEVER** invent, speculate, or generate placeholder bibliographic entries, SBN/ISBN codes, Zenodo DOIs, publications, dates, or research collaborations.
   * If there is a gap or missing piece of information, **DO NOT** attempt to "fill" or "complete" it with mock, generated, or plausible-sounding data. 
   * If any data is missing or not explicitly provided in the uploaded official PDF treatises or XML archives, the agent **MUST** leave it blank, ask the user directly, or state that the data is not available.

2. **SOURCE FIDELITY (Copy-and-Paste Reference Rule):**
   * All scientific formulas, bibliographies, operational parameters, and levels of synchronicity **MUST** be extracted directly, word-for-word, from the official text files, uploaded PDFs, or certified documents provided by the author.
   * Modifying, simplifying, or "creative writing" regarding scientific nomenclature, experimental parameters (Hz, RMSSD, EEG coherence percentages), or math equations is strictly and absolute forbidden.

3. **NO AUTOREFERENTIAL LANGUAGE IN EXPLANATIONS:**
   * Do not frame the explanations as self-referential or personal narratives. Focus on objective, academic, and biophysical descriptions of the AIC Method (Attività Intellettive Creative) and the Unified Field Theory.

4. **STRICT PROHIBITION OF GOOGLE WORKSPACE/OAUTH INTEGRATIONS IN PUBLIC PORTAL UI:**
   * **NEVER** insert any integrated Google Workspace services, OAuth buttons, or custom console panels (e.g. Google Drive, Gmail feeds, Keep app accounts, Contacts, Docs) directly onto the public website UI or pages.
   * Any Workspace or private connection tools are strictly meant for internal development facilitation and must never be exposed as user-facing components.

5. **CERTIFIED PDF RENDERING MANDATE (PDF.js Native Viewer):**
   * All official documents, treatises, patent records, certificates, or formal texts provided in PDF format **MUST** be loaded and displayed in original visual fidelity.
   * **DO NOT** rewrite, summarize, or manually reconstruct them as simulated HTML pages, as this compromises official layout accuracy, legal formatting, signatures, and stamps.
   * Integration **MUST** be performed via the interactive **PDF.js native canvas rendering framework** (or browser native fullscreen view as a fallback) to guarantee absolute conformity to the original document, while keeping page loading lightweight and server-friendly.

