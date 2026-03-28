'use server';

import { supabase } from '@/lib/supabaseClient';
import { Client, ClientFormData } from '@/types/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getClients(): Promise<Client[]> {
  // Option : tri par ordre décroissant de création
  const { data, error } = await supabase.from('clients').select('*').order('id', { ascending: false });

  if (error) {
    console.error("Erreur de récupération des clients:", error);
    return [];
  }

  return data as Client[];
}

export async function createClient(formData: ClientFormData) {
  const { data, error } = await supabase.from('clients').insert([formData]);

  if (error) {
    console.error("Erreur de création:", error);
    return { error: error.message };
  }

  revalidatePath('/'); // Rafraîchit la vue principale
  redirect('/'); // Redirection MVC
}

export async function updateClient(id: number, formData: Partial<ClientFormData>) {
  const { data, error } = await supabase.from('clients').update(formData).eq('id', id);

  if (error) {
    console.error("Erreur de mise à jour:", error);
    return { error: error.message };
  }

  revalidatePath('/');
  redirect('/'); // MVC Redirection
}

export async function deleteClient(id: number) {
  const { error } = await supabase.from('clients').delete().eq('id', id);

  if (error) {
    console.error("Erreur de suppression:", error);
    return { error: error.message };
  }

  revalidatePath('/');
  return { success: true };
}
