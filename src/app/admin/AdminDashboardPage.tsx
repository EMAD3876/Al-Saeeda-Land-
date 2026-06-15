export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-32">
          <h3 className="text-slate-500 font-semibold mb-2 text-sm">الحجوزات الجديدة</h3>
          <div className="text-3xl font-black text-primary">0</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-32">
          <h3 className="text-slate-500 font-semibold mb-2 text-sm">أصناف القائمة</h3>
          <div className="text-3xl font-black text-primary">0</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-32">
          <h3 className="text-slate-500 font-semibold mb-2 text-sm">صور المعرض</h3>
          <div className="text-3xl font-black text-primary">0</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-32">
          <h3 className="text-slate-500 font-semibold mb-2 text-sm">زيارات اليوم</h3>
          <div className="text-3xl font-black text-primary">0</div>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center py-20 text-slate-400">
         نظرة عامة على نشاط المطعم
      </div>
    </div>
  );
}
