"use client";

import { useEffect, useMemo, useState } from "react";
import { useToast } from "@/components/ToastProvider";
import Link from "next/link";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "";

export default function AdminEventsPage() {
  const { notify } = useToast();
  const [auth, setAuth] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("admin_auth") === "1";
  });
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  type TEvent = {
    _id: string;
    title: string;
    slug: string;
    date: string;
    time: string;
    mode: string;
  };
  const [events, setEvents] = useState<TEvent[]>([]);

  const filtered = useMemo(() => events, [events]);

  useEffect(() => {
    if (!auth) return;
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/events");
        const data = await res.json();
        setEvents(data.events || []);
      } catch {
        notify("Failed to load events", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [auth, notify]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuth(true);
      if (typeof window !== "undefined") localStorage.setItem("admin_auth", "1");
      notify("Admin authenticated", "success");
    } else {
      notify("Invalid password", "error");
    }
  };

  const onDelete = async (slug: string) => {
    if (!confirm("Delete this event? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/events/${slug}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to delete");
      setEvents((prev) => prev.filter((e) => e.slug !== slug));
      notify("Event deleted", "success");
    } catch (e) {
      notify(e instanceof Error ? e.message : "Failed to delete", "error");
    }
  };

  if (!auth) {
    return (
      <section className="max-w-xl mx-auto w-full">
        <h1 className="mb-6">Admin: Manage Events</h1>
        <form onSubmit={handleAuth} className="admin-form glass card-shadow rounded-xl p-6 flex flex-col gap-4">
          <label className="text-sm text-light-100">Enter Admin Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button className="bg-primary text-black rounded-[10px] py-2.5 font-semibold">Unlock</button>
          <p className="text-light-200 text-sm">Or go to <Link href="/admin" className="underline">Create Event</Link></p>
        </form>
      </section>
    );
  }

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h1>Manage Events</h1>
        <Link href="/admin" className="bg-primary text-black rounded-xl px-4 py-2">+ New Event</Link>
      </div>

      {loading ? (
        <div className="glass rounded-xl p-6">Loading events...</div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((e) => (
            <div key={e._id} className="glass rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">{e.title}</p>
                <p className="text-sm text-light-200">{e.date} · {e.time} · <span className="pill">{e.mode}</span></p>
                <p className="text-sm text-light-200">/{e.slug}</p>
              </div>
              <div className="flex items-center gap-3">
                <Link href={`/events/${e.slug}`} className="underline">View</Link>
                <button onClick={() => onDelete(e.slug)} className="border cursor-pointer border-red-600 text-red-400 rounded-xl px-3 py-2 hover:bg-red-600/10">Delete</button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="glass rounded-xl p-6 text-light-200">No events found.</div>
          )}
        </div>
      )}
    </section>
  );
}