"use client";

export default function TwoLanguageLegalPage({
  titleEn,
  titleAr,
  contentEn,
  contentAr,
}: {
  titleEn: string;
  titleAr: string;
  contentEn: string;
  contentAr: string;
}) {
  return (
    <div className="mx-auto max-w-4xl p-8 space-y-20">
      
      {/* ================= ENGLISH ================= */}
      <section>
        <h1 className="mb-6 text-3xl font-bold">{titleEn}</h1>
        <div className="prose max-w-none">
          <div>{contentEn}</div>
        </div>
      </section>

      {/* ================= DIVIDER ================= */}
      <div className="h-px w-full bg-border" />

      {/* ================= ARABIC ================= */}
      <section dir="rtl">
        <h1 className="mb-6 text-3xl font-bold text-right">{titleAr}</h1>
        <div className="prose max-w-none text-right">
          <div>{contentAr}</div>
        </div>
      </section>
    </div>
  );
}
