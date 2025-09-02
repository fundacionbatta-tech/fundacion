import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { createClient } from '@/utils/supabase/client';

const premioTipos = [
  { value: 'mayor', label: 'Mayor' },
  { value: 'secundario', label: 'Secundario' },
  { value: 'semanal', label: 'Semanal' },
];

export type Premio = {
  tipo: string;
  nombre: string;
  descripcion: string;
  imagen: File | null;
  imagen_url?: string;
  cantidad: number;
};

export type RifaFormState = {
  nombre: string;
  descripcion: string;
  fecha_inicio: string;
  fecha_fin: string;
  total_boletos: string;
  precio_boleto: string;
  permitir_cuotas: boolean;
};

export function useRifaForm() {
  const [rifa, setRifa] = useState<RifaFormState>({
    nombre: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: '',
    total_boletos: '',
    precio_boleto: '',
    permitir_cuotas: false,
  });
  const [premios, setPremios] = useState<Premio[]>([
    { tipo: 'mayor', nombre: '', descripcion: '', imagen: null, cantidad: 1 },
  ]);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  // Validaciones básicas
  const validate = () => {
    if (!rifa.nombre || !rifa.fecha_inicio || !rifa.fecha_fin || !rifa.total_boletos || !rifa.precio_boleto)
      return 'Completa todos los campos obligatorios de la rifa.';
    if (new Date(rifa.fecha_inicio) > new Date(rifa.fecha_fin))
      return 'La fecha de inicio debe ser anterior a la fecha de fin.';
    if (Number(rifa.precio_boleto) <= 0) return 'El precio del boleto debe ser mayor a 0.';
    if (Number(rifa.total_boletos) <= 0) return 'El total de boletos debe ser mayor a 0.';
    for (const p of premios) {
      if (!p.tipo || !p.nombre || !p.cantidad || p.cantidad < 1)
        return 'Completa todos los campos obligatorios de los premios.';
    }
    return null;
  };

  // Carga imagen a Supabase Storage en carpeta 'private/' y retorna la URL pública
  const uploadImage = async (file: File) => {
    // Verifica autenticación
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      throw new Error('Debes iniciar sesión para subir imágenes.');
    }
    // Subir a carpeta 'private/'
    const fileName = `private/${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from('premios')
      .upload(fileName, file, { cacheControl: '3600', upsert: false });
    if (error) throw error;
    // Obtener URL pública (si la policy lo permite)
    const { data: urlData } = supabase.storage.from('premios').getPublicUrl(fileName);
    return urlData.publicUrl;
  };

  const handlePremioChange = (idx: number, field: keyof Premio, value: any) => {
    setPremios((prev) => prev.map((p, i) => (i === idx ? { ...p, [field]: value } : p)));
  };

  const addPremio = () => {
    setPremios([...premios, { tipo: 'mayor', nombre: '', descripcion: '', imagen: null, cantidad: 1 }]);
  };

  const removePremio = (idx: number) => {
    setPremios(premios.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errorMsg = validate();
    if (errorMsg) {
      toast({ title: 'Error', description: errorMsg, variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      // 1. Subir imágenes y obtener URLs
      const premiosWithUrls = await Promise.all(
        premios.map(async (p) => {
          let imagen_url = '';
          if (p.imagen) imagen_url = await uploadImage(p.imagen);
          return { ...p, imagen_url };
        }),
      );
      // 2. Insertar rifa
      const { data: rifaData, error: rifaError } = await supabase
        .from('rifas')
        .insert([
          {
            nombre: rifa.nombre,
            descripcion: rifa.descripcion,
            fecha_inicio: rifa.fecha_inicio,
            fecha_fin: rifa.fecha_fin,
            total_boletos: Number(rifa.total_boletos),
            precio_boleto: Number(rifa.precio_boleto),
            permitir_cuotas: rifa.permitir_cuotas,
          },
        ])
        .select('id')
        .single();
      if (rifaError || !rifaData) throw rifaError || new Error('No se pudo crear la rifa.');
      // 3. Insertar premios
      const premiosInsert = premiosWithUrls.map((p) => ({
        rifa_id: rifaData.id,
        tipo: p.tipo,
        nombre: p.nombre,
        descripcion: p.descripcion,
        imagen_url: p.imagen_url,
        cantidad: Number(p.cantidad),
      }));
      const { error: premiosError } = await supabase.from('premios').insert(premiosInsert);
      if (premiosError) throw premiosError;
      toast({
        title: '¡Rifa creada!',
        description: 'La rifa y premios se guardaron correctamente.',
        variant: 'default',
      });
      // Reset form
      setRifa({
        nombre: '',
        descripcion: '',
        fecha_inicio: '',
        fecha_fin: '',
        total_boletos: '',
        precio_boleto: '',
        permitir_cuotas: false,
      });
      setPremios([{ tipo: 'mayor', nombre: '', descripcion: '', imagen: null, cantidad: 1 }]);
    } catch (err: any) {
      toast({ title: 'Error', description: err.message || 'Ocurrió un error.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return {
    rifa,
    setRifa,
    premios,
    setPremios,
    loading,
    handlePremioChange,
    addPremio,
    removePremio,
    handleSubmit,
    premioTipos,
  };
}
