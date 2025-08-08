
export enum EvidenceId {
  // Агрегатное состояние
  STATE_SOLID = 'STATE_SOLID',
  STATE_GAS = 'STATE_GAS',
  STATE_LIQUID = 'STATE_LIQUID',

  // Цвет (для Визуального осмотра)
  COLOR_SILVERY = 'COLOR_SILVERY',
  COLOR_YELLOW = 'COLOR_YELLOW',
  COLOR_REDDISH = 'COLOR_REDDISH',
  COLOR_BLACK = 'COLOR_BLACK',
  COLOR_YELLOW_GREEN_GAS = 'COLOR_YELLOW_GREEN_GAS',
  COLOR_PALE_YELLOW_GAS = 'COLOR_PALE_YELLOW_GAS',
  COLOR_NONE = 'COLOR_NONE', // Для бесцветных газов/жидкостей

  // Пламенный тест
  FLAME_ORANGE = 'FLAME_ORANGE',
  FLAME_GREEN = 'FLAME_GREEN',
  FLAME_PALE_GREEN = 'FLAME_PALE_GREEN',
  FLAME_RED = 'FLAME_RED',
  FLAME_LILAC = 'FLAME_LILAC',
  FLAME_YELLOW_GREEN = 'FLAME_YELLOW_GREEN',
  FLAME_BLUE = 'FLAME_BLUE',
  FLAME_YELLOW = 'FLAME_YELLOW',
  FLAME_NONE = 'FLAME_NONE',

  // --- НОВЫЕ ФУНДАМЕНТАЛЬНЫЕ ТЕСТЫ ---
  // Классификация (заменяет старые сложные анализы)
  TYPE_METAL = 'TYPE_METAL',
  TYPE_NONMETAL = 'TYPE_NONMETAL',
  TYPE_METALLOID = 'TYPE_METALLOID',

  // Тест на амфотерность
  AMPHOTERIC = 'AMPHOTERIC',
  NOT_AMPHOTERIC = 'NOT_AMPHOTERIC',
  // ------------------------------------
  
  // --- НОВЫЙ СПЕКТРАЛЬНЫЙ АНАЛИЗ ---
  CATEGORY_ALKALI_METAL = 'CATEGORY_ALKALI_METAL',
  CATEGORY_ALKALINE_EARTH_METAL = 'CATEGORY_ALKALINE_EARTH_METAL',
  CATEGORY_TRANSITION_METAL = 'CATEGORY_TRANSITION_METAL',
  CATEGORY_POST_TRANSITION_METAL = 'CATEGORY_POST_TRANSITION_METAL',
  CATEGORY_LANTHANIDE = 'CATEGORY_LANTHANIDE',
  CATEGORY_ACTINIDE = 'CATEGORY_ACTINIDE',
  CATEGORY_METALLOID = 'CATEGORY_METALLOID',
  CATEGORY_OTHER_NONMETAL = 'CATEGORY_OTHER_NONMETAL',
  CATEGORY_HALOGEN = 'CATEGORY_HALOGEN',
  CATEGORY_NOBLE_GAS = 'CATEGORY_NOBLE_GAS',
  // ------------------------------------

  // Проводимость
  CONDUCTIVE = 'CONDUCTIVE',
  NOT_CONDUCTIVE = 'NOT_CONDUCTIVE',

  // Радиоактивность
  RADIOACTIVE = 'RADIOACTIVE',
  NOT_RADIOACTIVE = 'NOT_RADIOACTIVE',

  // Магнетизм
  MAGNETIC_FERRO = 'MAGNETIC_FERRO',
  MAGNETIC_PARAM = 'MAGNETIC_PARAM',
  MAGNETIC_DIA = 'MAGNETIC_DIA',

  // Реакция с водой
  REACTS_WATER_EXPLOSIVELY = 'REACTS_WATER_EXPLOSIVELY',
  REACTS_WATER_VIOLENTLY = 'REACTS_WATER_VIOLENTLY',
  REACTS_WATER_SLOWLY = 'REACTS_WATER_SLOWLY',
  NO_REACTION_WATER = 'NO_REACTION_WATER',

  // Реакция с AgNO₃
  PRECIPITATE_WHITE = 'PRECIPITATE_WHITE',
  PRECIPITATE_CREAM = 'PRECIPITATE_CREAM',
  PRECIPITATE_YELLOW = 'PRECIPITATE_YELLOW',
  NO_PRECIPITATE = 'NO_PRECIPITATE',

  // Тест на горючесть
  COMBUSTIBLE_GAS_FLAMMABLE = 'COMBUSTIBLE_GAS_FLAMMABLE',
  COMBUSTIBLE_GAS_SUPPORTS = 'COMBUSTIBLE_GAS_SUPPORTS',
  COMBUSTIBLE_SOLID = 'COMBUSTIBLE_SOLID',
  NOT_COMBUSTIBLE = 'NOT_COMBUSTIBLE',

  // Реакция с кислотой
  REACTS_HCL = 'REACTS_HCL',
  NO_REACTION_HCL = 'NO_REACTION_HCL',

  // Плотность
  DENSITY_HIGH = 'DENSITY_HIGH', // > 10
  DENSITY_MEDIUM = 'DENSITY_MEDIUM', // 5-10
  DENSITY_LOW = 'DENSITY_LOW', // < 5

  // Запах
  SMELL_PUNGENT = 'SMELL_PUNGENT',
  SMELL_NONE = 'SMELL_NONE',

  // Температура плавления
  MELTS_IN_HAND = 'MELTS_IN_HAND',
  MP_HIGH = 'MP_HIGH',
  MP_VERY_LOW = 'MP_VERY_LOW',
}

export interface Evidence {
  id: EvidenceId;
  name: string;
  description: string;
}

export interface Element {
  name: string;
  symbol: string;
  atomicNumber: number;
  atomicMass: number;
  category: string;
  period: number;
  group: number;
  properties: EvidenceId[];
}

export type GamePhase = 'difficulty_select' | 'start' | 'investigating' | 'result';

export type Difficulty = 'beginner' | 'apprentice' | 'technician' | 'analyst' | 'chemist' | 'professor' | 'expert' | 'legend';