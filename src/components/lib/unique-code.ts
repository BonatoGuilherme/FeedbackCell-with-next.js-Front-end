// Utility to extract and persist a "código único" from the URL

export type UniqueCodeType =
  | "SNF_TRACKING"
  | "UUID"
  | "NUMERIC"
  | "REF_CODE"
  | "UNKNOWN";

const STORAGE_KEY_CODE = "unique-code";
const STORAGE_KEY_TYPE = "unique-code-type";

export function detectUniqueCodeType(value: string): UniqueCodeType {
  const v = String(value || "").trim();
  if (!v) return "UNKNOWN";

  // SNF tracking patterns e.g., SNF-XXXX or SNF123, be permissive
  if (/^SNF[-_A-Z0-9]+$/i.test(v)) return "SNF_TRACKING";

  // UUID v4 pattern
  if (
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      v,
    )
  ) {
    return "UUID";
  }

  // Numeric only (ids)
  if (/^\d{4,}$/.test(v)) return "NUMERIC";

  // Fallback to a reference-like code if alphanumeric and length >= 5 and contains at least one digit
  if (/^(?=.*\d)[A-Z0-9-_]{5,}$/i.test(v)) return "REF_CODE";

  return "UNKNOWN";
}

function getUrlParam(names: string[]): string | null {
  try {
    const usp = new URLSearchParams(window.location.search);
    for (const name of names) {
      const val = usp.get(name);
      if (val && String(val).trim()) return String(val).trim();
    }
  } catch {
    /* noop */
  }
  return null;
}

function getFromPath(): string | null {
  try {
    const path = window.location.pathname || "";
    const segments = path.split("/").filter(Boolean);
    const last = segments[segments.length - 1] || "";
    if (!last) return null;
    const trimmed = last.trim();
    // Accept plausible code-like tail segments: SNF*, UUID v4 or numeric with at least 4 digits
    // Avoid plain words like "occurrences" by requiring digit for generic codes
    if (
      /^(SNF[-_A-Z0-9]+|[0-9a-f-]{36}|\d{4,}|(?=.*\d)[A-Z0-9-_]{5,})$/i.test(
        trimmed,
      )
    ) {
      return trimmed;
    }
  } catch {
    /* noop */
  }
  return null;
}

export function extractUniqueCodeFromUrl(): {
  code: string | null;
  type: UniqueCodeType;
} {
  // Try common param names first
  const code =
    getUrlParam([
      "unique_code",
      "codigo",
      "code",
      "tracking",
      "snf",
      "snf_tracking_code",
      "ref",
      "ref_order_code",
    ]) || getFromPath();

  const type = code ? detectUniqueCodeType(code) : "UNKNOWN";
  return { code: code || null, type };
}

export function persistUniqueCode(
  code: string | null,
  type: UniqueCodeType,
): void {
  try {
    if (code && code.trim()) {
      localStorage.setItem(STORAGE_KEY_CODE, code.trim());
      localStorage.setItem(STORAGE_KEY_TYPE, type);
    }
  } catch {
    /* noop */
  }
}

export function getPersistedUniqueCode(): {
  code: string | null;
  type: UniqueCodeType;
} {
  try {
    const code = localStorage.getItem(STORAGE_KEY_CODE);
    const type =
      (localStorage.getItem(STORAGE_KEY_TYPE) as UniqueCodeType) || "UNKNOWN";
    return { code: code || null, type };
  } catch {
    return { code: null, type: "UNKNOWN" };
  }
}

export function bootstrapUniqueCodeCapture(): void {
  try {
    const { code, type } = extractUniqueCodeFromUrl();
    // Persist only when it clearly looks like a tracking/uuid/numeric code
    if (
      code &&
      (type === "SNF_TRACKING" || type === "UUID" || type === "NUMERIC")
    ) {
      persistUniqueCode(code, type);
    }
  } catch {
    /* noop */
  }
}
