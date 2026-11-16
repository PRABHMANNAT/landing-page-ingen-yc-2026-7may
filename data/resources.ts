export const contactEmail = "contact@ingenworkspace.com";

type Resource = {
  title: string;
  description: string;
  guidance: string;
  next: { label: string; href: string };
};

const features = { label: "Explore features", href: "/features" };
const demo = { label: "Open the live preview", href: "/demo" };
const waitlist = { label: "Join the waitlist", href: "/signup" };

function contact(subject: string, label = "Email iNGEN") {
  return { label, href: `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}` };
}

export const resources: Record<string, Resource> = {
  dashboard: {
    title: "Recruiter dashboard",
    description: "The dashboard brings open roles, candidates, and interview activity into one workspace.",
    guidance: "Start with one active role. Check which candidates need a review, which evidence is missing, and which interviews need a decision. Keep the next step visible to the rest of the hiring team.",
    next: demo,
  },
  aristotle: {
    title: "Aristotle workflow guide",
    description: "Aristotle helps recruiters turn an initial hiring brief into a role and sourcing plan.",
    guidance: "Give Aristotle the outcomes you expect in the first few months, the constraints of the role, and examples of relevant work. Review the resulting brief before using it to find candidates.",
    next: demo,
  },
  sherlock: {
    title: "Sherlock proof guide",
    description: "Sherlock helps hiring teams review evidence behind a candidate’s claims.",
    guidance: "Ask for a work sample that relates to the role. Review the original source, look for the candidate’s contribution, and record where you need clarification before making a decision.",
    next: demo,
  },
  interviews: {
    title: "Interview planning",
    description: "Prepare interviews around the skills and evidence that matter for the role.",
    guidance: "Give each interviewer a competency to assess and a shared question for comparing candidates. Add project-specific follow-ups and capture observations before the debrief.",
    next: demo,
  },
  settings: {
    title: "Workspace settings",
    description: "Decide who should manage a recruiting workspace and what information each teammate needs.",
    guidance: "Before inviting teammates, identify who owns billing, who can change hiring criteria, and who needs access to candidate records. Review these permissions when responsibilities change.",
    next: demo,
  },
  docs: {
    title: "Getting started with iNGEN",
    description: "Start with the recruiter or student workflow that matches your goal.",
    guidance: "Recruiters can begin by defining a role and reviewing evidence for its main requirements. Students can pick a target role, add a work sample to their profile, and choose one skill to practise next.",
    next: features,
  },
  "hiring-playbook": {
    title: "Hiring playbook",
    description: "Use a repeatable process for defining roles, reviewing work, and comparing candidates.",
    guidance: "Write the outcomes you need, agree on a short scoring rubric, and decide what evidence counts for each criterion. Ask all candidates the same core questions and record the reasons for each recommendation.",
    next: { label: "Read the proof scoring guide", href: "/resources/proof-scoring" },
  },
  "proof-scoring": {
    title: "Proof scoring guide",
    description: "Evaluate work samples against requirements you can describe and explain.",
    guidance: "Check whether the sample is relevant, whether the candidate explains their specific contribution, and whether there is a concrete result. Record gaps as questions for the interview. Keep the final decision with the hiring team.",
    next: { label: "Read about AI oversight", href: "/resources/ai-audit" },
  },
  partners: {
    title: "Partner with iNGEN",
    description: "Contact us about working together on hiring, education, or a product integration.",
    guidance: "Tell us what your organisation does, who the partnership would serve, and what you’d like to build or test together.",
    next: contact("Partnership enquiry"),
  },
  help: {
    title: "Help Center",
    description: "Get help with the waitlist, product demos, and workspace access.",
    guidance: "For a technical issue, send the page address, the steps you took, and any error message. For an access question, include the email address you used to join. Leave out passwords and private candidate information.",
    next: contact("iNGEN support", "Contact support"),
  },
  about: {
    title: "About iNGEN",
    description: "iNGEN is a workspace for hiring teams and students, operated by INGEN LABS PTY LTD.",
    guidance: "The recruiter workspace helps teams define roles, review work samples, and plan interviews. The student workspace helps students identify skills to develop and show the work they’ve done.",
    next: features,
  },
  blog: {
    title: "iNGEN Blog",
    description: "Practical reading about hiring and preparing for a first role.",
    guidance: "Start with the hiring playbook for a repeatable approach to interviews and evaluating work. If you’re applying for a role, the study guide walks through choosing a practice project and documenting your progress.",
    next: { label: "Read the hiring playbook", href: "/resources/hiring-playbook" },
  },
  media: {
    title: "Media Kit",
    description: "Request iNGEN brand assets, product images, or company information for publication.",
    guidance: "Include your publication or event, the assets you need, the intended use, and your deadline so we can send the relevant materials.",
    next: contact("iNGEN media kit request", "Request media assets"),
  },
  press: {
    title: "Press enquiries",
    description: "Contact INGEN LABS PTY LTD about iNGEN, interviews, and product coverage.",
    guidance: "Include your outlet, topic, deadline, and any questions you’d like the team to answer.",
    next: contact("Press enquiry", "Contact iNGEN for press"),
  },
  "ai-audit": {
    title: "AI Audit Center",
    description: "Review how AI suggestions are used in the iNGEN hiring workflow.",
    guidance: "Check the source material behind a recommendation, document where reviewers disagreed, and flag incomplete or inaccurate evidence before using it in a hiring decision. Contact iNGEN through the Trust Center with questions about oversight.",
    next: { label: "Visit the Trust Center", href: "/trust" },
  },
  status: {
    title: "Service status and incident support",
    description: "Contact iNGEN for an update on an outage or an issue affecting your workspace.",
    guidance: "This page provides an incident reporting contact. For a current update, send the affected page or feature, when the problem began, and whether teammates are also seeing it.",
    next: contact("Service status enquiry", "Ask about service status"),
  },
  roadmap: {
    title: "Build a roadmap with Aristotle",
    description: "Turn a target job into a sequence of skills to practise and projects to finish.",
    guidance: "Start with one role and a timeframe. Choose one skill from a relevant job description and plan a small project that shows how you applied it. Add the finished project to your profile.",
    next: demo,
  },
  jobs: {
    title: "Find jobs with Columbus",
    description: "Explore job matches based on your profile and target roles in the student workspace.",
    guidance: "Review each listing for location, experience, and eligibility requirements. Use your strongest relevant project when tailoring an application and check the employer’s listing before submitting.",
    next: demo,
  },
  profile: {
    title: "Manage your proof profile",
    description: "Use your student profile to show what you built and what you contributed.",
    guidance: "For each project, include the problem, your contribution, and a result. Link to a public work sample where you have permission and check that it opens for someone outside your account.",
    next: demo,
  },
  collections: {
    title: "Organise work in Collections",
    description: "Keep saved roles, roadmaps, and application materials together.",
    guidance: "Create a collection for each target role. Save relevant listings and group the work samples you’d use in applications. Review your collections periodically to remove expired listings and outdated material.",
    next: demo,
  },
  extension: {
    title: "Chrome extension availability",
    description: "Ask the iNGEN team about Chrome extension access and supported browsers.",
    guidance: "Tell us what you want to do in the browser and which Chrome version you use. The team can confirm availability and share installation details when available.",
    next: contact("Chrome extension availability"),
  },
  "roadmap-library": {
    title: "Roadmap library",
    description: "Use these starting points to plan a small project around a target role.",
    guidance: "Frontend: build a responsive page with a form and test it with a keyboard. Data: clean a public dataset, make a chart, and explain one limitation. Product: interview a user, identify a friction point, and prototype one improvement.",
    next: { label: "Build a roadmap with Aristotle", href: "/resources/roadmap" },
  },
  "sample-profiles": {
    title: "Sample proof profiles",
    description: "A proof profile describes a project so a reviewer can understand your contribution.",
    guidance: "Example: ‘I built the keyboard navigation for our student club directory. I made the search and results usable without a mouse and wrote a checklist for teammates to repeat the checks.’ Add a link to the work when you can share it.",
    next: { label: "Read the proof profile guide", href: "/resources/profile" },
  },
  "interview-prep": {
    title: "Interview prep guide",
    description: "Practise explaining the work on your profile and the choices you made.",
    guidance: "Pick a project relevant to the role. Describe the problem, your part in the work, a tradeoff you made, and what happened. Practise answering what you would do differently with more time.",
    next: { label: "See a sample proof profile", href: "/resources/sample-profiles" },
  },
  "student-access": {
    title: "Student access",
    description: "Join the waitlist for access to the FORGE student workspace.",
    guidance: "Use the email where you want to receive access updates. If you have a question about student pricing or plan availability, contact the Help Center before signing up.",
    next: waitlist,
  },
  ambassadors: {
    title: "Campus ambassadors",
    description: "Ask about sharing iNGEN with a student club, career centre, or campus community.",
    guidance: "Include your university, the group you represent, and the kind of activity you have in mind, such as a practical workshop or product walkthrough.",
    next: contact("Campus ambassador enquiry"),
  },
  referrals: {
    title: "Refer someone to iNGEN",
    description: "Share the iNGEN waitlist with a teammate or student who wants to try the workspace.",
    guidance: "Send them the waitlist page so they can sign up with their own email address. Contact the team if you have been given a referral code or have questions about a referral programme.",
    next: waitlist,
  },
  community: {
    title: "Student community",
    description: "Contact iNGEN for the current Discord and student community details.",
    guidance: "Tell us what you’re looking for, such as project feedback, interview practice, or events. Ask for the current invite before sharing personal details in a community that uses the iNGEN name.",
    next: contact("Student community and Discord", "Ask for community access"),
  },
  "study-guides": {
    title: "Study guides",
    description: "Use a job description to choose a skill you can practise through a small project.",
    guidance: "Read an introductory guide, complete a small example on your own, then apply the skill to a new problem. Keep a short record of what you tried, where you got stuck, and what you learned.",
    next: { label: "Pick a project from the roadmap library", href: "/resources/roadmap-library" },
  },
};
