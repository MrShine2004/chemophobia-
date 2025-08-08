
import React from 'react';
import { EvidenceId } from '../types';
import { EVIDENCE_MAP } from '../constants';

export const EvidencePanel: React.FC<{ collected: Set<EvidenceId> }> = ({ collected }) => (
  <div className="bg-black bg-opacity-50 p-4 rounded-lg border border-slate-700">
    <h2 className="text-xl font-bold text-cyan-300 mb-2 border-b border-cyan-700 pb-2">СОБРАННЫЕ УЛИКИ</h2>
    <div className="space-y-2 min-h-[100px] max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
      {collected.size === 0 ? (
        <p className="text-slate-400 italic">Улик пока не найдено.</p>
      ) : (
        [...collected].map(id => {
          const evidence = EVIDENCE_MAP.get(id);
          return (
            <div key={id} className="text-green-400">
              <strong className="text-green-300">{evidence?.name}:</strong> {evidence?.description}
            </div>
          );
        })
      )}
    </div>
  </div>
);
