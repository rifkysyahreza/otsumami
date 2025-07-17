import React from 'react';

interface BudgetSelectorProps {
  budget: number;
  onBudgetChange: (budget: number) => void;
  budgetOptions: { value: number; label: string }[];
}

export const BudgetSelector: React.FC<BudgetSelectorProps> = ({
  budget,
  onBudgetChange,
  budgetOptions
}) => (
  <div className="space-y-3">
    <label className="block text-sm font-medium text-gray-700">Budget (¥)</label>
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {budgetOptions.map((option) => (
        <label
          key={option.value}
          className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer transition-colors ${
            budget === option.value
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:bg-gray-50'
          }`}
        >
          <input
            type="radio"
            name="budget"
            value={option.value}
            checked={budget === option.value}
            onChange={() => onBudgetChange(option.value)}
            className="accent-blue-400 w-4 h-4"
          />
          <span className="text-sm text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  </div>
);

export default BudgetSelector; 