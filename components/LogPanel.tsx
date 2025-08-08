
import React from 'react';

export const LogPanel: React.FC<{ logs: string[], isTesting: boolean }> = ({ logs, isTesting }) => (
    <div className="bg-black bg-opacity-50 p-4 rounded-lg border border-slate-700 h-64 flex flex-col">
      <h2 className="text-xl font-bold text-cyan-300 mb-2 border-b border-cyan-700 pb-2">СИСТЕМНЫЙ ЖУРНАЛ</h2>
      <div className="flex-grow overflow-y-auto pr-2 space-y-2 text-sm custom-scrollbar">
        {logs.map((log, index) => (
          <p key={index} className="text-slate-300 leading-tight">&gt; {log}</p>
        ))}
         <div ref={el => el?.scrollIntoView({ behavior: 'smooth' })} />
      </div>
       {isTesting && (
          <div className="mt-auto pt-2 border-t border-slate-700 flex items-center gap-2 text-yellow-400">
             <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-400"></div>
             <span>АНАЛИЗ...</span>
          </div>
        )}
    </div>
);
