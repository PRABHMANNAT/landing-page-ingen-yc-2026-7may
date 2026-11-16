import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";

const chapters = [
  { id: "start", title: "Getting started" },
  { id: "recruiters", title: "Recruiter workflow" },
  { id: "students", title: "Student workflow" },
  { id: "evidence", title: "Working with evidence" },
  { id: "interviews", title: "Interview preparation" },
  { id: "examples", title: "Templates and examples" },
  { id: "help", title: "Access and troubleshooting" },
];

const sectionClass = "scroll-mt-28 border-b border-black/10 pb-10 [&_h2]:mb-5 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:font-semibold [&_p]:mb-4 [&_a]:underline [&_a]:underline-offset-4 [&_li]:mb-2";

export default function ResourceGuide() {
  return (
    <div className="bg-brand-bg text-brand-ink">
      <Navbar />
      <main className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
        <header className="mb-12 max-w-3xl">
          <p className="label-mono text-brand-muted">Resources &amp; documentation</p>
          <h1 className="font-display mt-4 text-4xl md:text-5xl">A practical guide to iNGEN.</h1>
          <p className="mt-5 text-lg leading-relaxed text-brand-muted">Get oriented, prepare your first role or roadmap, and learn how to organise the evidence behind your work.</p>
          <div className="mt-6 flex flex-wrap gap-3"><Link className="btn-dark" href="/signup">Join the waitlist</Link><Link className="btn-outline" href="/book-demo">Book a walkthrough</Link></div>
        </header>
        <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
          <aside>
            <nav aria-label="Documentation chapters" className="lg:sticky lg:top-24 rounded-xl border border-black/10 bg-white p-5">
              <p className="label-mono mb-4 text-brand-muted">On this page</p>
              <ul className="space-y-3 text-sm">{chapters.map(chapter => <li key={chapter.id}><a href={`#${chapter.id}`} className="hover:underline">{chapter.title}</a></li>)}</ul>
            </nav>
          </aside>
          <div className="space-y-10 rounded-2xl border border-black/5 bg-white p-6 md:p-10 text-[15px] leading-7 text-brand-muted">
            <section id="start" className={sectionClass}>
              <h2>Getting started</h2>
              <p>Choose <strong>For Recruiters</strong> or <strong>For Students</strong> in the navigation to see the relevant workspace overview. Your browser remembers this preference. Use the <Link href="/features">Features page</Link> to explore the workflows, or <Link href="/demo">open the interactive preview</Link> to look around.</p>
              <p>To request access, join the waitlist with an email address you check regularly. If you already have an invitation, use the workspace link in that email. For a guided tour, book a demo and tell the team which workflow you want to discuss.</p>
              <h3>What to bring</h3>
              <ul className="list-disc pl-5"><li>Recruiters can bring a draft job brief, the outcomes expected from the role, and the questions the team needs to resolve.</li><li>Students can bring a target role, a realistic weekly time budget, and one or two work samples they have permission to share.</li></ul>
            </section>
            <section id="recruiters" className={sectionClass}>
              <h2>The recruiter workflow</h2>
              <h3>Define the role with Aristotle</h3>
              <p>Start with the work that needs doing. Describe the first project, the team the person will join, and the constraints that matter. Separate essential requirements from skills that can be learned on the job. Review the brief with the hiring manager before using it to guide a search.</p>
              <h3>Review candidates with Sherlock</h3>
              <p>Keep each claim beside its supporting source. Check whether a project is relevant, what the candidate contributed, and what remains unclear. Record uncertainty as a follow-up question. A missing public work sample may need a conversation about confidential work.</p>
              <h3>Prepare the interview and next step</h3>
              <p>Agree on the competencies you will assess and assign each interviewer an area to cover. Capture observations before the debrief. Keep the decision, its reasons, and the next action together so teammates can follow the process.</p>
              <p>Continue with the <Link href="/resources/hiring-playbook">hiring playbook</Link>, <Link href="/resources/aristotle">Aristotle guide</Link>, and <Link href="/resources/sherlock">Sherlock guide</Link>.</p>
            </section>
            <section id="students" className={sectionClass}>
              <h2>The student workflow</h2>
              <h3>Choose a target and plan your learning</h3>
              <p>Pick a role you can describe, such as a junior frontend developer. List what you already know and choose one gap to work on next. Set a weekly study budget that fits your schedule. Break the plan into projects with a clear finish point.</p>
              <h3>Build your proof profile</h3>
              <p>For every work sample, describe the problem, your contribution, the choices you made, and the result. Link to a repository, demo, presentation, or document where sharing is permitted. Check the link while signed out to make sure a reviewer can open it.</p>
              <h3>Explore jobs and organise Collections</h3>
              <p>Compare opportunities with your goals, location, and eligibility. Check the original employer listing before applying. Keep relevant projects and application notes together in a collection for each target role, and remove expired listings when you review your shortlist.</p>
              <p>Explore the <Link href="/resources/roadmap-library">roadmap library</Link>, <Link href="/resources/profile">profile guide</Link>, <Link href="/resources/jobs">Columbus guide</Link>, and <Link href="/resources/collections">Collections guide</Link>.</p>
            </section>
            <section id="evidence" className={sectionClass}>
              <h2>Working with evidence</h2>
              <p>A useful work sample helps someone understand both the output and the thinking behind it. Include enough context to explain the constraints, collaborators, and your individual contribution.</p>
              <ul className="list-disc pl-5"><li><strong>Source.</strong> Keep a link to the original work and note any access restrictions.</li><li><strong>Contribution.</strong> Explain the part you personally completed and where others helped.</li><li><strong>Result.</strong> Describe what changed. Use measurements when you can explain how they were obtained.</li><li><strong>Limitations.</strong> State what the sample leaves unanswered and what you would improve.</li></ul>
              <p>Review AI-generated summaries against their sources before using them. Keep personal information relevant to the task and get permission before sharing someone else’s work. See the <Link href="/resources/proof-scoring">proof scoring guide</Link> and <Link href="/privacy">Privacy Policy</Link>.</p>
            </section>
            <section id="interviews" className={sectionClass}>
              <h2>Prepare for a useful interview</h2>
              <p>Recruiters should connect each question to a role requirement. Students should practise explaining a project with enough detail to discuss a tradeoff or a mistake. Both sides benefit from reviewing the work sample beforehand.</p>
              <ol className="list-decimal pl-5"><li>Summarise the problem and the constraints.</li><li>Walk through the approach and explain one important decision.</li><li>Describe the outcome and how you evaluated it.</li><li>Discuss what you would try next with more time or different constraints.</li></ol>
              <p>Use the <Link href="/resources/interviews">interview planning guide</Link> and <Link href="/resources/interview-prep">student preparation guide</Link> for your next session.</p>
            </section>
            <section id="examples" className={sectionClass}>
              <h2>Templates and examples</h2>
              <h3>A starting prompt for a role brief</h3>
              <blockquote className="rounded-lg border-l-4 border-brand-purple bg-brand-bg p-5">We are hiring a junior frontend developer to improve our customer dashboard. The first project is an accessible search and filtering interface. Help us define the outcomes, essential skills, and work samples we should discuss.</blockquote>
              <h3>A starting prompt for a roadmap</h3>
              <blockquote className="rounded-lg border-l-4 border-brand-purple bg-brand-bg p-5">I know HTML and basic JavaScript and can study six hours a week. I want to apply for frontend internships. Help me plan a small project that demonstrates responsive layout, forms, and keyboard navigation.</blockquote>
              <h3>A project note you can reuse</h3>
              <p>Use these headings when documenting a project. Keep each answer specific enough that a reviewer can ask a follow-up question.</p>
              <ul className="list-disc pl-5"><li>Problem and intended users</li><li>My contribution and collaborators</li><li>Approach and tradeoffs</li><li>Result and supporting source</li><li>What I would improve next</li></ul>
              <p>Find more ideas in <Link href="/resources/sample-profiles">sample profiles</Link> and <Link href="/resources/study-guides">study guides</Link>.</p>
            </section>
            <section id="help" className={sectionClass}>
              <h2>Access and troubleshooting</h2>
              <h3>I cannot find my invitation</h3><p>Check the inbox and spam folder for the address you used to join. Contact the team with that email address if you need help locating your workspace invitation.</p>
              <h3>A signup or booking does not complete</h3><p>Keep a note of the error message and the page address. Try again later, or email the team to request help. Only treat a submission as complete when you see a confirmation.</p>
              <h3>A shared link cannot be opened</h3><p>Check the source’s sharing permissions and test it while signed out. For confidential work, ask the owner which material can be shared and use a permitted summary where appropriate.</p>
              <h3>Contact support</h3><p>Email <a href="mailto:contact@ingenworkspace.com">contact@ingenworkspace.com</a> with the page address, the steps you took, and the error you saw. Leave out passwords, payment details, and private candidate records. Visit the <Link href="/resources/help">Help Center</Link> for access support or <Link href="/accessibility">Accessibility page</Link> to report a barrier.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
