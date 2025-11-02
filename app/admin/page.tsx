"use client";

import { Suspense, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Dayjs } from "dayjs";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "";

import { useToast } from "@/components/ToastProvider";

export default function AdminCreateEventPage() {
  const { notify } = useToast();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    password: "",
    title: "",
    description: "",
    overview: "",
    venue: "",
    location: "",
    mode: "online" as "online" | "offline" | "hybrid",
    audience: "",
    organizer: "",
    tags: "",
    agenda: "",
    image: null as File | null,
  });

  const [dateValue, setDateValue] = useState<Dayjs | null>(null);
  const [timeValue, setTimeValue] = useState<Dayjs | null>(null);

  const dateString = useMemo(() => (dateValue ? dateValue.format("YYYY-MM-DD") : ""), [dateValue]);
  const timeString = useMemo(() => (timeValue ? timeValue.format("HH:mm") : ""), [timeValue]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((p) => ({ ...p, image: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (form.password !== ADMIN_PASSWORD) {
      setError("Invalid password.");
      return;
    }

    if (!form.image) {
      setError("Image is required.");
      return;
    }

    if (!dateString || !timeString) {
      setError("Please select date and time.");
      return;
    }

    try {
      setLoading(true);
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("overview", form.overview);
      fd.append("venue", form.venue);
      fd.append("location", form.location);
      fd.append("date", dateString);
      fd.append("time", timeString);
      fd.append("mode", form.mode);
      fd.append("audience", form.audience);
      fd.append("organizer", form.organizer);
      fd.append(
        "tags",
        JSON.stringify(
          form.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        )
      );
      fd.append(
        "agenda",
        JSON.stringify(
          form.agenda
            .split("\n")
            .map((t) => t.trim())
            .filter(Boolean)
        )
      );
      fd.append("image", form.image);

      const res = await fetch("/api/events", {
        method: "POST",
        body: fd
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to create event");

      setMessage("Event created successfully.");
      notify("Event created successfully", "success");
      // Clear form except password
      setForm((p) => ({
        ...p,
        title: "",
        description: "",
        overview: "",
        venue: "",
        location: "",
        mode: "online",
        audience: "",
        organizer: "",
        tags: "",
        agenda: "",
        image: null,
      }));
      setDateValue(null);
      setTimeValue(null);
      const imgInput = document.getElementById("image") as HTMLInputElement | null;
      if (imgInput) imgInput.value = "";
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(msg);
      notify(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#59deca" },
      background: { default: "#030708", paper: "#0d161a" },
      text: { primary: "#ffffff" },
    },
    shape: { borderRadius: 10 },
  });

  return (
    <ThemeProvider theme={theme}>
      <section className="max-w-4xl w-full mx-auto">
        <h1 className="mb-8 text-center">Admin: Create Event</h1>

        {message && (
          <div className="glass border border-green-600 text-green-400 px-4 py-3 rounded mb-6">
            {message}
          </div>
        )}
        {error && (
          <div className="glass border border-red-600 text-red-400 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <form onSubmit={handleSubmit} className="admin-form glass card-shadow rounded-xl p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm text-light-100">Admin Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter admin password"
            value={form.password}
            onChange={onChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm text-light-100">Title</label>
            <input id="title" name="title" value={form.title} onChange={onChange} required />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="organizer" className="text-sm text-light-100">Organizer</label>
            <input id="organizer" name="organizer" value={form.organizer} onChange={onChange} required />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="venue" className="text-sm text-light-100">Venue</label>
            <input id="venue" name="venue" value={form.venue} onChange={onChange} required />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="location" className="text-sm text-light-100">Location</label>
            <input id="location" name="location" value={form.location} onChange={onChange} required />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-light-100">Date</label>
            <Suspense fallback={<div className="h-10 rounded-[10px] bg-dark-200/70 animate-pulse" /> }>
              <DatePicker
                value={dateValue}
                onChange={(d) => setDateValue(d)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                    placeholder: "Pick a date",
                  },
                }}
                format="YYYY-MM-DD"
              />
            </Suspense>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-light-100">Time</label>
            <Suspense fallback={<div className="h-10 rounded-[10px] bg-dark-200/70 animate-pulse" /> }>
              <TimePicker
                value={timeValue}
                onChange={(t) => setTimeValue(t)}
                ampm
                minutesStep={15}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                    placeholder: "Pick a time",
                  },
                }}
              />
            </Suspense>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="mode" className="text-sm text-light-100">Mode</label>
            <select id="mode" name="mode" value={form.mode} onChange={onChange}>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="audience" className="text-sm text-light-100">Audience</label>
            <input id="audience" name="audience" value={form.audience} onChange={onChange} required />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-sm text-light-100">Short Description</label>
          <textarea id="description" name="description" value={form.description} onChange={onChange} rows={3} required />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="overview" className="text-sm text-light-100">Overview</label>
          <textarea id="overview" name="overview" value={form.overview} onChange={onChange} rows={5} required />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="tags" className="text-sm text-light-100">Tags (comma-separated)</label>
          <input id="tags" name="tags" placeholder="react, nextjs, mongodb" value={form.tags} onChange={onChange} required />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="agenda" className="text-sm text-light-100">Agenda (one item per line)</label>
          <textarea id="agenda" name="agenda" placeholder={"10:00 AM - Registration\n10:30 AM - Keynote"} value={form.agenda} onChange={onChange} rows={4} required />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="image" className="text-sm text-light-100">Poster Image</label>
          <input id="image" name="image" type="file" accept="image/*" onChange={onFile} required />
        </div>

        <button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90 w-full cursor-pointer items-center justify-center rounded-[10px] px-4 py-3 text-lg font-semibold text-black">
            {loading ? "Creating..." : "Create Event"}
          </button>
        </form>
        </LocalizationProvider>
      </section>
    </ThemeProvider>
  );
}
