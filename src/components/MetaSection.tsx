import React from 'react';
import { TrendingUp, Users, Target } from 'lucide-react';

interface MetaSectionProps {
  formData: {
    quantitativeGoal: number;
    currentSessions: number;
    currentResult: number;
    projectedMonthlySessions: number;
  };
}

const SERP_CTR = [
  { position: 1, ctr: 32.26 },
  { position: 2, ctr: 14.67 },
  { position: 3, ctr: 8.55 },
  { position: 4, ctr: 5.66 },
  { position: 5, ctr: 3.93 },
  { position: 6, ctr: 2.82 },
  { position: 7, ctr: 2.11 },
  { position: 8, ctr: 1.63 },
  { position: 9, ctr: 1.30 },
  { position: 10, ctr: 1.07 }
];

export function MetaSection({ formData }: MetaSectionProps) {
  const calculateRequiredSearchVolume = (monthlySessionsProjection: number) => {
    return Math.round((monthlySessionsProjection * 100) / 32);
  };

  const calculateMonthlySessionsByPosition = (position: number) => {
    const ctr = SERP_CTR[position - 1].ctr / 100;
    const baseProjection = (formData.quantitativeGoal * (formData.currentSessions / 12)) / formData.currentResult;
    return Math.round(baseProjection / ctr);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
        <Target className="mr-2 h-6 w-6 text-indigo-600" />
        Meta Analysis
      </h2>

      <div className="space-y-6">
        {/* Required Search Volume Card */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-indigo-900 mb-2 flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-indigo-600" />
            Required Search Volume
          </h3>
          <p className="text-3xl font-bold text-indigo-600">
            {calculateRequiredSearchVolume(formData.projectedMonthlySessions).toLocaleString()}
          </p>
        </div>

        {/* SERP Positions Analysis */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-purple-900 mb-4 flex items-center">
            <Users className="mr-2 h-5 w-5 text-purple-600" />
            Monthly Sessions by SERP Position
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERP_CTR.map(({ position, ctr }) => (
              <div key={position} className="bg-white bg-opacity-50 rounded p-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    Position {position}
                    <span className="text-xs text-gray-500 ml-1">({ctr}% CTR)</span>
                  </span>
                  <span className="text-sm font-bold text-purple-600">
                    {calculateMonthlySessionsByPosition(position).toLocaleString()}
                  </span>
                </div>
                <div className="mt-2 h-1 bg-purple-100 rounded-full">
                  <div
                    className="h-1 bg-purple-500 rounded-full"
                    style={{ width: `${(ctr / SERP_CTR[0].ctr) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}