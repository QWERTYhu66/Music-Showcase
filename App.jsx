import './index.css'

function App() {
  return (
    <>
      <div id="topbar-placeholder"></div>

      <section className="hero">
        <h1>Music Showcase</h1>
        <h3>By A Group of Friends and Families</h3>
      </section>

      <div className="content">
        <h2 style={{ textAlign: 'center' }}>Purpose</h2>
        <p style={{ textAlign: 'center' }}>
          我們是一群學習音樂，一起隨著時間成長的朋友和家庭。
        </p>
        <p style={{ textAlign: 'center' }}>
          每年的聚會除了是驗證大家的成長，更加重要的是讓大家在歲末年終享有一個輕鬆愉快的時光。
        </p>
        <p style={{ textAlign: 'center' }}>
          We are a group of friends and families who loves music.<br />
          We gather together every year-end to perform music, witness the growth of our children, and most importantly, enjoy our friendship.
        </p>

        <div className="img-section">
          <img src="/images/poster_2024.jpg" alt="Showcase Image" />
        </div>
        <div className="img-section">
          <a href="/past-events/2024-highlights">
            <img src="/images/program_2024.jpg" alt="2024 Highlights" />
          </a>
        </div>
      </div>
    </>
  )
}

export default App
