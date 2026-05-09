import React from 'react'
import ChapterLayout from '../components/ChapterLayout'
import Callout from '../components/Callout'
import FunFact from '../components/FunFact'
import AnalogyCard from '../components/AnalogyCard'
import GifCard from '../components/GifCard'
import Quiz from '../components/Quiz'
import { QUIZZES } from '../data/quizzes'

export default function Intro() {
  return (
    <ChapterLayout
      chapterId="intro"
      title="RC Certification Overview"
      emoji="🎯"
      next="balancing"
    >
      <p className="text-lg text-slate-600 leading-relaxed">
        Welcome to the NERC Reliability Coordinator (RC) exam study guide. The RC certification
        is the pinnacle of NERC's system operator credentialing program — it covers wide-area
        reliability oversight, emergency coordination, and the authority to direct other operating
        entities during reliability events. If you mess up on this exam, nobody loses power.
        If you mess up on the job... well.
      </p>

      <GifCard gifKey="controlRoom" caption="Your future workplace. Probably." side="left" />

      <Callout type="key" title="What is the RC?">
        The Reliability Coordinator (RC) is the entity with the widest area view of, and
        the highest level of authority over, the Bulk Electric System. The RC monitors
        the real-time operating state of its RC Area and takes or directs corrective
        actions to maintain reliability — even if that means overriding the decisions of
        Transmission Operators, Balancing Authorities, and Generator Operators.
      </Callout>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">The NERC Certification Landscape</h2>
      <p>NERC offers five system operator certifications. The RC is the big one:</p>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-navy-700 text-white">
              <th className="px-4 py-3 text-left rounded-tl-xl">Certification</th>
              <th className="px-4 py-3 text-left">Full Name</th>
              <th className="px-4 py-3 text-left rounded-tr-xl">Scope</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['RC', 'Reliability Coordinator', 'Wide-area reliability oversight — highest authority'],
              ['BA', 'Balancing Authority', 'Real power balancing, ACE management, reserves'],
              ['TOP', 'Transmission Operator', 'Real-time transmission system operation'],
              ['GOP', 'Generator Operator', 'Real-time generation unit operation'],
              ['BI', 'Balancing and Interchange', 'Combined BA + interchange scheduling'],
            ].map(([cert, name, scope], i) => (
              <tr key={cert} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="px-4 py-3 font-bold text-mblue-600 font-mono">{cert}</td>
                <td className="px-4 py-3 font-medium">{name}</td>
                <td className="px-4 py-3 text-slate-600">{scope}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout type="warning" title="ISO is NOT a NERC certification">
        ISO (Independent System Operator) is a type of market entity — like CAISO, MISO, or PJM.
        It is not a NERC operator certification. Trick question candidates: don't fall for it.
      </Callout>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">Exam Format</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
        {[
          { label: 'Questions', value: '100–120', sub: 'scored + ~20 pilot' },
          { label: 'Duration', value: '3–4 hrs', sub: 'at Pearson VUE' },
          { label: 'Scenario-Based', value: '~65%', sub: 'apply concepts' },
          { label: 'Renewal', value: 'Every 3 yrs', sub: '36 CE hours' },
        ].map(({ label, value, sub }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 text-center">
            <div className="text-2xl font-black text-mblue-600">{value}</div>
            <div className="text-sm font-semibold text-navy-700 mt-1">{label}</div>
            <div className="text-xs text-slate-400 mt-0.5">{sub}</div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">The 4 Exam Domains</h2>
      <div className="space-y-3">
        {[
          { n: 1, name: 'Real-Time Operations', desc: 'ACE management, frequency response, reserve compliance, AGC' },
          { n: 2, name: 'Transmission Operations', desc: 'SOLs, IROLs, voltage/reactive management, TLR procedures' },
          { n: 3, name: 'Emergency Operations', desc: 'Emergency response, system restoration, blackstart, UFLS' },
          { n: 4, name: 'Situational Awareness & Coordination', desc: 'OPA, wide-area monitoring, RC authority, interchange' },
        ].map(({ n, name, desc }) => (
          <div key={n} className="flex gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
            <div className="flex-shrink-0 w-10 h-10 bg-mblue-600 rounded-xl flex items-center justify-center text-white font-black text-lg">
              {n}
            </div>
            <div>
              <div className="font-semibold text-navy-700">{name}</div>
              <div className="text-sm text-slate-500 mt-0.5">{desc}</div>
            </div>
          </div>
        ))}
      </div>

      <FunFact index={0} />

      <AnalogyCard analogy={{
        title: "The Bar Exam of Power Systems",
        concept: "What the RC certification represents",
        analogy: "The RC certification is to power system operators what the bar exam is to lawyers — except the grid doesn't grant appeals when you make a mistake. A lawyer who botches a case can file motions. A RC operator who misses a cascading contingency has about 30 seconds before the lights go out for 50 million people. No pressure.",
        gif: "studying"
      }} />

      <Callout type="pro" title="Study Strategy">
        About 65% of questions are scenario-based. Don't just memorize standards — understand
        WHY each requirement exists. What system condition does it prevent? What happens if
        you violate it? The exam tests your ability to apply knowledge, not recite it.
      </Callout>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">Key Standards You Must Know</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[
          ['IRO-001-4', 'RC authority and Operating Instructions'],
          ['IRO-008-2', 'Operational Planning Analysis (OPA)'],
          ['BAL-001-2', 'CPS1/CPS2 real power balancing'],
          ['BAL-002-3', 'Disturbance Control Standard (DRL, MSSC)'],
          ['BAL-003-2', 'Frequency response and bias settings'],
          ['EOP-005-3', 'System restoration from blackstart'],
          ['EOP-006-2', 'System restoration coordination'],
          ['EOP-011-2', 'Emergency operations preparedness'],
          ['INT-006-5', 'Interchange evaluation and modification'],
          ['VAR-001-6', 'Voltage and reactive power management'],
          ['PRC-006', 'Under-Frequency Load Shedding (UFLS)'],
          ['TOP-001-5', 'Transmission operations'],
        ].map(([std, desc]) => (
          <div key={std} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-mono text-xs font-bold text-mblue-600 bg-mblue-50 px-2 py-1 rounded-lg flex-shrink-0">{std}</span>
            <span className="text-sm text-slate-700">{desc}</span>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-slate-100 pt-6">
        <h2 className="text-xl font-bold text-navy-700 mb-2">Chapter Quiz</h2>
        <p className="text-sm text-slate-500 mb-4">Test your understanding of RC certification basics.</p>
        <Quiz chapterId="intro" questions={QUIZZES.intro} level={1} />
      </div>
    </ChapterLayout>
  )
}
