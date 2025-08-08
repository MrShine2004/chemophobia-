
import React, { useState, useEffect } from 'react';
import { type Element } from '../types';
import { fetchElementFacts } from '../services/geminiService';
import { Icon } from './Icon';

interface ResultModalProps {
  isCorrect: boolean;
  guess: string | null;
  correctElement: Element;
  onClose: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({ isCorrect, guess, correctElement, onClose }) => {
  const [facts, setFacts] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getFacts = async () => {
      setIsLoading(true);
      const fetchedFacts = await fetchElementFacts(correctElement.name);
      setFacts(fetchedFacts);
      setIsLoading(false);
    };
    getFacts();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [correctElement]);

  const resultColor = isCorrect ? 'text-green-400' : 'text-red-400';
  const resultBorder = isCorrect ? 'border-green-400' : 'border-red-400';
  const resultHeader = isCorrect ? 'УСПЕХ: ИДЕНТИФИКАЦИЯ ПОДТВЕРЖДЕНА' : 'ПРОВАЛ: НЕВЕРНАЯ ИДЕНТИФИКАЦИЯ';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4 scanlines">
      <div className={`relative bg-[#0d1621] border-2 ${resultBorder} rounded-lg shadow-2xl w-full max-w-2xl transform transition-all animate-fadeIn`}>
        <div className={`px-6 py-4 border-b-2 ${resultBorder}`}>
          <h2 className={`text-2xl font-bold ${resultColor} glow-text`}>{resultHeader}</h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-cyan-300 mb-2 text-lg">Ваша догадка:</h3>
              <div className={`text-lg ${resultColor}`}>{guess || 'Догадка не сделана'}</div>
            </div>
            <div>
              <h3 className="font-semibold text-cyan-300 mb-2 text-lg">Верный элемент:</h3>
              <div className="text-lg text-green-400">{correctElement.name} ({correctElement.symbol})</div>
            </div>
          </div>

          <div className="bg-black bg-opacity-30 p-4 rounded-md border border-slate-600">
            <h3 className="text-xl font-bold text-cyan-300 mb-3 flex items-center gap-2">
                <Icon name="atom" className="w-6 h-6"/>
                Полевые данные о {correctElement.name}
            </h3>
            {isLoading ? (
              <div className="flex items-center justify-center h-24">
                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400"></div>
                 <p className="ml-4 text-emerald-400">Получение данных из архива...</p>
              </div>
            ) : (
              <div className="text-slate-300 space-y-2 prose" dangerouslySetInnerHTML={{ __html: facts.replace(/\n/g, '<br />') }}>
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-4 bg-black bg-opacity-20 rounded-b-lg">
          <button
            onClick={onClose}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75"
          >
            Начать новое расследование
          </button>
        </div>
      </div>
    </div>
  );
};
