import { createClient } from "@supabase/supabase-js";
import 'dotenv/config';

// Supabaseクライアントの作成
export const client = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getComments() {
  const { data, error } = await client.from("comments").select("*");

}