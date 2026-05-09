import React from 'react'
import ChapterLayout from '../components/ChapterLayout'
import Callout from '../components/Callout'
import FunFact from '../components/FunFact'
import AnalogyCard from '../components/AnalogyCard'
import GifCard from '../components/GifCard'
import Quiz from '../components/Quiz'
import { QUIZZES } from '../data/quizzes'

export default function Lab() {
  return (
    <ChapterLayout
      chapterId="lab"
      title="Practice & Exam Strategy"
      emoji="🧪"
      prev="var"
    >
      <p className="text-lg text-slate-600 leading-relaxed">
        You've covered the content. Now let's talk about the exam itself — how it's structured,
        where people lose points they shouldn't, and how to approach scenario-based questions
        so that your actual knowledge translates into correct answers.
        Because knowing the right answer and selecting it under exam conditions are not the same skill.
      </p>

      <GifCard gifKey="studying" caption="The correct exam prep posture." side="right" />

      <AnalogyCard analogy={{
        title: "Understanding Over Memorization",
        concept: "RC exam study strategy",
        analogy: "The NERC RC exam assumes you understand why things happen, not just that they happen. 'Because the standard says so' is not an explanation that passes the scenario-based questions. The exam will describe a system condition and ask what you do — and knowing that 'BAL-002-3 requires 15-minute DRL recovery' only helps if you understand WHAT the 15 minutes is protecting against and HOW you achieve it.",
        gif: "thinking"
      }} />

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">Free Study Resources</h2>

      <div className="space-y-3 my-4">
        {[
          {
            name: 'NERC LMS (Free)',
            url: 'https://www.nerc.com/pa/comp/sys/Pages/Operator-Certification-Study-Materials.aspx',
            desc: 'NERC\'s own Learning Management System has free online training modules covering all certification domains. Start here.',
            badge: 'Official'
          },
          {
            name: 'NATF Operator Training',
            url: 'https://www.natf.net/resources/operator-training',
            desc: 'North American Transmission Forum provides operator training resources developed by industry practitioners.',
            badge: 'Industry'
          },
          {
            name: 'NERC Glossary of Terms',
            url: 'https://www.nerc.com/pa/Stand/Glossary%20of%20Terms/Glossary_of_Terms.pdf',
            desc: 'The official definitions for every term on the exam. If you are guessing what ACE means, you are not ready. Read this.',
            badge: 'Reference'
          },
          {
            name: 'NERC Reliability Standards',
            url: 'https://www.nerc.com/pa/Stand/Pages/ReliabilityStandards.aspx',
            desc: 'All current NERC reliability standards — BAL, EOP, INT, IRO, TOP, VAR, PRC. Read the requirements (Rx) sections for all key standards.',
            badge: 'Reference'
          },
          {
            name: 'NERC Events Analysis (Free)',
            url: 'https://www.nerc.com/pa/rrm/ea/Pages/default.aspx',
            desc: 'Real-world event analyses. Learn from actual system events — understand what went wrong and what the correct operator action should have been.',
            badge: 'Learning'
          },
        ].map(({ name, url, desc, badge }) => (
          <a key={name} href={url} target="_blank" rel="noopener noreferrer"
            className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200 hover:border-mblue-300 hover:shadow-sm transition-all group">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-navy-700 group-hover:text-mblue-600">{name}</span>
                <span className="text-xs bg-mblue-50 text-mblue-600 px-2 py-0.5 rounded-full font-semibold">{badge}</span>
              </div>
              <p className="text-sm text-slate-500">{desc}</p>
            </div>
            <span className="text-slate-300 group-hover:text-mblue-400 text-lg flex-shrink-0">→</span>
          </a>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">Scenario-Based Question Strategy</h2>
      <p>
        For every scenario question, apply this framework before selecting an answer:
      </p>

      <div className="space-y-3 my-4">
        {[
          { n: '1', q: 'Who has authority?', a: 'Identify the entity responsible: RC, TOP, BA, GOP, DP. The RC has widest authority but doesn\'t operate equipment directly.' },
          { n: '2', q: 'What standard applies?', a: 'Map the scenario to the standard. Frequency disturbance → BAL. Voltage emergency → VAR/EOP. Overload → TOP/IRO. Blackstart → EOP-005.' },
          { n: '3', q: 'What is the required timeline?', a: '15 min (DRL recovery), 30 min (IROL Tv), 60 min (reliability adjustment e-tag), 90 min (reserve restoration), 2 years (blackstart training).' },
          { n: '4', q: 'What is the correct sequence?', a: 'Usually: assess → coordinate → direct action. The RC rarely acts unilaterally — it assesses, then directs the appropriate entity.' },
        ].map(({ n, q, a }) => (
          <div key={n} className="flex gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
            <div className="flex-shrink-0 w-8 h-8 bg-mblue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">{n}</div>
            <div>
              <div className="font-semibold text-navy-700">{q}</div>
              <div className="text-sm text-slate-600 mt-1">{a}</div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">Critical Numbers to Memorize</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-6">
        {[
          { value: '15 min', label: 'DRL Recovery', std: 'BAL-002-3' },
          { value: '90 min', label: 'Reserve Restoration', std: 'BAL-002-3' },
          { value: '≤ 30 min', label: 'IROL Tv Maximum', std: 'NERC Glossary' },
          { value: '60 min', label: 'Reliability Adj. Tag', std: 'INT-006-5' },
          { value: '2 years', label: 'Blackstart Training', std: 'EOP-005-3' },
          { value: '3 years', label: 'RC Cert Renewal', std: 'NERC Cert Program' },
          { value: '36 hours', label: 'CE for Renewal', std: 'NERC Cert Program' },
          { value: '60.02 Hz', label: 'Slow Time Correction FS', std: 'BAL-004' },
          { value: '59.98 Hz', label: 'Fast Time Correction FS', std: 'BAL-004' },
          { value: '~59.3 Hz', label: 'UFLS Trigger (typical)', std: 'PRC-006' },
          { value: '100%', label: 'CPS1 Minimum', std: 'BAL-001-2' },
          { value: '10 min', label: 'Spinning Reserve Deploy', std: 'BAL-002-3' },
        ].map(({ value, label, std }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-200 p-3 text-center">
            <div className="text-xl font-black text-mblue-600">{value}</div>
            <div className="text-xs font-semibold text-navy-700 mt-1">{label}</div>
            <div className="text-xs text-slate-400 font-mono mt-0.5">{std}</div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">Calculation Practice</h2>

      <div className="space-y-4">
        <div className="bg-navy-700 rounded-2xl p-5">
          <div className="text-mcyan-400 font-bold text-sm uppercase tracking-widest mb-3">ACE Calculation</div>
          <div className="text-slate-300 text-sm space-y-1">
            <div>NIA = −450 MW (net import actual)</div>
            <div>NIS = −400 MW (net import scheduled)</div>
            <div>B = −120 MW/0.1 Hz</div>
            <div>FA = 59.97 Hz, FS = 60.00 Hz</div>
            <div>IME = 0</div>
            <div className="border-t border-slate-600 pt-2 mt-2">
              ACE = (−450 − (−400)) − 10(−120)(59.97 − 60.00) − 0
            </div>
            <div>ACE = (−50) − 10(−120)(−0.03)</div>
            <div>ACE = (−50) − (36) = <span className="text-amber-400 font-bold">−86 MW</span></div>
            <div className="text-xs text-slate-400 mt-1">Negative ACE → BA is under-generating relative to its obligations</div>
          </div>
        </div>

        <div className="bg-navy-700 rounded-2xl p-5">
          <div className="text-mcyan-400 font-bold text-sm uppercase tracking-widest mb-3">Governor Droop Calculation</div>
          <div className="text-slate-300 text-sm space-y-1">
            <div>Unit rating: 200 MW | Droop: 4%</div>
            <div>Frequency drops from 60 Hz to 59.76 Hz</div>
            <div className="border-t border-slate-600 pt-2 mt-2">
              Frequency deviation = (60 − 59.76) / 60 × 100 = 0.4%
            </div>
            <div>MW response = (0.4% / 4%) × 200 MW = 0.1 × 200 = <span className="text-mgreen-400 font-bold">20 MW</span></div>
          </div>
        </div>
      </div>

      <Callout type="pro" title="Exam Day Strategy">
        (1) Read the entire question before looking at answers.
        (2) Identify the entity, standard, and timeline.
        (3) Eliminate obviously wrong answers — usually 2 can be eliminated quickly.
        (4) For "what do you do FIRST" questions: assess before acting, coordinate before directing.
        (5) For calculation questions: track units. The 10x factor in ACE kills many candidates.
      </Callout>

      <FunFact index={8} />

      <Callout type="warning" title="Common Exam Mistakes">
        (1) Selecting "shed load immediately" before assessing — RC assesses first.
        (2) Confusing ISO (a market entity) with a NERC certification.
        (3) Mixing up fast/slow time error correction scheduled frequencies.
        (4) Forgetting the 15-minute DRL recovery requirement under BAL-002-3.
        (5) Applying Western Interconnection TLR to Eastern problems (TLR is Eastern Interconnection only).
      </Callout>

      <div className="mt-10 border-t border-slate-100 pt-6">
        <h2 className="text-xl font-bold text-navy-700 mb-2">Final Chapter Quiz</h2>
        <p className="text-sm text-slate-500 mb-4">Study resources, scenario strategy, and exam day tips.</p>
        <Quiz chapterId="lab" questions={QUIZZES.lab} level={1} />
      </div>
    </ChapterLayout>
  )
}
