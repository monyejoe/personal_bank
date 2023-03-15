import React from 'react'
import Circle from "../components/Circle";
import style from "../styles/Contact.module.css";
import Link from "next/link";
import Image from "next/image";

function product_services() {
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
              <h1 className={style.title} style={{marginTop:"40px"}}>Cash Management</h1>

              <p> Secure and reliable payment collections across the world
                Critical to your business success is selecting an optimal means of payables and receivables solutions. Businesses also require real-time and accurate product information to make sound financial decisions.
              </p>
              <p>
                Our comprehensive range of cash management products includes:
<ul> <li>
                Payables <br/>
                Digital, innovative solutions: Our understanding of the payment landscape across Africa, combined with digital and physical payment solutions such as Instant Payments, Mobile Money and SWIFT GPI Cross Border payments are some of the innovative solutions we offer to meet your unique needs.
                </li><li>   Receivables <br/>
                Collect money easily within Africa: Our experience in Africa, coupled with our extensive physical footprint and leading collections capability (Electronic Bill Presentment, Receipt Referencing and Direct Debits to name a few), helps you to navigate the challenges associated with the collecting of money by ensuring that funds are received predictably and reliably, with value passed to accounts quickly and securely.
                </li><li>  Account Services <br/>
                Expert account management: Standard Bank is a trusted advisor to local and multinational clients. Our cash management solutions enable you to view and track capital outflows in real-time to reduce trapped cash and administer your businesses centrally.
                </li><li> Liquidity Management <br/>
                Effective liquidity management: We offer a range of structured solutions to our local and multinational clients. Participating account balances can be netted, pooled or swept to provide an overall group position view.
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

export default product_services