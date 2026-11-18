"use client";

import { useId, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import { cx } from "@/lib/format";
import { site } from "@/config/site";

const SERVICES = [
  { value: "deceased-estates", label: "Deceased Estates" },
  { value: "family-law", label: "Family Law" },
  { value: "road-accident-fund-claims", label: "RAF & Personal Injury Claims" },
  { value: "labour-law-litigation", label: "Labour Law & Litigation" },
  { value: "other", label: "Other" },
] as const;

const CONTACT_METHODS = [
  { value: "email", label: "Email" },
  { value: "telephone", label: "Telephone" },
  { value: "whatsapp", label: "WhatsApp" },
] as const;

type ServiceValue = (typeof SERVICES)[number]["value"];
type MethodValue = (typeof CONTACT_METHODS)[number]["value"];

interface Values {
  firstName: string;
  surname: string;
  email: string;
  phone: string;
  service: ServiceValue | "";
  method: MethodValue | "";
  message: string;
}
type Field = keyof Values;
type Errors = Partial<Record<Field, string>>;

const EMPTY: Values = { firstName: "", surname: "", email: "", phone: "", service: "", method: "", message: "" };
const ORDER: Field[] = ["firstName", "surname", "email", "phone", "service", "method", "message"];
const MESSAGE_MIN = 20;
const MESSAGE_MAX = 1000;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.firstName.trim().length < 2) e.firstName = "Please enter your first name.";
  if (v.surname.trim().length < 2) e.surname = "Please enter your surname.";
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Please enter a valid email address, for example name@example.com.";
  const digits = v.phone.replace(/\D/g, "");
  if (!v.phone.trim()) e.phone = "Please enter a telephone number.";
  else if (!/^[+\d\s()-]+$/.test(v.phone.trim()) || digits.length < 9 || digits.length > 15)
    e.phone = "Please enter a valid telephone number, for example 082 123 4567.";
  if (!v.service) e.service = "Please select the legal service you require.";
  if (!v.method) e.method = "Please choose how you would like us to contact you.";
  const len = v.message.trim().length;
  if (!len) e.message = "Please briefly describe your enquiry.";
  else if (len < MESSAGE_MIN) e.message = `Please provide a little more detail (at least ${MESSAGE_MIN} characters).`;
  else if (len > MESSAGE_MAX) e.message = `Please keep your enquiry under ${MESSAGE_MAX} characters.`;
  return e;
}

const inputBase =
  "w-full border-0 border-b bg-transparent px-0 py-3 text-base text-charcoal placeholder:text-grey/70 transition-colors duration-300 focus:outline-none focus:ring-0";

export function ConsultationForm() {
  const params = useSearchParams();
  const initialService = SERVICES.find((s) => s.value === params.get("service"))?.value ?? "";
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const [values, setValues] = useState<Values>({ ...EMPTY, service: initialService });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [submittedName, setSubmittedName] = useState("");

  const id = (f: Field) => `${uid}-${f}`;

  function update<K extends Field>(field: K, value: Values[K]) {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field] || errors[field]) {
      const all = validate(next);
      setErrors((prev) => ({ ...prev, [field]: all[field] }));
    }
  }

  function blur(field: Field) {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validate(values)[field] }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (status === "loading") return;
    const found = validate(values);
    setErrors(found);
    setTouched(Object.fromEntries(ORDER.map((f) => [f, true])));
    const firstInvalid = ORDER.find((f) => found[f]);
    if (firstInvalid) {
      const el = formRef.current?.querySelector<HTMLElement>(`[data-field="${firstInvalid}"]`);
      el?.focus();
      return;
    }
    setStatus("loading");
    // Demonstration only: simulate a network round-trip. Nothing is transmitted.
    await new Promise((resolve) => setTimeout(resolve, 1600));
    setSubmittedName(values.firstName.trim());
    setStatus("success");
  }

  function reset() {
    setValues({ ...EMPTY, service: "" });
    setErrors({});
    setTouched({});
    setStatus("idle");
  }

  const errorList = ORDER.filter((f) => errors[f] && touched[f]);

  const label = "mb-1 block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-navy";
  const req = (
    <>
      <span aria-hidden="true" className="ml-1 text-gold-deep">*</span>
      <span className="sr-only"> (required)</span>
    </>
  );
  const err = (f: Field) =>
    errors[f] ? (
      <p id={`${id(f)}-error`} className="mt-2 flex items-start gap-2 text-sm text-[#a23b3b]">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        {errors[f]}
      </p>
    ) : null;
  const fieldProps = (f: Field) => ({
    id: id(f),
    "data-field": f,
    "aria-invalid": errors[f] ? true : undefined,
    "aria-describedby": errors[f] ? `${id(f)}-error` : undefined,
    onBlur: () => blur(f),
    className: cx(inputBase, errors[f] ? "border-[#a23b3b]" : "border-navy/25 focus:border-gold-deep"),
  });

  return (
    <div className="relative bg-white p-6 shadow-[0_40px_80px_-50px_rgba(20,38,61,0.55)] sm:p-10 lg:p-12">
      <p className="mb-8 border-l-2 border-gold bg-gold/10 px-4 py-3 text-sm text-charcoal">
        <strong className="font-semibold">Demonstration form.</strong> Nothing you enter here is sent to any law firm or stored.
      </p>

      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            role="status"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="py-6 text-center sm:py-10"
          >
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold bg-gold/10 text-gold-deep">
              <Check className="h-8 w-8" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <h2 className="mt-8 text-[2.2rem] font-medium text-navy sm:text-4xl">Thank you, {submittedName}.</h2>
            <p className="mx-auto mt-5 max-w-md leading-relaxed text-grey-dark">
              This is how the confirmation would appear to a visitor. As this is a demonstration, <strong className="font-semibold text-navy">your enquiry has not been sent</strong> to the firm.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-9 border border-navy/30 px-6 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-navy transition-colors hover:bg-navy hover:text-white"
            >
              Submit another demonstration enquiry
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-describedby={`${uid}-notice`}
          >
            {errorList.length > 0 && (
              <div role="alert" className="mb-8 border border-[#a23b3b]/40 bg-[#a23b3b]/5 p-5 text-sm text-[#7d2c2c]">
                <p className="font-semibold">Please review the following before submitting:</p>
                <ul className="mt-2 list-inside list-disc space-y-0.5">
                  {errorList.map((f) => (
                    <li key={f}>{errors[f]}</li>
                  ))}
                </ul>
              </div>
            )}

            <p className="mb-8 text-sm text-grey-dark">Fields marked <span className="text-gold-deep">*</span> are required.</p>

            <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
              <div>
                <label htmlFor={id("firstName")} className={label}>First name{req}</label>
                <input type="text" autoComplete="given-name" value={values.firstName} onChange={(e) => update("firstName", e.target.value)} {...fieldProps("firstName")} />
                {err("firstName")}
              </div>
              <div>
                <label htmlFor={id("surname")} className={label}>Surname{req}</label>
                <input type="text" autoComplete="family-name" value={values.surname} onChange={(e) => update("surname", e.target.value)} {...fieldProps("surname")} />
                {err("surname")}
              </div>
              <div>
                <label htmlFor={id("email")} className={label}>Email address{req}</label>
                <input type="email" inputMode="email" autoComplete="email" placeholder="name@example.com" value={values.email} onChange={(e) => update("email", e.target.value)} {...fieldProps("email")} />
                {err("email")}
              </div>
              <div>
                <label htmlFor={id("phone")} className={label}>Telephone number{req}</label>
                <input type="tel" inputMode="tel" autoComplete="tel" placeholder="082 123 4567" value={values.phone} onChange={(e) => update("phone", e.target.value)} {...fieldProps("phone")} />
                {err("phone")}
              </div>
            </div>

            <div className="mt-8">
              <label htmlFor={id("service")} className={label}>Legal service required{req}</label>
              <select value={values.service} onChange={(e) => update("service", e.target.value as ServiceValue | "")} {...fieldProps("service")}>
                <option value="">Select a service…</option>
                {SERVICES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
              {err("service")}
            </div>

            <fieldset className="mt-8" aria-describedby={errors.method ? `${id("method")}-error` : undefined}>
              <legend className={label}>Preferred contact method{req}</legend>
              <div className="mt-3 flex flex-wrap gap-3">
                {CONTACT_METHODS.map((m, i) => {
                  const checked = values.method === m.value;
                  return (
                    <label
                      key={m.value}
                      className={cx(
                        "flex cursor-pointer items-center gap-2.5 border px-5 py-3 text-sm transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold",
                        checked ? "border-navy bg-navy text-white" : "border-navy/25 text-charcoal hover:border-navy",
                      )}
                    >
                      <input
                        type="radio"
                        name={`${uid}-method`}
                        value={m.value}
                        checked={checked}
                        data-field={i === 0 ? "method" : undefined}
                        onChange={() => update("method", m.value)}
                        onBlur={() => blur("method")}
                        className="sr-only"
                      />
                      <span aria-hidden="true" className={cx("flex h-4 w-4 items-center justify-center rounded-full border", checked ? "border-gold" : "border-navy/40")}>
                        {checked && <span className="h-2 w-2 rounded-full bg-gold" />}
                      </span>
                      {m.label}
                    </label>
                  );
                })}
              </div>
              {err("method")}
            </fieldset>

            <div className="mt-8">
              <div className="flex items-end justify-between gap-4">
                <label htmlFor={id("message")} className={label}>Brief enquiry description{req}</label>
                <span aria-hidden="true" className={cx("text-xs tabular-nums", values.message.length > MESSAGE_MAX ? "text-[#a23b3b]" : "text-grey")}>
                  {values.message.length}/{MESSAGE_MAX}
                </span>
              </div>
              <textarea rows={5} value={values.message} onChange={(e) => update("message", e.target.value)} {...fieldProps("message")} className={cx(fieldProps("message").className, "resize-y")} />
              {err("message")}
            </div>

            <p id={`${uid}-notice`} className="mt-8 text-[0.82rem] leading-relaxed text-grey-dark">
              Submitting an enquiry does not establish an attorney-client relationship. Please do not include confidential or sensitive information in this form.
            </p>

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-8 inline-flex w-full items-center justify-center gap-3 bg-navy px-8 py-[1.1rem] text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-white transition-colors duration-300 hover:bg-navy-soft disabled:cursor-wait disabled:opacity-80 sm:w-auto"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  <span>Sending…</span>
                </>
              ) : (
                "Request a Consultation"
              )}
            </button>
            <p className="sr-only" aria-live="polite">{status === "loading" ? "Submitting your enquiry" : ""}</p>
            <p className="mt-5 text-xs text-grey">To reach the office directly, call {site.contact.phoneDisplay}.</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
