import React from 'react';
import { Otsumami } from '../../types/otsumami';

interface RecommendationCardProps {
  item: Otsumami;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ item }) => (
  <div className="flex flex-col items-center bg-pink-50/60 rounded-lg p-4 shadow hover:bg-pink-100 transition">
    <img
      src={item.image_url}
      alt={item.name_en}
      className="w-24 h-24 object-cover rounded mb-2 border border-pink-200"
    />
    <div className="font-bold text-blue-700 text-lg mb-1">
      {item.name_en} <span className="text-xs text-gray-500">({item.name_kanji})</span>
    </div>
    <div className="text-sm text-gray-700 mb-1">{item.description_en}</div>
    <div className="text-xs text-gray-500 mb-1">Category: {item.category} / {item.subcategory}</div>
    <div className="text-xs text-gray-500 mb-1">Price: ¥{item.price_range[0]}–{item.price_range[1]}</div>
    <div className="text-xs text-gray-500 mb-1">Calories: {item.calories} kcal</div>
    <div className="text-xs text-gray-500">Pairs with: {item.alcohol_pairing.join(", ")}</div>
  </div>
);

export default RecommendationCard; 