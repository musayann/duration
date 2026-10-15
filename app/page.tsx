import { DurationConverter } from "@/components/duration-converter";

export default function Home() {
  return (
    <main>
      <div className="intro">
        <p className="eyebrow"><span aria-hidden="true"></span> THE DURATION CONVERTER</p>
        <h1>Time, in decimal.</h1>
        <p className="subtitle">From hours, minutes, and seconds to decimal hours.<br />One less thing to calculate.</p>
      </div>

      <DurationConverter />

      <section className="explanation" aria-labelledby="explanation-title">
        <div className="explanation-icon" aria-hidden="true">=</div>
        <div>
          <h2 id="explanation-title">Simple math. A little time saved.</h2>
          <p>Hours + (minutes ÷ 60) + (seconds ÷ 3,600)</p>
          <p className="formula-example">For example, <strong>01:30:00</strong> becomes <strong>1.50 hours.</strong></p>
        </div>
      </section>
      <noscript><p className="noscript">Enable JavaScript to use the duration converter.</p></noscript>
    </main>
  );
}
