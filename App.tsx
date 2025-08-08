
import React, { useState, useEffect, useCallback } from 'react';
import { type Element, type Evidence, EvidenceId, type GamePhase, type Difficulty } from './types';
import { ELEMENTS, AVAILABLE_TESTS, EVIDENCE_MAP, DIFFICULTY_SETTINGS } from './constants';
import { ResultModal } from './components/ResultModal';
import { PeriodicTable } from './components/PeriodicTable';
import { LogPanel } from './components/LogPanel';
import { EvidencePanel } from './components/EvidencePanel';
import { ToolsPanel } from './components/ToolsPanel';

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const TitleHeader: React.FC = () => (
    <header className="text-center p-4 border-b-2 border-emerald-800 bg-black bg-opacity-25">
      <h1 className="text-4xl font-bold text-emerald-400 glow-text tracking-widest">ХИМОФОБИЯ</h1>
      <p className="text-slate-400">Определи элемент. Выживи в науке.</p>
    </header>
);

const DifficultyScreen: React.FC<{ onSelect: (difficulty: Difficulty) => void }> = ({ onSelect }) => (
  <div className="text-center flex flex-col items-center justify-center min-h-[70vh]">
    <h2 className="text-3xl font-bold text-cyan-300 mb-4">ВЫБЕРИТЕ УРОВЕНЬ СЛОЖНОСТИ</h2>
    <div className="max-w-4xl bg-slate-900 border border-yellow-500/50 text-yellow-300 p-3 rounded-lg mb-6 text-sm">
      <p><strong>Примечание:</strong> Для наилучшего игрового опыта рекомендуется использовать широкоформатный экран (например, монитор компьютера или смартфон в горизонтальной ориентации). В вертикальном режиме на узких экранах отображение таблицы Менделеева может быть затруднено.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl">
      {(Object.keys(DIFFICULTY_SETTINGS) as Difficulty[]).map(key => {
        const setting = DIFFICULTY_SETTINGS[key];
        return (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className="bg-slate-800 hover:bg-slate-700 border-2 border-slate-600 hover:border-cyan-400 text-white p-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-left h-full"
          >
            <h3 className="text-2xl font-bold text-cyan-400">{setting.name}</h3>
            <p className="text-slate-300 mt-2">{setting.description}</p>
          </button>
        );
      })}
    </div>
  </div>
);

const App: React.FC = () => {
  const [gamePhase, setGamePhase] = useState<GamePhase>('difficulty_select');
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [targetElement, setTargetElement] = useState<Element | null>(null);
  const [collectedEvidence, setCollectedEvidence] = useState<Set<EvidenceId>>(new Set());
  const [testsRemaining, setTestsRemaining] = useState(0);
  const [isTesting, setIsTesting] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [finalGuess, setFinalGuess] = useState<string | null>(null);
  const [usedTools, setUsedTools] = useState<Set<string>>(new Set());
  const [activeElements, setActiveElements] = useState<Set<string>>(new Set());

  const handleSelectDifficulty = useCallback((selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    setGamePhase('start');
  }, []);

  const startNewGame = useCallback(() => {
    if (!difficulty) return;

    const settings = DIFFICULTY_SETTINGS[difficulty];
    const elementPool = settings.elementPool;
    const randomElement = shuffleArray(elementPool)[0];
    
    setActiveElements(new Set(elementPool.map(el => el.symbol)));
    setTargetElement(randomElement);
    setCollectedEvidence(new Set());
    setTestsRemaining(settings.uses);
    setFinalGuess(null);
    setLogs(["Начато новое расследование. Используйте инструменты для сбора улик."]);
    setGamePhase('investigating');
    setUsedTools(new Set());
  }, [difficulty]);
  
  const handleUseTool = useCallback((tool: Evidence) => {
    if (!targetElement || isTesting || testsRemaining <= 0) return;

    setIsTesting(true);
    if(testsRemaining < 999) {
        setTestsRemaining(prev => prev - 1);
    }
    setLogs(prev => [...prev, `Запуск: ${tool.name}...`]);
    setUsedTools(prev => new Set(prev).add(tool.name));

    setTimeout(() => {
        const properties = targetElement.properties;
        const evidencesFound = properties.filter(p => EVIDENCE_MAP.get(p)?.name === tool.name);

        if (evidencesFound.length > 0) {
            setCollectedEvidence(prev => {
                const newEvidence = new Set(prev);
                evidencesFound.forEach(id => newEvidence.add(id));
                return newEvidence;
            });
            const foundDescriptions = evidencesFound.map(id => EVIDENCE_MAP.get(id)?.description).filter(Boolean).join('; ');
            setLogs(prev => [...prev, `АНАЛИЗ ЗАВЕРШЕН. Обнаружено: ${foundDescriptions}`]);
        } else {
             setLogs(prev => [...prev, `АНАЛИЗ ЗАВЕРШЕН. Для этого теста ничего значимого не найдено.`]);
        }
        setIsTesting(false);

    }, 1500 + Math.random() * 1000);

  }, [targetElement, isTesting, testsRemaining]);

  const handleSelectElement = useCallback((element: Element) => {
    if (gamePhase !== 'investigating') return;
    setFinalGuess(element.name);
    setGamePhase('result');
  }, [gamePhase]);
  
  const resetGame = useCallback(() => {
    setDifficulty(null);
    setGamePhase('difficulty_select');
  }, []);

  return (
    <div className="min-h-screen bg-[#0c1117] text-slate-200 font-mono scanlines">
      <TitleHeader />
      <main className="p-2 sm:p-4 max-w-[1400px] mx-auto">
        {gamePhase === 'difficulty_select' && (
          <DifficultyScreen onSelect={handleSelectDifficulty} />
        )}
        
        {gamePhase === 'start' && (
          <div className="text-center flex flex-col items-center justify-center h-[70vh]">
            <p className="text-xl max-w-2xl mb-8 text-slate-300">
              Вам поручено идентифицировать неизвестный химический образец. Используйте доступные инструменты, чтобы собрать улики о его свойствах. Количество использований ограничено. Когда будете готовы, сделайте свой вывод, выбрав элемент в таблице.
            </p>
            <button
              onClick={startNewGame}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-8 rounded-lg text-2xl transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(52,211,153,0.5)]"
            >
              НАЧАТЬ РАССЛЕДОВАНИЕ
            </button>
          </div>
        )}

        {(gamePhase === 'investigating') && targetElement && (
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-1/3 flex flex-col gap-4">
              <ToolsPanel 
                tools={AVAILABLE_TESTS} 
                onUse={handleUseTool} 
                disabled={isTesting || testsRemaining <= 0 && testsRemaining < 999} 
                remaining={testsRemaining}
                usedTools={usedTools}
              />
              <EvidencePanel collected={collectedEvidence} />
              <LogPanel logs={logs} isTesting={isTesting} />
            </div>
            <div className="w-full lg:w-2/3">
              <PeriodicTable onSelect={handleSelectElement} activeElements={activeElements} />
            </div>
          </div>
        )}

        {gamePhase === 'result' && targetElement && (
          <ResultModal
            isCorrect={finalGuess === targetElement.name}
            guess={finalGuess}
            correctElement={targetElement}
            onClose={resetGame}
          />
        )}
      </main>
      <footer className="text-center text-xs text-slate-600 py-4">
        Chemophobia v4.7 - A Gemini-Powered Game by Alex Mercer
      </footer>
    </div>
  );
};

export default App;
