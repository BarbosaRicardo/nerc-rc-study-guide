import React from 'react'
import ChapterLayout from '../components/ChapterLayout'
import Callout from '../components/Callout'
import FunFact from '../components/FunFact'
import AnalogyCard from '../components/AnalogyCard'
import GifCard from '../components/GifCard'
import Quiz from '../components/Quiz'
import { QUIZZES } from '../data/quizzes'

export default function IRO() {
  return (
    <ChapterLayout
      chapterId="iro"
      title="IRO — RC Authority & Wide-Area"
      emoji="🌐"
      prev="emergency-response"
      next="interchange"
    >
      <p className="text-lg text-slate-600 leading-relaxed">
        The IRO (Interconnection Reliability Operations) standards define the RC's authority,
        responsibilities, and the wide-area reliability tools the RC must maintain.
        This is the chapter where the RC's unique power is formally established:
        the RC can direct any entity under it to take action, and that entity must comply.
        Unless they literally can't — in which case they must say so immediately.
      </p>

      <GifCard gifKey="teamwork" caption="The RC operating hierarchy: one vision, many actors." side="right" />

      <AnalogyCard analogy={{
        title: "Air Traffic Control, but on Fire",
        concept: "RC authority in the operating hierarchy",
        analogy: "The RC is the highest authority in the operating hierarchy — like an air traffic controller who can override any pilot's decision if it threatens other planes. The difference is the planes weigh 10 million pounds and are on fire. When the RC issues an Operating Instruction, subordinate entities comply. That is not optional. That is the structure of the grid.",
        gif: "controlRoom"
      }} />

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">Operating Hierarchy</h2>

      <div className="bg-navy-700 rounded-2xl p-6 my-6">
        <div className="text-center mb-4">
          <div className="inline-block bg-mblue-600 text-white font-bold px-6 py-3 rounded-xl text-lg mb-2">
            RC — Reliability Coordinator
          </div>
          <div className="text-slate-400 text-xs">Highest operating authority</div>
        </div>
        <div className="flex justify-center gap-1 text-slate-500 text-lg mb-4">↓ ↓ ↓</div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { name: 'TOP', full: 'Transmission Operator', desc: 'Operates transmission facilities' },
            { name: 'BA', full: 'Balancing Authority', desc: 'Balances generation and load' },
            { name: 'GOP', full: 'Generator Operator', desc: 'Operates generating units' },
          ].map(({ name, full, desc }) => (
            <div key={name} className="bg-navy-600 rounded-xl p-3 text-center">
              <div className="text-mcyan-400 font-bold font-mono">{name}</div>
              <div className="text-white text-xs font-medium mt-1">{full}</div>
              <div className="text-slate-400 text-xs mt-1">{desc}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-1 text-slate-500 text-lg my-3">↓</div>
        <div className="bg-navy-600 rounded-xl p-3 text-center">
          <div className="text-slate-300 font-mono font-bold">DP</div>
          <div className="text-white text-xs font-medium mt-1">Distribution Provider</div>
          <div className="text-slate-400 text-xs mt-1">Operates distribution facilities; follows TOP/BA direction</div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">IRO-001-4: RC Authority</h2>

      <Callout type="key" title="The Core Authority: IRO-001-4">
        Under IRO-001-4, the RC shall take whatever actions are needed to ensure the reliability
        of its RC Area and shall coordinate with other RCs as required. When the RC issues an
        Operating Instruction, subordinate entities shall act on it. If an entity cannot
        perform the instruction, it MUST immediately inform the RC of its inability.
        Silence is not an option. Refusal without notification is a violation.
      </Callout>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="bg-mgreen-50 border border-mgreen-400 rounded-2xl p-4">
          <h3 className="font-bold text-mgreen-600 mb-2">RC Obligations (R1-R2)</h3>
          <ul className="text-sm text-slate-700 space-y-2">
            <li>• Monitor wide-area system conditions in real-time</li>
            <li>• Take corrective actions to maintain reliability</li>
            <li>• Issue Operating Instructions to TOPs, BAs, GOPs</li>
            <li>• Coordinate with adjacent RCs as needed</li>
          </ul>
        </div>
        <div className="bg-blue-50 border border-blue-300 rounded-2xl p-4">
          <h3 className="font-bold text-blue-700 mb-2">Subordinate Entity Obligations (R3)</h3>
          <ul className="text-sm text-slate-700 space-y-2">
            <li>• Comply with RC Operating Instructions</li>
            <li>• Inform RC immediately if unable to comply</li>
            <li>• Not take actions that would endanger RC-area reliability</li>
            <li>• Coordinate planned outages with the RC</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">IROL: Interconnection Reliability Operating Limits</h2>

      <div className="my-6 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-navy-700 text-white">
              <th className="px-4 py-3 text-left rounded-tl-xl">Parameter</th>
              <th className="px-4 py-3 text-left rounded-tr-xl">Detail</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Definition', 'A System Operating Limit whose violation could adversely affect reliability of two or more RCs in the Interconnection'],
              ['Tv (Violation Time)', 'The maximum time an IROL may be violated before emergency action is required. Each IROL has its own Tv, always ≤ 30 minutes.'],
              ['Who Sets It', 'The RC, based on stability studies, facility ratings, and wide-area reliability analysis'],
              ['Action When Violated', 'RC monitors; when Tv is reached, RC takes or directs IMMEDIATE emergency action'],
              ['Consequence of Exceeding Tv', 'Cascading outages or uncontrolled system separation — potentially multi-state blackout'],
            ].map(([param, detail], i) => (
              <tr key={param} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="px-4 py-3 font-semibold text-navy-700 w-40">{param}</td>
                <td className="px-4 py-3 text-slate-700">{detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">TLR Procedures (IRO-006-EAST-2)</h2>
      <p>
        When an SOL is being approached or violated due to interchange flows,
        the RC initiates Transmission Loading Relief (TLR) procedures to curtail
        transactions that are causing or contributing to the overload.
      </p>

      <Callout type="pro" title="TLR Level Selection Logic">
        TLR is escalated through levels in sequence — you don't jump from Level 1 to Level 5.
        Each level is tried first; if it resolves the overload, no further escalation.
        If not, escalate. Firm service is NEVER curtailed before all non-firm options are exhausted.
        Level 4 (curtail firm PTP) and Level 5 (curtail firm Network) are serious escalations
        that require careful documentation and coordination.
      </Callout>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">IRO-017-1: Wide-Area Situational Awareness</h2>
      <p>
        The RC cannot monitor what it can't see. IRO-017-1 requires the RC to maintain
        tools providing wide-area situational awareness, including:
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-4">
        {[
          { name: 'State Estimator', desc: 'Real-time network model converged to actual conditions' },
          { name: 'Contingency Analysis', desc: 'N-1 (and N-2 for IROLs) security assessment' },
          { name: 'Frequency Monitoring', desc: 'Wide-area frequency visibility across RC area' },
          { name: 'Voltage Monitoring', desc: 'Key bus voltage monitoring with alarm thresholds' },
          { name: 'ACE Monitoring', desc: 'All BA ACEs visible to RC for coordination' },
          { name: 'Interchange Monitoring', desc: 'Actual vs scheduled interchange on key paths' },
        ].map(({ name, desc }) => (
          <div key={name} className="bg-white rounded-xl border border-slate-200 p-3">
            <div className="font-semibold text-navy-700 text-sm">{name}</div>
            <div className="text-xs text-slate-500 mt-1">{desc}</div>
          </div>
        ))}
      </div>

      <FunFact index={10} />

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">Key IRO Standards</h2>
      <div className="space-y-2">
        {[
          ['IRO-001-4', 'RC authority — highest operating authority; entities must comply or notify inability'],
          ['IRO-006-EAST-2', 'TLR procedures — structured curtailment for Eastern Interconnection overloads'],
          ['IRO-008-2', 'Operational Planning Analysis — next-day RC reliability assessment'],
          ['IRO-010-3', 'Reliability Coordinator data specification and collection'],
          ['IRO-017-1', 'Outages affecting wide-area reliability — RC notification and coordination'],
        ].map(([std, desc]) => (
          <div key={std} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-mono text-xs font-bold text-mblue-600 bg-mblue-50 px-2 py-1 rounded-lg flex-shrink-0">{std}</span>
            <span className="text-sm text-slate-700">{desc}</span>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-slate-100 pt-6">
        <h2 className="text-xl font-bold text-navy-700 mb-2">Chapter Quiz</h2>
        <p className="text-sm text-slate-500 mb-4">RC authority, IROL/Tv, TLR levels, wide-area tools.</p>
        <Quiz chapterId="iro" questions={QUIZZES.iro} level={1} />
      </div>
    </ChapterLayout>
  )
}
