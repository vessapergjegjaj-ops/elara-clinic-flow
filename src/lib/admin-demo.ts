// DEMO-ONLY front-end state for the clinic admin area.
// No real authentication or persistence — connect Lovable Cloud for that.
export type Appointment = {
  id: string;
  client: string;
  phone: string;
  treatment: string;
  date: string;
  time: string;
  status: "Confirmed" | "Pending" | "Completed";
};

export const demoAppointments: Appointment[] = [
  { id: "a1", client: "Arta Mehmeti", phone: "+383 44 210 998", treatment: "Signature Lip Filler", date: "2026-08-18", time: "10:30", status: "Confirmed" },
  { id: "a2", client: "Fjolla Krasniqi", phone: "+383 45 771 220", treatment: "Profhilo Bio-Remodelling", date: "2026-08-18", time: "13:00", status: "Pending" },
  { id: "a3", client: "Dea Sylaj", phone: "+383 49 330 145", treatment: "Non-Surgical Rhinoplasty", date: "2026-08-19", time: "09:00", status: "Confirmed" },
  { id: "a4", client: "Blerina Hoxha", phone: "+383 44 902 611", treatment: "Signature Hydrafacial", date: "2026-08-19", time: "16:15", status: "Completed" },
  { id: "a5", client: "Lira Pira", phone: "+383 43 118 507", treatment: "Anti-Wrinkle Upper Face", date: "2026-08-20", time: "11:45", status: "Pending" },
];

export const demoMessages = [
  { id: "m1", name: "Elona B.", email: "elona@example.com", subject: "Masseter botox question", body: "Hi, how many sessions are usually needed for jawline slimming?", at: "2 hours ago", unread: true },
  { id: "m2", name: "Vera G.", email: "vera@example.com", subject: "Gift voucher", body: "Do you sell vouchers for the Hydrafacial? I'd like one for my sister.", at: "Yesterday", unread: true },
  { id: "m3", name: "Nita R.", email: "nita@example.com", subject: "Laser package pricing", body: "Is there a discount for booking six full-body laser sessions upfront?", at: "3 days ago", unread: false },
];

const KEY = "orhidea-admin-demo";

export function isAdminSession() {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(KEY) === "1";
}
export function startAdminSession() {
  window.sessionStorage.setItem(KEY, "1");
}
export function endAdminSession() {
  window.sessionStorage.removeItem(KEY);
}