
interface Props {
  pageTitle: string;
  subtitle?: string;
}

export function DashboardPageHeader({ pageTitle, subtitle }: Props) {
  return (
    <div className="dashboard-header-bg px-6 py-6 rounded-2xl shadow flex flex-col gap-2 mb-6">
      <div className="flex items-center gap-4">
        {/* Avatar ejemplo, puedes cambiar la imagen */}
        <img src="/logo.png" alt="Logo" className="w-12 h-12 rounded-full shadow" />
        <div>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight mb-1" style={{ color: '#111827' }}>{pageTitle}</h1>
          {subtitle && <p className="text-base md:text-lg font-medium text-black">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
