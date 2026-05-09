const yt = (q, title) => ({ type: 'youtube', title, searchUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}` })
const doc = (title, url) => ({ type: 'doc', title, url })

export const DEEP_DIVE = {
  intro: {
    level1: [
      yt('NERC reliability coordinator certification exam overview', 'NERC RC Certification — What to Expect'),
      yt('NERC system operator certification explained', 'NERC System Operator Certifications Explained'),
      doc('NERC Certification Program', 'https://www.nerc.com/pa/comp/sys/Pages/Personnel-Certification.aspx'),
      doc('NERC Operator Certification Study Guide', 'https://www.nerc.com/pa/comp/sys/Pages/Operator-Certification-Study-Materials.aspx'),
    ],
    level2: [
      yt('NERC RC exam preparation tips study guide', 'NERC RC Exam Prep — Tips from Certified Operators'),
      yt('NERC reliability standards overview power system', 'NERC Reliability Standards — Complete Overview'),
      doc('NERC Glossary of Terms', 'https://www.nerc.com/pa/Stand/Glossary%20of%20Terms/Glossary_of_Terms.pdf'),
    ],
  },
  balancing: {
    level1: [
      yt('ACE area control error explained power systems', 'Area Control Error (ACE) Explained'),
      yt('AGC automatic generation control power system balancing', 'AGC — How Automatic Generation Control Works'),
      yt('NERC BAL-001 BAL-002 balancing authority standard', 'NERC BAL Standards — Real Power Balancing'),
      doc('NERC BAL-001-2 Standard', 'https://www.nerc.com/pa/Stand/Pages/Project2006-06RevisedBalancingStandards.aspx'),
    ],
    level2: [
      yt('frequency bias setting power systems BA obligation', 'Frequency Bias Setting — What It Means for Operators'),
      yt('NERC contingency reserve spinning non-spinning requirements', 'NERC Contingency Reserve Requirements'),
      yt('inadvertent interchange NERC BAL-006 explained', 'Inadvertent Interchange — BAL-006 Explained'),
      doc('NERC BAL-002-3 Disturbance Control Standard', 'https://www.nerc.com/pa/Stand/Reliability%20Standards/BAL-002-3.pdf'),
    ],
  },
  transmission: {
    level1: [
      yt('NERC TOP-001 transmission operations standard explained', 'NERC TOP Standards — Transmission Operations'),
      yt('SOL IROL operating limits power system explained', 'SOL and IROL — System Operating Limits Explained'),
      yt('NERC VAR-001 voltage reactive power control standard', 'NERC VAR-001 — Voltage and Reactive Control'),
      doc('NERC TOP-001-5 Standard', 'https://www.nerc.com/pa/Stand/Reliability%20Standards/TOP-001-5.pdf'),
    ],
    level2: [
      yt('voltage stability collapse power systems operator', 'Voltage Stability and Collapse — Operator Perspective'),
      yt('TLR transmission loading relief procedure NERC', 'TLR Procedures — Transmission Loading Relief'),
      doc('NERC VAR-001-6 Standard', 'https://www.nerc.com/pa/Stand/Reliability%20Standards/VAR-001-6.pdf'),
    ],
  },
  'emergency-prep': {
    level1: [
      yt('NERC EOP-011 emergency operations preparedness standard', 'EOP-011 — Emergency Preparedness Standard'),
      yt('NERC IRO-008 operational planning analysis real-time', 'IRO-008 — RC Operational Planning Analysis'),
      doc('NERC EOP-011-2 Standard', 'https://www.nerc.com/pa/Stand/Reliability%20Standards/EOP-011-2.pdf'),
    ],
    level2: [
      yt('power system emergency operations control room procedure', 'Emergency Operations — Control Room Procedures'),
      doc('NERC IRO-008-2 Standard', 'https://www.nerc.com/pa/Stand/Reliability%20Standards/IRO-008-2.pdf'),
    ],
  },
  'emergency-response': {
    level1: [
      yt('power system restoration blackstart procedure', 'System Restoration — Blackstart Procedures Explained'),
      yt('NERC EOP-005 blackstart resources system restoration', 'EOP-005 — System Restoration from Blackstart'),
      yt('cold load pickup power system restoration frequency', 'Cold Load Pickup — Risks During System Restoration'),
      doc('NERC EOP-005-3 Standard', 'https://www.nerc.com/pa/Stand/Reliability%20Standards/EOP-005-3.pdf'),
    ],
    level2: [
      yt('NERC EOP-006 system restoration coordination RC', 'EOP-006 — System Restoration Coordination'),
      yt('power system blackout restoration steps islands', 'Power System Restoration — Step by Step'),
      doc('NERC EOP-006-2 Standard', 'https://www.nerc.com/pa/Stand/Reliability%20Standards/EOP-006-2.pdf'),
    ],
  },
  iro: {
    level1: [
      yt('NERC IRO-001 reliability coordinator authority standard', 'IRO-001 — RC Authority and Responsibilities'),
      yt('NERC IROL interconnection reliability operating limit', 'IROLs — Interconnection Reliability Operating Limits'),
      doc('NERC IRO-001-4 Standard', 'https://www.nerc.com/pa/Stand/Reliability%20Standards/IRO-001-4.pdf'),
    ],
    level2: [
      yt('TLR level procedures Eastern Interconnection NERC', 'TLR Levels — Eastern Interconnection Procedures'),
      yt('wide area monitoring situational awareness NERC RC', 'Wide-Area Monitoring — RC Situational Awareness'),
      doc('NERC IRO-006-EAST-2 TLR Standard', 'https://www.nerc.com/pa/Stand/Reliability%20Standards/IRO-006-EAST-2.pdf'),
    ],
  },
  interchange: {
    level1: [
      yt('NERC interchange scheduling e-tag explained', 'Interchange Scheduling and E-Tagging Explained'),
      yt('NERC INT-006 INT-009 interchange standards', 'NERC INT Standards — Interchange Evaluation and Implementation'),
      doc('NERC INT-006-5 Standard', 'https://www.nerc.com/pa/Stand/Reliability%20Standards/INT-006-5.pdf'),
    ],
    level2: [
      yt('reliability adjustment interchange curtailment NERC RC', 'Reliability Adjustments — When the RC Curtails Interchange'),
      doc('NERC INT-009-3 Standard', 'https://www.nerc.com/pa/Stand/Reliability%20Standards/INT-009-3.pdf'),
    ],
  },
  'power-systems': {
    level1: [
      yt('governor droop response frequency power systems explained', 'Governor Droop and Primary Frequency Response'),
      yt('power system frequency control primary secondary tertiary', 'Primary, Secondary, Tertiary Frequency Control'),
      yt('real power reactive power MW MVAR explained simple', 'Real Power vs Reactive Power — Simple Explanation'),
    ],
    level2: [
      yt('power system stability transient voltage angle', 'Power System Stability — Transient and Voltage Stability'),
      yt('power flow equations power systems operator concepts', 'Power Flow — What Every Operator Should Know'),
      doc('NERC Learning Management System — Free Courses', 'https://www.nerc.com/pa/comp/sys/Pages/Operator-Certification-Study-Materials.aspx'),
    ],
  },
  var: {
    level1: [
      yt('reactive power voltage control power systems capacitor', 'Reactive Power and Voltage Control Explained'),
      yt('voltage collapse reactive power shortage power system', 'Voltage Collapse — How It Happens and How to Stop It'),
      yt('capacitor bank shunt reactor SVC STATCOM reactive compensation', 'Reactive Compensation Devices — Caps, Reactors, SVCs'),
    ],
    level2: [
      yt('generator reactive capability curve Q capability overexcited underexcited', 'Generator Reactive Capability — The Q Capability Curve'),
      yt('power factor lagging leading reactive power operator', 'Power Factor and Reactive Power for Operators'),
      doc('NERC VAR-001-6 Standard', 'https://www.nerc.com/pa/Stand/Reliability%20Standards/VAR-001-6.pdf'),
    ],
  },
  lab: {
    level1: [
      yt('NERC RC exam tips how to pass certification', 'NERC RC Exam Tips — How to Pass on First Attempt'),
      yt('power system operator study guide Quizlet NERC', 'NERC Operator Exam Study Strategy'),
      doc('NERC LMS — Free Training Courses', 'https://www.nerc.com/pa/comp/sys/Pages/Operator-Certification-Study-Materials.aspx'),
      doc('NATF Operator Training Resources', 'https://www.natf.net/resources/operator-training'),
    ],
    level2: [
      yt('NERC events analysis lessons learned operator training', 'NERC Events Analysis — Lessons for Operators'),
      doc('NERC Reliability Standards (all)', 'https://www.nerc.com/pa/Stand/Pages/ReliabilityStandards.aspx'),
      doc('NERC Glossary of Terms', 'https://www.nerc.com/pa/Stand/Glossary%20of%20Terms/Glossary_of_Terms.pdf'),
    ],
  },
}
