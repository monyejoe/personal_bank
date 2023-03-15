import React from 'react'
import Circle from "../components/Circle";
import style from "../styles/Contact.module.css";
import Link from "next/link";
import Image from "next/image";

function ways_to_bank() {
  return (
    <>

      <div className={style.container}>
        <Circle backgroundColor="green" left="-40vh" top="-20vh" className={style.circle} />
        <Circle backgroundColor="yellow" right="-30vh" bottom="-60vh" className={style.circle} />
        <div class="container">
          <div class="row">
            <div class="col-6">
              <Image
                src={process.env.NEXT_PUBLIC_URL + "/img/barner_1.png"}
                height="850px"
                width="800px"
                alt=""
              />

            </div>
            <div class="col-6">
              <h1 className={style.title} style={{ marginTop: "40px" }}>So, how do you actually start investing?</h1>

              <p> It's simple to start investing with HSBC. You just need to be an HSBC Expat Bank account customer, resident of an eligible country and over 18 years old. </p>

              <p>
                Just decide which of our 5 investing options suits you best:
                <ul> <li>
                Choose a ready-made HSBC portfolio <br />
                For a quick and easy way to start investing, you could choose one of our HSBC Global Strategy Portfolios. A series of 5 diversified funds, they are a one-stop investment that's managed on your behalf. All you need to do is choose your preferred level of risk and we'll take care of the rest. Start investing with a lump sum of £100.
                </li><li>   Search our entire range of funds <br />
                If you like doing your own research, our International Investment Centre puts a wide range of funds at your fingertips. As well as multi-asset funds, this online fund platform features index trackers and single-asset funds. Start with a lump sum of £1000 or £100 per month.
                  </li><li>  Pick your own shares <br />
                  If you know what individual shares you're interested in, our online sharedealing service could be for you. InvestDirect lets you research companies and set up share price alerts. You can even create a virtual portfolio so you can test your ideas before you invest. Minimum investment £1.
                  </li> </ul>
              </p>
              <Link href="/contact">Contact us</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ways_to_bank