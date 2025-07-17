import React from 'react';

interface AllergenSelectorProps {
  allergens: string[];
  selectedAllergens: string[];
  onAllergenChange: (allergen: string) => void;
}

export const AllergenSelector: React.FC<AllergenSelectorProps> = ({
  allergens,
  selectedAllergens,
  onAllergenChange
}) => (
  <div className="space-y-3">
    <label className="block text-sm font-medium text-gray-700">避けるアレルゲン</label>
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
      {allergens.map((allergen) => (
        <label
          key={allergen}
          className={`flex items-center space-x-2 p-2 border rounded-lg cursor-pointer transition-colors ${
            selectedAllergens.includes(allergen)
              ? 'border-red-500 bg-red-50'
              : 'border-gray-200 hover:bg-gray-50'
          }`}
        >
          <input
            type="checkbox"
            checked={selectedAllergens.includes(allergen)}
            onChange={() => onAllergenChange(allergen)}
            className="accent-pink-400 w-4 h-4"
          />
          <span className="text-sm text-gray-700">{allergen}</span>
        </label>
      ))}
    </div>
    {selectedAllergens.length > 0 && (
      <p className="text-xs text-gray-500">
        選択中: {selectedAllergens.join(", ")}
      </p>
    )}
  </div>
);

export default AllergenSelector; 