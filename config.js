// Paste your values from Supabase > Project Settings > API (anon/public key ONLY, never the service_role key)
const SUPABASE_URL="PASTE_PROJECT_URL";
const SUPABASE_ANON_KEY="PASTE_ANON_PUBLIC_KEY";
const sb=supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const inr=n=>"₹"+Number(n).toFixed(2);
const ld=d=>new Date(d).toLocaleDateString("en-CA");
const $=id=>document.getElementById(id);
async function guard(role){const{data:{session}}=await sb.auth.getSession();if(!session){location.href="index.html";return}
const{data:p}=await sb.from("profiles").select("role,name").eq("id",session.user.id).single();
if(!p||p.role!==role){location.href="index.html";return}return p}
async function logout(){await sb.auth.signOut();location.href="index.html"}
