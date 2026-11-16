type Documentation = {
  labels: [string, string, string];
  notes: [string, string, string];
  chapters: [heading: string, copy: string][];
};

export const studentDocumentation: Record<string, Documentation> = {
  roadmap: {
    labels: ["Choose an outcome", "Budget your week", "Finish and review"],
    notes: [
      "Name one target role and a project that demonstrates two of its requirements.",
      "Set aside time for building, checking the result, and writing up your decisions.",
      "Publish a permitted demo or repository and link it to your profile.",
    ],
    chapters: [
      ["Start from a role", "Find two or three genuine postings for the kind of work you want. Copy their recurring responsibilities into a private note. Group them into skills you can already demonstrate, skills you need to practise, and requirements unrelated to technical ability. Choose one gap that can be addressed through a small project. For example, build keyboard-friendly filters for a product catalogue if multiple postings ask for accessible frontend work."],
      ["Build a realistic week", "Tell Aristotle how much time you can reliably spend and what you already know. Ask it to put prerequisites first and give each week an observable outcome. If you have six hours, you might reserve four to build, one to test, and one to document decisions. Keep the first milestone small enough to finish even when other commitments change. Adjust the next milestone after comparing the estimate with the time you actually spent."],
      ["Turn progress into evidence", "At the end of each milestone, record what you shipped, how someone can try it, what passed your tests, and which parts are unfinished. A finished piece of work and a clear technical note are easier to review than a list of completed tutorials. Bring the best example into your proof profile and include a question you would like a reviewer to ask about it."],
    ],
  },
  jobs: {
    labels: ["Set your constraints", "Read the evidence", "Verify before applying"],
    notes: ["Write down location, time zone, eligibility, and availability.", "Match a requirement against a specific project or result.", "Use the employer’s current posting to confirm details and the application route."],
    chapters: [
      ["Prepare your search criteria", "Separate practical constraints from preferences. A student might need an internship that fits term dates and allows work in a specific country, while preferring a small engineering team. Check must-have constraints first, then review the role’s actual responsibilities. Keep a note of your start date, onsite availability, and the technologies you can demonstrate through finished work."],
      ["Read a suggested match", "Use Columbus suggestions to find postings worth reading. For each one, note the responsibilities you can demonstrate and the skills you would need to develop. A match score is a prompt to investigate. It cannot decide legal eligibility, assess a team’s culture, or confirm that an advertised vacancy is still open. Leave uncertain fields blank in your notes until you can verify them."],
      ["Keep the shortlist current", "Open the original employer listing, confirm it is still accepting applications, and record the date you checked. Save the link alongside the relevant profile version and the next action. If you have applied, record the date and any response you receive. Review saved postings weekly so a closed vacancy never crowds out a useful lead."],
    ],
  },
  profile: {
    labels: ["Select a work sample", "Explain your decisions", "Check sharing"],
    notes: ["Choose a specific project that matches a responsibility in the role brief.", "Describe what you personally built, why you chose the approach, and the result.", "Open the link while signed out and remove sensitive data before sharing."],
    chapters: [
      ["Create a proof entry", "Open with the problem the project addressed and the audience it was meant for. Briefly explain your role, team size, and time constraint. Describe two decisions you made and the tradeoffs you considered. Then link to an artifact someone can review. For a team project, credit collaborators and identify the features, analysis, or documentation that you personally contributed."],
      ["Show an outcome a reviewer can see", "Point to a commit, demo, issue, test report, or before-and-after comparison. Explain what the artifact proves and where its limitations are. If you include a number, say how you measured it and what was held constant. Where a result is qualitative, describe the review that took place and which change followed from it."],
      ["Make each link safe to share", "Open your portfolio link in a signed-out browser. Confirm that it leads to the expected page and works without requesting edit permission. Review screenshots, sample data, and commit history for secrets, contact details, or organisation material you cannot publish. If the work is private, ask the owner which details you may summarise and create a permitted case study."],
    ],
  },
  collections: {
    labels: ["Name the target", "Group the right material", "Review the application"],
    notes: ["Use a clear purpose such as Frontend internships, then add the intake period.", "Pair relevant jobs with the roadmap and profile variant you want to use.", "Check employer links and make note of the version you actually sent."],
    chapters: [
      ["Plan your library", "Create a collection around a target and a time horizon. A collection for summer frontend internships could include accessibility projects and roles available during the break. A separate collection for data roles might contain a SQL report and a small dashboard. Choose categories you can maintain without duplicating notes across several collections."],
      ["Tailor a profile for each group", "Start with a shared set of proof entries and decide which ones to highlight. Record why each person reviewing the application would care about the entry. Give each tailored version a recognisable name. Keep the underlying claims consistent, and adapt the order or emphasis to the work the team describes."],
      ["Review and archive", "Before sending an application, check dates, link permissions, and the source listing. After you send it, record the profile version and outcome. Move inactive jobs out of your active shortlist. Periodically review which examples lead to conversations so you can improve future collections and retire stale materials."],
    ],
  },
  extension: {
    labels: ["Define your use case", "Confirm availability", "Review browser permissions"],
    notes: ["Describe which page you would save information from and why.", "Ask support for the current availability and official install link for your browser.", "Check the publisher and requested access before installation."],
    chapters: [
      ["Decide what you need from an extension", "Make a list of the information you would save while browsing, such as the title of a role, its employer link, and a short note about fit. Check whether those fields are enough to keep the workflow useful. Avoid copying an entire page when a link and a short summary are sufficient."],
      ["Check access with iNGEN", "Use the support link below to ask whether an official extension is available for your browser, account, and intended use. Include the browser name and version. Confirm that the publisher matches the details the team provides. If access is unavailable, you can still copy the original listing link into your collection and record the date you verified it."],
      ["Review what the browser grants", "Read the installation prompt and confirm that its permissions fit the task. Avoid allowing an extension to read sensitive work or school pages without the organisation’s permission. After installing from an official source, test with one public job posting and check which fields are saved. Use Chrome’s extension controls to review its access or remove it if you stop using it."],
    ],
  },
  "roadmap-library": {
    labels: ["Select a track", "Scale the first project", "Review with evidence"],
    notes: ["Compare the activities and outputs for frontend, data, and product.", "Use your current skills and weekly hours to define a finish line.", "Save one finished artifact and a short account of how you tested it."],
    chapters: [
      ["Frontend track", "Build a product catalogue with search, filters, and an empty state. Start with semantic markup and responsive layout. Add interactions next, then use a keyboard to check focus order and input labels. Prepare a README with a demo link, tests you performed, and one limitation. Extend the project with data loading only after the core interaction works."],
      ["Data track", "Use a public dataset with a clear licence and write one question it can answer. Keep the original data available, document cleaning choices, and separate exclusions from the result. Build one chart and explain its units and sample. End the project with a reproducible query or notebook and a note about the inferences the data supports."],
      ["Product track", "Pick one problem with a bounded audience. Ask a participant to walk through their current workflow and identify the most troublesome step. Sketch two improvements, choose one, and test a small prototype. Share the research question, what you changed after testing, and what remains uncertain. Ask participants for permission before sharing notes."],
    ],
  },
  "sample-profiles": {
    labels: ["State the context", "Show your contribution", "Give evidence"],
    notes: ["Tell the reviewer who needed the work and what problem it solved.", "Describe your part and credit teammates.", "Point to a permitted artifact and explain what it shows."],
    chapters: [
      ["Frontend sample", "Our student club needed a searchable directory that could be used without a mouse. I updated the markup for the results, added visible focus, and tested the filter using the keyboard. My pull request describes the focus order and includes a checklist others can repeat. The next improvement would be testing the filter with assistive technology and documenting the differences."],
      ["Data sample", "Our volunteer team wanted to understand attendance patterns. I cleaned an anonymised copy of the attendance data, grouped it by event type, and wrote queries to compare weekday and weekend participation. I published a chart using permitted aggregate counts and included the exclusions in a notes column. I would check whether the same patterns hold across another term before treating them as a trend."],
      ["Team project sample", "We built a prototype for scheduling tutors. I implemented the availability editor and wrote the validation rules for conflicting times. The backend and deployment were handled by two teammates. I can share the repository and a permitted demo. Our test accounts use invented names, and the technical note shows which constraints we handled and which we left for a later release."],
    ],
  },
  "interview-prep": {
    labels: ["Pick one relevant project", "Rehearse a tradeoff", "Review your answer"],
    notes: ["Match the project to a responsibility in the job description.", "Explain the alternative you considered and why you made your choice.", "Check that your answer names the outcome and your own contribution."],
    chapters: [
      ["Prepare a two-minute walkthrough", "Write a short description of the project, the problem, your role, and the result. Start with the outcome so the interviewer has a frame for your technical decisions. Keep one link available to show how the change works. Rehearse at a natural pace and leave time for the interviewer to ask about details."],
      ["Practise likely follow-ups", "For each project, prepare answers about constraints, collaboration, testing, and what you would change. Discuss a real decision, such as when you chose a simpler approach because the users needed an early release. Describe the tradeoff and what evidence you used. If you lack a measurement, explain what you would track in a future iteration."],
      ["Review and adapt", "Ask a peer to listen to your answer without looking at your profile. Have them repeat the problem, your contribution, and the outcome in their own words. Any missing information is an editing opportunity. After an interview, record the questions that surprised you and update your project notes while the conversation is fresh."],
    ],
  },
  help: {
    labels: ["Identify the affected page", "Record what happened", "Send the useful details"],
    notes: ["Copy the page address and write down the action you tried.", "Record the error text, time, browser, and whether repeating the action changes anything.", "Use the support link and leave out credentials and confidential files."],
    chapters: [
      ["Invitation and account access", "Check the inbox for the address used on the waitlist, as well as spam and filtered mail. Look for the original workspace invitation and follow its access instructions. If the link no longer works, send support the address you used and the date you received the invitation. You can ask for an alternative way to complete the step if the page is inaccessible."],
      ["Technical issues", "Record the page address, device, browser, and the actions you took before the issue appeared. Copy the visible error text if available. If the problem involves a shared link, check whether it opens while signed out and whether the recipient has the required permission. Crop screenshots so they show the error without including private candidate or student details."],
      ["Requests that need a human", "Use the support address for plan availability, campus or community enquiries, and assistance with a booking. Include the outcome you need and the parts you have already tried. For policy questions, link to the relevant page in your message. Keep your passwords, verification codes, and payment card details out of every support request."],
    ],
  },
  "student-access": {
    labels: ["Join the waitlist", "Watch for an invitation", "Prepare a first project"],
    notes: ["Use an inbox you check regularly and wait for the form confirmation.", "Check spam and filtered mail, then follow the original workspace invitation.", "Bring one target role, a weekly time budget, and a work sample you can share."],
    chapters: [
      ["Request access", "Open the signup page and use the address where you want to receive updates. Complete the requested fields and look for the on-screen confirmation. Keep a note of the email you used so support can help locate your entry if needed. Joining the waitlist does not require payment."],
      ["Prepare while you wait", "Pick a role to explore and shortlist a few postings with clear responsibilities. Save one project link and write a short explanation of your contribution. Estimate how many hours you can spend each week. These details give you something concrete to use when exploring a roadmap or building a proof profile."],
      ["Use the invitation", "Follow the access instructions in the workspace email when they arrive. Check that the address belongs to the team and that the page matches the destination you expected. If the invitation cannot be opened or you need help with a step, contact the Help Center with the address you used to join. Ask about plan details before agreeing to any paid service."],
    ],
  },
  ambassadors: {
    labels: ["Identify the campus group", "Prepare a proposal", "Contact the team"],
    notes: ["Name the university or group and explain who would benefit.", "Suggest one activity, its format, and how you would gather feedback.", "Ask about current availability and what the team can support."],
    chapters: [
      ["Choose a useful campus activity", "A good proposal describes a real challenge facing students and a practical activity to address it. For example, run a one-hour workshop where participants choose a target role and draft a proof entry. Consider your audience’s year level, access needs, and timetable before choosing an event date. Ask the club or career centre which format has worked for them before."],
      ["Put the idea in writing", "Include the university and campus, group name, the purpose of the activity, expected attendance, and any dates under consideration. Explain which material you want help preparing and what your group can organise. If you intend to collect contact details or use someone’s work in a demonstration, check consent and campus rules before announcing it."],
      ["Ask about current participation", "Use the contact link below to share your proposal and ask which activities are available. Wait for details from the team before promising benefits, university sponsorship, or official titles to participants. If you run a session, gather feedback about what students learned and what was difficult, then share a brief summary without including private student records."],
    ],
  },
  referrals: {
    labels: ["Share the official page", "Let the recipient choose", "Confirm any programme terms"],
    notes: ["Copy the iNGEN signup link from the public site.", "Ask the person to enter their own details if interested.", "Check with iNGEN before relying on a code, credit, or reward."],
    chapters: [
      ["Share a relevant invitation", "Send the public signup link with a short explanation of why it may be useful. Mention the relevant workflow, such as building a student roadmap or preparing hiring briefs. If the recipient wants to explore first, share the Features or Resources page so they can see what the workspace does before making a decision."],
      ["Let each person manage their own signup", "Give the recipient the option to join with their own email and decide how to participate. Keep contact information private and avoid enrolling someone without their knowledge. For clubs or teams, share the public link in the channel they already use for announcements and make clear that signing up is optional."],
      ["Verify special referral arrangements", "If you receive a referral code, ask the team to confirm where it is used, whether it is active, and which terms apply. Keep a copy of the written instructions. A link to the normal waitlist simply lets someone request access. It does not by itself record a reward or guarantee a place in a programme."],
    ],
  },
  community: {
    labels: ["Choose a topic", "Request the official invite", "Share safely"],
    notes: ["Decide whether you want project feedback, interview practice, or event information.", "Ask iNGEN for the current community link and access instructions.", "Use permitted examples and keep private account or application details out of posts."],
    chapters: [
      ["Decide what you want to discuss", "Project feedback works best with a clear question and a small example. For interview practice, choose a topic you would like to rehearse and specify how much time you can offer in return. If you are interested in an event, ask for timing and access instructions before making any plans."],
      ["Request current community information", "Contact iNGEN through the official address on this page to ask about Discord or other channels. Confirm that an invite comes from the team before using it. Check each channel’s rules when joining and decide which notifications you need. Availability and invitations can change, so request the current link if an earlier one has expired."],
      ["Give feedback that people can act on", "Describe what you tried, what happened, and one specific suggestion. Ask before copying or reposting another person’s work. When sharing a project for review, use a version with permitted sample data and redact personal details. If you receive an unsolicited request for credentials or payment, check directly with the team before responding."],
    ],
  },
  "study-guides": {
    labels: ["Pick a skill", "Practise on a new task", "Write a project note"],
    notes: ["Choose a skill connected to a real responsibility in a target job.", "Use a worked example to learn, then try a different problem without copying it.", "Keep a note of the tests, the outcome, and one thing you would improve."],
    chapters: [
      ["Read with a task in mind", "Choose a skill from an actual role description and phrase it as a task. For example, turn ‘understands responsive design’ into ‘make a results table usable on a narrow screen’. Read a relevant guide to understand the basic techniques, then list three behaviours you want the screen to support. Use those behaviours as checks during the exercise."],
      ["Use a worked example, then change the problem", "Start small enough to complete in one session. After you understand an example, close it and build a similar result for a different scenario. Change one constraint, such as input size or screen width. Write down where your initial approach failed and which adjustment improved it. Ask a peer to try the result if you can."],
      ["Keep a record you can reuse", "Summarise the problem, your approach, the tests you ran, and the outcome. Save the link or file beside your roadmap milestone. When you revisit the skill, compare a new attempt with the earlier one and decide what to practise next. If the result demonstrates relevant work, add it to your proof profile with enough context for a reviewer."],
    ],
  },
};
