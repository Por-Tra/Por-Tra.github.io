import XpMenuBar from '../XpMenuBar';

const BlankContent = ({ title = "Application" }) => {
  return (
    <div className="h-full bg-white flex flex-col">
      {/* XP Explorer Toolbar */}
      <XpMenuBar
        className="bg-gradient-to-b from-[#ece9d8] to-[#d4d0c8] border-b border-[#808080] px-2 py-1 flex gap-4 text-xs"
        itemClassName="text-gray-600 hover:underline cursor-pointer"
      />

      {/* Content Area */}
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-center text-gray-400">
          <div className="w-24 h-24 mx-auto mb-4 bg-[#ece9d8] rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-500">Cette application n'est pas encore disponible</p>
          <p className="text-xs text-gray-400 mt-1">Fonctionnalité en cours de développement</p>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#ece9d8] border-t border-[#808080] px-2 py-1 text-[10px] text-gray-600 flex justify-between">
        <span>Prêt</span>
        <span>0 éléments</span>
      </div>
    </div>
  );
};

export default BlankContent;
