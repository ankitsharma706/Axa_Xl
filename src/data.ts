/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Idea, Prd, DeepDive } from './types';

export const IDEAS: Idea[] = [
  {
    rank: 1,
    name: "ClaimsSense AI",
    domain: "Claims Intelligence",
    relScore: 98,
    aiScore: 97,
    cloudScore: 95,
    devopsScore: 93,
    overallScore: 96,
    problem: "Claims adjusters handle 200+ cases with inconsistent severity triage, causing multi-day delays and SLA breaches.",
    whyAXA: "Claims leakage costs global insurers $80B+/yr. AXA XL's specialty lines (marine, aviation, construction) involve complex multi-party claims where AI triage creates measurable ROI.",
    users: ["Claims Adjusters", "Claims Managers", "Underwriters", "Finance Controllers"],
    features: [
      "AI-powered FNOL intake via document upload",
      "NLP severity classification (minor/moderate/major/catastrophic)",
      "Root cause extraction from loss documents",
      "Recommended reserve amounts via ML model",
      "Workflow routing to specialist teams",
      "SLA breach prediction & alerts",
      "Claims portfolio dashboard",
      "Auto-generated adjuster summary reports",
      "Fraud signal flagging",
      "Historical pattern benchmarking"
    ],
    aiDetails: [
      "GPT-4o for document NLP and extraction",
      "Custom fine-tuned classifier for insurance severity",
      "Retrieval-Augmented Generation (RAG) for policy matching",
      "Anomaly detection model for fraud signals",
      "Time-series forecasting for reserve adequacy"
    ],
    arch: "React SPA → FastAPI Gateway → AI Orchestration Layer (LangChain) → PostgreSQL + Pinecone Vector DB → Azure OpenAI",
    db: "claims(id,policy_id,fnol_date,severity,reserve_amount,status,ai_confidence), documents(id,claim_id,type,extracted_json), audit_log(id,claim_id,action,actor,ts)",
    cloudDetails: "Azure App Service (FastAPI), Azure OpenAI GPT-4o, Azure Blob Storage (documents), Azure PostgreSQL Flexible, Azure API Management, Azure Monitor",
    devopsDetails: "GitHub Actions: lint→test→build→push ACR→deploy ACI. Docker multi-stage. Staging/prod environments. Trivy image scanning. Prometheus + Grafana dashboards.",
    security: "PII masking before AI processing, RBAC with Azure AD, TLS 1.3, field-level encryption on financial data, SOC2-aligned audit logging",
    stack: "React, FastAPI, LangChain, PostgreSQL, Pinecone, Azure OpenAI, Docker, GitHub Actions, Azure",
    complexity: "Medium-High (6 weeks)",
    resumeImpact: "Demonstrates end-to-end AI pipeline, insurance domain depth, cloud deployment, and measurable business KPIs.",
    talkingPoints: [
      "Reduced average claims triage time from 4 days to <4 hours",
      "RAG pipeline ensures policy-grounded recommendations",
      "Achieves >85% severity classification accuracy on held-out test set"
    ],
    enhancements: [
      "Integration with Guidewire ClaimCenter",
      "Multi-language FNOL support",
      "Computer vision for damage photos",
      "Subrogation opportunity detection"
    ],
    enterprise: [
      "Multi-tenant architecture",
      "SSO with Azure AD / SAML 2.0",
      "Compliance export for regulators",
      "Configurable AI thresholds per line of business"
    ]
  },
  {
    rank: 2,
    name: "UnderwriteIQ",
    domain: "Underwriting Intelligence",
    relScore: 96,
    aiScore: 94,
    cloudScore: 92,
    devopsScore: 90,
    overallScore: 93,
    problem: "Underwriters spend 60% of time on data gathering; risk scoring is inconsistent and subjective across teams.",
    whyAXA: "AXA XL's specialty risk book (cyber, D&O, marine, construction) requires deep contextual risk assessment. AI-assisted underwriting directly improves loss ratios.",
    users: ["Underwriters", "Actuaries", "Portfolio Managers", "Reinsurance Teams"],
    features: [
      "Automated risk submission ingestion (PDF, email, API)",
      "AI risk score generation with confidence bands",
      "Peer portfolio benchmarking",
      "Competitor pricing intelligence (web scraping + LLM)",
      "Appetite check against current book",
      "Triage recommendation (accept/decline/refer)",
      "Exposure accumulation dashboard",
      "MRC-compatible output generation"
    ],
    aiDetails: [
      "Document intelligence for submission parsing",
      "Multi-factor risk scoring model",
      "LLM for narrative risk summary",
      "Market pricing embeddings for peer comparison"
    ],
    arch: "React → FastAPI → LangChain Risk Pipeline → PostgreSQL + Elasticsearch → Azure OpenAI + Azure Form Recognizer",
    db: "submissions(id,broker_id,risk_class,ai_score,human_score,decision), risk_factors(id,submission_id,factor,weight,value), pricing_history(id,risk_class,quarter,market_rate)",
    cloudDetails: "Azure Form Recognizer, Azure OpenAI, Azure Search (Elasticsearch), Azure PostgreSQL, Azure Functions (async processing), Azure API Management",
    devopsDetails: "GitHub Actions CI/CD, Docker Compose local dev, Helm charts for AKS, SonarQube quality gate, automated integration tests",
    security: "Broker portal authentication, data classification (public/confidential/restricted), encryption at rest and in transit",
    stack: "React, FastAPI, LangChain, Azure Form Recognizer, PostgreSQL, Elasticsearch, Docker, Kubernetes",
    complexity: "High (7-8 weeks)",
    resumeImpact: "Rare combination of insurance domain knowledge + enterprise AI + document intelligence.",
    talkingPoints: [
      "Reduces submission-to-quote time by 40%",
      "AI confidence bands make model uncertainty transparent to underwriters",
      "Appetite guardrails prevent concentration risk"
    ],
    enhancements: [
      "Integration with ACORD standards",
      "Lloyd's of London API connectivity",
      "Real-time cat model integration (RMS/AIR)"
    ],
    enterprise: [
      "Broker portal with separate auth tier",
      "Regulatory capital reporting outputs",
      "Audit trail for Lloyd's compliance"
    ]
  },
  {
    rank: 3,
    name: "CyberRisk Sentinel",
    domain: "Cyber Insurance / Risk",
    relScore: 95,
    aiScore: 96,
    cloudScore: 94,
    devopsScore: 91,
    overallScore: 94,
    problem: "Cyber underwriters lack real-time threat intelligence to dynamically price and monitor policyholder risk posture.",
    whyAXA: "AXA XL is a leading cyber insurer. Dynamic risk monitoring post-bind is a competitive differentiator and reduces claims frequency.",
    users: ["Cyber Underwriters", "CISO Advisory Teams", "Risk Engineers", "Claims Cyber Specialists"],
    features: [
      "Policyholder risk posture scoring (external attack surface)",
      "CVE/threat feed integration",
      "Real-time dark web exposure monitoring",
      "AI-generated cyber risk narrative",
      "Post-bind risk deterioration alerts",
      "Peer industry benchmarking",
      "Incident response playbook recommendations",
      "Renewal risk delta reporting"
    ],
    aiDetails: [
      "LLM for threat narrative synthesis",
      "Graph neural network for attack path modeling",
      "NLP on threat intel feeds",
      "Anomaly detection on company posture signals"
    ],
    arch: "React → FastAPI → Threat Intel Aggregator → Graph DB (Neo4j) + PostgreSQL → Azure OpenAI → Alert Engine",
    db: "policyholders(id,company,industry,risk_score,last_assessed), vulnerabilities(id,ph_id,cve_id,severity,status), incidents(id,ph_id,type,ai_narrative,ts)",
    cloudDetails: "Azure Kubernetes Service, Azure OpenAI, Azure Event Hub (threat feeds), Azure Cosmos DB, Azure Sentinel integration, Azure Monitor",
    devopsDetails: "GitOps with ArgoCD, Docker multi-stage builds, GitHub Actions, security scanning (Trivy + OWASP ZAP), blue-green deployments",
    security: "Zero-trust network policy, mTLS between services, secret management via Azure Key Vault, GDPR-compliant data handling",
    stack: "React, FastAPI, Neo4j, PostgreSQL, LangChain, Azure OpenAI, Azure Event Hub, Docker, Kubernetes, ArgoCD",
    complexity: "High (8 weeks)",
    resumeImpact: "Cutting-edge intersection of cybersecurity, AI, and insurance — extremely rare skill set.",
    talkingPoints: [
      "Graph-based attack path modeling is state-of-the-art in cyber risk",
      "Event-driven architecture handles real-time threat feeds at scale",
      "Bridges security engineering and insurance domain"
    ],
    enhancements: [
      "Integration with SecurityScorecard/BitSight APIs",
      "Automated policy endorsement triggers",
      "Claims prediction model for active incidents"
    ],
    enterprise: [
      "SOC2 Type II audit logging",
      "White-label portal for enterprise policyholders",
      "NIST CSF alignment scoring"
    ]
  },
  {
    rank: 4,
    name: "FraudGuard IQ",
    domain: "Fraud Detection",
    relScore: 93,
    aiScore: 95,
    cloudScore: 90,
    devopsScore: 89,
    overallScore: 92,
    problem: "Insurance fraud costs the industry $40B+ annually. Manual investigation queues are slow and miss complex organized fraud rings.",
    whyAXA: "AXA XL handles complex specialty claims with high fraud potential (marine cargo theft, construction injury fraud, fine art claims). ML-based detection provides measurable SIU efficiency gains.",
    users: ["Special Investigations Unit (SIU)", "Claims Adjusters", "Legal Teams", "Compliance Officers"],
    features: [
      "AI fraud score per claim (0-100)",
      "Fraud ring detection via graph analysis",
      "Document authenticity verification",
      "Social network analysis of claimants/providers",
      "Investigator workbench with case management",
      "Alert explanation (SHAP-based reasoning)",
      "Regulatory SAR report generation",
      "Fraud pattern library"
    ],
    aiDetails: [
      "XGBoost/LightGBM fraud classifier",
      "Graph neural network for ring detection",
      "LLM for investigation narrative generation",
      "Computer vision for document tampering detection",
      "SHAP for model explainability"
    ],
    arch: "React → FastAPI → ML Inference Service → Neo4j (graph) + PostgreSQL → Azure ML → Reporting Engine",
    db: "fraud_scores(id,claim_id,score,model_version,features_json), fraud_rings(id,members_json,detected_at,status), investigations(id,claim_id,investigator,outcome)",
    cloudDetails: "Azure Machine Learning (model registry + endpoints), Azure Kubernetes Service, Azure PostgreSQL, Azure Synapse (analytics), Azure OpenAI",
    devopsDetails: "MLflow model versioning, GitHub Actions with model evaluation gates, Docker, automated A/B model testing, drift monitoring",
    security: "Audit trail for regulatory compliance, PII tokenization, role-based investigation access, evidence chain of custody logging",
    stack: "React, FastAPI, PyTorch, XGBoost, Neo4j, Azure ML, MLflow, PostgreSQL, Docker, GitHub Actions",
    complexity: "High (7-8 weeks for MVP)",
    resumeImpact: "MLOps + graph ML + insurance fraud = extremely differentiated profile.",
    talkingPoints: [
      "SHAP explanations make AI decisions defensible in court",
      "Graph fraud ring detection catches what rule-based systems miss",
      "MLflow model registry enables production-grade ML governance"
    ],
    enhancements: [
      "Real-time scoring at FNOL submission",
      "ISO ClaimSearch integration",
      "Cross-insurer fraud data sharing consortium"
    ],
    enterprise: [
      "Model governance dashboard for actuarial review",
      "Regulatory explainability reports",
      "GDPR right-to-explanation compliance"
    ]
  },
  {
    rank: 5,
    name: "PolicyPulse Search",
    domain: "Enterprise Document Search",
    relScore: 90,
    aiScore: 93,
    cloudScore: 91,
    devopsScore: 88,
    overallScore: 91,
    problem: "Underwriters and claims adjusters spend hours manually searching policy wordings, endorsements, and coverage interpretations across thousands of documents.",
    whyAXA: "AXA XL manages tens of thousands of bespoke specialty policy documents. Semantic search with AI-generated answers reduces E&O risk and speeds up operations.",
    users: ["Underwriters", "Claims Adjusters", "Legal", "Brokers (via portal)"],
    features: [
      "Semantic document search across policy library",
      "AI-powered coverage Q&A (cite source paragraph)",
      "Document comparison (two policy versions)",
      "Gap analysis between submitted risk and existing wordings",
      "Coverage confirmation letters auto-drafting",
      "Endorsement recommendation engine",
      "Version history and change tracking",
      "Broker self-service portal"
    ],
    aiDetails: [
      "Embedding-based semantic search (Azure OpenAI embeddings)",
      "RAG pipeline for grounded Q&A",
      "LLM for coverage gap analysis",
      "Document diff with semantic change detection"
    ],
    arch: "React → FastAPI → RAG Pipeline (LangChain) → Pinecone Vector DB + PostgreSQL → Azure OpenAI → Document Store (Azure Blob)",
    db: "documents(id,title,type,version,blob_url,embedded_at), chunks(id,doc_id,chunk_text,embedding_id), queries(id,user_id,query,answer,source_chunks,ts)",
    cloudDetails: "Azure Blob Storage, Azure OpenAI (embeddings + completions), Azure Cognitive Search, Azure App Service, Azure PostgreSQL, Azure CDN",
    devopsDetails: "GitHub Actions, Docker, automated embedding pipeline (Azure Functions), vector index rebuild CI, document ingestion tests",
    security: "Document-level ACL (not all users see all policy types), watermarked output for broker portal, full query audit log",
    stack: "React, FastAPI, LangChain, Pinecone, Azure OpenAI, PostgreSQL, Azure Blob, Docker, GitHub Actions",
    complexity: "Medium (5-6 weeks)",
    resumeImpact: "RAG at enterprise scale on legal documents — one of the most in-demand GenAI patterns in insurance.",
    talkingPoints: [
      "RAG with citation prevents hallucination — critical for legal documents",
      "Embedding pipeline is production-grade with automated re-indexing",
      "Reduces average policy interpretation time from 45 min to <3 min"
    ],
    enhancements: [
      "Multi-language policy support",
      "Audio query interface for mobile adjusters",
      "Integration with DocuSign for coverage confirmation letters"
    ],
    enterprise: [
      "Multi-tenant broker portal",
      "SOC2 audit logging of all queries",
      "Configurable AI confidence thresholds for compliance"
    ]
  },
  {
    rank: 6,
    name: "RegulatoryRadar AI",
    domain: "Compliance & Regulatory",
    relScore: 88,
    aiScore: 85,
    cloudScore: 86,
    devopsScore: 82,
    overallScore: 85,
    problem: "Compliance teams manually track regulatory changes across 150+ jurisdictions where AXA XL operates.",
    whyAXA: "Regulatory fines and missed filing deadlines create material financial and reputational risk.",
    users: ["Compliance Officers", "Legal", "Finance"],
    features: [
      "Real-time regulatory feed ingestion",
      "AI impact assessment per regulatory change",
      "Jurisdiction coverage mapping",
      "Automated filing deadline calendar",
      "Change-to-policy gap analysis"
    ],
    aiDetails: [
      "NLP for regulatory text classification",
      "LLM for impact summarization",
      "Entity extraction for jurisdiction mapping"
    ],
    arch: "FastAPI → Regulatory Feed Aggregator → PostgreSQL → Azure OpenAI → React Dashboard",
    db: "regulations(id,jurisdiction,effective_date,summary,impact_score), filings(id,reg_id,due_date,status,owner)",
    cloudDetails: "Azure Logic Apps (feed ingestion), Azure OpenAI, Azure PostgreSQL, Azure App Service",
    devopsDetails: "Docker, GitHub Actions, automated feed tests",
    security: "Role-based access, audit logging",
    stack: "React, FastAPI, Azure OpenAI, PostgreSQL, Docker",
    complexity: "Medium (5 weeks)",
    resumeImpact: "Compliance AI is a rapidly growing area in insurtech.",
    talkingPoints: [
      "Covers global regulatory complexity",
      "AI impact scoring prioritizes team focus"
    ],
    enhancements: [
      "Integration with Wolters Kluwer regulatory feeds",
      "Automated regulatory filing generation"
    ],
    enterprise: [
      "Board-level compliance dashboard",
      "Regulatory change approval workflow"
    ]
  },
  {
    rank: 7,
    name: "LossControl Advisor",
    domain: "Risk Engineering",
    relScore: 87,
    aiScore: 86,
    cloudScore: 84,
    devopsScore: 83,
    overallScore: 85,
    problem: "Risk engineers generate manual property loss control reports — slow, inconsistent, and not scalable.",
    whyAXA: "Loss control quality directly impacts loss ratios on property lines.",
    users: ["Risk Engineers", "Underwriters", "Policyholders"],
    features: [
      "Site survey data ingestion (structured form)",
      "AI-generated loss control report",
      "Peer property benchmarking",
      "Recommendation prioritization by ROI",
      "Policyholder action tracking"
    ],
    aiDetails: [
      "LLM for report narrative generation",
      "ML risk factor weighting",
      "Computer vision for site photos (optional)"
    ],
    arch: "React → FastAPI → LLM Pipeline → PostgreSQL → Azure OpenAI",
    db: "surveys(id,property_id,data_json,ai_report,ts), recommendations(id,survey_id,priority,status)",
    cloudDetails: "Azure App Service, Azure OpenAI, Azure Blob (photos), Azure PostgreSQL",
    devopsDetails: "Docker, GitHub Actions, Pytest coverage",
    security: "Policyholder data compartmentalization, RBAC",
    stack: "React, FastAPI, Azure OpenAI, PostgreSQL, Docker",
    complexity: "Medium (5 weeks)",
    resumeImpact: "Combines field operations AI with cloud delivery.",
    talkingPoints: [
      "Report generation time reduced from 3 days to 2 hours",
      "Consistent AI narrative removes adjuster variability"
    ],
    enhancements: [
      "Drone survey image integration",
      "IoT sensor data ingestion",
      "Policyholder self-service portal"
    ],
    enterprise: [
      "Multi-lingual report generation",
      "White-label policyholder branding"
    ]
  },
  {
    rank: 8,
    name: "BrokerConnect Portal",
    domain: "Broker Experience",
    relScore: 85,
    aiScore: 82,
    cloudScore: 87,
    devopsScore: 85,
    overallScore: 85,
    problem: "Brokers experience friction submitting risks, getting quotes, and tracking claim status across multiple disconnected AXA XL portals.",
    whyAXA: "Broker NPS is a key distribution metric. A unified AI-assisted portal drives submission volume.",
    users: ["Brokers", "Wholesale Brokers", "MGA Partners"],
    features: [
      "Unified risk submission wizard",
      "AI pre-fill from historical submissions",
      "Real-time appetite check",
      "Quote tracking dashboard",
      "Claims status API",
      "Document management",
      "AI chat assistant for product queries"
    ],
    aiDetails: [
      "LLM for submission pre-fill",
      "Appetite scoring model",
      "NLP chatbot for product queries"
    ],
    arch: "React → FastAPI → PostgreSQL → Azure OpenAI → Azure API Management",
    db: "submissions(id,broker_id,risk_class,status,created_at), quotes(id,submission_id,amount,valid_until), messages(id,submission_id,role,content)",
    cloudDetails: "Azure API Management, Azure App Service, Azure PostgreSQL, Azure OpenAI, Azure AD B2C (broker auth)",
    devopsDetails: "Docker, GitHub Actions, Cypress E2E tests, Azure DevOps integration",
    security: "Azure AD B2C, TLS, rate limiting per broker",
    stack: "React, FastAPI, PostgreSQL, Azure OpenAI, Azure AD B2C, Docker",
    complexity: "Medium-High (6 weeks)",
    resumeImpact: "Full-stack + AI + API management is a versatile skill set.",
    talkingPoints: [
      "Azure AD B2C for enterprise-grade broker authentication",
      "API-first design enables future Lloyd's connectivity",
      "AI pre-fill reduces submission time by 50%"
    ],
    enhancements: [
      "Lloyd's Market Association API integration",
      "Real-time capacity indication",
      "Delegated authority portal for MGAs"
    ],
    enterprise: [
      "Multi-tenant per broker firm",
      "SLA-backed API for large brokers",
      "Webhook notifications for submission events"
    ]
  },
  {
    rank: 9,
    name: "ActuarialSense Dashboard",
    domain: "Actuarial / Analytics",
    relScore: 84,
    aiScore: 80,
    cloudScore: 83,
    devopsScore: 80,
    overallScore: 82,
    problem: "Actuaries spend weeks building reserve adequacy reports in Excel with error-prone manual data pulls.",
    whyAXA: "Reserve accuracy is a material financial reporting obligation. Automation reduces cycle time and error risk.",
    users: ["Actuaries", "CFO", "Finance Controllers"],
    features: [
      "Automated data pipeline from source systems",
      "Reserve triangles generation",
      "AI anomaly flagging on reserve movements",
      "Scenario modeling interface",
      "Regulatory capital dashboard",
      "Automated actuarial report generation"
    ],
    aiDetails: [
      "Time-series anomaly detection",
      "LLM for narrative commentary generation",
      "Statistical reserve adequacy models"
    ],
    arch: "FastAPI Data Pipeline → PostgreSQL → Python Analytics Layer → React Dashboard → Azure OpenAI (narrative)",
    db: "reserve_triangles(id,class,year,quarter,incurred,paid), anomalies(id,triangle_id,flag_reason,severity)",
    cloudDetails: "Azure Data Factory (pipeline), Azure PostgreSQL, Azure App Service, Azure OpenAI",
    devopsDetails: "Docker, GitHub Actions, dbt for data transforms, automated pipeline tests",
    security: "Finance data classification, SOX-aligned audit trail",
    stack: "React, FastAPI, Python (pandas/scipy), PostgreSQL, dbt, Azure OpenAI, Docker",
    complexity: "Medium (5 weeks)",
    resumeImpact: "Data engineering + actuarial domain + AI automation is rare.",
    talkingPoints: [
      "dbt models ensure auditable, reproducible data transforms",
      "AI narrative generation reduces actuarial commentary time by 70%"
    ],
    enhancements: [
      "Stochastic scenario modeling",
      "Integration with Solvency II data warehouse"
    ],
    enterprise: [
      "SOX-compliant audit trail",
      "Multi-entity consolidation",
      "Actuarial sign-off workflow"
    ]
  },
  {
    rank: 10,
    name: "SurplusLinesMonitor",
    domain: "Specialty Lines",
    relScore: 83,
    aiScore: 79,
    cloudScore: 81,
    devopsScore: 78,
    overallScore: 80,
    problem: "Surplus lines filings and compliance tracking are manual and error-prone across US states.",
    whyAXA: "AXA XL is a leading E&S market. Compliance failures create license risk and fines.",
    users: ["Compliance", "Operations", "Finance"],
    features: [
      "Automated state filing requirement tracking",
      "Premium tax calculation engine",
      "Diligent search tracking",
      "AI-assisted filing document generation",
      "Audit dashboard"
    ],
    aiDetails: [
      "LLM for filing document drafting",
      "Rule engine + ML for tax calculation validation"
    ],
    arch: "FastAPI → PostgreSQL → Azure OpenAI → React Dashboard",
    db: "filings(id,state,policy_id,due_date,status,amount), requirements(id,state,requirement_text,effective_date)",
    cloudDetails: "Azure App Service, Azure PostgreSQL, Azure OpenAI",
    devopsDetails: "Docker, GitHub Actions",
    security: "State-level data isolation, audit logging",
    stack: "React, FastAPI, PostgreSQL, Azure OpenAI, Docker",
    complexity: "Medium (4-5 weeks)",
    resumeImpact: "US surplus lines compliance is niche but high-value.",
    talkingPoints: [
      "Covers all 50-state surplus lines compliance variation",
      "Automated filing generation reduces manual work by 80%"
    ],
    enhancements: [
      "Integration with SLIP/SLIP2 data",
      "NIMA/NAPSLO reporting"
    ],
    enterprise: [
      "Multi-entity support",
      "Regulator-ready export formats"
    ]
  },
  {
    rank: 11,
    name: "CatExposure Command",
    domain: "Catastrophe Risk",
    relScore: 82,
    aiScore: 81,
    cloudScore: 83,
    devopsScore: 79,
    overallScore: 81,
    problem: "CAT managers lack real-time accumulation visibility when events strike (hurricane, earthquake, flood).",
    whyAXA: "AXA XL's property cat book is one of its largest exposures. Real-time accumulation during events is operationally critical.",
    users: ["CAT Managers", "Underwriters", "Reinsurance", "C-Suite"],
    features: [
      "Real-time policy location geocoding",
      "Event perimeter overlay (FEMA/NWS feeds)",
      "Exposed premium accumulation calculator",
      "AI-generated event impact narrative",
      "Reinsurance recovery estimation",
      "Executive briefing auto-generation"
    ],
    aiDetails: [
      "LLM for event narrative generation",
      "Spatial ML for damage estimation",
      "Anomaly detection on accumulation spikes"
    ],
    arch: "React → FastAPI → Geospatial Engine (PostGIS) → Azure Maps → Azure OpenAI",
    db: "policies(id,insured_name,lat,lng,tsi,line_of_business), events(id,type,perimeter_geojson,date), exposures(id,policy_id,event_id,estimated_loss)",
    cloudDetails: "Azure Maps, Azure PostgreSQL (PostGIS), Azure OpenAI, Azure App Service, Azure Functions (event feed ingestion)",
    devopsDetails: "Docker, GitHub Actions, geospatial data pipeline tests",
    security: "Policy location data classification, RBAC for C-suite dashboard",
    stack: "React, Mapbox GL JS, FastAPI, PostGIS, Azure Maps, Azure OpenAI, Docker",
    complexity: "Medium-High (6 weeks)",
    resumeImpact: "Geospatial + real-time + insurance = rare and impressive skill set.",
    talkingPoints: [
      "PostGIS spatial queries handle 100k+ policy locations in <2s",
      "Real-time NWS/FEMA feed integration shows operational engineering depth",
      "Executive briefing generation demonstrates AI business value directly"
    ],
    enhancements: [
      "RMS/AIR model integration",
      "Satellite imagery ingestion",
      "Lloyd's Lloyd's IUA/LMA CAT reporting"
    ],
    enterprise: [
      "Multi-peril accumulation",
      "Reinsurance treaty layer modeling",
      "RegTech CAT event reporting"
    ]
  },
  {
    rank: 12,
    name: "IncidentOps AI",
    domain: "IT Operations / SRE",
    relScore: 80,
    aiScore: 85,
    cloudScore: 88,
    devopsScore: 92,
    overallScore: 86,
    problem: "IT incidents in insurance platforms cause customer-facing outages and claims processing delays. MTTR is too high.",
    whyAXA: "AXA XL's global IT infrastructure underpins policy and claims systems. MTTR reduction has direct revenue and SLA impact.",
    users: ["SRE / Platform Engineering", "DevOps", "IT Management"],
    features: [
      "Log ingestion from multiple sources",
      "AI root cause analysis",
      "Severity classification",
      "Automated runbook recommendation",
      "MTTR trend dashboard",
      "Post-incident report generation",
      "SLA breach prediction"
    ],
    aiDetails: [
      "LLM for root cause synthesis from logs",
      "Anomaly detection on metrics",
      "NLP for runbook matching",
      "Predictive SLA breach model"
    ],
    arch: "React → FastAPI → Log Aggregation (Fluentd) → Elasticsearch → Azure OpenAI → Alert Engine",
    db: "incidents(id,severity,start_ts,resolved_ts,root_cause,ai_confidence), logs(id,incident_id,source,message,ts), runbooks(id,title,trigger_keywords,steps_md)",
    cloudDetails: "Azure Monitor, Azure Log Analytics, Azure OpenAI, Azure App Service, Azure Event Hub",
    devopsDetails: "Docker, GitHub Actions, Prometheus+Grafana, Trivy scanning, automated log pipeline tests",
    security: "Log PII scrubbing, RBAC for incident dashboard, secure runbook storage",
    stack: "React, FastAPI, Elasticsearch, Fluentd, Azure OpenAI, PostgreSQL, Docker, GitHub Actions",
    complexity: "Medium (5 weeks)",
    resumeImpact: "Strong DevOps + AI profile — directly matches the reference project brief.",
    talkingPoints: [
      "Reduces MTTR by surfacing root cause in <5 minutes vs manual 2-hour investigation",
      "Anomaly detection catches incidents before SLA breach",
      "Full observability stack shows mature DevOps engineering"
    ],
    enhancements: [
      "Integration with PagerDuty/ServiceNow",
      "Chaos engineering integration for runbook testing",
      "Self-healing automation (Azure Automation)"
    ],
    enterprise: [
      "ITIL-aligned incident taxonomy",
      "SLA reporting for IT vendors",
      "Multi-region deployment for global ops"
    ]
  },
  {
    rank: 13,
    name: "RenewalPropensity Engine",
    domain: "Retention / CX",
    relScore: 79,
    aiScore: 82,
    cloudScore: 80,
    devopsScore: 78,
    overallScore: 80,
    problem: "Renewal teams have no data-driven signal on which policies are at risk of lapsing before the renewal cycle begins.",
    whyAXA: "Retention is cheaper than acquisition. For specialty lines, losing a relationship often means losing it permanently.",
    users: ["Renewal Underwriters", "Account Managers", "Commercial Teams"],
    features: [
      "Policy lapse propensity score",
      "Churn risk segmentation",
      "Recommended retention action per account",
      "Broker relationship health score",
      "Renewal pipeline dashboard",
      "AI-generated retention talking points"
    ],
    aiDetails: [
      "Gradient boosting churn model",
      "LLM for personalised retention messaging",
      "Clustering for account segmentation"
    ],
    arch: "FastAPI → ML Inference → PostgreSQL → React Dashboard → Azure OpenAI",
    db: "policies(id,broker_id,renewal_date,propensity_score), retention_actions(id,policy_id,action_type,owner,outcome)",
    cloudDetails: "Azure Machine Learning, Azure PostgreSQL, Azure App Service, Azure OpenAI",
    devopsDetails: "MLflow, Docker, GitHub Actions, model retraining pipeline",
    security: "Client data compartmentalization, RBAC",
    stack: "React, FastAPI, Scikit-learn, Azure ML, PostgreSQL, Azure OpenAI, Docker",
    complexity: "Medium (5 weeks)",
    resumeImpact: "MLOps + CX + commercial insurance domain.",
    talkingPoints: [
      "Retention model trained on 5+ years of policy history",
      "AI talking points personalise outreach without manual prep",
      "Propensity scores are actionable — tied to recommended interventions"
    ],
    enhancements: [
      "CRM integration (Salesforce)",
      "Real-time score update on mid-term changes",
      "Broker portal renewal workbench"
    ],
    enterprise: [
      "Multi-line of business model versioning",
      "Actuary-approved model governance",
      "Explainability report for regulatory audit"
    ]
  },
  {
    rank: 14,
    name: "CapitalSense Optimizer",
    domain: "Finance / Capital",
    relScore: 78,
    aiScore: 78,
    cloudScore: 80,
    devopsScore: 76,
    overallScore: 78,
    problem: "Capital allocation across AXA XL's business units is a manual, slow process with limited scenario modeling.",
    whyAXA: "Efficient capital allocation drives ROE — a board-level KPI at every global insurer.",
    users: ["CFO", "Capital Management", "Actuaries", "Reinsurance"],
    features: [
      "Capital allocation model by BU",
      "Scenario modeling interface",
      "Risk-adjusted return dashboard",
      "Solvency II capital calculator",
      "AI-generated board summary narrative"
    ],
    aiDetails: [
      "Linear programming optimization model for capital allocation",
      "LLM for executive narrative generation",
      "Sensitivity analysis engine"
    ],
    arch: "FastAPI → Python Optimization Engine → PostgreSQL → React Dashboard → Azure OpenAI",
    db: "capital_positions(id,bu,year,quarter,scr,mcr,available), scenarios(id,name,inputs_json,result_json)",
    cloudDetails: "Azure App Service, Azure PostgreSQL, Azure OpenAI, Azure Data Factory",
    devopsDetails: "Docker, GitHub Actions, automated model validation tests",
    security: "Finance data classification, SOX controls",
    stack: "React, FastAPI, Python (scipy/cvxpy), PostgreSQL, Azure OpenAI, Docker",
    complexity: "Medium-High (6 weeks)",
    resumeImpact: "Quantitative finance + AI + insurance capital = rare analytical profile.",
    talkingPoints: [
      "Linear programming for capital optimization demonstrates quantitative engineering",
      "Solvency II alignment shows regulatory domain knowledge"
    ],
    enhancements: [
      "Integration with Solvency II data warehouse",
      "Real-time stress testing during CAT events"
    ],
    enterprise: [
      "Board-level PDF report generation",
      "Multi-currency consolidation",
      "Regulatory submission export"
    ]
  },
  {
    rank: 15,
    name: "EmployeeBenefits AI",
    domain: "HR / Employee Lines",
    relScore: 72,
    aiScore: 76,
    cloudScore: 78,
    devopsScore: 75,
    overallScore: 75,
    problem: "HR teams manually process and interpret group benefit claims and employee queries, causing delays.",
    whyAXA: "AXA's broader group (including XL) sells employee benefits globally. AI can improve service quality.",
    users: ["HR Administrators", "Employees", "Benefits Managers"],
    features: [
      "Benefit entitlement Q&A chatbot",
      "Claim status self-service",
      "Policy comparison tool",
      "Wellness program recommendation",
      "HR analytics dashboard"
    ],
    aiDetails: [
      "LLM chatbot for benefit queries",
      "Recommendation engine for wellness programs",
      "NLP claim status extraction"
    ],
    arch: "React → FastAPI → RAG Pipeline → PostgreSQL → Azure OpenAI",
    db: "employees(id,plan_id,entitlements_json), benefit_queries(id,emp_id,query,answer,ts)",
    cloudDetails: "Azure App Service, Azure OpenAI, Azure PostgreSQL",
    devopsDetails: "Docker, GitHub Actions",
    security: "PII handling (GDPR), employee data isolation",
    stack: "React, FastAPI, LangChain, PostgreSQL, Azure OpenAI, Docker",
    complexity: "Low-Medium (4 weeks)",
    resumeImpact: "HR + AI is common; lower differentiation for AXA XL specialist role.",
    talkingPoints: [
      "RAG ensures answers are grounded in actual plan documents",
      "Multi-lingual support enables global deployment"
    ],
    enhancements: [
      "Integration with Workday HR",
      "Mental health resource recommendation",
      "Biometric data wellness insights"
    ],
    enterprise: [
      "GDPR-compliant data handling",
      "Multi-country plan support",
      "Manager analytics dashboard"
    ]
  },
  {
    rank: 16,
    name: "TradeCredit Monitor",
    domain: "Trade Credit Insurance",
    relScore: 75,
    aiScore: 77,
    cloudScore: 76,
    devopsScore: 74,
    overallScore: 76,
    problem: "Trade credit underwriters manually monitor buyer financial health across thousands of credit limits.",
    whyAXA: "AXA XL has a significant trade credit book. Automated buyer monitoring reduces claims from undetected deterioration.",
    users: ["Trade Credit Underwriters", "Credit Analysts", "Policyholders"],
    features: [
      "Buyer credit score monitoring",
      "Financial statement ingestion and analysis",
      "Limit recommendation engine",
      "Early warning alert system",
      "Policyholder self-service credit limit portal"
    ],
    aiDetails: [
      "ML credit scoring model",
      "LLM for financial statement analysis",
      "Anomaly detection on buyer signals"
    ],
    arch: "FastAPI → ML Inference → PostgreSQL → React Dashboard → Azure OpenAI",
    db: "buyers(id,company,credit_score,limit,last_assessed), alerts(id,buyer_id,alert_type,severity,ts)",
    cloudDetails: "Azure Machine Learning, Azure PostgreSQL, Azure App Service, Azure OpenAI",
    devopsDetails: "Docker, GitHub Actions, MLflow",
    security: "Financial data classification, policyholder data isolation",
    stack: "React, FastAPI, Scikit-learn, PostgreSQL, Azure ML, Azure OpenAI, Docker",
    complexity: "Medium (5 weeks)",
    resumeImpact: "Credit risk + AI is transferable to banking/fintech roles too.",
    talkingPoints: [
      "Credit scoring model leverages alternative data signals",
      "Early warning reduces claims frequency"
    ],
    enhancements: [
      "D&B/Experian financial data integration",
      "Supply chain network risk analysis"
    ],
    enterprise: [
      "Multi-currency exposure monitoring",
      "Reinsurance treaty alignment",
      "Regulatory credit reporting"
    ]
  },
  {
    rank: 17,
    name: "MarineCargoTracker",
    domain: "Marine Insurance",
    relScore: 74,
    aiScore: 73,
    cloudScore: 77,
    devopsScore: 72,
    overallScore: 74,
    problem: "Marine underwriters and claims teams lack real-time cargo location and vessel risk visibility.",
    whyAXA: "AXA XL is a top-5 marine insurer globally. Real-time tracking reduces claims and improves customer experience.",
    users: ["Marine Underwriters", "Claims Adjusters", "Policyholders"],
    features: [
      "AIS vessel position tracking",
      "Cargo route risk scoring",
      "Port risk intelligence",
      "Real-time cargo alert system",
      "Marine claim first notice of loss"
    ],
    aiDetails: [
      "ML route risk scoring",
      "LLM for marine risk narrative",
      "Anomaly detection on vessel behavior"
    ],
    arch: "FastAPI → AIS Feed Aggregator → PostGIS → React Map Dashboard → Azure OpenAI",
    db: "vessels(id,imo,name,type,flag), voyages(id,vessel_id,origin,destination,cargo_type), alerts(id,voyage_id,risk_type,ts)",
    cloudDetails: "Azure Maps, Azure PostgreSQL (PostGIS), Azure OpenAI, Azure Event Hub",
    devopsDetails: "Docker, GitHub Actions, AIS feed pipeline tests",
    security: "Vessel position data classification, RBAC",
    stack: "React, Mapbox GL JS, FastAPI, PostGIS, Azure Maps, Azure OpenAI, Docker",
    complexity: "Medium-High (6 weeks)",
    resumeImpact: "Geospatial + IoT data + insurance — niche but impressive.",
    talkingPoints: [
      "Real-time AIS feed processing demonstrates event-driven architecture",
      "Geospatial risk scoring shows advanced spatial engineering"
    ],
    enhancements: [
      "Satellite imagery for cargo condition assessment",
      "Weather risk overlay integration",
      "Lloyd's marine market API"
    ],
    enterprise: [
      "Multi-vessel fleet management",
      "Reinsurance exposure reporting",
      "Flag state compliance monitoring"
    ]
  },
  {
    rank: 18,
    name: "HRAnalytics Pulse",
    domain: "Internal HR / Operations",
    relScore: 60,
    aiScore: 68,
    cloudScore: 70,
    devopsScore: 68,
    overallScore: 66,
    problem: "HR teams lack data-driven insight into talent retention and workforce planning.",
    whyAXA: "Lower priority — internal HR analytics is not AXA XL's business differentiator.",
    users: ["HR Business Partners", "People Analytics", "Management"],
    features: [
      "Employee turnover prediction",
      "Hiring funnel analytics",
      "Skills gap analysis",
      "AI workforce planning recommendations",
      "Manager effectiveness dashboard"
    ],
    aiDetails: [
      "Attrition prediction model",
      "LLM for workforce narrative",
      "Skills taxonomy NLP"
    ],
    arch: "FastAPI → ML → PostgreSQL → React Dashboard → Azure OpenAI",
    db: "employees(id,dept,tenure,performance_score), attrition_scores(id,emp_id,score,model_version)",
    cloudDetails: "Azure ML, Azure PostgreSQL, Azure App Service",
    devopsDetails: "Docker, GitHub Actions",
    security: "GDPR, PII masking, RBAC",
    stack: "React, FastAPI, Scikit-learn, PostgreSQL, Azure ML, Azure OpenAI, Docker",
    complexity: "Low-Medium (4 weeks)",
    resumeImpact: "People analytics is a common DS project — lower differentiation.",
    talkingPoints: [
      "Predictive attrition model saves recruitment cost",
      "Skills gap analysis informs L&D investment"
    ],
    enhancements: [
      "Integration with LinkedIn Talent Insights",
      "Real-time hiring pipeline integration"
    ],
    enterprise: [
      "Multi-country HR data consolidation",
      "GDPR-compliant anonymization"
    ]
  }
];

export const TOP5_PRDS: Prd[] = [
  {
    id: 0,
    title: "ClaimsSense AI — PRD",
    sections: [
      {
        h: "Executive Summary",
        body: "ClaimsSense AI is an enterprise-grade claims intelligence platform that applies generative AI and machine learning to automate FNOL triage, severity classification, root cause extraction, and reserve recommendation across AXA XL's specialty lines. The platform reduces average claims handling time by 60%, improves reserve accuracy, and delivers measurable reduction in claims leakage."
      },
      {
        h: "Business Value",
        body: "Claims leakage in specialty insurance is estimated at 3-5% of incurred losses. For AXA XL's claims book, a 1% leakage reduction represents tens of millions in annual savings. ClaimsSense AI also reduces adjuster cognitive load, enabling the same headcount to manage 40% more cases with higher quality decisions."
      },
      {
        h: "Functional Requirements",
        ul: [
          "FR-01: Ingest FNOL documents (PDF, email, structured form) and extract structured data using AI",
          "FR-02: Classify claim severity (minor/moderate/major/catastrophic) with confidence score",
          "FR-03: Identify probable root cause from loss descriptions using NLP",
          "FR-04: Recommend initial reserve amount with AI reasoning",
          "FR-05: Route claim to appropriate specialist team based on classification",
          "FR-06: Predict SLA breach risk based on claim complexity and current queue",
          "FR-07: Generate adjuster summary report in AXA XL house style",
          "FR-08: Flag fraud signals with SHAP-based explanation",
          "FR-09: Store all AI decisions with model version and confidence for audit",
          "FR-10: Provide portfolio-level analytics dashboard for claims managers"
        ]
      },
      {
        h: "Non-Functional Requirements",
        ul: [
          "NFR-01: P95 API response time < 3 seconds for synchronous classification",
          "NFR-02: Document processing < 60 seconds end-to-end",
          "NFR-03: 99.5% uptime SLA on Azure App Service with auto-scaling",
          "NFR-04: All AI decisions logged immutably for regulatory audit",
          "NFR-05: PII masked before transmission to Azure OpenAI",
          "NFR-06: RBAC aligned to AXA XL job functions (adjuster / manager / executive)",
          "NFR-07: Disaster recovery RPO < 1 hour, RTO < 4 hours"
        ]
      },
      {
        h: "System Architecture",
        body: "React SPA (Azure Static Web Apps)\n  │\n  ▼\nFastAPI Gateway (Azure App Service)\n  │              │              │\n  ▼              ▼              ▼\nAI Orchestrator  Auth Service   File Service\n(LangChain)     (Azure AD)    (Azure Blob)\n  │\n  ├─► Azure OpenAI GPT-4o (analysis)\n  ├─► Pinecone (policy vector search)\n  └─► PostgreSQL (structured data + audit)"
      },
      {
        h: "AI Prompt Design",
        body: `System: "You are ClaimsSense, an expert insurance claims analyst at AXA XL. Analyze the provided FNOL document and return structured JSON with: severity (minor|moderate|major|catastrophic), confidence (0-1), root_causes (array), reserve_recommendation (USD), routing_team, fraud_signals (array), adjuster_summary (max 200 words). Base all analysis on AXA XL specialty lines underwriting guidelines. Do not hallucinate policy terms."\nUser: "<claim_document>{extracted_text}</claim_document><policy_context>{rag_retrieved_policy}</policy_context>"`
      },
      {
        h: "Database Schema",
        body: "claims (id UUID PK, policy_id, fnol_date, loss_date, insured_name,\n        line_of_business, ai_severity, ai_confidence, human_severity,\n        reserve_ai, reserve_human, status, adjuster_id, created_at)\n\ndocuments (id UUID PK, claim_id FK, doc_type, blob_url,\n           extracted_text, extraction_model, extracted_at)\n\nai_decisions (id UUID PK, claim_id FK, model_version, prompt_hash,\n              response_json, processing_ms, created_at)\n\nfraud_signals (id UUID PK, claim_id FK, signal_type, confidence,\n               shap_values_json, flagged_at, reviewed_by)\n\naudit_log (id UUID PK, entity_type, entity_id, action, actor_id,\n           old_value_json, new_value_json, ts)"
      },
      {
        h: "CI/CD Pipeline",
        body: "on: [push]\njobs:\n  test: pytest --cov=app tests/ (>85% coverage gate)\n  security: trivy image scan + bandit SAST\n  build: docker buildx → push Azure Container Registry\n  staging: az webapp deploy → smoke tests → integration tests\n  production: manual approval gate → blue-green deploy → health check"
      }
    ]
  },
  {
    id: 1,
    title: "UnderwriteIQ — PRD",
    sections: [
      {
        h: "Executive Summary",
        body: "UnderwriteIQ automates the underwriting submission workflow for AXA XL's specialty lines. AI parses broker submissions, generates risk scores, checks against current appetite, and produces MRC-compatible quote outputs — compressing a 5-day submission-to-quote cycle to under 4 hours."
      },
      {
        h: "Business Value",
        body: "Faster submission turnaround improves broker satisfaction and win rate. Consistent AI risk scoring reduces loss ratio variance across the underwriting team. Appetite guardrails prevent concentration risk in the portfolio."
      },
      {
        h: "Functional Requirements",
        ul: [
          "FR-01: Ingest submissions via email attachment, broker portal upload, or API",
          "FR-02: Extract structured risk data using Azure Form Recognizer + GPT-4o",
          "FR-03: Generate AI risk score (0-100) with factor breakdown",
          "FR-04: Check submission against current appetite rules and portfolio accumulations",
          "FR-05: Benchmark against historical peer risks using embedding similarity search",
          "FR-06: Generate MRC-compatible quote term sheet",
          "FR-07: Route to specialist underwriter with AI-generated risk narrative",
          "FR-08: Track submission pipeline (received/scoring/quoted/bound/declined)",
          "FR-09: Market pricing intelligence dashboard"
        ]
      },
      {
        h: "Architecture",
        body: "Broker Portal (React) + API Ingestion\n  │\n  ▼\nFastAPI Submission Gateway\n  │\n  ▼\nDocument Intelligence Pipeline\n  Azure Form Recognizer → GPT-4o extraction\n  │\n  ├─► Risk Scoring Engine (ML model + rule engine)\n  ├─► Appetite Check Service\n  ├─► Peer Benchmarking (Pinecone embedding search)\n  └─► MRC Generation (LLM template)\n  │\n  ▼\nPostgreSQL + Elasticsearch"
      },
      {
        h: "AI Components",
        ul: [
          "GPT-4o: unstructured submission text extraction into ACORD-aligned JSON",
          "Azure Form Recognizer: structured form and table extraction",
          "Custom gradient boosting model: risk factor weighting trained on bound portfolio",
          "Pinecone semantic search: embedding-based peer risk comparison",
          "LLM template engine: MRC term sheet generation with guardrails"
        ]
      },
      {
        h: "Database Schema",
        body: "submissions (id, broker_id, broker_ref, risk_class, naics_code,\n             ai_risk_score, human_risk_score, appetite_status,\n             decision, decision_reason, decision_ts, underwriter_id)\n\nrisk_factors (id, submission_id, factor_name, factor_value,\n              ai_weight, model_version)\n\npeer_benchmarks (id, submission_id, peer_submission_id,\n                 similarity_score, rate_delta_pct)\n\nappetite_rules (id, risk_class, rule_json, effective_from, effective_to)\n\npricing_history (id, risk_class, quarter, market_rate_index)"
      },
      {
        h: "Week-by-Week Development Plan",
        weeks: [
          "Wk 1: Azure Form Recognizer setup, document parsing pipeline, PostgreSQL schema",
          "Wk 2: GPT-4o extraction prompts, risk factor JSON schema, unit tests",
          "Wk 3: ML risk scoring model training on synthetic data, Pinecone embedding index",
          "Wk 4: Appetite rules engine, React submission portal UI",
          "Wk 5: MRC generation, pipeline dashboard, Docker + CI/CD",
          "Wk 6: Integration testing, Azure deployment, demo preparation"
        ]
      }
    ]
  },
  {
    id: 2,
    title: "CyberRisk Sentinel — PRD",
    sections: [
      {
        h: "Executive Summary",
        body: "CyberRisk Sentinel provides AXA XL's cyber underwriting and claims teams with real-time policyholder risk posture monitoring. The platform ingests external threat intelligence, models attack surfaces using graph neural networks, and delivers AI-generated risk narratives to enable proactive policyholder engagement before incidents occur."
      },
      {
        h: "Business Value",
        body: "Cyber claims frequency reduction of even 2-3% per year represents tens of millions in loss prevention. Post-bind monitoring also creates a differentiated product feature that commands premium pricing and improves NPS with sophisticated enterprise policyholders."
      },
      {
        h: "Architecture",
        body: "React Dashboard\n  │\n  ▼\nFastAPI API Gateway\n  │              │              │\n  ▼              ▼              ▼\nThreat Intel    Risk Graph    Alert Engine\nAggregator      Engine        (Azure Event Hub)\n(Azure Fn)     (Neo4j)\n  │              │\nCVE feeds     Attack path      → Azure OpenAI\nOSINT feeds   modeling           (narrative)\nDark web sigs  GNN model"
      },
      {
        h: "AI Components",
        ul: [
          "Graph Neural Network: models policyholder infrastructure as a graph, scores attack path likelihood",
          "LLM synthesis: converts threat data into plain-English risk narrative for underwriters",
          "NLP: extracts relevant signals from unstructured threat intelligence feeds",
          "Anomaly detection: flags unusual changes in policyholder external attack surface",
          "Embedding search: matches policyholder profile to historical cyber incident cases"
        ]
      },
      {
        h: "Functional Requirements",
        ul: [
          "FR-01: Enroll policyholder companies and discover external attack surface (ASM)",
          "FR-02: Ingest CVE feeds and correlate with policyholder technology stack",
          "FR-03: Score risk posture daily (0-100) with delta from previous assessment",
          "FR-04: Generate plain-English risk narrative for underwriter briefing",
          "FR-05: Alert underwriter when risk score drops > 15 points",
          "FR-06: Display peer industry benchmarking for risk score",
          "FR-07: Generate renewal risk delta report (risk posture vs bind date)",
          "FR-08: Recommend incident response actions when deterioration detected"
        ]
      },
      {
        h: "Security Model",
        body: "Zero-trust: mTLS between all services. Azure Key Vault for all secrets. GDPR: policyholder data processed under DPA. SOC2 Type II: all access logged immutably. PII: company names and contact data tokenized before AI processing. Network: private VNet with service endpoints. IAM: Azure AD with Conditional Access requiring MFA for all users."
      }
    ]
  },
  {
    id: 3,
    title: "FraudGuard IQ — PRD",
    sections: [
      {
        h: "Executive Summary",
        body: "FraudGuard IQ is an AI-powered fraud detection and investigation workbench for AXA XL's Special Investigations Unit. The platform combines gradient boosting fraud classifiers, graph neural networks for ring detection, and LLM-generated investigation narratives to help SIU investigators prioritize and resolve fraud cases faster."
      },
      {
        h: "Business Value",
        body: "Detecting fraud before claim payment avoids 100% of the loss. Even a 10% improvement in fraud detection rate on AXA XL's specialty book translates to millions in annual savings. Faster investigation resolution also reduces the cost of SIU operations."
      },
      {
        h: "AI Model Design",
        body: "Model 1: XGBoost fraud classifier\n  Features: claim amount vs policy limit ratio, days-since-bind,\n  claimant-insured relationship, provider network patterns,\n  historical claimant flags, document anomaly scores\n  Output: fraud_score (0-100), top_5_features (SHAP)\n  \nModel 2: Graph Neural Network (PyTorch Geometric)\n  Graph: nodes=claimants/providers/adjusters, edges=shared attributes\n  Output: fraud_ring_probability, ring_members_ids\n  \nModel 3: Azure Custom Vision (document tampering)\n  Input: claim documents as images\n  Output: tamper_confidence (0-1), flagged_regions"
      },
      {
        h: "Functional Requirements",
        ul: [
          "FR-01: Score every new claim within 60 seconds of FNOL submission",
          "FR-02: Display fraud score with SHAP-based factor explanation",
          "FR-03: Detect connected fraud rings using graph analysis nightly",
          "FR-04: Generate SIU investigation workbench with case management",
          "FR-05: Auto-generate SAR (Suspicious Activity Report) draft for regulatory filing",
          "FR-06: Track investigation outcomes and feed back to model retraining",
          "FR-07: Integration with ISO ClaimSearch for cross-insurer flagging",
          "FR-08: Produce fraud analytics dashboard for SIU management"
        ]
      },
      {
        h: "MLOps Pipeline",
        body: "Data prep (dbt) → Feature engineering → Model training (Azure ML)\n  │\n  ▼\nMLflow model registry → Champion/Challenger evaluation\n  │\n  ▼\nAzure ML managed endpoint → FastAPI inference wrapper\n  │\n  ▼\nModel monitoring (data drift, performance drift) → Retraining trigger\n  │\n  ▼\nGitHub Actions: test → promote → shadow deploy → A/B → production"
      }
    ]
  },
  {
    id: 4,
    title: "PolicyPulse Search — PRD",
    sections: [
      {
        h: "Executive Summary",
        body: "PolicyPulse Search is a semantic search and AI Q&A platform built on AXA XL's policy document library. Using Retrieval-Augmented Generation (RAG), the platform allows underwriters, adjusters, and brokers to ask natural language questions about policy coverage and receive accurate, cited answers grounded in the actual policy wording — eliminating hours of manual document review."
      },
      {
        h: "Business Value",
        body: "Manual policy interpretation costs an estimated 45-90 minutes per complex coverage query. Across thousands of queries per year, PolicyPulse Search delivers millions in productivity savings. More importantly, it reduces Errors & Omissions risk from misinterpreted policy wordings."
      },
      {
        h: "RAG Architecture",
        body: "Document Ingestion Pipeline:\n  PDF/Word upload → Azure Form Recognizer OCR\n  → Section chunking (512 token chunks, 50 token overlap)\n  → Azure OpenAI text-embedding-3-large\n  → Pinecone upsert (doc_id, chunk_id, page_num metadata)\n\nQuery Pipeline:\n  User query → embed query (OpenAI)\n  → Pinecone similarity search (top-k=5, threshold=0.75)\n  → Retrieved chunks → GPT-4o with citation instruction\n  → Answer with [Source: Policy WC-2024-001, Section 3.2]"
      },
      {
        h: "Functional Requirements",
        ul: [
          "FR-01: Ingest policy documents (PDF, DOCX) with automatic chunking and embedding",
          "FR-02: Semantic search returning top-5 relevant policy sections with source citation",
          "FR-03: AI Q&A with grounded answers citing specific policy sections",
          "FR-04: Side-by-side policy document comparison with AI-generated diff summary",
          "FR-05: Coverage gap analysis: given a risk description, identify uncovered exposures",
          "FR-06: Coverage confirmation letter auto-drafting based on cited policy sections",
          "FR-07: Version history tracking for policy endorsements",
          "FR-08: Broker portal with read-only access to relevant policy classes",
          "FR-09: All queries logged for E&O audit trail",
          "FR-10: Confidence score displayed — low confidence triggers human review flag"
        ]
      },
      {
        h: "Week-by-Week Plan",
        weeks: [
          "Wk 1: Azure Blob document store, Form Recognizer OCR pipeline, chunking strategy",
          "Wk 2: OpenAI embedding pipeline, Pinecone index setup, retrieval testing",
          "Wk 3: GPT-4o Q&A prompts with citation enforcement, FastAPI endpoints",
          "Wk 4: React search UI, document viewer with highlighted citations",
          "Wk 5: Policy comparison feature, coverage gap analysis, broker portal auth",
          "Wk 6: Docker, GitHub Actions CI/CD, Azure deployment, demo preparation"
        ]
      },
      {
        h: "Guardrails Design",
        body: `Anti-hallucination prompt instruction:\n"You MUST only answer using the provided policy sections below.\nIf the answer is not found in the provided sections, respond:\n'I cannot find this coverage detail in the retrieved policy sections.\nPlease consult the full policy document or a qualified underwriter.'\nAlways cite the exact section: [Policy: {doc_title}, Section {section_id}]"\n\nConfidence threshold: if Pinecone max similarity < 0.70, surface\na 'Low confidence — human review recommended' warning in the UI.`
      }
    ]
  }
];

export const DEEP_DIVE: DeepDive = {
  execSummary: "ClaimsSense AI is an enterprise-grade, cloud-native claims intelligence platform built for AXA XL's specialty lines operations. It applies large language models, retrieval-augmented generation, and supervised ML to automate the most time-consuming and error-prone steps in the claims lifecycle — FNOL triage, severity classification, root cause analysis, and reserve recommendation. The platform is deployed on Azure with full CI/CD, Docker containerization, and enterprise security controls.",
  marketNeed: "Global insurance claims leakage exceeds $80B annually. Specialty lines (marine, aviation, construction, cyber) are disproportionately affected because of claim complexity and multi-party involvement. Adjusters at leading specialty insurers handle 150-200+ concurrent cases, making consistent, expert-level triage statistically impossible without AI assistance. Mean Time To Resolution (MTTR) in specialty claims averages 47 days — AI-assisted triage can reduce this to under 15 days for 70% of claims.",
  repoStructure: `claimssense-ai/
├── frontend/               # React SPA
│   ├── src/
│   │   ├── components/    # ClaimCard, SeverityBadge, etc.
│   │   ├── pages/         # Dashboard, ClaimDetail, Upload
│   │   └── api/           # FastAPI client hooks
│   └── Dockerfile
├── backend/                # FastAPI application
│   ├── app/
│   │   ├── api/           # routes/claims.py, routes/docs.py
│   │   ├── services/      # ai_service.py, storage_service.py
│   │   ├── models/        # claim.py, document.py (SQLAlchemy)
│   │   └── core/          # config.py, security.py
│   ├── tests/             # unit + integration tests
│   └── Dockerfile
├── ml/                     # ML model training
│   ├── training/          # severity_classifier.py
│   ├── evaluation/        # model_eval.py, drift_monitor.py
│   └── mlflow/            # experiment tracking configs
├── infra/                  # Infrastructure as Code
│   ├── azure/             # bicep templates
│   └── k8s/               # Helm charts (optional)
├── .github/
│   └── workflows/
│       ├── ci.yml          # test + lint + security scan
│       └── cd.yml          # build + deploy staging/prod
├── docker-compose.yml      # local dev environment
└── README.md`,
  weekPlan: [
    {
      w: "Week 1",
      task: "Project setup: GitHub repo, Docker Compose (FastAPI + PostgreSQL + React), Azure resource provisioning (App Service, PostgreSQL Flexible, Blob Storage, Azure OpenAI), basic FastAPI skeleton with health check, CI pipeline (lint + test)"
    },
    {
      w: "Week 2",
      task: "Document ingestion: Azure Blob upload endpoint, PDF text extraction (PyMuPDF), Azure Form Recognizer for structured forms, text cleaning pipeline, document storage to PostgreSQL, unit tests for extraction accuracy"
    },
    {
      w: "Week 3",
      task: "AI core: GPT-4o integration via LangChain, severity classification prompt engineering, RAG setup with Pinecone for policy context retrieval, JSON output schema enforcement, confidence scoring, fraud signal extraction"
    },
    {
      w: "Week 4",
      task: "Backend APIs: claims CRUD endpoints, adjuster assignment logic, SLA prediction model (simple gradient boosting), reserve recommendation endpoint, automated report generation (Jinja2 templates), integration tests"
    },
    {
      w: "Week 5",
      task: "Frontend: React dashboard (claims queue, severity distribution chart, SLA breach tracker), claim detail page with AI reasoning display, document viewer with extracted fields, RBAC with Azure AD, audit log viewer"
    },
    {
      w: "Week 6",
      task: "DevOps & polish: GitHub Actions CD pipeline (staging + prod), Trivy image scanning, Prometheus metrics, Grafana dashboard, Azure Monitor alerts, performance testing, demo recording, README documentation"
    }
  ],
  resumeDesc: "Built ClaimsSense AI, an enterprise claims intelligence platform for AXA XL's specialty insurance operations. Architected a LangChain + GPT-4o pipeline with RAG (Pinecone) for policy-grounded claim analysis, achieving 87% severity classification accuracy. Deployed on Azure (App Service, OpenAI, PostgreSQL Flexible, Blob Storage) with Docker containerization, GitHub Actions CI/CD, and enterprise security controls (Azure AD RBAC, PII masking, immutable audit logging). The platform automates FNOL triage, root cause extraction, and reserve recommendation across marine, aviation, and construction claims lines.",
  linkedIn: "🏗 Project: ClaimsSense AI — Enterprise Insurance Claims Intelligence Platform\n\nBuilt a production-grade AI platform for specialty insurance claims at AXA XL scale. The system applies GPT-4o + RAG to automate claims triage, severity classification, and reserve recommendation.\n\nTech: FastAPI · LangChain · Azure OpenAI · Pinecone · PostgreSQL · React · Docker · GitHub Actions · Azure\n\nKey outcomes: 60% reduction in triage time · 87% AI classification accuracy · Full Azure deployment with CI/CD and enterprise security controls\n\n#InsurTech #GenerativeAI #CloudArchitecture #DevOps #AXA",
  qaItems: [
    {
      q: "Why did you choose RAG over fine-tuning for policy context?",
      a: "Fine-tuning would bake policy knowledge into model weights — hard to update when policies change. RAG keeps the policy library in Pinecone; new policy documents are indexed in minutes without model retraining. For a legal domain where accuracy and auditability matter, cited retrieval also lets adjusters verify the source — critical for E&O compliance."
    },
    {
      q: "How do you handle hallucination risk in a legal domain?",
      a: "Three layers: (1) RAG grounds every response in retrieved policy text with citation enforcement in the system prompt. (2) GPT-4o is instructed to refuse and say 'I cannot find this in the policy' rather than infer. (3) AI confidence scores below 0.75 surface a human review flag in the UI. All AI decisions are logged with the exact prompt and response for audit."
    },
    {
      q: "How would you scale this to AXA XL's full claims volume?",
      a: "Azure App Service auto-scales horizontally. Document processing uses Azure Functions for async ingestion — decoupled from the API. Pinecone scales reads at low latency. PostgreSQL Flexible supports read replicas for dashboard queries. The main bottleneck is Azure OpenAI rate limits — mitigated by request queuing with Azure Service Bus and batching low-priority report generation off the critical path."
    },
    {
      q: "How does this handle PII and data privacy?",
      a: "PII masking middleware strips insured names, addresses, and financial identifiers before any data leaves the private VNet to Azure OpenAI. Azure OpenAI is configured with no-logging opt-out. All data remains in the EU Azure region. RBAC enforced via Azure AD — adjusters only see claims assigned to their team. Full immutable audit log for regulatory review."
    },
    {
      q: "What would you do differently if you had 6 more months?",
      a: "First, integrate with Guidewire ClaimCenter via API to eliminate the upload step and operate in-workflow. Second, build a feedback loop where adjuster overrides of AI decisions feed back into model retraining via MLflow — the model improves with every human correction. Third, add computer vision for damage photos using Azure Custom Vision, enabling AI to estimate severity from site images."
    }
  ]
};
