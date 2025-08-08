import React from 'react';
import { ELEMENTS, CATEGORY_COLORS } from '../constants';
import { type Element } from '../types';

interface PeriodicTableProps {
  onSelect: (element: Element) => void;
  activeElements: Set<string>;
}

const CATEGORY_TRANSLATIONS: Record<string, string> = {
  'alkali-metal': 'Щелочные металлы',
  'alkaline-earth-metal': 'Щёлочноземельные металлы',
  'transition-metal': 'Переходные металлы',
  'post-transition-metal': 'Постпереходные металлы',
  'lanthanide': 'Лантаноиды',
  'actinide': 'Актиноиды',
  'metalloid': 'Металлоиды',
  'other-nonmetal': 'Прочие неметаллы',
  'halogen': 'Галогены',
  'noble-gas': 'Благородные газы',
};

// Reusable function to render an element button
const ElementButton: React.FC<{ element: Element; onSelect: (element: Element) => void; isActive: boolean; style?: React.CSSProperties }> = ({ element, onSelect, isActive, style }) => (
  <button
    key={element.symbol}
    onClick={() => onSelect(element)}
    disabled={!isActive}
    className={`
      p-1 text-xs text-white rounded-md transition-all duration-200 
      ${isActive ? (CATEGORY_COLORS[element.category] || CATEGORY_COLORS.default) + ' transform hover:scale-110 hover:z-10 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:z-10' : 'bg-slate-900 border-slate-800 opacity-30 cursor-not-allowed'}
    `}
    style={style}
    aria-label={`Выбрать ${element.name}`}
  >
    <div className="flex justify-start text-[8px] sm:text-[10px] opacity-70">
      <span>{element.atomicNumber}</span>
    </div>
    <div className="font-bold text-center text-sm sm:text-base">{element.symbol}</div>
    <div className="text-center truncate text-[7px] sm:text-[9px] whitespace-nowrap overflow-hidden">{element.name}</div>
    <div className="text-center text-[7px] sm:text-[9px] opacity-70 hidden sm:block">{element.atomicMass.toFixed(2)}</div>
  </button>
);

export const PeriodicTable: React.FC<PeriodicTableProps> = ({ onSelect, activeElements }) => {
  const lanthanides = ELEMENTS.filter(el => el.category === 'lanthanide');
  const actinides = ELEMENTS.filter(el => el.category === 'actinide');
  const mainBlockElements = ELEMENTS.filter(el => el.category !== 'lanthanide' && el.category !== 'actinide');

  return (
    <div className="bg-black bg-opacity-30 p-2 md:p-4 rounded-lg border-2 border-slate-700 h-full flex flex-col">
      {/* Main Table */}
      <div 
        className="grid gap-1 mx-auto"
        style={{
          width: '100%',
          gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
          gridAutoRows: 'auto',
          gridRowGap: '4px'
        }}
      >
        {mainBlockElements.map(el => (
          <ElementButton key={el.symbol} element={el} onSelect={onSelect} isActive={activeElements.has(el.symbol)} style={{ gridColumn: el.group, gridRow: el.period }} />
        ))}
        
        {/* Placeholder for Lanthanides */}
        <div 
          className="flex items-center justify-center p-1 text-xs text-white rounded-md bg-slate-800 border-2 border-dashed border-teal-500"
          style={{ gridColumn: 3, gridRow: 6 }}
        >
          <span className="hidden sm:inline">57-71</span>
          <span className="sm:hidden">*</span>
        </div>

        {/* Placeholder for Actinides */}
        <div 
          className="flex items-center justify-center p-1 text-xs text-white rounded-md bg-slate-800 border-2 border-dashed border-purple-500"
          style={{ gridColumn: 3, gridRow: 7 }}
        >
           <span className="hidden sm:inline">89-103</span>
           <span className="sm:hidden">**</span>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-4 sm:h-6"></div>

      {/* F-Block Elements */}
      <div className="mx-auto w-full px-[5.5%] sm:px-[11%] lg:px-[16.66%]">
        {/* Lanthanide Row */}
        <div 
          className="grid gap-1 mb-1"
          style={{
            gridTemplateColumns: `repeat(15, minmax(0, 1fr))`
          }}
        >
          {lanthanides.map(el => (
            <ElementButton key={el.symbol} element={el} onSelect={onSelect} isActive={activeElements.has(el.symbol)} />
          ))}
        </div>

        {/* Actinide Row */}
        <div 
          className="grid gap-1"
          style={{
            gridTemplateColumns: `repeat(15, minmax(0, 1fr))`
          }}
        >
          {actinides.map(el => (
            <ElementButton key={el.symbol} element={el} onSelect={onSelect} isActive={activeElements.has(el.symbol)} />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-auto pt-4 text-xs">
          <h3 className="text-center text-sm text-slate-400 mb-2">Категории</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {Object.entries(CATEGORY_TRANSLATIONS).map(([key, name]) => (
                  <div key={key} className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-sm ${CATEGORY_COLORS[key]}`}></div>
                      <span className="text-slate-300">{name}</span>
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
};