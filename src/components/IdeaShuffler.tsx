import {useState} from "react";
import { Shuffle} from 'lucide-react';
import {EditableField} from "./EditableField.tsx";

interface Result {
  winner: string;
  order: string[];
}

export default function IdeaShuffler() {
  const [input, setInput] = useState<string>('');
  const [ideas, setIdeas] = useState<string[]>([]);
  const [result, setResult] = useState<Result | null>(null);

  const handleAdd = () => {
    if (input.trim()) {
      setIdeas((prev) => [...prev, input.trim()]);
      setInput('');
      setResult(null);
    }
  };

  const handleShuffle = () => {
    const cleanedIdeas = ideas.filter((idea) => idea.trim() !== '');
    if (cleanedIdeas.length === 0) return;

    const shuffledIdeas = [...cleanedIdeas].sort(() => Math.random() - 0.5);
    const winner = shuffledIdeas[0];
    setResult({ winner, order: shuffledIdeas });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const handleReset = () => {
    setIdeas([]);
    setResult(null);
    setInput('');
  };

  const handleIdeaChange = (index: number, newValue: string) => {
    setIdeas((prev) => {
      const copy = [...prev];
      copy[index] = newValue;
      return copy;
    });
    setResult(null);
  };

  const handleRemoveIdea = (index: number) => {
    setIdeas((prev) => prev.filter((_, i) => i !== index));
    setResult(null);
  };

  return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Shuffler
          </h1>

          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex gap-2 mb-4">
              <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter a choice..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
              <button
                  onClick={handleAdd}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add
              </button>
            </div>

            <div className="flex gap-2">
              {ideas.length > 0 && (
                  <>
                    <button
                        onClick={handleShuffle}
                        className="flex-1 py-3 bg-green-600 text-white rounded hover:bg-green-700 flex items-center justify-center gap-2 font-semibold"
                    >
                      <Shuffle size={20} />
                      Shuffle
                    </button>
                    <button
                        onClick={handleReset}
                        className="px-6 py-3 bg-gray-400 text-white rounded hover:bg-gray-500"
                    >
                      Reset
                    </button>
                  </>
              )}
            </div>
          </div>

          {result && (
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4 text-green-700 text-center">
                  Result
                </h2>
                <div className="p-4 bg-green-50 rounded-lg border-2 border-green-500 mb-4">
                  <p className="text-lg font-semibold text-gray-700 mb-1">
                    Winner :
                  </p>
                  <p className="text-2xl font-bold text-green-700">
                    {result.winner}
                  </p>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-gray-700">
                  Order :
                </h3>
                <ol className="space-y-2">
                  {result.order.map((idea, index) => (
                      <li
                          key={index}
                          className={`p-3 rounded ${
                              index === 0
                                  ? 'bg-green-100 border-l-4 border-green-600'
                                  : 'bg-gray-50 border-l-4 border-gray-300'
                          }`}
                      >
                  <span className="font-semibold text-gray-700">
                    {index + 1}.
                  </span>{' '}
                        {idea}
                      </li>
                  ))}
                </ol>
              </div>
          )}

          {ideas.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Entries ({ideas.length})
                </h2>
                <ul className="space-y-3">
                  {ideas.map((idea, index) => (
                      <EditableField
                          key={index}
                          index={index}
                          value={idea}
                          onChange={(newValue) => handleIdeaChange(index, newValue)}
                          onDelete={() => handleRemoveIdea(index)}
                      />
                  ))}
                </ul>
              </div>
          )}
        </div>
      </div>
  );
}
