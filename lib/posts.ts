// lib/posts.ts (أو ملف مماثل)
export type Post = {
  title: string;
  slug: string;
  date?: string | Date | number | null;
  [k: string]: any;
};

// دالة توحيد التاريخ لأي نوع (string/Date/number) وترجعه كـ number للفرز
function toTime(value: Post["date"]): number {
  if (!value) return 0;
  try {
    if (value instanceof Date) return value.getTime();
    if (typeof value === "number") return value; // يفترض أنه timestamp
    // لو سترينغ: نحاول parse
    const t = Date.parse(value);
    return Number.isNaN(t) ? 0 : t;
  } catch {
    return 0;
  }
}

export function sortPostsByDateDesc(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => toTime(b.date) - toTime(a.date));
}
