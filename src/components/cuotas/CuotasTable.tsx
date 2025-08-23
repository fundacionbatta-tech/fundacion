import { useCuotasTable } from '@/hooks/useCuotasTable';

export function CuotasTable() {
  const { cuotas, loading, error, updateApto } = useCuotasTable();

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Cédula</th>
            <th className="p-2 border">Teléfono</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Cuotas Total</th>
            <th className="p-2 border">Cuota Valor</th>
            <th className="p-2 border">Fecha Registro</th>
            <th className="p-2 border">¿Apto?</th>
          </tr>
        </thead>
        <tbody>
          {cuotas.map((c) => (
            <tr key={c.id}>
              <td className="p-2 border">{c.nombre}</td>
              <td className="p-2 border">{c.cedula}</td>
              <td className="p-2 border">{c.telefono}</td>
              <td className="p-2 border">{c.email}</td>
              <td className="p-2 border">{c.cuotas_total}</td>
              <td className="p-2 border">{c.cuota_valor}</td>
              <td className="p-2 border">{new Date(c.fecha_registro).toLocaleString()}</td>
              <td className="p-2 border text-center">
                <input
                  type="checkbox"
                  checked={c.es_apto}
                  onChange={() => updateApto(c.id, !c.es_apto)}
                  className="w-5 h-5"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
