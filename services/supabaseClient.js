import { createClient } from "@supabase/supabase-js"
//client for interacting with data on supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasekey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// if (typeof window === "undefined") {
//     console.log("SERVER → layout.jsx");
// } else {
//     console.log("CLIENT → layout.jsx");
// }

export const supabase = createClient(supabaseUrl, supabasekey)
