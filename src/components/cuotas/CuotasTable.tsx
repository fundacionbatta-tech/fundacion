import { useCuotasTable } from '@/hooks/useCuotasTable';

export function CuotasTable() {
  const { boletos, loading, error } = useCuotasTable();

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="overflow-x-auto rounded-xl shadow-lg bg-white/80 backdrop-blur-md p-4 border border-gray-200">
      <table className="min-w-full text-sm rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 text-white">
            <th className="p-3 font-semibold text-base border-b border-blue-300">Número</th>
            <th className="p-3 font-semibold text-base border-b border-blue-300">Precio</th>
            <th className="p-3 font-semibold text-base border-b border-blue-300">Cédula</th>
            <th className="p-3 font-semibold text-base border-b border-blue-300">Correo</th>
            <th className="p-3 font-semibold text-base border-b border-blue-300">Teléfono</th>
            <th className="p-3 font-semibold text-base border-b border-blue-300">Pagado</th>
            <th className="p-3 font-semibold text-base border-b border-blue-300">Fecha Registro</th>
          </tr>
        </thead>
        <tbody>
          {boletos.map((b, idx) => (
            <tr
              key={b.id}
              className={`transition-colors duration-200 ${idx % 2 === 0 ? 'bg-white/70' : 'bg-blue-50/60'} hover:bg-blue-100/80`}
            >
              <td className="p-3 border-b border-gray-200">{b.numero}</td>
              <td className="p-3 border-b border-gray-200 text-green-700 font-semibold">${b.precio}</td>
              <td className="p-3 border-b border-gray-200">{b.comprador_cedula}</td>
              <td className="p-3 border-b border-gray-200">{b.comprador_correo}</td>
              <td className="p-3 border-b border-gray-200">{b.comprador_telefono}</td>
              <td
                className="p-3 border-b border-gray-200 text-center font-bold"
                style={{ color: b.pagado ? '#22c55e' : '#f59e42' }}
              >
                {b.pagado ? 'Sí' : 'No'}
              </td>
              <td className="p-3 border-b border-gray-200">{new Date(b.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
