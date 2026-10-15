import { DurationConverter } from "@/components/duration-converter";

export default function Home() {
  return (
    <main>
      <div className="intro">
        <h1>Convert time to decimal hours</h1>
        <p className="subtitle">For timesheets, invoices and anything else that wants 1.75 hours instead of 1:45:00.</p>
      </div>

      <DurationConverter />

      <section className="explanation" aria-labelledby="explanation-title">
        <div className="explanation-icon" aria-hidden="true">=</div>
        <div>
          <h2 id="explanation-title">How it&apos;s calculated</h2>
          <p>Hours + (minutes ÷ 60) + (seconds ÷ 3,600)</p>
          <p className="formula-example">For example, <strong>2:20:15</strong> is 2 + 20 ÷ 60 + 15 ÷ 3,600 = 2.3375, which rounds to <strong>2.34</strong>.</p>
        </div>
      </section>
      <noscript><p className="noscript">The converter needs JavaScript to run.</p></noscript>
    </main>
  );
}
