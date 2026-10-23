import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Award, RotateCcw } from 'lucide-react';
import { REVIEW_QUIZ_QUESTIONS } from '../data/circulationData';
import { soundManager } from '../utils/audio';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  const currentQ = REVIEW_QUIZ_QUESTIONS[currentIdx];
  const total = REVIEW_QUIZ_QUESTIONS.length;
  const isAnswered = selectedAnswers[currentIdx] !== undefined;
  const chosenOpt = selectedAnswers[currentIdx];
  const isCorrect = chosenOpt === currentQ.correctIndex;

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIdx]: index }));
    setShowExplanation(true);
    if (index === currentQ.correctIndex) {
      soundManager.playChime();
    }
  };

  const handleNext = () => {
    if (currentIdx < total - 1) {
      setCurrentIdx(prev => prev + 1);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setShowExplanation(false);
    setIsFinished(false);
  };

  // Calculate score
  const correctCount = Object.entries(selectedAnswers).filter(
    ([qIdx, ansIdx]) => ansIdx === REVIEW_QUIZ_QUESTIONS[Number(qIdx)].correctIndex
  ).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-xl w-full p-6 text-slate-800"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm border border-emerald-200">
              KHTN
            </span>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Trắc nghiệm củng cố kiến thức: Hệ tuần hoàn (Lớp 8)
              </h3>
              <p className="text-xs text-slate-500">
                Câu hỏi {currentIdx + 1} / {total}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!isFinished ? (
          <div className="mt-4 space-y-4">
            {/* Progress bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / total) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <p className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
              {currentIdx + 1}. {currentQ.question}
            </p>

            {/* Options */}
            <div className="space-y-2">
              {currentQ.options.map((option, idx) => {
                let btnStyle = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700';

                if (isAnswered) {
                  if (idx === currentQ.correctIndex) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-medium';
                  } else if (idx === chosenOpt) {
                    btnStyle = 'border-rose-400 bg-rose-50 text-rose-800';
                  } else {
                    btnStyle = 'border-slate-200 opacity-60 text-slate-500';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-2.5 ${btnStyle}`}
                  >
                    <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1">{option}</span>
                    {isAnswered && idx === currentQ.correctIndex && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                    {isAnswered && idx === chosenOpt && idx !== currentQ.correctIndex && (
                      <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box */}
            {isAnswered && (
              <div className={`p-3 rounded-xl border text-xs leading-relaxed animate-in fade-in duration-200 ${
                isCorrect 
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900' 
                  : 'bg-amber-50/80 border-amber-200 text-amber-900'
              }`}>
                <p className="font-semibold mb-1 flex items-center gap-1.5">
                  {isCorrect ? '✅ Xuất sắc!' : '💡 Giải thích chi tiết:'}
                </p>
                <p>{currentQ.explanation}</p>
              </div>
            )}

            {/* Footer Navigation */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <span className="text-xs text-slate-500">
                Điểm hiện tại: <strong>{correctCount}</strong> / {total}
              </span>
              {isAnswered && (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors"
                >
                  {currentIdx < total - 1 ? 'Câu tiếp theo →' : 'Xem kết quả'}
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Finished summary */
          <div className="mt-6 text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto border border-amber-200">
              <Award className="w-9 h-9 text-amber-500" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900">
                Chúc mừng bạn đã hoàn thành bài ôn tập!
              </h4>
              <p className="text-sm text-slate-600 mt-1">
                Kết quả: Bạn đã trả lời đúng <strong className="text-emerald-600 text-base">{correctCount}</strong> trên tổng số <strong>{total}</strong> câu hỏi.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 text-left max-w-sm mx-auto">
              {correctCount === total ? (
                <p className="text-emerald-700 font-semibold">
                  🌟 Điểm tuyệt đối! Bạn đã nắm rất vững kiến thức về 2 vòng tuần hoàn, các ngăn tim và cơ chế trao đổi khí tại mao mạch.
                </p>
              ) : (
                <p className="text-slate-700">
                  👍 Rất tốt! Bạn có thể xem lại mô phỏng ở Trang 3 để khắc sâu hơn đường đi của máu và chiều khuếch tán khí O₂ / CO₂ nhé.
                </p>
              )}
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleRestart}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Làm lại trắc nghiệm
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors"
              >
                Đóng bài tập
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
