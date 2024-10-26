import React, { useState } from 'react';
import { MetaSection } from './MetaSection';

interface ContextData {
  aiTool: string;
  language: string;
  businessContext: string;
  brandName: string;
  siteCategory: string;
  objective: string;
  quantitativeGoal: number;
  currentResult: number;
  conversionRate: number;
  averageOrderValue: number;
  currentSessions: number;
  newUsers: number;
  requiredSearchVolume: number;
  projectedMonthlySessions: number;
}

const AI_TOOLS = [
  { value: 'openai', label: 'OpenAI' },
  { value: 'groq', label: 'Groq' }
];

const LANGUAGES = [
  { value: 'pt-PT', label: 'Portuguese (Portugal)' },
  { value: 'pt-BR', label: 'Portuguese (Brazil)' },
  { value: 'en-US', label: 'English (United States)' },
  { value: 'en-GB', label: 'English (United Kingdom)' },
  { value: 'es-ES', label: 'Spanish (Spain)' },
  { value: 'es-MX', label: 'Spanish (Mexico)' },
  { value: 'fr-FR', label: 'French (France)' },
  { value: 'fr-CA', label: 'French (Canada)' },
  { value: 'de-DE', label: 'German (Germany)' },
  { value: 'de-AT', label: 'German (Austria)' },
  { value: 'it-IT', label: 'Italian (Italy)' },
  { value: 'nl-NL', label: 'Dutch (Netherlands)' },
  { value: 'pl-PL', label: 'Polish (Poland)' },
  { value: 'ru-RU', label: 'Russian (Russia)' },
  { value: 'ja-JP', label: 'Japanese (Japan)' },
  { value: 'zh-CN', label: 'Chinese (Simplified)' },
  { value: 'zh-TW', label: 'Chinese (Traditional)' },
  { value: 'ko-KR', label: 'Korean (South Korea)' },
  { value: 'ar-SA', label: 'Arabic (Saudi Arabia)' },
  { value: 'hi-IN', label: 'Hindi (India)' },
  { value: 'tr-TR', label: 'Turkish (Turkey)' },
  { value: 'th-TH', label: 'Thai (Thailand)' },
  { value: 'vi-VN', label: 'Vietnamese (Vietnam)' },
  { value: 'id-ID', label: 'Indonesian (Indonesia)' }
];

export function ContextForm() {
  const [formData, setFormData] = useState<ContextData>({
    aiTool: 'openai',
    language: 'pt-PT',
    businessContext: '',
    brandName: '',
    siteCategory: '',
    objective: 'Vendas',
    quantitativeGoal: 100000,
    currentResult: 70000,
    conversionRate: 2,
    averageOrderValue: 125,
    currentSessions: 40469,
    newUsers: 37000,
    requiredSearchVolume: 15055,
    projectedMonthlySessions: 4818
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('Rate') || name.includes('Goal') || name.includes('Result') || 
              name.includes('Value') || name.includes('Sessions') || name.includes('Users') || 
              name.includes('Volume')
        ? parseFloat(value) || 0
        : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">E-commerce Context</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AI Tool and Language */}
            <div>
              <label className="block text-sm font-medium text-gray-700">AI Tool</label>
              <select
                name="aiTool"
                value={formData.aiTool}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                {AI_TOOLS.map(tool => (
                  <option key={tool.value} value={tool.value}>
                    {tool.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Language</label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Business Context */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Business Context</label>
            <textarea
              name="businessContext"
              value={formData.businessContext}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Describe your business context..."
            />
          </div>

          {/* Brand and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Brand Name</label>
              <input
                type="text"
                name="brandName"
                value={formData.brandName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Site Category</label>
              <input
                type="text"
                name="siteCategory"
                value={formData.siteCategory}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Financial Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Quantitative Goal (€)</label>
              <input
                type="number"
                name="quantitativeGoal"
                value={formData.quantitativeGoal}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Result (€)</label>
              <input
                type="number"
                name="currentResult"
                value={formData.currentResult}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Conversion Rate (%)</label>
              <input
                type="number"
                step="0.01"
                name="conversionRate"
                value={formData.conversionRate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Average Order Value (€)</label>
              <input
                type="number"
                name="averageOrderValue"
                value={formData.averageOrderValue}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Traffic Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Sessions (12m)</label>
              <input
                type="number"
                name="currentSessions"
                value={formData.currentSessions}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">New Users (12m)</label>
              <input
                type="number"
                name="newUsers"
                value={formData.newUsers}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Search Volume Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Required Search Volume</label>
              <input
                type="number"
                name="requiredSearchVolume"
                value={formData.requiredSearchVolume}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Projected Monthly Sessions</label>
              <input
                type="number"
                name="projectedMonthlySessions"
                value={formData.projectedMonthlySessions}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Context
          </button>
        </form>
      </div>
      
      {/* Meta Section */}
      <MetaSection formData={formData} />
    </>
  );
}