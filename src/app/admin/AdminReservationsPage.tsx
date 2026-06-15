import { useState, useEffect } from "react";
import { Check, X } from "lucide-react";

type Reservation = {
  id: number;
  fullName: string;
  mobile: string;
  dateTime: string;
  guestsCount: number;
  status: string;
};

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  // Note: in a real app, this should fetch with auth token
  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = () => {
    setLoading(true);
    fetch("/api/reservations")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setReservations(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/reservations/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        // note: auth token handled by browser cookies if logged in, testing relies on it
        body: JSON.stringify({ status })
      });
      if (res.ok) fetchReservations();
    } catch (e) {
      console.error("Failed to update status", e);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
        <h2 className="text-xl font-bold text-slate-800">إدارة الحجوزات</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-right text-sm">
          <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">رقم الحجز</th>
              <th className="px-6 py-4">الاسم</th>
              <th className="px-6 py-4">الهاتف</th>
              <th className="px-6 py-4">التاريخ والوقت</th>
              <th className="px-6 py-4">الأشخاص</th>
              <th className="px-6 py-4">الحالة</th>
              <th className="px-6 py-4 text-center">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {loading && reservations.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-10 text-slate-400">جاري التحميل...</td></tr>
            ) : reservations.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-10 text-slate-400">لا توجد حجوزات</td></tr>
            ) : (
              reservations.map(res => (
                <tr key={res.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-slate-500">#{res.id}</td>
                  <td className="px-6 py-4 font-bold text-slate-800">{res.fullName}</td>
                  <td className="px-6 py-4" dir="ltr">{res.mobile}</td>
                  <td className="px-6 py-4 text-slate-600">{new Date(res.dateTime).toLocaleString('ar-YE')}</td>
                  <td className="px-6 py-4">{res.guestsCount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                      res.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                      res.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {res.status === 'PENDING' ? 'قيد الانتظار' : res.status === 'CONFIRMED' ? 'مؤكد' : 'ملغي'}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2 justify-center">
                    {res.status === 'PENDING' && (
                      <>
                        <button onClick={() => updateStatus(res.id, 'CONFIRMED')} className="text-green-600 hover:text-green-800 bg-green-50 p-2 rounded-lg transition-colors" title="تأكيد">
                          <Check size={16} />
                        </button>
                        <button onClick={() => updateStatus(res.id, 'CANCELLED')} className="text-red-600 hover:text-red-800 bg-red-50 p-2 rounded-lg transition-colors" title="إلغاء">
                          <X size={16} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
