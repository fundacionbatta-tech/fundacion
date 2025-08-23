import { useCuotasTable } from '@/hooks/useCuotasTable';

export function CuotasTable() {
  const { cuotas, loading, error, updateApto } = useCuotasTable();

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="overflow-x-auto rounded-xl shadow-lg bg-white/80 backdrop-blur-md p-4 border border-gray-200">
      <table className="min-w-full text-sm rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 text-white">
            <th className="p-3 font-semibold text-base border-b border-blue-300">Nombre</th>
            <th className="p-3 font-semibold text-base border-b border-blue-300">Cédula</th>
            <th className="p-3 font-semibold text-base border-b border-blue-300">Teléfono</th>
            <th className="p-3 font-semibold text-base border-b border-blue-300">Email</th>
            <th className="p-3 font-semibold text-base border-b border-blue-300">Cuotas Total</th>
            <th className="p-3 font-semibold text-base border-b border-blue-300">Cuota Valor</th>
            <th className="p-3 font-semibold text-base border-b border-blue-300">Fecha Registro</th>
            <th className="p-3 font-semibold text-base border-b border-blue-300">¿Apto?</th>
          </tr>
        </thead>
        <tbody>
          {cuotas.map((c, idx) => (
            <tr
              key={c.id}
              className={
                `transition-colors duration-200 ${idx % 2 === 0 ? 'bg-white/70' : 'bg-blue-50/60'} hover:bg-blue-100/80`
              }
            >
              <td className="p-3 border-b border-gray-200">{c.nombre}</td>
              <td className="p-3 border-b border-gray-200">{c.cedula}</td>
              <td className="p-3 border-b border-gray-200">{c.telefono}</td>
              <td className="p-3 border-b border-gray-200">{c.email}</td>
              <td className="p-3 border-b border-gray-200 text-center font-bold text-blue-700">{c.cuotas_total}</td>
              <td className="p-3 border-b border-gray-200 text-center text-green-700 font-semibold">${c.cuota_valor}</td>
              <td className="p-3 border-b border-gray-200">{new Date(c.fecha_registro).toLocaleString()}</td>
              <td className="p-3 border-b border-gray-200 text-center">
                <input
                  type="checkbox"
                  checked={c.es_apto}
                  onChange={() => updateApto(c.id, !c.es_apto)}
                  className="w-5 h-5 accent-blue-600 cursor-pointer shadow-sm rounded focus:ring-2 focus:ring-blue-400"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
