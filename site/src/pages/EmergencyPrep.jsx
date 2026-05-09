import React from 'react'
import ChapterLayout from '../components/ChapterLayout'
import Callout from '../components/Callout'
import FunFact from '../components/FunFact'
import AnalogyCard from '../components/AnalogyCard'
import GifCard from '../components/GifCard'
import Quiz from '../components/Quiz'
import { QUIZZES } from '../data/quizzes'

export default function EmergencyPrep() {
  return (
    <ChapterLayout
      chapterId="emergency-prep"
      title="Emergency Preparedness"
      emoji="🚨"
      prev="transmission"
      next="emergency-response"
    >
      <p className="text-lg text-slate-600 leading-relaxed">
        Emergency preparedness is the art of writing the playbook before the fire starts.
        The RC and its subordinate entities must have documented operating plans, perform
        next-day operational planning analysis, and train personnel — all before anything
        goes wrong. Because when things do go wrong, reading the manual for the first time
        is not a plan.
      </p>

      <GifCard gifKey="emergency" caption="This is what lack of preparation looks like." side="right" />

      <AnalogyCard analogy={{
        title: "Writing the Fire Escape Plan",
        concept: "Emergency Operating Procedures",
        analogy: "Writing an EOP is like writing a fire escape plan — everybody thinks it's bureaucratic busywork until the building is actually on fire. Then the person who wrote the plan looks like a genius, and everyone who skipped the drills is running in circles. EOP-011-2 is not optional. It's the fire escape plan for the entire Eastern Interconnection.",
        gif: "emergency"
      }} />

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">IRO-008-2: Operational Planning Analysis (OPA)</h2>

      <Callout type="key" title="OPA: Next-Day Reliability Assessment">
        IRO-008-2 requires the RC to perform an Operational Planning Analysis (OPA) for
        next-day operations. The OPA assesses whether planned operations will violate SOLs
        or IROLs, identifies any anticipated capacity deficiencies, and coordinates solutions
        with applicable TOPs and BAs before the operating day begins.
      </Callout>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        {[
          { title: 'Time Horizon', value: 'Next-Day', desc: 'Analyzes the upcoming operating day\'s reliability' },
          { title: 'Standard', value: 'IRO-008-2', desc: 'RC responsibility; cannot be delegated away' },
          { title: 'Action Required', value: 'Coordinate', desc: 'Identify violations in advance; coordinate solutions with TOPs/BAs' },
        ].map(({ title, value, desc }) => (
          <div key={title} className="bg-white rounded-2xl border border-slate-200 p-4 text-center">
            <div className="text-sm text-slate-500 mb-1">{title}</div>
            <div className="text-xl font-black text-mblue-600">{value}</div>
            <div className="text-xs text-slate-500 mt-1">{desc}</div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">EOP-011-2: Emergency Operating Plans</h2>
      <p>
        Each Transmission Operator must maintain Operating Plans for mitigating operating emergencies,
        including:
      </p>

      <div className="space-y-3 my-4">
        {[
          { emoji: '📉', title: 'Capacity Deficiency', desc: 'Procedures when load exceeds available generation; may include requesting emergency assistance, emergency demand response, and load shedding.' },
          { emoji: '⚡', title: 'Voltage Emergency', desc: 'Procedures for sustained low/high voltage; reactive compensation dispatch, generator excitation control, and last-resort load shedding.' },
          { emoji: '🔥', title: 'Transmission Overload', desc: 'Procedures for SOL and IROL violations; includes generation redispatch, load transfers, and controlled load shedding to prevent cascading.' },
          { emoji: '🌦️', title: 'Severe Weather / GMD', desc: 'Geomagnetic disturbance preparedness; transformer loading limits, reactive monitoring, and coordination with adjacent RCs.' },
        ].map(({ emoji, title, desc }) => (
          <div key={title} className="flex gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
            <span className="text-2xl flex-shrink-0">{emoji}</span>
            <div>
              <div className="font-semibold text-navy-700">{title}</div>
              <div className="text-sm text-slate-600 mt-1">{desc}</div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">EOP-005-3: Blackstart Resources</h2>
      <p>
        Blackstart resources are the foundation of system restoration — without them,
        there is no way to restart the system after a complete blackout. EOP-005-3
        establishes requirements for maintaining these critical assets.
      </p>

      <Callout type="key" title="Blackstart Training Requirement">
        EOP-005-3 requires Generator Operators with blackstart resources to provide training
        to operating personnel responsible for blackstart startup every <strong>2 calendar years</strong>.
        This is a hard requirement — not "as needed" or "when convenient." The exam loves this number.
      </Callout>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">COM-001: Communications Requirements</h2>
      <p>
        The RC must maintain adequate communications infrastructure for both normal
        and emergency operations. COM-001 requires:
      </p>
      <ul className="list-disc list-inside text-slate-700 space-y-2 my-4 pl-2">
        <li>Voice communication capability with all TOPs, BAs, and adjacent RCs in its footprint</li>
        <li>Primary and alternate communication paths</li>
        <li>Testing of communications capabilities on a defined schedule</li>
        <li>Documented procedures for communication failures</li>
      </ul>

      <Callout type="pro" title="Anticipated Capacity Deficiency">
        An "anticipated" capacity deficiency is identified during the OPA process — before
        the operating day begins. This gives the RC and BAs time to arrange emergency assistance,
        activate demand response, or request out-of-merit generation. An unanticipated deficiency
        during real-time operations requires immediate emergency response.
      </Callout>

      <FunFact index={2} />

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">Pre-Event Monitoring</h2>
      <p>
        The RC monitors developing conditions during the operating day, not just the results
        of the next-day OPA. Real-time monitoring tools include:
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-4">
        {[
          'State Estimator (SE)',
          'Contingency Analysis (CA)',
          'Real-time ACE monitoring',
          'Wide-area frequency monitoring',
          'Voltage monitoring (key buses)',
          'Interchange flow monitoring',
        ].map((tool) => (
          <div key={tool} className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-center font-medium text-navy-700">
            {tool}
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">Key Preparedness Standards</h2>
      <div className="space-y-2">
        {[
          ['IRO-008-2', 'RC Operational Planning Analysis — next-day assessment of SOL/IROL compliance'],
          ['EOP-011-2', 'Emergency Operations Preparedness — TOPs maintain documented Operating Plans'],
          ['EOP-005-3', 'System Restoration from Blackstart — 2-year training cycle for blackstart personnel'],
          ['COM-001', 'Communications — primary and alternate paths for normal and emergency operations'],
          ['IRO-017-1', 'Wide-area situational awareness — state estimator, contingency analysis tools'],
        ].map(([std, desc]) => (
          <div key={std} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-mono text-xs font-bold text-mblue-600 bg-mblue-50 px-2 py-1 rounded-lg flex-shrink-0">{std}</span>
            <span className="text-sm text-slate-700">{desc}</span>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-slate-100 pt-6">
        <h2 className="text-xl font-bold text-navy-700 mb-2">Chapter Quiz</h2>
        <p className="text-sm text-slate-500 mb-4">OPA requirements, EOP standards, blackstart training.</p>
        <Quiz chapterId="emergency-prep" questions={QUIZZES['emergency-prep']} level={1} />
      </div>
    </ChapterLayout>
  )
}
