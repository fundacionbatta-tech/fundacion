'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
// import { Checkbox } from "@/components/ui/checkbox"; // No existe el componente Checkbox
import { toast } from '@/components/ui/use-toast';
import styles from '@/styles/RifaPremioForm.module.css';
import { useRifaForm } from '@/hooks/useRifaForm';

export default function RifaPremioForm() {
  const { rifa, setRifa, premios, loading, handlePremioChange, addPremio, removePremio, handleSubmit, premioTipos } =
    useRifaForm();

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Crear Nueva Rifa</h2>
      <h3 className={styles.subtitle}>Datos de la Rifa</h3>
      <div className={styles.row}>
        <div className={styles.section}>
          <Label>Nombre *</Label>
          <Input
            value={rifa.nombre}
            onChange={(e) => setRifa({ ...rifa, nombre: e.target.value })}
            required
            placeholder="Ej: Rifa solidaria"
          />
        </div>
        <div className={styles.section}>
          <Label>Descripción</Label>
          <Input
            value={rifa.descripcion}
            onChange={(e) => setRifa({ ...rifa, descripcion: e.target.value })}
            placeholder="Breve descripción"
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.section}>
          <Label>Fecha inicio *</Label>
          <Input
            type="date"
            value={rifa.fecha_inicio}
            onChange={(e) => setRifa({ ...rifa, fecha_inicio: e.target.value })}
            required
          />
        </div>
        <div className={styles.section}>
          <Label>Fecha fin *</Label>
          <Input
            type="date"
            value={rifa.fecha_fin}
            onChange={(e) => setRifa({ ...rifa, fecha_fin: e.target.value })}
            required
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.section}>
          <Label>Total boletos *</Label>
          <Input
            type="number"
            min={1}
            value={rifa.total_boletos}
            onChange={(e) => setRifa({ ...rifa, total_boletos: e.target.value })}
            required
            placeholder="Ej: 1000"
          />
        </div>
        <div className={styles.section}>
          <Label>Precio boleto *</Label>
          <Input
            type="number"
            min={1}
            step="0.01"
            value={rifa.precio_boleto}
            onChange={(e) => setRifa({ ...rifa, precio_boleto: e.target.value })}
            required
            placeholder="$10.00"
          />
        </div>
      </div>
      <div className={styles.section}>
        <Label>
          <input
            type="checkbox"
            checked={rifa.permitir_cuotas}
            onChange={(e) => setRifa({ ...rifa, permitir_cuotas: e.target.checked })}
            style={{ marginRight: 8 }}
          />
          Permitir cuotas
        </Label>
      </div>
      <hr className={styles.divider} />
      <h3 className={styles.subtitle}>Premios</h3>
      {premios.map((p, idx) => (
        <div key={idx} className={styles.premioCard}>
          <div className={styles.row}>
            <div className={styles.section}>
              <Label>Tipo *</Label>
              <Select value={p.tipo} onValueChange={(v) => handlePremioChange(idx, 'tipo', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tipo" />
                </SelectTrigger>
                <SelectContent>
                  {premioTipos.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className={styles.section}>
              <Label>Nombre *</Label>
              <Input
                value={p.nombre}
                onChange={(e) => handlePremioChange(idx, 'nombre', e.target.value)}
                required
                placeholder="Ej: Televisor"
              />
            </div>
            <div className={styles.section}>
              <Label>Cantidad *</Label>
              <Input
                type="number"
                min={1}
                value={p.cantidad}
                onChange={(e) => handlePremioChange(idx, 'cantidad', Number(e.target.value))}
                required
                placeholder="Ej: 1"
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.section}>
              <Label>Descripción</Label>
              <Input
                value={p.descripcion}
                onChange={(e) => handlePremioChange(idx, 'descripcion', e.target.value)}
                placeholder="Detalles del premio"
              />
            </div>
            <div className={styles.section}>
              <Label>Imagen</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handlePremioChange(idx, 'imagen', e.target.files?.[0] || null)}
              />
            </div>
          </div>
          {premios.length > 1 && (
            <Button type="button" variant="destructive" onClick={() => removePremio(idx)} className={styles.removeBtn}>
              Eliminar premio
            </Button>
          )}
          <hr className={styles.divider} />
        </div>
      ))}
      <Button type="button" onClick={addPremio} className={styles.addBtn}>
        + Agregar premio
      </Button>
      <Button type="submit" disabled={loading} className={styles.submitBtn}>
        {loading ? 'Guardando...' : 'Crear rifa'}
      </Button>
    </form>
  );
}
