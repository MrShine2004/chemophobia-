
import React from 'react';
import { Evidence } from '../types';

export const ToolsPanel: React.FC<{ tools: Evidence[], onUse: (tool: Evidence) => void, disabled: boolean, remaining: number, usedTools: Set<string> }> = ({ tools, onUse, disabled, remaining, usedTools }) => (
  <div className="bg-black bg-opacity-50 p-4 rounded-lg border border-slate-700">
     <div className="flex justify-between items-center mb-2 border-b border-cyan-700 pb-2">
      <h2 className="text-xl font-bold text-cyan-300">ИНСТРУМЕНТЫ</h2>
      <span className={`text-lg font-bold ${remaining > 0 ? 'text-yellow-400' : 'text-red-500'}`}>
        ИСПОЛЬЗОВАНИЙ: {remaining < 999 ? remaining : '∞'}
      </span>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-3">
      {tools.map(tool => {
        const isUsed = usedTools.has(tool.name);
        return (
          <button 
            key={tool.name} 
            onClick={() => onUse(tool)} 
            disabled={disabled || isUsed} 
            className={`
              text-white font-bold py-2 px-3 rounded-lg transition-all duration-200 text-sm text-left flex flex-col h-full justify-between min-h-[60px]
              ${isUsed 
                ? 'bg-slate-800 border-2 border-emerald-600 text-slate-400' 
                : 'bg-slate-700 hover:bg-slate-600'
              }
              disabled:opacity-70 disabled:cursor-not-allowed
            `}
          >
            <span>{tool.name}</span>
            <span className="text-xs text-slate-400 font-normal">{tool.description}</span>
          </button>
        )
      })}
    </div>
  </div>
);
