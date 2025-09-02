'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Album,
  CreditCard,
  Home,
  User,
  FileText,
  DollarSign,
  List,
  History,
  AlertCircle,
  CheckCircle,
  Edit,
  Calendar,
  Tag,
  ToggleLeft,
  Info,
  Lock,
  Trash2,
  Gift,
  Award,
  Users,
  Upload,
  ClipboardList,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarSections = [
  {
    section: 'Rifas',
    items: [
      { title: 'Crear rifa', icon: <Album className="h-6 w-6" />, href: '/dashboard/rifas' },
      { title: 'Editar rifa', icon: <Edit className="h-6 w-6" />, href: '/dashboard/rifa-editar' },
      { title: 'Cambiar fechas', icon: <Calendar className="h-6 w-6" />, href: '/dashboard/rifa-cambiar-fechas' },
      {
        title: 'Ajustar precio/boletos',
        icon: <Tag className="h-6 w-6" />,
        href: '/dashboard/rifa-ajustar-precio-boletos',
      },
      {
        title: 'Activar/desactivar cuotas',
        icon: <ToggleLeft className="h-6 w-6" />,
        href: '/dashboard/rifa-activar-desactivar-cuotas',
      },
      { title: 'Detalle de rifa', icon: <Info className="h-6 w-6" />, href: '/dashboard/rifa-detalle' },
      { title: 'Cerrar rifa', icon: <Lock className="h-6 w-6" />, href: '/dashboard/rifa-cerrar' },
      { title: 'Eliminar rifa', icon: <Trash2 className="h-6 w-6" />, href: '/dashboard/rifa-eliminar' },
    ],
  },
  {
    section: 'Boletos',
    items: [
      { title: 'Boletos', icon: <Home className="h-6 w-6" />, href: '/dashboard' },
      { title: 'Boletos por Cédula', icon: <User className="h-6 w-6" />, href: '/dashboard/boletos-por-cedula' },
      { title: 'Listado Boletos Rifa', icon: <List className="h-6 w-6" />, href: '/dashboard/listado-boletos-rifa' },
    ],
  },
  {
    section: 'Pagos',
    items: [
      { title: 'Registrar Pago', icon: <CheckCircle className="h-6 w-6" />, href: '/dashboard/registrar-pago' },
      { title: 'Cancelar Pago', icon: <AlertCircle className="h-6 w-6" />, href: '/dashboard/cancelar-pago' },
      {
        title: 'Historial Pagos Boleto',
        icon: <History className="h-6 w-6" />,
        href: '/dashboard/historial-pagos-boleto',
      },
      { title: 'Deudores Rifa', icon: <FileText className="h-6 w-6" />, href: '/dashboard/deudores-rifa' },
      {
        title: 'Reporte Ingresos Rifa',
        icon: <DollarSign className="h-6 w-6" />,
        href: '/dashboard/reporte-ingresos-rifa',
      },
    ],
  },
  {
    section: 'Ganadores',
    items: [
      { title: 'Registrar sorteo', icon: <Gift className="h-6 w-6" />, href: '/dashboard/rifa-registrar-sorteo' },
      {
        title: 'Ejecutar/Cargar resultados',
        icon: <Upload className="h-6 w-6" />,
        href: '/dashboard/rifa-ejecutar-cargar-resultados',
      },
      {
        title: 'Seleccionar ganadores',
        icon: <Award className="h-6 w-6" />,
        href: '/dashboard/rifa-seleccionar-ganadores',
      },
      {
        title: 'Asignar ganador manual',
        icon: <Users className="h-6 w-6" />,
        href: '/dashboard/rifa-asignar-ganador-manual',
      },
      {
        title: 'Historial de ganadores',
        icon: <ClipboardList className="h-6 w-6" />,
        href: '/dashboard/rifa-historial-ganadores',
      },
      { title: 'Datos de ganador', icon: <FileText className="h-6 w-6" />, href: '/dashboard/rifa-datos-ganador' },
    ],
  },
];

export function SidebarAccordion() {
  const pathname = usePathname();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const handleToggle = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <nav className="flex flex-col grow items-start px-2 text-sm font-medium lg:px-4 dashboard-sidebar-bg">
      <div className={'w-full'}>
        {sidebarSections.map((section) => (
          <div key={section.section} className="mb-4">
            <button
              className="w-full flex justify-between items-center px-4 py-2 text-xs font-bold text-blue-200 sidebar-section-title bg-transparent border-none focus:outline-none"
              onClick={() => handleToggle(section.section)}
              aria-expanded={openSection === section.section}
            >
              <span>{section.section}</span>
              <span>{openSection === section.section ? '▲' : '▼'}</span>
            </button>
            <div
              className="transition-all duration-300"
              style={{ maxHeight: openSection === section.section ? '1000px' : '0', overflow: 'hidden' }}
            >
              {section.items.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className={cn(
                    'flex items-center text-base gap-3 px-4 py-3 rounded-xxs dashboard-sidebar-items text-[16px] leading-[24px]',
                    pathname === item.href && 'dashboard-sidebar-items-active',
                  )}
                >
                  {item.icon}
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}
